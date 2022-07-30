// ____________________Action
import { Action } from "./constants/Actiontype.ts";

// arr[Math.floor(Math.random() * arr.length)]
// eslint-disable-next-line
const listsid = [
  "5HqyPLi4yJ6jh6JGB14BX0",
  "4rjGAJefLPafgQM40RBQ4R",
  "4T9EQebpuckZtPnqcZbZkm",
  "4awsEikFixHOydnj7O9GS9",
];

export const initalState = {
  token: null,
  playlists: [],
  userinfo: {},
  selectedplaylistid: "6S5qpNyT3ZAg7m0e2XSOqx",
  selectedplaylist: null,
  Currentlyplaying: null,
  playerState: false,
  SetpalylistId: "",
};
// setInterval(()=>console.log(initalState.token),5000)

export default function reducer(state, action) {
  switch (action.type) {
    case Action.Settoken: {
      return {
        ...state,
        token: action.token,
      };
    }

    case Action.Setpalylists: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case Action.Setuserinfo: {
      return {
        ...state,
        userinfo: action.userinfo,
      };
    }
    case Action.Set_PLAYLIST: {
      return {
        ...state,
        selectedplaylist: action.selectedplaylist,
      };
    }
    case Action.Set_PLAYING: {
      return {
        ...state,
        Currentlyplaying: action.Currentlyplaying,
      };
    }
    case Action.Set_PLAYERSTATE: {
      return {
        ...state,
        playerState: action.playerState,
      };
    }
    case Action.SetpalylistId: {
      return {
        ...state,
        selectedplaylistid: action.selectedplaylistid,
      };
    }
    default:
      return state;
  }
}
