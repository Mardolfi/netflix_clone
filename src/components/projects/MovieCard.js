import { useEffect, useState } from "react";
import styled from "styled-components";

function MovieCard({ movieId }) {
  const [image, setImage] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if(data.poster_path){
          setImage(`https://image.tmdb.org/t/p/original/${data.poster_path ?? ''}`);
        } else {
          setImage(false)
        }
      });
  }, []);

  return (
    <>
      {image && (
        <MovieContainer>
          <img src={image} />
        </MovieContainer>
      )}
    </>
  );
}

const MovieContainer = styled.div`
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 150px;
    height: 240px;
    border-radius: 4px;
  }
`;

export default MovieCard;
