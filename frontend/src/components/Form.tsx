import type { FormType } from "../../lib/type";
import type { FormButtonType } from "../../lib/type";

type FormProps = {
  formButton: FormButtonType;
  handleQuoteForm?: (e: React.FormEvent<HTMLFormElement>) => void;
  sendUpdate?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  form: FormType;
  setInProgress: React.Dispatch<React.SetStateAction<number | boolean | null>>;
  inProgress: number | boolean | null;
  addText: string;
};

function Form({
  formButton,
  handleQuoteForm,
  sendUpdate,
  handleChange,
  form,
  setInProgress,
  inProgress,
  addText,
}: FormProps) {
  console.log("Form renderar");
  return (
    <form
      onSubmit={formButton.add ? handleQuoteForm : sendUpdate}
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
          onClick={() => setInProgress(true)}
          type="submit"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "200px",
          }}
        >
          {inProgress ? <div className="loader"></div> : addText}
        </button>
      </div>
    </form>
  );
}
export default Form;
