import React from "react";
import Styled from "styled-components";
import spotifyimg from "./images/spotify.png";

// styles for styled components in liabary npm install  styled-components

export default function Login() {
  const handleClick = () => {
    // console.log("click")
    const clientId = "839af177377a44cdaadf734a31878b29";
    const redirecturl = "http://localhost:3000";
    const Apiurl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];
    window.location.href = `${Apiurl}?client_id=${clientId}&redirect_uri=${redirecturl}&scope=${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  };
  return (
    <Container>
      <img src={spotifyimg} alt="Spotify" />
      <button onClick={handleClick}> Login Spotify</button>
    </Container>
  );
}

const Container = Styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #1db954;
    gap: 5rem;
img{
     height: 20vh;
 }
 button{
     padding: 1rem 5rem;
     border-radius:5rem ;
     border: none;
     color:#49f585 ;
     background-color: black;
     font-size: 1.4rem;
     cursor: pointer;
 }`;
