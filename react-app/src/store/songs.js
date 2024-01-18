const STORE_SONG = "songs/STORE_SONG";
const ALL_SONGS = "allSongs/ALL_SONGS"

const allSongs = (songs) => {
  return {
    type: ALL_SONGS,
    songs
  }
}

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

export const getAllSongs = () => async (dispatch) => {
  const response = await fetch('/api/songs/', {
    method: "GET"
  })
}

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
