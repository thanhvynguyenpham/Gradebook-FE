import { ThemeProvider } from "@mui/material";
import { Route } from "react-router";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
      </div>
    </ThemeProvider>
  );
}

export default App;
