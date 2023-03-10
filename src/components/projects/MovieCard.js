import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MovieCard({ movieId, type, sort, page, index, genre }) {
  const [image, setImage] = useState();
  const [loadingActive, setLoadingActive] = useState();
  const [filmId, setFilmId] = useState();
  const navigate = useNavigate();

  function activeMovie() {
    navigate(`/${type}/${filmId}`)
  }

  useEffect(() => {
    setLoadingActive(true);

    fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const isHavePosterPath = Object.keys(data);

        if (isHavePosterPath.includes("poster_path")) {
          if (data.poster_path !== null) {
            setImage(`https://image.tmdb.org/t/p/original/${data.poster_path}`);
            setLoadingActive(false);
            setFilmId(data.id)
          } else {
            tryAgain(page);
          }
        } else {
          tryAgain(page);
        }
      });
  }, []);

  function tryAgain(page) {
    fetch(
      `https://api.themoviedb.org/3/discover/${type}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR&sort_by=${sort}&page=${
        page + 1
      }&with_companies=Netflix&with_networks=Netflix&with_original_language=en&with_genres=${genre}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const isHavePosterPath = Object.keys(data.results[index]);

        if (isHavePosterPath.includes("poster_path")) {
          if (data.results[index].poster_path !== null) {
            setImage(
              `https://image.tmdb.org/t/p/original/${data.results[index].poster_path}`
            );
            setLoadingActive(false);
            setFilmId(data.results[index].id)
          } else {
            tryAgain(page + 1);
          }
        } else {
          tryAgain(page + 1);
        }
      });
  }

  return (
    <>
      {image && (
        <MovieContainer onClick={activeMovie}>
          {loadingActive ? <LoadingContainer /> : (
            <>
            <img src={image} />
            </>
          )}
        </MovieContainer>
      )}
    </>
  );
}

const MovieContainer = styled.div`
  cursor: pointer;
  transition: 0.3s;
  min-height: 240px;
  width: 150px;
  display: flex;

  :hover{
    transform: scale(1.05);
  }

  img {
    width: 150px;
    height: 240px;
    border-radius: 4px;
  }
`;

const LoadingContainer = styled.div`
  width: inherit;
  height: inherit;
  background-image: linear-gradient(to bottom, #333, #666);
  border-radius: 4px;
`;

export default MovieCard;
