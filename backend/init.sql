CREATE TABLE IF NOT EXISTS quotes (
  id serial PRIMARY KEY,
  name text NOT NULL,
  quote text NOT NULL
);

INSERT INTO quotes (name, quote)
  VALUES ('Albert Einstein', 'Life is like riding a bicycle. To keep your balance, you must keep moving.');

INSERT INTO quotes (name, quote)
  VALUES ('Oscar Wilde', 'Be yourself; everyone else is already taken.');