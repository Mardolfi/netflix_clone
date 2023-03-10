import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForward } from "react-icons/io5";
import {MdNavigateNext} from 'react-icons/md'
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

function Movies({ sort, title, type, page, genre }) {
  const [movies, setMovies] = useState();
  const [isActive, setIsActive] = useState();
  const container = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/${type}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR&sort_by=${sort}&page=${page}&with_companies=Netflix&with_networks=Netflix&with_original_language=en&with_genres=${genre}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  function backMovies() {
    const movieCards = Array.from(container.current.children);
    const lastMovieCard = movieCards[movieCards.length - 5];
    container.current.insertBefore(lastMovieCard, movieCards[0]);
  }

  function nextMovies() {
    const movieCards = Array.from(container.current.children);
    container.current.appendChild(movieCards[0]);
  }

  function sectionNavigate() {
    navigate(`/section/${type}/${genre || sort}`)
  }

  return (
    <Container>
      <Title onClick={sectionNavigate}>
        <h2>{title}</h2>
        <p>Ver tudo</p>
        <MdNavigateNext />
      </Title>
      <MoviesContainer
        ref={container}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        {movies?.map((movie, index) => (
          <MovieCard
            movieId={movie.id}
            key={movie.id}
            type={type}
            sort={sort}
            page={page}
            index={index}
            genre={genre}
          />
        ))}
        <ToLeft />
        <ToRight />
        <Left onClick={backMovies} active={isActive}>
          <button>
            <IoCaretBack />
          </button>
        </Left>
        <Right onClick={nextMovies} active={isActive}>
          <button>
            <IoCaretForward />
          </button>
        </Right>
      </MoviesContainer>
    </Container>
  );
}

const Right = styled.div`
  position: absolute;
  z-index: 3;
  justify-content: center;
  align-items: center;
  right: -10px;
  opacity: ${(props) => (props.active ? "1" : "0")};

  button {
    height: 240px;
    cursor: pointer;
    border: none;
    color: white;
    background: none;

    * {
      width: 70px;
      height: 70px;
    }
  }
`;

const Left = styled.div`
  position: absolute;
  z-index: 3;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  opacity: ${(props) => (props.active ? "1" : "0")};

  button {
    height: 240px;
    padding: 0 20px;
    cursor: pointer;
    border: none;
    color: white;
    background: none;

    * {
      width: 70px;
      height: 70px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  z-index: 1;
`;

const MoviesContainer = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;

  *:first-child {
    margin-left: -9%;
  }
`;

const ToLeft = styled.div`
  height: 240px;
  width: 160px;
  position: absolute;
  background-image: linear-gradient(to left, #14141400, #141414);
  z-index: 0;
  left: 0px;
`;

const ToRight = styled.div`
  height: 240px;
  width: 160px;
  position: absolute;
  background-image: linear-gradient(to right, #14141400, #141414);
  z-index: 0;
  right: 0px;
`;

const Title = styled.div`
  padding: 0px 50px;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;

  h2:hover ~ p{
    opacity: 1;
    transform: translateX(10px);
  }

  h2:hover ~ *:nth-child(3){
    opacity: 1;
    transform: translateX(10px);
  }

  p{
    opacity: 0;
    transform: translateX(-10px);
    color: #54B9AE;
    font-weight: 600;
    font-size: 0.9rem;
    transition: 0.3s;
  }

  *:nth-child(3){
    transform: translateX(-50px);
    opacity: 0;
    transition: 0.3s;
    color: #54B9AE;
    width: 25px;
    height: 25px;
  }
`;

export default Movies;
