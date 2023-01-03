import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./components/pages/Browse";
import Login from "./components/pages/Login";
import GlobalStyle from "./globalStyle";

function App() {
  return (
    <Router>
        <GlobalStyle />
      <Routes>
        <Route path="/" exact element={<Login />}/>
        <Route path="/browse" element={<Browse />}/>
      </Routes>
    </Router>
  );
}

export default App;
