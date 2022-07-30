import React from "react";
import styled from "styled-components";
import { useStateprovider } from "../../utils/Stateprovider";
import axios from "axios";

export default function Volume() {
  const [{ token }] = useStateprovider();

  // https://api.spotify.com/v1/me/player/volum

  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          volume_percent: parseInt(e.target.value),
        },
      }
    );
  };
  return (
    <Container>
      <input
        style={{color:"inherit",cursor:"pointer"}}
        type="range"
        min={0}
        max={100}
        onChange={(e) => {
          setVolume(e);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
