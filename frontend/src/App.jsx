import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [name, setName] = useState('');
  const [quote, setQuote] = useState('');
  const [inProgress, setInProgress] = useState(null);
  const [quoteDisplay, setQuoteDisplay] = useState(null);
  const [add, setAdd] = useState(false);
  // const [addUpdate, setAddUpdate] = useState(false);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => response.json())
      .then((result) => {
        setQuotes(result);
        setQuoteDisplay(result[0]);
      });
  }, []);

  function pushNewQuote(quote) {
    setQuotes([...quotes, quote[0]]);
    setInProgress(null);
    setName('');
    setQuote('');
    setAdd(false);
    setQuoteDisplay(quote[0]);
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
    const proceed = prompt(`Vill du radera 
      namn: ${quoteDisplay.name}
      citat: ${quoteDisplay.quote}
      Svara med författarens namn om du vill fortsätta.`);

    if (proceed !== quoteDisplay.name) return;

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

  function deleteValue(id) {
    const updatedArray = quotes.filter((quote) => quote.id !== id);
    setQuotes(updatedArray);
    setInProgress(null);
    setQuoteDisplay(null);
  }

  // function sendUpdate(id) {
  //   fetch(`/api/post/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ name: name, quote: quote }),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => console.log(result));
  // }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {quotes &&
            quotes.map((quote) => (
              <button
                key={quote.id}
                className="button"
                style={{
                  border: '1px solid grey',
                  borderRadius: '5px',
                  textAlign: 'center',
                  margin: '10px',
                  padding: '0 10px',
                  cursor: 'pointer',
                }}
                onClick={() => setQuoteDisplay(quote)}
                disabled={
                  quoteDisplay && quoteDisplay.id === quote.id ? true : false
                }
              >
                <p>{quote.name}</p>
              </button>
            ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: add ? 'space-between' : 'center',
            alignItems: 'center',
            // border: '1px solid #fff',
          }}
        >
          <div className={add ? 'showForm' : 'hideForm'}>
            <form
              onSubmit={handleQuoteForm}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '500px',
              }}
            >
              <input
                onInput={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  fontFamily: 'sans-serif',
                }}
              />
              <textarea
                onInput={(e) => setQuote(e.target.value)}
                value={quote}
                cols={20}
                rows={7}
                placeholder="Quote"
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  fontFamily: 'sans-serif',
                }}
              />
              <button
                onClick={() => setInProgress('add')}
                type="submit"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                {inProgress === 'add' ? (
                  <div className="loader"></div>
                ) : (
                  'Lägg till'
                )}
              </button>
            </form>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p style={{ fontStyle: 'italic', textAlign: 'center' }}>
              {quoteDisplay && `"${quoteDisplay.quote}"`}
            </p>
            <p>{quoteDisplay && quoteDisplay.name}</p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <button
            className="button"
            onClick={() => setAdd(!add)}
            style={{
              border: '1px solid grey',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '5px',
              textAlign: 'center',
              margin: '10px',
              cursor: 'pointer',
            }}
          >
            {add ? 'Hide form' : 'Add new +'}
          </button>

          {/* <button
            className="button"
            style={{
              border: '1px solid grey',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '5px',
              textAlign: 'center',
              margin: '10px',
              cursor: 'pointer',
            }}
            onClick={() => setAddUpdate(!addUpdate)}
          >
            {addUpdate ? 'Hide form' : 'Update quote'}
          </button> */}

          {quoteDisplay && (
            <button
              className="button"
              onClick={() => handleDelete(quoteDisplay.id)}
              style={{
                border: '1px solid grey',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '5px',
                textAlign: 'center',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              {quoteDisplay && inProgress === quoteDisplay.id ? (
                <div className="loader"></div>
              ) : (
                'Delete quote'
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
