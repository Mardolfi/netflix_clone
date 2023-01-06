import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./components/pages/Browse";
import Genre from "./components/pages/Genre";
import Login from "./components/pages/Login";
import Movie from "./components/pages/Movie";
import SearchPage from "./components/pages/SearchPage";
import Section from "./components/pages/Section";
import ActorsPage from "./components/pages/ActorsPage";
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
        <Route path="/movie/:id" element={<Movie />} /> 
        <Route path="/tv/:id" element={<Movie />} /> 
        <Route path="/section/:type/:id" element={<Section />} />
        <Route path="/actors/:type/:id" element={<ActorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
