import styled from "styled-components";
import logo from "../../img/logo.png";
import { AiOutlineSearch, AiOutlineInfoCircle } from "react-icons/ai";
import { RiGlobalFill } from "react-icons/ri";
import { IoCaretForward } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import CustomLink from "../projects/CustomLink";
import Movies from "../projects/Movies";
import loading from "../../img/loading.svg";
import { useNavigate, useParams } from "react-router-dom";

function Browse() {
  const navigate = useNavigate();
  const { type } = useParams();

  const [searchActive, setSearchActive] = useState();
  const [isMovieActive, setIsMovieActive] = useState(true);
  const [categories, setCategories] = useState();
  const [isLoadingActive, setIsLoadingActive] = useState();
  const [backFilm, setBackFilm] = useState();
  const [logoFilm, setLogoFilm] = useState();
  const [descFilm, setDescFilm] = useState();
  const [idFilm, setIdFilm] = useState();
  const [activeHeader, setActiveHeader] = useState(false);
  const searchInput = useRef();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCategories(data.genres));
  }, [type]);

  useEffect(() => {
    setIsMovieActive(true);
    setIsLoadingActive(true);

    setTimeout(() => {
      setIsMovieActive(false);
    }, 6000);

    fetch(
      `https://api.themoviedb.org/3/discover/${type}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR&sort_by=popularity.desc&include_video=true&page=1&with_companies=Netflix`,
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
          `https://api.themoviedb.org/3/${type}/${
            data.results[type == "movie" ? 0 : 0].id
          }?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
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
            setIdFilm(data.id)

            if (type == "movie") {
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

                  setIsLoadingActive(false);
                });
            } else {
              fetch(
                `https://api.tvmaze.com/singlesearch/shows?q=${data.original_name}`,
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
                    `http://webservice.fanart.tv/v3/tv/${data.externals.thetvdb}?api_key=fb26894399d04645e541fadc9bb46a81`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setLogoFilm(data.hdtvlogo[1].url);
                      setBackFilm(data.showbackground[0].url);

                      setIsLoadingActive(false);
                    });
                });
            }
          });
      });
  }, [type]);

  function searchMovie(query) {
    navigate(`/search?q=${query}/${type}`);
  }

  window.addEventListener("scroll", (e) => {
    if (e.path[1].scrollY >= 500) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  });

  function getFilm() {
    navigate(`/${type}/${idFilm}`)
  }

  return (
    <>
      {isLoadingActive ? (
        <LoadingContainer>
          <img src={loading} />
        </LoadingContainer>
      ) : (
        <BrowseContainer>
          <BrowseHeader active={activeHeader}>
            <Links>
              <img src={logo} />
              <CustomLink to={"/browse/movie"}>Filmes</CustomLink>
              <CustomLink to={"/browse/tv"}>Séries</CustomLink>
              <Categories type={type}>
                Categorias
                <div>
                  {categories?.map((category) => (
                    <CustomLink
                      to={`/genre/${type}/${category.id}`}
                      key={category.id}
                    >
                      {category.name}
                    </CustomLink>
                  ))}
                </div>
              </Categories>
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
                <button onClick={() => getFilm()}>
                  <AiOutlineInfoCircle/> Mais informações
                </button>
              </Buttons>
            </MovieInfo>
          </PrincipalMovie>
          <MoviesContainer>
            <Movies
              sort={type == "movie" ? "popularity.desc" : "revenue.desc"}
              title={"Populares na Netflix"}
              type={type}
              page={type == "movie" ? 1 : 1}
            />
            <Movies
              sort={type == "movie" ? "revenue.desc" : "popularity.desc"}
              title={"Em alta"}
              type={type}
              page={type == "movie" ? 1 : 1}
            />
            <Movies
              sort={"popularity.desc"}
              title={"Pra fazer a família toda rir"}
              type={type}
              page={1}
              genre={35}
            />
            <Movies
              sort={"popularity.desc"}
              title={
                type == "movie" ? "Filmes românticos" : "Séries de policial"
              }
              type={type}
              page={1}
              genre={type == "movie" ? 10749 : 80}
            />
            <Movies
              sort={"popularity.desc"}
              title={"Drama"}
              type={type}
              page={1}
              genre={18}
            />
            <Movies
              sort={"popularity.desc"}
              title={"Documentários"}
              type={type}
              page={1}
              genre={99}
            />
            <Movies
              sort={"popularity.desc"}
              title={"Comédia"}
              type={type}
              page={2}
              genre={35}
            />
            <Movies
              sort={"popularity.desc"}
              title={"Animações para toda a família"}
              type={type}
              page={2}
              genre={type == "movie" ? 16 : 10762}
            />
          </MoviesContainer>
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
        </BrowseContainer>
      )}
    </>
  );
}

const Categories = styled.div`
  cursor: pointer;
  color: white;
  text-decoration: none;
  position: relative;
  top: 45px;
  font-size: 0.8rem;
  height: 20px;

  :hover div {
    display: flex;
  }

  div {
    background: #141414;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 200px;
    width: 100px;
    border-radius: 6px;
    top: 20px;
    overflow: auto;
    display: none;

    *:nth-child(1) {
      margin-top: ${(props) => (props.type == "movie" ? "490px" : "380px")};
    }

    * {
      width: 95%;
      padding: 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid #999;
    }
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #000, #141414);

  img {
    width: 100px;
    height: 100px;
  }
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PrincipalMovie = styled.div`
  width: 100%;
  height: 100vh;

  img {
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
    transform: ${(props) => (props.active ? "none" : "scale(0.8)")};
    left: ${(props) => (props.active ? "0" : "-5%")};
    top: ${(props) => (props.active ? "0" : "150px")};
  }

  p {
    color: white;
    text-shadow: 0px 2px 5px black;
    width: 40%;
    font-size: 1.3rem;
    transition: 0.4s;
    opacity: ${(props) => (props.active ? "1" : "0")};
    pointer-events: ${(props) => (props.active ? "all" : "none")};
  }
`;

const ToBottom = styled.div`
  width: 100%;
  height: 70px;
  position: absolute;
  background-image: linear-gradient(to bottom, #14141400, #141414);
  z-index: 0;
  top: 106%;
`;

const BrowseContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #141414;
`;

const BrowseHeader = styled.div`
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

export default Browse;
