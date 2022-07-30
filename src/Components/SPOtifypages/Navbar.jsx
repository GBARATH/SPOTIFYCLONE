import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateprovider } from "../../utils/Stateprovider";

export default function Navbar({ navbg }) {
  const [{ userinfo }] = useStateprovider();
  // console.log(userinfo);
  // console.log(navbg)
  return (
    <Container navbg={navbg}>
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs Or podcasts" />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{userinfo?.username}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navbg }) => navbg ? "rgba(0,0,0,.7)" : "none"};
  .search_bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }

  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;

      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
