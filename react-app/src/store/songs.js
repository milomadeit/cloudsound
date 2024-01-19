const STORE_SONG = "songs/STORE_SONG";
const STORE_SONGS = "songs/STORE_SONGS";

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

export const uploadSong = (inputSong) => async (dispatch) => {
  const response = await fetch(`/api/songs/upload`, {
    method: "POST",
    body: inputSong,
  });
  const song = await response.json();
  dispatch(storeSong(song));
  return song;
};

export const getAllSongs = () => async (dispatch) => {
  const response = await fetch(`/api/songs`, {
    method: "GET",
  });
  const songs = await response.json();
  dispatch(storeSongs(songs));
  return songs;
};

const initialState = { allSongs: {} };
export default function reducer(state = initialState, action) {
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

    default:
      return state;
  }
}
