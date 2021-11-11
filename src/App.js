import { Route } from "react-router";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </div>
  );
}

export default App;
