import Router from "./router/Router";
import BookContextProvider from "./context/bookContext";
import "./App.css";

function App() {
  return (
    <BookContextProvider>
      <Router />
    </BookContextProvider>
  );
}

export default App;
