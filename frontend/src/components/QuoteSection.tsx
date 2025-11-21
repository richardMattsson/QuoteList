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
  const [form, setForm] = useState<FormType>({
    name: "",
    quote: "",
  });
  const [inProgress, setInProgress] = useState<number | boolean | null>(null);
  const [formButton, setFormButton] = useState<FormButtonType>({
    add: false,
    update: false,
  });

  function resetProcess(button: "add" | "update") {
    setInProgress(null);
    setForm({ name: "", quote: "" });
    setFormButton({ ...formButton, [button]: false });
  }

  function handleQuoteForm(e: React.FormEvent<HTMLFormElement>) {
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
        resetProcess("add");
        console.log(error);
        alert(
          "Något gick fel med att lägga till. Databasen är kanske inte ansluten."
        );
      }
    }
    postQuote();
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
        resetProcess("update");
        console.log(error);
        alert(
          "Något gick fel med att uppdatera. Databasen är kanske inte ansluten."
        );
      }
    }

    updateQuote();
  }

  function handleDelete() {
    const proceed = prompt(`Vill du radera
      namn: ${quoteDisplay ? quoteDisplay.name : "Hittar inte författaren"}
      citat: ${quoteDisplay ? quoteDisplay?.quote : "Hittar inte citatet"}
      Svara med författarens namn om du vill fortsätta.`);

    if (proceed !== quoteDisplay?.name) return;

    setInProgress(quoteDisplay.id);

    async function deleteQuote() {
      const response = await fetch(`/api/delete/${quoteDisplay?.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setInProgress(null);
        setQuoteDisplay(quotes ? quotes[0] : null);
        const updatedArray = quotes
          ? quotes.filter((quote) => quote.id !== quoteDisplay?.id)
          : [];
        setQuotes(updatedArray);
      } else {
        console.log("error, response not ok. ", response);
        setInProgress(null);
        alert(
          "Något gick fel med att uppdatera. Databasen är kanske inte ansluten."
        );
      }
    }
    deleteQuote();
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
