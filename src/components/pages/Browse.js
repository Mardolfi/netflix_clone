import styled from "styled-components";
import logo from "../../img/logo.png";
import { AiOutlineSearch, AiOutlineInfoCircle } from "react-icons/ai";
import { IoCaretForward } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import CustomLink from "../projects/CustomLink";
import Movies from "../projects/Movies";

function Browse() {
  const [searchActive, setSearchActive] = useState();
  const [isMovieActive, setIsMovieActive] = useState(true);
  const [backFilm, setBackFilm] = useState();
  const [logoFilm, setLogoFilm] = useState();
  const [descFilm, setDescFilm] = useState();
  const searchInput = useRef();

  useEffect(() => {

    setTimeout(() => {
        setIsMovieActive(false)
    }, 6000)

    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR&sort_by=popularity.desc&include_video=true&page=1&with_companies=Netflix",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        fetch(
          `https://api.themoviedb.org/3/movie/${data.results[7].id}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {

            setDescFilm(data.overview);

            fetch(
              `http://webservice.fanart.tv/v3/movies/${data.imdb_id}?api_key=fb26894399d04645e541fadc9bb46a81`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                setLogoFilm(data.hdmovielogo[0].url);
                setBackFilm(data.moviebackground[0].url);
              });
          });
      });
  }, []);

  return (
    <BrowseContainer>
      <BrowseHeader>
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
          />
        </Search>
      </BrowseHeader>
      <PrincipalMovie>
        <img src={backFilm} />
        <ToBottom />
        <MovieInfo active={isMovieActive}>
          <img src={logoFilm} />
          <p>{descFilm}</p>
          <Buttons>
            <button>
              <IoCaretForward /> Assistir
            </button>
            <button>
              <AiOutlineInfoCircle /> Mais informações
            </button>
          </Buttons>
        </MovieInfo>
      </PrincipalMovie>
      <Movies sort={'popularity.desc'} title={'Em destaque'}/>
    </BrowseContainer>
  );
}

const PrincipalMovie = styled.div`
  width: 100%;
  height: 100vh;

  img {
    width: 100%;
  }

  iframe{
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;

  button {
    padding: 10px 20px;
    background: white;
    border-radius: 6px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    *:first-child {
      width: 30px;
      height: 30px;
    }
  }

  button:last-child {
    background: #99999999;
    color: white;
  }
`;

const MovieInfo = styled.div`
  position: absolute;
  left: 0px;
  top: 200px;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 0;

  img {
    width: 40%;
    position: relative;
    transition: 0.8s;
    transform: ${props => props.active ? 'none' : 'scale(0.8)'};
    left: ${props => props.active ? '0' : '-5%'};
    top: ${props => props.active ? '0' : '150px'};
  }

  p {
    color: white;
    text-shadow: 0px 2px 5px black;
    width: 40%;
    font-size: 1.3rem;
    transition: 0.4s;
    opacity: ${props => props.active ? '1' : '0'};
  }
`;

const ToBottom = styled.div`
    width: 100%;
    height: 70px;
    position: absolute;
    background-image: linear-gradient(to bottom, #14141400, #141414);
    z-index: 0;
    top: 106%;
`

const BrowseContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #141414;
`;

const BrowseHeader = styled.div`
  background-image: linear-gradient(to bottom, #000, #00000000);
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  position: fixed;
  z-index: 1;
  top: 0;
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

export default Browse;
