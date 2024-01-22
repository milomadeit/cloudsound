// constants
const GET_LIKES = 'GET_LIKES';


// actions
const get_likes = (likes) => {
  return {
    type: GET_LIKES,
    likes
  }
}



// thunks
export const get_likes_thunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/likes`);
  const data = await res.json();
  dispatch(get_likes(data))

  return data
}

//!! seperate thunks/state or combine with getsongs????


// reducer
const likes = (state = {}, action) => {
  let new_state = {};
  switch (action.type) {
    case GET_LIKES:
      action.likes.map((like) => new_state[like.id] = like)
      return new_state

    default:
      return state;
  }
}

export default likes;
