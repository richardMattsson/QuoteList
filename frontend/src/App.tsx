import Router from "./router/Router";
import BookContextProvider from "./context/bookContext";
import QuouteContextProvider from "./context/QuoteContext";
import "./App.css";

function App() {
  return (
    <QuouteContextProvider>
      <BookContextProvider>
        <Router />
      </BookContextProvider>
    </QuouteContextProvider>
  );
}

export default App;
