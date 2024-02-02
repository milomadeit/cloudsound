const STORE_SONG = "songs/STORE_SONG";
const STORE_SONGS = "songs/STORE_SONGS";
const STORE_CURRENT_USER_SONGS = "songs/STORE_CURRENT_USER_SONGS";
const STORE_CURRENT_USER_SONGS_LOADED = "songs/STORE_CURRENT_USER_SONGS_LOADED";
const REMOVE_SONG = "songs/REMOVE_SONG";
const SET_CURRENT_SONG = "SET_CURRENT_SONG";

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

export const setCurrentUserSongsLoaded = () => {
  return {
    type: STORE_CURRENT_USER_SONGS_LOADED,
  };
};

const removeSong = (songId) => {
  return {
    type: REMOVE_SONG,
    songId,
  };
};
export const setCurrentSong = (song) => {
  return {
    type: SET_CURRENT_SONG,
    payload: song,
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
    console.log(errorData);
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

export const deleteSong = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeSong(songId));
    return { ok: true };
  } else {
    const errorData = await response.json(); // added await
    return { ok: false, errors: errorData };
  }
};

export const editSong = (songId, inputSong) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: "PUT",
    body: inputSong,
  });

  if (response.ok) {
    const songData = await response.json();
    dispatch(storeSong(songData));
    return { ok: true, data: songData };
  } else {
    const errorData = await response.json();
    return { ok: false, errors: errorData };
  }
};

const initialState = {
  allSongs: {},
  currentUserSongs: {},
  currentUserSongsLoaded: false,
  currentSong: {},
};
export default function songsReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_SONG: {
      const newSong = action.song;
      return {
        ...state,
        allSongs: { ...state.allSongs, [newSong.id]: newSong },
        currentUserSongs: { ...state.currentUserSongs, [newSong.id]: newSong },
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

    case STORE_CURRENT_USER_SONGS_LOADED: {
      return { ...state, currentUserSongsLoaded: false, currentUserSongs: {} };
    }

    case STORE_CURRENT_USER_SONGS: {
      const currentUserSongs = action.songs.reduce(
        (acc, song) => ({ ...acc, [song.id]: song }),
        {}
      );
      return {
        ...state,
        currentUserSongs: { ...state.currentUserSongs, ...currentUserSongs },
        currentUserSongsLoaded: true,
      };
    }

    case SET_CURRENT_SONG: {
      return {
        ...state,
        currentSong: action.payload,
      };
    }

    case REMOVE_SONG: {
      const newAllSongs = { ...state.allSongs };
      delete newAllSongs[action.songId];
      const newCurrentUserSongs = { ...state.currentUserSongs };
      delete newCurrentUserSongs[action.songId];
      return {
        ...state,
        allSongs: newAllSongs,
        currentUserSongs: newCurrentUserSongs,
      };
    }

    default:
      return state;
  }
}
