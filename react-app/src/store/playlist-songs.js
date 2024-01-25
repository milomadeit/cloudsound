const GET_SONGS = 'GET_SONGS'


// ACTIONS
const store_song = () => {
  return {
    type: GET_SONGS,
  }
}


// THUNKS
// export const create_playlist_thunk = (formData) => async (dispatch) => {
//   const res = await fetch(`/api/playlists/new`, {
//     method: 'POST',
//     body: formData
//   })
//   const data = await res.json();

//   return data
// }


// export const get_playlists_thunk = () => async (dispatch) => {
//   const res = await fetch(`/api/playlists/current`)
//   const data = await res.json();
//   dispatch(store_playlists(data))

//   return data
// }


// REDUCER
const playlistSongs = (state = {}, action) => {
  let new_state = {};
  switch (action.type) {


    default:
      return state;
  }
}

export default playlistSongs;
