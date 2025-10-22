const express = require('express');
const path = require('path');

const app = express();

port = process.env.PORT || 3000;

app.get('/api', (_request, response) => {
  response.send({ hello: 'world' });
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
