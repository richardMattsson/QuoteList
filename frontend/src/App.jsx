import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [name, setName] = useState('');
  const [quote, setQuote] = useState('');
  const [inProgress, setInProgress] = useState(null);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setQuotes(result);
      });
  }, []);

  function pushNewQuote(quote) {
    setQuotes([...quotes, quote[0]]);
    setInProgress(null);
    setName('');
    setQuote('');
  }

  function deleteValue(id) {
    const updatedArray = quotes.filter((quote) => quote.id !== id);
    setQuotes(updatedArray);
    setInProgress(null);
  }

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
      .then((response) => response.json())
      .then((result) => pushNewQuote(result));
  }

  function handleDelete(id) {
    console.log(id);
    setInProgress(id);
    fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        deleteValue(id);
      } else {
        console.log(response);
      }
    });
  }

  return (
    <>
      <h1>Famous quotes</h1>

      <div className="card">
        {quotes &&
          quotes.map((quote) => (
            <div key={quote.id}>
              <p style={{ fontStyle: 'italic' }}>"{quote.quote}"</p>
              <p>{quote.name}</p>
              <button
                disabled={inProgress === quote.id}
                onClick={() => handleDelete(quote.id)}
              >
                {inProgress === quote.id ? (
                  <div class="loader"></div>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          ))}
      </div>

      <form
        onSubmit={handleQuoteForm}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          onInput={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Namn"
        />
        <textarea
          onInput={(e) => setQuote(e.target.value)}
          value={quote}
          placeholder="Citat"
        />
        <button
          onClick={() => setInProgress('add')}
          type="submit"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {inProgress === 'add' ? <div class="loader"></div> : 'Lägg till'}
        </button>
      </form>
    </>
  );
}

export default App;
