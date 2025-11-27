import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type usersType = {
  id: number;
  email: string;
  password: string;
};

function Account() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState<usersType[]>();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("/database-users.json");
      const result = await response.json();
      console.log(result);
      setUsers(result);
    }
    getUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (users) {
      const successful = users.some(
        (user) => user.email === form.email && user.password === form.password
      );
      if (successful) {
        navigate("/");
      } else {
        setError(true);
      }
    }
  };

  return (
    <>
      <article
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {error && (
          <p data-test="login-error-message">
            Något verkar vara fel med dina inloggningsuppgifter
          </p>
        )}
        <section
          style={{
            display: "grid",
            justifyContent: "center",
            border: "1px solid white",
            borderRadius: "6px",
            alignItems: "center",
            gap: 5,
            padding: "3rem",
          }}
        >
          <label style={{ textAlign: "center" }}>Logga in</label>
          <form
            onSubmit={handleSubmit}
            data-test="login-form"
            style={{
              display: "grid",
              gap: 2,
              // border: "1px solid white",

              // justifyContent: "center",
              // alignContent: "center",
              padding: "1rem",
            }}
          >
            <label htmlFor="email" style={{ textAlign: "center" }}>
              email
            </label>
            <input
              onChange={handleChange}
              value={form.email}
              name="email"
              data-test="login-email-input"
              type="text"
              placeholder="email"
            />
            <label htmlFor="password" style={{ textAlign: "center" }}>
              lösenord
            </label>
            <input
              onChange={handleChange}
              value={form.password}
              name="password"
              data-test="login-password-input"
              type="password"
              placeholder="lösenord"
            />
            <input
              data-test="login-submit-input"
              type="submit"
              value="Logga in"
              style={{ cursor: "pointer", marginTop: "15px" }}
            />
          </form>
        </section>
      </article>
    </>
  );
}
export default Account;
