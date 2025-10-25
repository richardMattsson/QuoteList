import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [quoteInput, setQuoteInput] = useState('');
  const [inProgress, setInProgress] = useState(null);
  const [quoteDisplay, setQuoteDisplay] = useState(null);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [displayBackendInformation, setDisplayBackendInformation] =
    useState(null);
  const [displayFrontendInformation, setDisplayFrontendInformation] =
    useState(null);
  const [displayDbInformation, setDisplayDbInformation] = useState(null);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => {
        setDisplayBackendInformation(response);
        return response.json();
      })
      .then((result) => {
        setQuotes(result);
        setQuoteDisplay(result[0]);
        setDisplayFrontendInformation({ body: undefined, result: result });
        setDisplayDbInformation(result);
      });
  }, []);

  function pushNewQuote(quote) {
    setQuotes([...quotes, quote[0]]);
    setDisplayDbInformation([...quotes, quote[0]]);
    setInProgress(null);
    setNameInput('');
    setQuoteInput('');
    setAdd(false);
    setQuoteDisplay(quote[0]);
  }

  function handleQuoteForm(e) {
    e.preventDefault();
    const body = {
      name: nameInput,
      quote: quoteInput,
    };
    fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        setDisplayBackendInformation(response);
        return response.json();
      })
      .then((result) => {
        setDisplayFrontendInformation({ body: body, result: result });
        return pushNewQuote(result);
      });
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
      setDisplayBackendInformation(response);

      console.log(response);
      if (response.ok) {
        setDisplayFrontendInformation(null);
        deleteValue(id);
      } else {
        console.log(response);
      }
    });
  }

  function deleteValue(id) {
    const updatedArray = quotes.filter((quote) => quote.id !== id);
    setQuotes(updatedArray);
    setDisplayDbInformation(updatedArray);
    setInProgress(null);
    setQuoteDisplay(null);
  }

  function sendUpdate(e) {
    e.preventDefault();
    fetch(`/api/put/${quoteDisplay.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nameInput, quote: quoteInput }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return handleUpdate(result);
      });
  }

  function handleUpdate(result) {
    setNameInput('');
    setQuoteInput('');
    setUpdate(false);
    setInProgress(null);

    setQuoteDisplay(result[0]);
    const updatedQuotes = quotes.map((quote) => {
      if (quote.id === result[0].id) {
        return result[0];
      }
      return quote;
    });
    setQuotes(updatedQuotes);
  }
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '2rem' }}>
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
                onInput={(e) => setNameInput(e.target.value)}
                value={nameInput}
                type="text"
                placeholder="Name"
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  fontFamily: 'sans-serif',
                }}
              />
              <textarea
                onInput={(e) => setQuoteInput(e.target.value)}
                value={quoteInput}
                cols={20}
                rows={7}
                placeholder="Quote"
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  fontFamily: 'sans-serif',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => setInProgress('add')}
                  type="submit"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '200px',
                  }}
                >
                  {inProgress === 'add' ? (
                    <div className="loader"></div>
                  ) : (
                    'Lägg till'
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className={update ? 'showUpdate' : 'hideUpdate'}>
            <form
              onSubmit={sendUpdate}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '500px',
              }}
            >
              <input
                onInput={(e) => setNameInput(e.target.value)}
                value={nameInput}
                type="text"
                placeholder={quoteDisplay ? quoteDisplay.name : 'name'}
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  fontFamily: 'sans-serif',
                }}
              />
              <textarea
                onInput={(e) => setQuoteInput(e.target.value)}
                value={quoteInput}
                cols={20}
                rows={7}
                placeholder={quoteDisplay ? quoteDisplay.quote : 'quote'}
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  fontFamily: 'sans-serif',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => setInProgress('update')}
                  type="submit"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '200px',
                  }}
                >
                  {inProgress === 'add' ? (
                    <div className="loader"></div>
                  ) : (
                    'Uppdatera'
                  )}
                </button>
              </div>
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
          <button className="button" onClick={() => setAdd(!add)}>
            {add ? 'Close form' : 'Add new +'}
          </button>

          <button className="button" onClick={() => setUpdate(!update)}>
            {update ? 'Close form' : 'Update quote'}
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

      {/* Nedan en illustration av kommunikation mellan frontend, backend och db  */}
      <hr />
      <h2 style={{ textAlign: 'center', fontWeight: 500 }}>
        Nedan en översikt av hur data skickas mellan frontend, backend och db.
      </h2>

      <div className="flexContainer">
        <div className="flexSection">
          <div className="flexDiv">
            <h2 style={{ textAlign: 'center', fontWeight: 500 }}>Frontend</h2>

            {displayFrontendInformation && (
              <>
                <h3 style={{ fontWeight: 600 }}>
                  En request skickas till backend. POST och PUT-anrop innehåller
                  en body. Resultatet visar mottagen data.
                </h3>
                <h3>Body:</h3>
                <p>{JSON.stringify(displayFrontendInformation.body)}</p>
                <h3>Resultat:</h3>
                {displayFrontendInformation.result.map((item) => (
                  <ul key={item.id}>
                    <li>{item.name}</li>
                    <li>{item.quote}</li>
                  </ul>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flexSection">
          <div className="flexDiv">
            <h2 style={{ textAlign: 'center', fontWeight: 500 }}>Backend</h2>
            {displayBackendInformation && (
              <>
                <h3 style={{ fontWeight: 600 }}>Backend svarar med:</h3>
                <p>{`Enpoint URL: ${displayBackendInformation.url}`}</p>
                <p>
                  {`Statuskod: ${displayBackendInformation.status}, 
                Status-text: ${displayBackendInformation.statusText}`}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flexSection">
          <div className="flexDiv">
            <h2 style={{ textAlign: 'center', fontWeight: 500 }}>Db</h2>
            <h3 style={{ fontWeight: 600 }}>Visar lagrad data.</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                style={{ width: '150px' }}
                src="/database-svgrepo-com.png"
                alt=""
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              {displayDbInformation &&
                displayDbInformation.map((item) => (
                  <ul key={item.id}>
                    <li>id: {item.id}</li>
                    <li>name: {item.name}</li>
                    <li>quote: {item.quote}</li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
