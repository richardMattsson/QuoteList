import { useState } from "react";
import InputButtons from "./InputButtons";
import DisplayQuote from "./DisplayQuote";
import Form from "./Form";

import { QuoteType } from "../../lib/type";
import { FormType } from "../../lib/type";
import { FormButtonType } from "../../lib/type";

type QuoteSectionProps = {
  setQuotes: React.Dispatch<React.SetStateAction<QuoteType[] | null>>;
  setQuoteDisplay: React.Dispatch<React.SetStateAction<QuoteType | null>>;
  quoteDisplay: QuoteType | null;
  quotes: QuoteType[] | null;
};

function QuoteSection({
  setQuotes,
  setQuoteDisplay,
  quoteDisplay,
  quotes,
}: QuoteSectionProps) {
  const [form, setForm] = useState<FormType>({
    name: "",
    quote: "",
  });
  const [inProgress, setInProgress] = useState<number | boolean | null>(null);
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
      .then((result: QuoteType[]) => {
        setInProgress(null);
        setForm({ name: "", quote: "" });
        setFormButton({ ...formButton, add: false });
        setQuotes((prev) => [...(prev || []), result[0]]);
        setQuoteDisplay(result[0]);
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
      .then((result: QuoteType[]) => {
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
          justifyContent:
            formButton.add || formButton.update ? "space-between" : "center",
          alignItems: "center",
          border: "1px solid white",
        }}
      >
        <div className={formButton.add ? "showForm" : "hideForm"}>
          <Form
            formButton={formButton}
            handleQuoteForm={handleQuoteForm}
            handleChange={handleChange}
            form={form}
            setInProgress={setInProgress}
            inProgress={inProgress}
            addText="Lägg till"
          />
        </div>

        <div className={formButton.update ? "showUpdate" : "hideUpdate"}>
          <Form
            formButton={formButton}
            sendUpdate={sendUpdate}
            handleChange={handleChange}
            form={form}
            setInProgress={setInProgress}
            inProgress={inProgress}
            addText="Uppdatera"
          />
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
