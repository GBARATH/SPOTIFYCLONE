import React from "react";
import styled from "styled-components";
import logo from "./images/Logo.png";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlist from "./Playlist";

export default function Sidebar() {
  return (
    <Container>
      <div className="top_links">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Serach</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlist />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  dispaly: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
