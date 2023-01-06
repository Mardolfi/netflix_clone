import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ActorCard({ actorId }) {
  const [image, setImage] = useState();
  const [loadingActive, setLoadingActive] = useState();

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
        if(data.profile_path){
          setImage(`https://image.tmdb.org/t/p/original/${data.profile_path}`)
        } else {
          if(data.gender == 2){
            setImage('https://apanvolei.jv203.net/wp-content/uploads/sites/925/2020/10/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg')
          } else {
            setImage('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwsQEg8NEQ0SDhAPDQ4QDw8NCg8QDQ0QFBEWGBUSFRUYHSggGBolGxMTITEhJSkrMC4uFx8zODMsNygtLisBCgoKDQ0OFRAQFSsfFR0rKy0rLSstLTctLS0rKy0rLS0tKy0tKy0rNy0tLS03LS0tKzcrLS03LSs3KysrKystK//AABEIANkA6AMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADAQAQEAAQIDBgQGAwEBAAAAAAABAgMRBAUhEjFBUWGBInGxwTIzUnKRoUKCktEj/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABoRAQEAAwEBAAAAAAAAAAAAAAABAhExEiH/2gAMAwEAAhEDEQA/AP0zU1Msrcrd7WIOjiAAAAAAAAAAAAAAAAAAAAAAAAAAy09TLGzKXawYguwAQAAAAAAAAB6aOhln3T38IK82WOnle7G32dHR4TDHv+K+d7v4bCbXy4+WjnOtxs9mDtsLo4X/ABn/ADDZ5ccdPW4TCzpOzfDbuc3PGy2XvipZpABAAAAAAAAAAAQBRAFEAUQBRG1wWh2r2r3T+6KvC8Jcviy6T+66GMk6TpFGW5NAAAADX4vh+1N5+Kd3r6NgBxBu8fof5z/b/wBaLTFUQEUQBRAFEAURQQQBRAFEAUQBlhjbZJ327Oxp4TGTGeEaPLtPe3Ly6T5uglbxUQZVRAFEAUQAs36VyNfSuN2vtfOOu8eK0e3j6zrFiWOUINMKIAogCiAKIADEUZDEBkMQGSIz0sd7J52RB1eDw7OE9et93sQZdAAAAAAAAAAHM4/T7OW/hl19/FrOlzHDfHf9N/py2oxWQxFRkMQGQxAZDEARAFViAyGIDJscBjvnPTe/01W7yyfFf2/dKTrpgMOgAoAAAAAAAAmUlll8ejh5za2eVsdvUy2lvlLXCtWM5KMRplkMQFViAyRAAYgjIYgMhiAyb3Kp1y+Uc90uU2bZ+e8StTroCDLaiAKIAogCiAKIA8eNz2wy9ZtPdxm5zTV3sw8JN7860WoxlfrIYisshiAyGICqxUGIgCiAKIArocp78vlHOdfleG2G/wCq2/ZKuPW4Ay6AAAAAAAAAAOLx/wCZl7fRrtrmc2z+eMrUbjneqICKIAogCqxAQQBRAFEAV2uXX/54+/1cR1uUZ742eWX1iVcet4Bl0AAAAAAAAAAc3m+PXHL0sc50Ob6k+HH3rnNTjneqIKiiAKIAogCCbm6oom5uCibm4K3OVa0xy7N/ym3u0t2xw3CamfWTafqv2SrHeGOE2km++0nXzVh1UQBRAFEAUQBUu/h3+G/cAOBxM1O1e3Nsr/Hs8t30WeGOXSyWesaHEcsl64Xa+VvRqVi4uYLqYZY3aza+rHdphRNzcFE3NwVDcBiIAohuCvXh9DPO7Yz53wj24HgrqfFemP8AeXydnT08cZ2ZNpGbWpjtrcNy/Tx63476zpPZuIMtqICqIAogCiAKIAogCiAJljjelks9Zu0eI5ZheuF7N8r+FvhtLNvnNXSywvZym1+rB9DxGhjnOzfa+McHiNHLDK432vhZ5ty7c7NMBNxUVWICCAK3eXcH272svwy/9XyaenjcrMZ32yPpdLTmMmM7pNktaxm1kk6TooMOgAAAAAAAAAAAAAAAAAA0+Z6EywuXjj1ny8Y3Es8FSvmNw1MdrcfK2I25KIgAgI3eU6e+pL+mW/b7u65XI8Px5fKOqxl11x4ogjSiAKgAogCiAKIAogAACiAKIAogD5/mWG2pl67X+Ws3+d4/HjfPD6Wue6TjjeqgghZZ0vSzpZfBG5zn8/V/dPo0yLXc5LPgt88q6DQ5N+X/AL5fZvsXrpOACNAAAAAAAAgAKAAAAACAAoADlc9x6YX1sch2uefhx/d9nFbnHLLqyW9J1t6STxG5yX87T+f2EuWlxx2//9k=')
          }
        }
        setLoadingActive(false)
      });
  }, []);

  return (
    <>
      {image && (
        <MovieContainer image={image}>
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
