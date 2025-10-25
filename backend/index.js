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

app.get('/api/quotes', async (_request, response) => {
  const { rows } = await client.query('SELECT * FROM quotes;');

  response.send(rows);
});

app.post('/api/post', async (request, response) => {
  const { name, quote } = request.body;

  const { rows } = await client.query(
    'INSERT INTO quotes (name, quote) VALUES ($1, $2) RETURNING *',
    [name, quote]
  );
  response.send(rows);
});

app.put('/api/put/:id', async (request, response) => {
  console.log('id: ', request.id);
  const { name, quote } = request.body;
  const { id } = request.params;

  const { rows } = await client.query(
    'UPDATE quotes set name = $1, quote = $2 WHERE id = $3 RETURNING *',
    [name, quote, id]
  );
  response.send(rows);
});

app.delete('/api/delete/:id', async (request, response) => {
  const { id } = request.params;

  await client.query('DELETE FROM quotes WHERE id = $1;', [id]);
  response.send('Delete succesful');
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
