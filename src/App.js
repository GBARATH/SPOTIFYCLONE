import React, { useEffect } from "react";
import Login from "./Components/Authorization/Login.jsx";
import { useStateprovider } from "./utils/Stateprovider";
import { Action } from "./utils/constants/Actiontype.ts";
import Spotify from "./Components/Spotify.jsx";

export default function App() {
  const [{ token }, dispatch] = useStateprovider();

  useEffect(() => {
    try {
      let token = window.location?.hash
        ?.substring(1)
        .split("&")[0]
        .split("=")[1];
      // console.table(token);

      if (token) dispatch({ type: Action.Settoken, token: token });
    } catch (error) {
      console.log(error);
    }
  }, [token, dispatch]);

  return <div>{token ? <Spotify /> : <Login />}</div>;
}
