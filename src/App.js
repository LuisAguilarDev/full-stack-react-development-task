import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AppMain } from "./Pages/AppMain.jsx";
import "./App.css";
import "animate.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route exact path="/user" element={<AppMain />} />
      </Routes>
    </Router>
  );
}

export default App;
