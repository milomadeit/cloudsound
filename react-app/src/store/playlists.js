const GET_PLAYLISTS = 'GET_PLAYLISTS'


// ACTIONS
const store_playlists = (playlists) => {
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


export const get_playlists_thunk = () => async (dispatch) => {
  const res = await fetch(`/api/playlists/current`)
  const data = await res.json();
  dispatch(store_playlists(data))

  return data
}


// REDUCER
const playlists = (state = {}, action) => {
  let new_state = {};
  switch (action.type) {
    case GET_PLAYLISTS:
      action.playlists.map((playlist) => new_state[playlist.id] = playlist)
      return new_state

    default:
      return state;
  }
}

export default playlists;
