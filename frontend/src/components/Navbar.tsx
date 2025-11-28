import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { email } = useParams();
  const { user } = useUserContext();

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
          onClick={() => navigate(`/${user ? user.email : ""}`)}
        >
          Quotes & Books
        </h1>
        {/* <i className="fa-solid fa-user-check"></i> */}
        <i
          onClick={() => navigate(`/account/${user ? user.email : ""}`)}
          className={`fa-solid ${user ? "fa-user-check" : "fa-user"} fa-2xl`}
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
