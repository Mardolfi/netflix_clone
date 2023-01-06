import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ActorCard({ actorId }) {
  const [image, setImage] = useState();
  const [loadingActive, setLoadingActive] = useState();
  const navigate = useNavigate();

  function activeMovie() {
    navigate(`/actor/${actorId}`)
  }

  useEffect(() => {
    setLoadingActive(true);

    fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=b15859993b7efb96feb59a2bc9c249e5&language=pt-BR`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setImage(`https://image.tmdb.org/t/p/original/${data.profile_path}`)
        setLoadingActive(false)
      });
  }, []);

  return (
    <>
      {image && (
        <MovieContainer onClick={activeMovie} image={image}>
          {loadingActive ? <LoadingContainer /> : (
            <>
            <div></div>
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

  div {
    width: 150px;
    height: 100%;
    border-radius: 4px;
    background: ${props => `url(${props.image}) no-repeat center`};
    background-size: cover;
  }
`;

const LoadingContainer = styled.div`
  width: inherit;
  height: inherit;
  background-image: linear-gradient(to bottom, #333, #666);
  border-radius: 4px;
`;

export default ActorCard;
