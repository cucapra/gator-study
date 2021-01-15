import express from 'express';
import bodyParser from 'body-parser';
import child_process from 'child_process';
import fs from 'fs';
const app = express();

const TEMPLATE = 'dist/__app.html';
const PORT = 5000;

// helper function to compile gator
// this could be vastly simplified with some changes to the gator executable
function gatorc(content: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.writeFile('/tmp/gator.lgl', content, () => {});
    child_process.execFile('gatorc', ['/tmp/gator.lgl'], (e, stdout, stderr) => {
      if (stderr) {
        reject(stderr);
      }
      else {
        resolve(stdout);
      }
    })
  })
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve gator compilation POST
app.post('/compile', async (req, res) => {
  let frag = {success: true, content: ''};
  let vert = {success: true, content: ''};
  if (req.body.frag) {
    frag = await gatorc(req.body.frag)
      .then(s => ({success: true, content: s}), e => ({success: false, content: e}))
  }
  if (req.body.vert) {
    vert = await gatorc(req.body.vert)
      .then(s => ({success: true, content: s}), e => ({success: false, content: e}))
  }
  res.send({ frag, vert })
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

