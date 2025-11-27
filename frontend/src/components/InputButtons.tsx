import type { FormButtonType } from "../../lib/type";
import { useQuoteContext } from "../context/QuoteContext";

type InputButtonsProps = {
  formButton: FormButtonType;
  setFormButton: React.Dispatch<React.SetStateAction<FormButtonType>>;
  inProgress: number | boolean | null;
  handleDelete: () => void;
};

function InputButtons({
  formButton,
  setFormButton,
  inProgress,
  handleDelete,
}: InputButtonsProps) {
  const { quoteDisplay } = useQuoteContext();

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
    <div
      id="input-buttons-div"
      style={{
        display: "grid",
        alignItems: "center",
        padding: "2rem",
        borderBottom: "1px solid white",
      }}
    >
      <button
        data-test="input-button-add"
        className={formButton.add ? "buttonFocus" : "button"}
        accessKey="add"
        onClick={handleClick}
      >
        {formButton.add ? "Stäng formulär" : "Lägg till citat"}
      </button>

      <button
        data-test="input-button-update"
        className={formButton.update ? "buttonFocus" : "button"}
        accessKey="update"
        onClick={handleClick}
      >
        {formButton.update ? "Stäng formulär" : "Uppdatera citat"}
      </button>

      <button
        data-test="input-button-delete"
        className="button"
        onClick={handleDelete}
      >
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
