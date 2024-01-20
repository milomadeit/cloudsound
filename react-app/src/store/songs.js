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
    body: inputSong,
  });

  if (response.ok) {
    const songData = await response.json();
    dispatch(storeSong(songData));
    return { ok: true, data: songData };
  } else {
    const errorData = response.json();
    return { ok: false, data: errorData };
  }
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
