import React, { useEffect, useRef } from "react";
import Sidebar from "./SPOtifypages/Sidebar";
import styled from "styled-components";
import Navbar from "./SPOtifypages/Navbar.jsx";
import Spotifybody from "./SPOtifypages/Spotifybody";
import Spotifyfooter from "./SPOtifypages/Spotifyfotter";
import "./Spotify.css";
import axios from "axios";
import { useStateprovider } from "../utils/Stateprovider";
import { Action } from "../utils/constants/Actiontype.ts";
import { useState } from "react";

export default function Spotify() {
  const [{ token }, dispatch] = useStateprovider();
  const [navbg, setnavbg] = useState(false);
  const [headerbg, setheaderbg] = useState(false);
  const bodyref = useRef();

  const bodyscroll = () => {
    bodyref.current.scrollTop >= 30 ? setnavbg(true) : setnavbg(false);
    bodyref.current.scrollTop >= 268 ? setheaderbg(true) : setheaderbg(false);
    // console.log(bodyref.current.scrollTop)
  };

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        // console.log(data);
        const userinfo = {
          userid: data.id,
          username: data.display_name,
        };
        dispatch({ type: Action.Setuserinfo, userinfo });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        window.history.pushState({}, null, "/");
      });
  }, [token, dispatch]);

  return (
    <Container>
      <div className="spotify_body">
        <Sidebar></Sidebar>
        <div className="body" ref={bodyref} onScroll={bodyscroll}>
          <Navbar navbg={navbg}></Navbar>
          <div className="body_contents">
            <Spotifybody headerbg={headerbg}></Spotifybody>
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Spotifyfooter></Spotifyfooter>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 35vh;
  .spotify_body {
    .body {
      &::-webkit-scrollbar {
        width: 0.5rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
