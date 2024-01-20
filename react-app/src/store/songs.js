const STORE_SONG = "songs/STORE_SONG";
const STORE_SONGS = "songs/STORE_SONGS";
const STORE_CURRENT_USER_SONGS = "songs/STORE_CURRENT_USER_SONGS";

const storeSong = (song) => {
  return {
    type: STORE_SONG,
    song,
  };
};

const storeSongs = (songs) => {
  return {
    type: STORE_SONGS,
    songs,
  };
};

const storeCurrentUserSongs = (songs) => {
  return {
    type: STORE_CURRENT_USER_SONGS,
    songs,
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


export const getAllSongs = () => async (dispatch) => {
  const response = await fetch(`/api/songs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const songs = await response.json();
  dispatch(storeSongs(songs));
  return songs;
};

export const getCurrentUserSongs = () => async (dispatch) => {
  const response = await fetch(`/api/songs/current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const songs = await response.json();
  dispatch(storeCurrentUserSongs(songs));
  return songs;
};

const initialState = { allSongs: {}, currentUserSongs: {} };
export default function songsReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_SONG: {
      const newSong = action.song;
      return {
        ...state,
        allSongs: { ...state.allSongs, [newSong.id]: newSong },
      };
    }

    case STORE_SONGS: {
      const allSongs = action.songs.reduce(
        (acc, song) => ({ ...acc, [song.id]: song }),
        {}
      );
      return {
        ...state,
        allSongs: { ...state.allSongs, ...allSongs },
      };
    }

    case STORE_CURRENT_USER_SONGS: {
      const currentUserSongs = action.songs.reduce(
        (acc, song) => ({ ...acc, [song.id]: song }),
        {}
      );
      return {
        ...state,
        currentUserSongs: { ...state.currentUserSongs, ...currentUserSongs },
      };
    }

    default:
      return state;
  }
}
