type QuotesType = {
  id: number;
  name: string;
  quote: string;
};

type FormButtonType = {
  add: boolean;
  update: boolean;
};

type InputButtonsType = {
  formButton: FormButtonType;
  quoteDisplay: QuotesType | null;
  setFormButton: React.Dispatch<React.SetStateAction<FormButtonType>>;
  inProgress: string | number | null;
  handleDelete: () => void;
};

function InputButtons({
  formButton,
  setFormButton,
  quoteDisplay,
  inProgress,
  handleDelete,
}: InputButtonsType) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.accessKey === "add") {
      setFormButton({ ...formButton, add: !formButton.add });
    }
    if (e.currentTarget.accessKey === "update") {
      setFormButton({ ...formButton, update: !formButton.update });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "flex-end",
        border: "1px solid white",
      }}
    >
      <button className="button" accessKey="add" onClick={handleClick}>
        {formButton.add ? "Close form" : "Add quote"}
      </button>

      {quoteDisplay && (
        <button className="button" accessKey="update" onClick={handleClick}>
          {formButton.update ? "Close form" : "Update quote"}
        </button>
      )}

      {quoteDisplay && (
        <button className="button" onClick={handleDelete}>
          {quoteDisplay && inProgress === quoteDisplay.id ? (
            <div className="loader"></div>
          ) : (
            "Delete quote"
          )}
        </button>
      )}
    </div>
  );
}
export default InputButtons;
