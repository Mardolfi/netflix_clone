import styled from "styled-components";
import logo from "../../img/logo.png";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiGlobalFill } from "react-icons/ri";
import { HiOutlineX } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useEffect, useState } from "react";
import CustomLink from "../projects/CustomLink";
import loading from "../../img/loading.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iframe from "react-iframe";
import ActorCard from "../projects/ActorCard";

function Browse() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const { id } = useParams();

  const [categories, setCategories] = useState();
  const [isLoadingActive, setIsLoadingActive] = useState();
  const [IMDB, setIMDB] = useState();
  const [genres, setGenres] = useState();
  const [runtime, setRuntime] = useState();
  const [director, setDirector] = useState();
  const [premiere, setPremiere] = useState();
  const [nameFilm, setNameFilm] = useState();
  const [video, setVideo] = useState();
  const [backFilm, setBackFilm] = useState();
  const [logoFilm, setLogoFilm] = useState();
  const [descFilm, setDescFilm] = useState();
  const [actors, setActors] = useState();
  const [activeHeader, setActiveHeader] = useState(false);

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
    setIsLoadingActive(true);

    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setActors(Array.from(data.cast).slice(0, 3)));

    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setNameFilm(type == "movie" ? data.title : data.name);
        setDescFilm(data.overview);
        setIMDB(type == "movie" ? data.imdb_id : "");
        setGenres(data.genres);
        setRuntime(
          type == "movie"
            ? data.runtime + "s"
            : data.seasons.length + " seasons"
        );
        setDirector(
          type == "movie"
            ? data.production_companies[0].name
            : data.networks[0].name
        );
        setPremiere(type == "movie" ? data.release_date : data.first_air_date);

        fetch(
          `https://api.themoviedb.org/3/${type}/${data.id}/videos?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.results.length > 0) {
              setVideo(`https://www.youtube.com/embed/${data.results[0].key}`);
            } else {
              setVideo(false);
            }
          });

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
              if (data.status == "error") {
                tryAgain();
                return;
              } else {
                const isHaveBackground = Object.keys(data);

                if (isHaveBackground.includes("hdmovielogo")) {
                  setLogoFilm(
                    data.hdmovielogo[0].url
                  );
                } else {
                  setLogoFilm(false);
                }

                if (isHaveBackground.includes("moviebackground")) {
                  setBackFilm(
                    data.moviebackground[data.moviebackground.length - 1].url
                  );
                  setIsLoadingActive(false);
                } else if (isHaveBackground.includes("movieposter")) {
                  setBackFilm(
                    data.movieposter[data.movieposter.length - 1].url
                  );
                  setIsLoadingActive(false);
                } else {
                  tryAgain();
                }
              }
            });
        } else {
          setIMDB(
            `https://thetvdb.com/series/${String(
              data.original_name
            ).toLowerCase()}`
          );
          fetch(
            `https://api.tvmaze.com/singlesearch/shows?q=${String(
              data.original_name
            ).toLowerCase()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (!data) {
                tryAgain();
              }
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
                  if (data.status == "error") {
                    tryAgain();
                    return;
                  } else {
                    const isHaveBackground = Object.keys(data);

                    if (isHaveBackground.includes("hdtvlogo")) {
                      setLogoFilm(data.hdtvlogo[0].url);
                    } else {
                      setLogoFilm(false);
                    }

                    if (isHaveBackground.includes("showbackground")) {
                      setBackFilm(
                        data.showbackground[data.showbackground.length - 1].url
                      );
                      setIsLoadingActive(false);
                    } else if (isHaveBackground.includes("tvthumb")) {
                      setBackFilm(data.tvthumb[data.tvthumb.length - 1].url);
                      setIsLoadingActive(false);
                    } else {
                      tryAgain();
                    }
                  }
                });
            });
        }
      });
  }, [type]);

  function tryAgain() {
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.backdrop_path) {
          setBackFilm(
            `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
          );
        } else {
          setBackFilm(
            `https://image.tmdb.org/t/p/original/${data.poster_path}`
          );
        }
        setIsLoadingActive(false);
      });
  }

  function backPage() {
    navigate(`/browse/${type}`);
  }

  window.addEventListener("scroll", (e) => {
    if (e.path[1].scrollY >= 500) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  });

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
            <Back onClick={backPage}>
              <HiOutlineX />
            </Back>
          </BrowseHeader>
          <PrincipalMovie>
            <Lines>
              <LineLeft></LineLeft>
              <div>
                <div>
                  <p>PREMIERE</p>
                  <p>{premiere}</p>
                  <p>DIRECTOR</p>
                  <p>{director}</p>
                  {type == 'movie' ? <p>RUNTIME</p> : <p>SEASONS</p>}
                  <p>{runtime}</p>
                  <p>GENRE</p>
                  <p>
                    {genres?.map((genre) => (
                      <CustomLink
                        to={`/genre/${type}/${genre.id}`}
                        key={genre.id}
                      >
                        {`${genre.name} `} 
                      </CustomLink>
                    ))}
                  </p>
                  {video && (
                    <Iframe url={video} frameBorder={0} allowFullScreen={1} />
                  )}
                </div>
              </div>
            </Lines>
            <img src={backFilm} />
            <ToBottom />
            <MovieInfo>
              {logoFilm ? <img src={logoFilm} /> : <h1>{nameFilm}</h1>}
              <p>{descFilm}</p>
              <Buttons>
                <a
                  href={
                    type == "movie"
                      ? `https://www.imdb.com/title/${IMDB}/`
                      : IMDB
                  }
                >
                  <AiOutlineInfoCircle /> Mais informações
                </a>
              </Buttons>
              <ActorsContainer>
                <Title onClick={() => navigate(`/actors/${type}/${id}`)}>
                  <h2>Actors</h2>
                  <p>Ver tudo</p>
                  <MdNavigateNext />
                </Title>
                <Actors>
                  {actors &&
                    actors.map((actor) => (
                      <ActorCard
                        actorImage={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                        actorId={actor.id}
                        key={actor.id}
                      />
                    ))}
                </Actors>
              </ActorsContainer>
            </MovieInfo>
          </PrincipalMovie>
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

const ActorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  max-width: 500px;
`;

const Actors = styled.div`
  display: flex;
  gap: 10px;
`;

const Lines = styled.div`
  width: 100%;
  position: absolute;
  top: -40px;

  div:nth-of-type(2) {
    height: 120vh;
    position: absolute;
    right: 0px;
    width: 320px;
    border-left: 1px solid #999;

    div:nth-of-type(1) {
      height: 1px;
      width: 100%;
      background: #999;
      position: absolute;
      top: 120px;
      display: flex;
      flex-direction: column;
      gap: 30px;

      iframe {
        position: absolute;
        top: 450px;
        width: 100%;
        height: 200px;
      }

      p {
        text-shadow: 0px 3px 8px #000;
      }

      p:nth-child(1) {
        color: #eee;
        font-weight: bolder;
        font-size: 1.1rem;
        position: absolute;
        letter-spacing: 2px;
        left: 30px;
        top: 70px;
      }

      p:nth-child(2) {
        color: #fff;
        font-size: 1.1rem;
        position: absolute;
        left: 30px;
        top: 100px;
      }

      p:nth-child(3) {
        color: #eee;
        font-weight: bolder;
        font-size: 1.1rem;
        position: absolute;
        letter-spacing: 2px;
        left: 30px;
        top: 170px;
      }

      p:nth-child(4) {
        color: #fff;
        font-size: 1.1rem;
        position: absolute;
        left: 30px;
        top: 200px;
      }

      p:nth-child(5) {
        color: #eee;
        font-weight: bolder;
        font-size: 1.1rem;
        position: absolute;
        letter-spacing: 2px;
        left: 30px;
        top: 270px;
      }

      p:nth-child(6) {
        color: #fff;
        font-size: 1.1rem;
        position: absolute;
        left: 30px;
        top: 300px;
      }

      p:nth-child(7) {
        color: #eee;
        font-weight: bolder;
        font-size: 1.1rem;
        position: absolute;
        letter-spacing: 2px;
        left: 30px;
        top: 370px;
      }

      p:nth-child(8) {
        color: #fff;
        font-size: 1.1rem;
        position: absolute;
        z-index: 1;
        left: 30px;
        top: 350px;
      }
    }
  }
`;

const Title = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;

  h2{
    text-shadow: 0px 2px 10px black;
  }

  p {
    color: #54b9ae;
    text-shadow: none;
    width: 100%;
    font-size: 0.9rem;
    transition: 0.3s;
    opacity: 0;
    pointer-events: all;
  }

  h2:hover ~ p {
    opacity: 1 !important;
    transform: translateX(10px);
  }

  h2:hover ~ *:nth-child(3) {
    opacity: 1;
    transform: translateX(-70px);
  }

  p {
    opacity: 0 !important;
    transform: translateX(-10px);
    color: #54b9ae !important;
    font-weight: 600;
    font-size: 0.9rem !important;
    transition: 0.3s;
  }

  *:nth-child(3) {
    transform: translateX(-100px);
    opacity: 0;
    transition: 0.3s;
    color: #54b9ae;
    width: 25px;
    height: 25px;
  }
`;

const LineLeft = styled.div`
  height: 120vh;
  position: absolute;
  left: 60px;
  width: 1px;
  background: #999;
`;

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

const PrincipalMovie = styled.div`
  width: 100%;
  height: 115vh;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;

  a {
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
    text-decoration: none;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    *:first-child {
      width: 30px;
      height: 30px;
    }
  }

  a:last-child {
    background: #99999999;
    color: white;
  }
`;

const MovieInfo = styled.div`
  position: absolute;
  left: 0px;
  top: 100px;
  padding: 0 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 0;

  h1 {
    font-size: 5rem;
    color: white;
  }

  img {
    width: 20%;
    position: relative;
    transition: 0.8s;
  }

  p {
    color: white;
    text-shadow: 0px 2px 5px black;
    width: 30%;
    font-size: 1.3rem;
    transition: 0.4s;
    opacity: 1;
    pointer-events: all;
    max-height: 200px;
    overflow: hidden;
  }
`;

const ToBottom = styled.div`
  width: 100%;
  height: 70px;
  position: absolute;
  background-image: linear-gradient(to bottom, #14141400, #141414);
  z-index: 1;
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
  background-color: #141414;
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

const Back = styled.div`
  color: white;
  background: #141414;
  border-radius: 50%;
  margin-top: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  padding: 10px;
  gap: 10px;

  *:first-child {
    width: 25px;
    height: 25px;
  }
`;

export default Browse;
