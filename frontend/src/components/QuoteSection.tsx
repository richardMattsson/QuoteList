import { useState } from "react";
import InputButtons from "./InputButtons";
import DisplayQuote from "./DisplayQuote";
import Form from "./Form";

import type { QuoteType } from "../../lib/type";
import type { FormType } from "../../lib/type";
import type { FormButtonType } from "../../lib/type";
import { useQuoteContext } from "../context/QuoteContext";

type QuoteSectionProps = {
  quotes: QuoteType[] | null;
  setQuotes: React.Dispatch<React.SetStateAction<QuoteType[] | null>>;
};

function QuoteSection({ quotes, setQuotes }: QuoteSectionProps) {
  const { quoteDisplay, setQuoteDisplay } = useQuoteContext();
  const [form, setForm] = useState<QuoteType>({
    id: 0,
    name: "",
    quote: "",
  });
  const [inProgress, setInProgress] = useState<number | boolean | null>(null);
  const [formButton, setFormButton] = useState<FormButtonType>({
    add: false,
    update: false,
  });

  function resetProcess(button: "add" | "update"): void {
    setInProgress(null);
    setForm({ id: 0, name: "", quote: "" });
    setFormButton({ ...formButton, [button]: false });
  }

  function handleQuoteForm(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    async function postQuote() {
      try {
        const response = await fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const result = await response.json();
        setQuotes((prev) => [...(prev || []), result[0]]);
        setQuoteDisplay(result[0]);
        resetProcess("add");
      } catch (error) {
        if (quotes) {
          let lastId = quotes[quotes.length - 1].id;
          setForm({ ...form, id: lastId++ });
          setQuotes([...quotes, form]);
          resetProcess("add");
        }
        console.log(
          "Det finns ingen databas att koppla upp till, inga ändringar sparas",
          error
        );
      }
    }
    postQuote();
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function sendUpdate(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    async function updateQuote() {
      try {
        const response = await fetch(`/api/put/${quoteDisplay?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const result = await response.json();
        setQuoteDisplay(result[0]);
        resetProcess("update");
      } catch (error) {
        if (quotes) {
          const quoteToUpdate = quotes.find(
            (quote) => quote.name === form.name
          );
          if (quoteToUpdate) {
            quoteToUpdate.quote = form.quote;
            quoteToUpdate.name = form.name;

            const updatedArray = quotes.filter(
              (quote) => quote.id !== quoteToUpdate.id
            );

            updatedArray.push(quoteToUpdate);
            setQuotes(updatedArray);
            resetProcess("update");
          }
        }
        resetProcess("update");
        console.log(
          "Det finns ingen databas att koppla upp till, inga ändringar sparas",
          error
        );
      }
    }

    updateQuote();
  }

  function handleDelete(): void {
    {
      quoteDisplay && setInProgress(quoteDisplay.id);
    }

    async function deleteQuote() {
      const response = await fetch(`/api/delete/${quoteDisplay?.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setInProgress(null);
        setQuoteDisplay(null);
        const updatedArray = quotes
          ? quotes.filter((quote) => quote.id !== quoteDisplay?.id)
          : [];
        setQuotes(updatedArray);
      } else {
        setInProgress(null);

        const updatedArray = quotes
          ? quotes.filter((quote) => quote.id !== quoteDisplay?.id)
          : [];
        setQuotes(updatedArray);
        setQuoteDisplay(null);
        console.log("error, response not ok. ", response);
        console.log(
          "Det finns ingen databas att koppla upp till, inga ändringar sparas"
        );
      }
    }
    deleteQuote();
  }

  return (
    <>
      <div
        data-test="quote-section-container"
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent:
            formButton.add || formButton.update ? "space-between" : "center",
          alignItems: "center",
          borderBottom: "1px solid white",
          borderRight: "1px solid white",
          padding: "2rem",
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

        <DisplayQuote />
      </div>
      <InputButtons
        inProgress={inProgress}
        setFormButton={setFormButton}
        formButton={formButton}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default QuoteSection;
