import { useState } from "react";
import InputButtons from "./InputButtons";
import DisplayQuote from "./DisplayQuote";

type QuoteType = {
  id: number;
  name: string;
  quote: string;
};

type QuoteSection = {
  setQuotes: React.Dispatch<React.SetStateAction<QuoteType[] | null>>;
  setQuoteDisplay: React.Dispatch<React.SetStateAction<QuoteType | null>>;
  quoteDisplay: QuoteType | null;

  quotes: QuoteType[] | null;
};

type FormType = {
  name: string;
  quote: string;
};

type FormButtonType = {
  add: boolean;
  update: boolean;
};

function QuoteSection({
  setQuotes,
  setQuoteDisplay,
  quoteDisplay,
  quotes,
}: QuoteSection) {
  const [form, setForm] = useState<FormType>({
    name: "",
    quote: "",
  });
  const [inProgress, setInProgress] = useState<number | string | null>(null);
  const [formButton, setFormButton] = useState<FormButtonType>({
    add: false,
    update: false,
  });

  function handleQuoteForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setInProgress(null);
        setForm({ name: "", quote: "" });
        setFormButton({ ...formButton, add: false });
        setQuotes((prev) => [...(prev || []), result[0]]);
        setQuoteDisplay(result[0]);
      });
  }

  function sendUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/api/put/${quoteDisplay?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setForm({ name: "", quote: "" });
        setFormButton({ ...formButton, update: false });
        setInProgress(null);
        setQuoteDisplay(result[0]);

        const updatedQuotes = quotes?.map((quote) => {
          if (quote.id === result[0].id) {
            return result[0];
          }
          return quote;
        });

        if (updatedQuotes) {
          setQuotes(updatedQuotes);
        } else return;
      });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  function handleDelete() {
    const proceed = prompt(`Vill du radera
      namn: ${quoteDisplay ? quoteDisplay.name : "Hittar inte författaren"}
      citat: ${quoteDisplay ? quoteDisplay?.quote : "Hittar inte citatet"}
      Svara med författarens namn om du vill fortsätta.`);

    if (proceed !== quoteDisplay?.name) return;

    setInProgress(quoteDisplay.id);
    fetch(`/api/delete/${quoteDisplay.id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setInProgress(null);
        setQuoteDisplay(quotes ? quotes[0] : null);
        const updatedArray = quotes
          ? quotes.filter((quote) => quote.id !== quoteDisplay.id)
          : [];
        setQuotes(updatedArray);
      } else {
        console.log("error, response not ok. ", response);
      }
    });
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: formButton.add ? "space-between" : "center",
          alignItems: "center",
          border: "1px solid white",
        }}
      >
        {/* TODO Make form into component */}
        <div className={formButton.add ? "showForm" : "hideForm"}>
          <form
            onSubmit={handleQuoteForm}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "500px",
            }}
          >
            <input
              onChange={handleChange}
              value={form.name}
              name="name"
              type="text"
              placeholder="Name"
              style={{
                textAlign: "center",
                padding: "10px",
                fontFamily: "sans-serif",
              }}
            />
            <textarea
              onChange={handleChange}
              value={form.quote}
              name="quote"
              cols={20}
              rows={7}
              placeholder="Quote"
              style={{
                textAlign: "center",
                padding: "10px",
                fontFamily: "sans-serif",
              }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setInProgress("add")}
                type="submit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "200px",
                }}
              >
                {inProgress === "add" ? (
                  <div className="loader"></div>
                ) : (
                  "Lägg till"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className={formButton.update ? "showUpdate" : "hideUpdate"}>
          <form
            onSubmit={sendUpdate}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "500px",
            }}
          >
            <input
              onChange={handleChange}
              value={form.name}
              name="name"
              type="text"
              placeholder={quoteDisplay ? quoteDisplay.name : "name"}
              style={{
                textAlign: "center",
                padding: "10px",
                fontFamily: "sans-serif",
              }}
            />
            <textarea
              onChange={handleChange}
              value={form.quote}
              name="quote"
              cols={20}
              rows={7}
              placeholder={quoteDisplay ? quoteDisplay.quote : "quote"}
              style={{
                textAlign: "center",
                padding: "10px",
                fontFamily: "sans-serif",
              }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setInProgress("update")}
                type="submit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "200px",
                }}
              >
                {inProgress === "update" ? (
                  <div className="loader"></div>
                ) : (
                  "Uppdatera"
                )}
              </button>
            </div>
          </form>
        </div>

        <DisplayQuote quoteDisplay={quoteDisplay} />
      </div>
      <InputButtons
        inProgress={inProgress}
        setFormButton={setFormButton}
        formButton={formButton}
        quoteDisplay={quoteDisplay}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default QuoteSection;
