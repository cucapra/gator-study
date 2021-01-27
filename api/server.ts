import express from 'express';
import bodyParser from 'body-parser';
import child_process from 'child_process';
import fs from 'fs';
import pg from 'pg';
import formidable from 'express-formidable';
import { customAlphabet } from 'nanoid';

const app = express();

const TEMPLATE = 'dist/__app.html';
const PORT = 5000;
const GATOR_DIR = `${__dirname}/../dist/stdlib`;

const pool = new pg.Pool({
  user: 'postgres',
  database: 'gator-study',
  port: 5432,
})

// On start up we just add the tables if they don't exist yet
pool.query(`CREATE TABLE IF NOT EXISTS participants(
  part_id varchar(10) PRIMARY KEY,
  used_glsl boolean,
  experience smallint,
  gator boolean,
  farthest smallint
);
CREATE TABLE IF NOT EXISTS data(
  part_id varchar(10) REFERENCES participants(part_id),
  code text,
  time timestamp
);`)
  .catch(e => console.log(e));


// Uncomment this to be able to see data in your browser at `/data`
app.get('/data', async (req, res) => {
  pool.query('SELECT * FROM data ORDER BY time ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

// helper function to compile gator
// this could be vastly simplified/improved with some changes to the gator executable
function gatorc(content: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.writeFile(GATOR_DIR + '/tmp/gator.lgl', content, () => {});
    child_process.execFile('gatorc', [GATOR_DIR + '/tmp/gator.lgl'], (e, stdout, stderr) => {
      if (stderr) {
        reject(stderr);
      }
      else {
        resolve(stdout);
      }
    })
  })
}

// puts info into database
app.use('/compile_report', bodyParser.json());
app.put('/compile_report', async (req, res) => {
  const { part_id, code } = req.body;

  pool
    .query('INSERT INTO data VALUES ($1, $2, current_timestamp)', [part_id, code])
    .catch(e => console.error(e.stack))

  gatorc(req.body).then(glsl => res.send(glsl), e => res.status(202).send(e));
})

const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 10);

app.use('/makeuser', bodyParser.json());
app.post('/makeuser', async (req, res) => {
  const { expr, glsl } = req.body;

  const part_id = nanoid();

  let gator: boolean;
  if (glsl) {
    gator = true;
  } else {
    gator = Math.random() < 0.5;
  }

  pool
    .query('INSERT INTO participants VALUES ($1, $2, $3, $4, 0)', [part_id, glsl, expr, gator])
    .catch(e => console.error(e.stack))

  res.send({ part_id, gator });
})

// serve gator compilation PUT
app.use('/compile', bodyParser.text());
app.put('/compile', async (req, res) => {
  // have it send 202 on error so we can tell client something went wrong
  gatorc(req.body).then(glsl => res.send(glsl), e => res.status(202).send(e));
})

app.use('/getuser', bodyParser.text());
app.put('/getuser', async (req, res) => {
  pool
    .query('SELECT farthest, gator FROM participants WHERE part_id = $1', [req.body])
    .then(r => {
      if (r.rows.length) {
        res.send(r.rows[0]);
      } else {
        res.send('notfound');
      }
    });
})

// else serve assets, if they exist
app.use(express.static('dist'))

// else serve Routify
app.get('*', async (req, res) => {
  res.sendFile(TEMPLATE, { root: `${__dirname}/..` })
})

// start server
app.listen(PORT)
console.log('serving on port', PORT)

