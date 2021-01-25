import express from 'express';

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log('> Server running on port: 3000');
});
