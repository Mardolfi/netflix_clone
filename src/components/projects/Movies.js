import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForward } from "react-icons/io5";
import MovieCard from "./MovieCard";

function Movies({ sort, title }) {
  const [movies, setMovies] = useState();
  const container = useRef();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR&sort_by=${sort}&page=1&with_companies=Netflix`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  function backMovies() {
    const movieCards = Array.from(container.current.children)
    const lastMovieCard = movieCards[movieCards.length - 5]
    container.current.insertBefore(lastMovieCard, movieCards[0])
  }

  function nextMovies() {
    const movieCards = Array.from(container.current.children)
    container.current.appendChild(movieCards[0])
  }

  return (
    <Container>
      <Title>
        <h2>{title}</h2>
      </Title>
      <MoviesContainer ref={container}>
        {movies?.map((movie) => (
          <MovieCard movieId={movie.id} key={movie.id} />
        ))}
        <ToLeft />
        <ToRight />
        <Left onClick={backMovies}>
          <button>
            <IoCaretBack />
          </button>
        </Left>
        <Right onClick={nextMovies}>
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
  overflow: hidden;
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
`

const ToRight = styled.div`
    height: 240px;
    width: 160px;
    position: absolute;
    background-image: linear-gradient(to right, #14141400, #141414);
    z-index: 0;
    right: 0px;
`

const Title = styled.div`
  padding: 0px 50px;
  color: white;
`;

export default Movies;
