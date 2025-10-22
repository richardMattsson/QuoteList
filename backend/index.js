const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

port = process.env.PORT || 3000;

app.use(express.static(path.join(path.resolve(), 'dist')));

app.get('/api/quotes', async (_request, response) => {
  const { rows } = await client.query('SELECT * FROM quotes;');
  response.send(rows);
});

app.post('/api/post', async (request, response) => {
  const { name, quote } = request.body;
  await client.query('INSERT INTO quotes (name, quote) VALUES ($1, $2)', [
    name,
    quote,
  ]);
  const { rows } = await client.query('SELECT * FROM quotes;');

  response.send(rows);
});

// app.get('/api', (_request, response) => {
//   response.send({ hello: 'world' });
// });

app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
