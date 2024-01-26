const STORE_PL_SONGS = 'GET_PL_SONGS'


// ACTIONS
const store_pl_songs = (songs) => {
  return {
    type: STORE_PL_SONGS,
    songs
  }
}


// THUNKS
export const add_song_to_pl = (formData, playlistId) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}/add`, {
    method: 'POST',
    body: formData
  })
  const data = await res.json();

  return data
}


export const get_playlist_songs = (id) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${id}/songs`)
  const data = await res.json();
  dispatch(store_pl_songs(data))

  return data
}


// REDUCER
const playlistSongs = (state = {}, action) => {
  let new_state = {};
  switch (action.type) {
    case STORE_PL_SONGS:
      action.songs.map((song) => new_state[song.pl_id] = song)

    default:
      return state;
  }
}

export default playlistSongs;
