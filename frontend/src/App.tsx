import Router from "./router/Router";
import BookContextProvider from "./context/BookContext";
import QuouteContextProvider from "./context/QuoteContext";
import "./App.css";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <QuouteContextProvider>
        <BookContextProvider>
          <Router />
        </BookContextProvider>
      </QuouteContextProvider>
    </UserContextProvider>
  );
}

export default App;
