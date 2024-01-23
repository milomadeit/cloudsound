// constants
const GET_COMMENTS = 'GET_COMMENTS';
// const ADD_COMMENT = 'ADD_COMMENT';
// const EDIT_COMMENT = 'EDIT_COMMENT';
// const DELETE_COMMENT = 'DELETE_COMMENT';


// ACTIONS
const get_comments = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments
  }
}

// const add_comment = (comment, song_id) => {
//   return {
//     type: ADD_COMMENT,
//     payload: comment
//   }
// }

// const edit_comment = (comment_id) => {
//   return {
//     type: EDIT_COMMENT,
//     payload: comment_id
//   }
// }

// const delete_comment = (comment_id) => {
//   return {
//     type: DELETE_COMMENT,
//     payload: comment_id
//   }
// }


// THUNKS
export const get_comments_thunk = (track_id) => async (dispatch) => {
  const res = await fetch(`/api/tracks/${track_id}/comments`);
  const data = await res.json();
  dispatch(get_comments(data))

  return data
}


// REDUCER
const comments = (state = {}, action) => {
  let new_state = {};
  switch (action.type) {
    case GET_COMMENTS:
      action.payload.map((comment) => new_state[comment.id] = comment)
      return new_state

    default:
      return state;
  }
}

export default comments;
