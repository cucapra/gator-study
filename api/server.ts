import express from 'express';
import bodyParser from 'body-parser';
import child_process from 'child_process';
import fs from 'fs';
import pg from 'pg';
import formidable from 'express-formidable';

const app = express();

const TEMPLATE = 'dist/__app.html';
const PORT = 5000;
const GATOR_DIR = `${__dirname}/../dist/stdlib`;

const pool = new pg.Pool({
  user: 'postgres',
  database: 'gator-study',
  port: 5432,
})

// On start up we just add the table if it doesn't exist yet
pool.query(`CREATE TABLE IF NOT EXISTS data(
  userid VARCHAR(22),
  image bytea,
  code text,
  time timestamp
);`).catch(e => console.log(e));

// Uncomment this to be able to see data in your browser at `/data`
// app.get('/data', async (req, res) => {
//   pool.query('SELECT * FROM data ORDER BY userid ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(200).json(results.rows)
//   })
// })

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
app.use('/update', formidable());
app.put('/update', async (req, res) => {
  const { userid, code } = (req as any).fields;
  const image = fs.readFileSync((req as any).files.image.path);

  pool
    .query('INSERT INTO data VALUES ($1, $2, $3, current_timestamp)', [userid, image, code])
    .catch(e => console.error(e.stack))

  res.end();
})

// serve gator compilation PUT
app.use('/compile', bodyParser.text());
app.put('/compile', async (req, res) => {
  // have it send 202 on error so we can tell client something went wrong
  gatorc(req.body).then(glsl => res.send(glsl), e => res.status(202).send(e));
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

