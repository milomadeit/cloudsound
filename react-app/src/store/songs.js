const STORE_SONG = "songs/STORE_SONG";

const storeSong = (song) => {
  return {
    type: STORE_SONG,
    song,
  };
};

export const uploadSong = (inputSong) => async (dispatch) => {
  const response = await fetch(`/api/songs/upload`, {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(inputSong),
    body: inputSong,
  });
  const song = await response.json();
  dispatch(storeSong(song));
  return song;
};

const initialState = { allSongs: {} };
const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_SONG: {
      const newSong = action.song;
      return {
        ...state,
        allSongs: { ...state.allSongs, [newSong.id]: newSong },
      };
    }

    default:
      return state;
  }
};

export default songsReducer;
