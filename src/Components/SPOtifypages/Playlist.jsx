import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Action } from "../../utils/constants/Actiontype.ts";
import { useStateprovider } from "../../utils/Stateprovider";
import styled from "styled-components";

export default function Playlist() {
  const [{ token, playlists }, dispatch] = useStateprovider();
  //   console.log(playlists);
  //   console.log(token);
  useEffect(() => {
    const getplaylistdata = () => {
      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then(({ data: { items } }) => {
          //   console.log(items);
          const playlists = items.map(({ name, id }) => {
            return { name, id };
          });
          dispatch({ type: Action.Setpalylists, playlists });
        })
        .catch((err) => {});
    };
    getplaylistdata();
  }, [token,dispatch]);

  const Changecurentplaylist = (selectedplaylistid) => {
    dispatch({ type: Action.SetpalylistId, selectedplaylistid });
  };
  return (
    <Container>
      <ul className="P_ul">
        {playlists.map(({ name, id }) => {
          return (
            <li
              className="P_li"
              onClick={() => Changecurentplaylist(id)}
              key={id}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
`;
