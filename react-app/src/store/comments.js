
// constants
const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
// const EDIT_COMMENT = 'EDIT_COMMENT';
// const DELETE_COMMENT = 'DELETE_COMMENT';


// actions
const get_comments = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments
  }
}

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
 }

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


// thunks
export const get_comments_thunk = (track_id) => async (dispatch) => {
  const res = await fetch(`/api/${track_id}/comments`);
  const data = await res.json();
  dispatch(get_comments(data))

  return data
}
export const postCommentThunk=(payload)=>async(dispatch)=>{

  const res =await fetch(`/api/tracks/${payload.trackId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
})
if(res.ok){
  const data = await res.json();
  dispatch(addComment(data))
return data
}
return res
}

// reducer
const comments = (state = {}, action) => {
  let new_state = {};
  switch (action.type) {
    case GET_COMMENTS:
      action.payload.map((comment) => new_state[comment.id] = comment)
      return new_state
    case ADD_COMMENT:
      console.log(action.comment)
      return { ...state, [action.comment.id]: action.comment };

    default:
      return state;
  }
}

export default comments;
