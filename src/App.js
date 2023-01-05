import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./components/pages/Browse";
import Genre from "./components/pages/Genre";
import Login from "./components/pages/Login";
import SearchPage from "./components/pages/SearchPage";
import GlobalStyle from "./globalStyle";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/browse/:type" element={<Browse />} />
        <Route path="/genre/:type/:id" element={<Genre />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
