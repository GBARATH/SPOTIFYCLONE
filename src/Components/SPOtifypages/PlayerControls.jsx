import React from "react";
import styled from "styled-components";
import {
  BsPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateprovider } from "../../utils/Stateprovider";
import axios from "axios";
import { Action } from "../../utils/constants/Actiontype.ts";

export default function PlayerControls() {
  // eslint-disable-next-line
  const [{ token, playerState, Currentlyplaying }, dispatch] =
    useStateprovider();
  // playerState
  //   console.log(token)

  const ChangeTrack = (type) => {
    axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        const { item } = data;
        if (data) {
          const Currentlyplaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url,
          };
          dispatch({ type: Action.Set_PLAYING, Currentlyplaying });
        } else {
          dispatch({ type: Action.Set_PLAYING, Currentlyplaying: null });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Changeplaystate = () => {
    try {
      const state = playerState ? "pause" : "play";
      // eslint-disable-next-line
      const playpause = axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: Action.Set_PLAYERSTATE, playerState: !playerState });
    } catch (error) {
      console.log(error, error.name);
    }
  };
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => ChangeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={Changeplaystate} />
        ) : (
          <BsPlayCircleFill onClick={Changeplaystate} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => ChangeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.3s ease-in-out;
    &:hover {
      color: white;
      cursor: pointer;
    }
    .state {
      svg {
        color: white;
      }
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
