import React from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useEffect } from "react";
import { useStateprovider } from "../../utils/Stateprovider";
import axios from "axios";
import { Action } from "../../utils/constants/Actiontype.ts";

export default function Spotifybody({ headerbg }) {
  const [{ token, selectedplaylistid, selectedplaylist }, dispatch] =
    useStateprovider();
  // console.table(selectedplaylist);
  const mstosec = (ms) => {
    let mint = Math.floor(ms / 60000);
    let sec = ((ms % 60000) / 1000).toFixed(0);
    return `${mint}:${sec < 10 ? "0" : ""}${sec}`;
  };
  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${selectedplaylistid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        // console.table(data);
        const selectedplaylist = {
          id: data.id,
          name: data.name,
          description: data.description.startsWith("<a")
            ? ""
            : data.description,
          image: data.images[0].url,
          tracks: data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album?.images[2].url,
            duratation: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };

        // console.log(selectedplaylist,"djlsddlshkehsdkhrekki")
        dispatch({ type: Action.Set_PLAYLIST, selectedplaylist });
      })
      .catch((err) => console.log(err));
  }, [token, dispatch, selectedplaylistid]);
  const playtrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    axios
      .put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(({data}) => {
        console.log(data)
        const Currentlyplaying = {
          id,
          name,
          image,
          artists,
        };
        dispatch({ type: Action.Set_PLAYING, Currentlyplaying });
        dispatch({ type: Action.Set_PLAYERSTATE, playerState: true });
      });

  };
  return (
    <Container headerbg={headerbg}>
      {selectedplaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedplaylist.image} alt="selectedplaylist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title"> {selectedplaylist.name} </h1>
              <p className="description">{selectedplaylist?.description} </p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span></span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUMS</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedplaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duratation,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      style={{ cursor: "pointer" }}
                      title={name}
                      className="row"
                      key={id}
                      onClick={() =>
                        playtrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{mstosec(duratation)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25), 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header_row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerbg }) => (headerbg ? "#000000dc" : "none")};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
