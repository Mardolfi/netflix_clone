import loading from "../../img/loading.svg";
import { useEffect, useRef, useState } from "react";
import logo from "../../img/logo.png";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLink from "../projects/CustomLink";
import { AiOutlineSearch } from "react-icons/ai";
import { RiGlobalFill } from "react-icons/ri";
import MovieCard from "../projects/MovieCard";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.search.split("=")[1];

  const [activeHeader, setActiveHeader] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState();
  const [currentPage, setCurrentPage] = useState();
  const searchInput = useRef();
  const searchMovies = useRef();
  const [searchActive, setSearchActive] = useState();
  const [movies, setMovies] = useState();

  window.addEventListener("scroll", (e) => {
    if (e.path[1].scrollY >= 500) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }

    console.log(currentPage);

    if (window.scrollY >= searchMovies.current.offsetHeight / 2) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR&query=${query}&page=${
          currentPage + 1
        }&include_adult=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsLoadingActive(false);
          setMovies([...movies, ...data.results]);
        });

      setCurrentPage(currentPage + 1);
    }

    console.log(searchMovies.current.offsetHeight / 2, window.scrollY);
  });

  function searchMovie(query) {
    navigate(`/search?q=${query}`);
  }

  useEffect(() => {
    setIsLoadingActive(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR&query=${query}&page=1&include_adult=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingActive(false);
        setMovies(data.results);
        setCurrentPage(1);
      });
  }, [query]);

  return (
    <SearchContainer>
      <SearchHeader active={activeHeader}>
        <Links>
          <img src={logo} />
          <CustomLink to={"/browse"}>Início</CustomLink>
          <CustomLink to={"/browse/tvshows"}>Séries</CustomLink>
          <CustomLink to={"/browse/movies"}>Filmes</CustomLink>
        </Links>
        <Search active={searchActive}>
          <AiOutlineSearch
            onClick={() => {
              setSearchActive(!searchActive);
              searchInput.current.focus();
            }}
          />
          <input
            type={"text"}
            placeholder={"Títulos, gente e genêros"}
            ref={searchInput}
            onChange={(e) => searchMovie(e.target.value)}
          />
        </Search>
      </SearchHeader>
      {isLoadingActive ? (
        <LoadingContainer>
          <img src={loading} />
        </LoadingContainer>
      ) : (
        <SearchMovies ref={searchMovies}>
          {movies &&
            movies?.map((movie) => (
              <MovieCard movieId={movie.id} key={movie.id} />
            ))}
        </SearchMovies>
      )}
      <Footer>
        <p>
          Dúvidas? Ligue <span>0800 591 8942</span>
        </p>
        <Help>
          <span>Perguntas frequentes</span>
          <span>Central de Ajuda</span>
          <span>Termos de Uso</span>
          <span>Privacidade</span>
          <span>Preferências de cookies</span>
          <span>Informações corporativas</span>
        </Help>
        <Language>
          <RiGlobalFill />
          <select name="select">
            <option value={"pt-BR"}>Português</option>
            <option value={"en"}>English</option>
          </select>
        </Language>
      </Footer>
    </SearchContainer>
  );
}

const SearchMovies = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px 30px 80px 30px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #141414;

  img {
    width: 100px;
    height: 100px;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #141414;
`;

const SearchHeader = styled.div`
  background-image: ${(props) =>
    props.active
      ? "linear-gradient(to bottom, #000, #141414)"
      : "linear-gradient(to bottom, #000, #00000000)"};
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  transition: 0.4s;
  position: fixed;
  z-index: 30;
  top: 0;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #aaa;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 30px 250px 50px 250px;

  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Help = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 0.8rem;

  span {
    margin-right: 145px;
    padding: 2px;
  }

  span:last-child {
    margin-left: -13px;
  }
`;
const Language = styled.div`
  background: black;
  border: 1px solid #333;
  width: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 15px;

  select {
    background: none;
    color: #999;
    border: none;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 20px;

  img {
    width: 100px;
    margin-right: 20px;
  }
`;

const Search = styled.div`
  color: white;
  background: ${(props) => (props.active ? "black" : "")};
  border: ${(props) => (props.active ? "1px solid white" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  padding: ${(props) => (props.active ? "2px" : "")};
  gap: 10px;

  *:first-child {
    width: 30px;
    height: 30px;
    transition: 0.5s;
    transform: ${(props) =>
      props.active ? "rotate(-10deg) translateY(3px)" : ""};
    cursor: pointer;
  }

  input {
    transition: 0.5s;
    background: none;
    border: none;
    outline: none;
    color: #fff;
    width: ${(props) => (props.active ? "200px" : "0px")};
  }
`;

export default SearchPage;
