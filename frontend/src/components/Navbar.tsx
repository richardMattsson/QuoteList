import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid white",
        }}
      >
        <h1
          data-test="home-heading"
          style={{
            textAlign: "start",
            cursor: "pointer",
            marginLeft: "20px",
            // border: "1px solid white",
          }}
          onClick={() => navigate("/")}
        >
          Quotes & Books
        </h1>

        <i
          onClick={() => navigate("/account")}
          className="fa-solid fa-user fa-2xl"
          data-test="account-icon"
          style={{
            cursor: "pointer",
            textAlign: "end",
            marginRight: "40px",

            // border: "1px solid white",
          }}
        ></i>
      </section>
    </>
  );
}
export default Navbar;
