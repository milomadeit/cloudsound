// const CREATE_PLAYLIST = 'CREATE_PLAYLIST'
const GET_PLAYLISTS = 'GET_PLAYLISTS'
// const DELETE_PLAYLIST = 'DELETE_PLAYLIST'


// ACTIONS
const get_playlists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    playlists
  }
}


// THUNKS
export const create_playlist_thunk = (formData) => async (dispatch) => {
  const res = await fetch(`/api/playlists/new`, {
    method: 'POST',
    body: formData
  })
  const data = await res.json();

  return data
}


export const get_playlist_thunk = () => async (dispatch) => {
  const res = await fetch(`/api/playlists/current`)
  const data = await res.json();
  // dispatch(get_playlists(playlists))

  return data
}


// REDUCER
