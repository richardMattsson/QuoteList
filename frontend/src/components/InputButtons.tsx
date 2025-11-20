import { QuoteType } from "../../lib/type";
import { FormButtonType } from "../../lib/type";

type InputButtonsProps = {
  formButton: FormButtonType;
  quoteDisplay: QuoteType | null;
  setFormButton: React.Dispatch<React.SetStateAction<FormButtonType>>;
  inProgress: number | boolean | null;
  handleDelete: () => void;
};

function InputButtons({
  formButton,
  setFormButton,
  quoteDisplay,
  inProgress,
  handleDelete,
}: InputButtonsProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.accessKey === "add") {
      formButton.update
        ? setFormButton({ add: !formButton.add, update: false })
        : setFormButton({ ...formButton, add: !formButton.add });
    }
    if (e.currentTarget.accessKey === "update") {
      formButton.add
        ? setFormButton({ add: false, update: !formButton.update })
        : setFormButton({ ...formButton, update: !formButton.update });
    }
  };

  return (
    <div id="input-buttons-div">
      <button
        className={formButton.add ? "buttonFocus" : "button"}
        accessKey="add"
        onClick={handleClick}
      >
        {formButton.add ? "Stäng formulär" : "Lägg till citat"}
      </button>

      <button
        className={formButton.update ? "buttonFocus" : "button"}
        accessKey="update"
        onClick={handleClick}
      >
        {formButton.update ? "Stäng formulär" : "Uppdatera citat"}
      </button>

      <button className="button" onClick={handleDelete}>
        {quoteDisplay && inProgress === quoteDisplay.id ? (
          <div className="loader"></div>
        ) : (
          "Radera citat"
        )}
      </button>
    </div>
  );
}
export default InputButtons;
