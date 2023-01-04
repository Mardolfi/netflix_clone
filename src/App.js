import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./components/pages/Browse";
import Login from "./components/pages/Login";
import SearchPage from "./components/pages/SearchPage";
import GlobalStyle from "./globalStyle";

function App() {
  return (
    <Router>
        <GlobalStyle />
      <Routes>
        <Route path="/" exact element={<Login />}/>
        <Route path="/browse" element={<Browse />}/>
        <Route path="/search" element={<SearchPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
