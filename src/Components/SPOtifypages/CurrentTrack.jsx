import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateprovider } from "../../utils/Stateprovider";
import axios from "axios";
import { Action } from "../../utils/constants/Actiontype.ts";

export default function CurrentTrack() {
  const [{ token, Currentlyplaying }, dispatch] = useStateprovider();
  useEffect(() => {
    const getCurrentTrack = () => {
      axios
        .get("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          //   console.log(item);
          const { item } = data;
          if (data) {
            const Currentlyplaying = {
              id: item.id,
              name: item.name,
              artists: item.artists.map((artist) => artist.name),
              image: item.album.images[2].url,
            };
            dispatch({ type: Action.Set_PLAYING, Currentlyplaying });
          }
        })
        .catch((err) => {});
    };
    getCurrentTrack();
  }, [token, dispatch, Currentlyplaying]);
  return (
    <Container>
      {Currentlyplaying && (
        <div className="track">
          <div className="track_img">
            <img src={Currentlyplaying?.image} alt={Currentlyplaying?.name} />
          </div>
          <div
            className="track_info"
            style={{ bottom: "5px", position: "relative" }}
          >
            <h4 style={{ margin: 0 }}> {Currentlyplaying.name} </h4>
            <h6 style={{ margin: 0 }}>
              {Currentlyplaying?.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;
