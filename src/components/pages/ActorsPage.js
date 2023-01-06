import loading from "../../img/loading.svg";
import { useEffect, useRef, useState } from "react";
import logo from "../../img/logo.png";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import CustomLink from "../projects/CustomLink";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { RiGlobalFill } from "react-icons/ri";
import ActorCard from "../projects/ActorCard";

function Section() {
  const navigate = useNavigate();
  const { id, type } = useParams();

  const [activeHeader, setActiveHeader] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState();
  const [noActors, setNoActors] = useState(false);
  const [categories, setCategories] = useState();
  const searchActors = useRef();
  const [actors, setActors] = useState();

  window.addEventListener("scroll", (e) => {
    if (e.path[1].scrollY >= 200) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

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

  function backPage() {
    navigate(`/${type}/${id}`);
  }

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
      .then((data) => {
        if (data.cast.length > 0) {
          setIsLoadingActive(false);
          setActors(data.cast);
          setNoActors(false);
        } else {
          setIsLoadingActive(false);
          setNoActors(true);
        }
      });
  }, []);

  return (
    <SearchContainer>
      <SearchHeader active={activeHeader}>
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
      </SearchHeader>
      {isLoadingActive ? (
        <LoadingContainer>
          <img src={loading} />
        </LoadingContainer>
      ) : (
        <>
          {noActors ? (
            <NoActorsContainer>
              <AiOutlineInfoCircle />
              <h2>Não encontramos mais buscas!</h2>
            </NoActorsContainer>
          ) : (
            <>
              <SearchActors ref={searchActors}>
                {actors &&
                  actors?.map((actor) => (
                    <ActorCard actorId={actor.id} key={actor.id} type={type} />
                  ))}
              </SearchActors>
            </>
          )}
        </>
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

const Categories = styled.div`
  color: white;
  text-decoration: none;
  position: relative;
  cursor: pointer;
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

const SearchActors = styled.div`
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

const MoreActorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  button {
    padding: 2px 10px;
    color: white;
    background: black;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :hover {
      opacity: 0.8;
    }

    * {
      width: 40px;
      height: 40px;
    }
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

const NoMoreActorsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
  color: white;
  width: 100%;
  height: 100%;
  gap: 20px;

  *:first-child {
    width: 30px;
    height: 30px;
  }
`;

const NoActorsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
  color: white;
  width: 100%;
  height: 100vh;
  gap: 20px;

  *:first-child {
    width: 30px;
    height: 30px;
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

export default Section;
