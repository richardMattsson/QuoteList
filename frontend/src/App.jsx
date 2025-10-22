import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [name, setName] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setQuotes(result);
      });
  }, []);

  function handleQuoteForm(e) {
    e.preventDefault();
    const body = {
      name: name,
      quote: quote,
    };
    fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Success', response);
        } else {
          console.log('Failure');
        }
        return response.json();
      })
      .then((result) => setQuotes(result));
  }

  return (
    <>
      <h1>Kända citat</h1>

      <div className="card">
        {quotes &&
          quotes.map((quote) => (
            <div key={quote.id}>
              <p style={{ fontStyle: 'italic' }}>"{quote.quote}"</p>
              <p>{quote.name}</p>
            </div>
          ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}></div>
      <form
        onSubmit={handleQuoteForm}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          onInput={(e) => setName(e.target.value)}
          type="text"
          placeholder="Namn"
        />
        <textarea
          onInput={(e) => setQuote(e.target.value)}
          placeholder="Citat"
        />
        <button type="submit">Lägg till</button>
      </form>
    </>
  );
}

export default App;
