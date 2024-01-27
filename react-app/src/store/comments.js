
// constants
const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';


// ACTIONS
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

const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id
  }
}


// THUNKS
export const get_comments_thunk = (track_id) => async (dispatch) => {
  const res = await fetch(`/api/tracks/${track_id}/comments`);
  const data = await res.json();
  dispatch(get_comments(data))

  return data
}
export const postCommentThunk=(formData,trackId)=>async(dispatch)=>{

  const res =await fetch(`/api/tracks/${trackId}/comments`, {
    method: "POST",

    body: formData,
})

if(res.ok){



  const data = await res.json();



  if(data.comment){
  return data.comment[0]
    }
  dispatch(addComment(data))
  return data
}

  const error = await res.json()
  console.log(error)
return error
}

export const editCommentThunk=(formData,trackId,commentId)=>async(dispatch)=>{

  const res =await fetch(`/api/tracks/${trackId}/comments/${commentId}`, {
    method: "PUT",

    body: formData,
})

if(res.ok){



  const data = await res.json();



  if(data.comment){
  return data.comment[0]
    }
  dispatch(editComment(data))
 return data
}

return res
}
export const deleteCommentThunk = (trackId,commentId) => async (dispatch) => {
  const response=await fetch(`/api/tracks/${trackId}/comments/${commentId}`, {
    method: "DELETE",

});
if (response.ok) {
  const id = await response.json();

  dispatch(deleteComment(id));
  return "Comment removed";
}
return response

}

// reducer
const comments = (state = {}, action) => {
  let new_state = {};
  switch (action.type) {
    case GET_COMMENTS:
      action.payload.map((comment) => new_state[comment.id] = comment)
      return new_state
    case ADD_COMMENT:

      return { ...state, [action.comment.id]: action.comment };
      case EDIT_COMMENT:

      return { ...state, [action.comment.id]: action.comment };
    case DELETE_COMMENT:
      const newState = { ...state };
      delete newState[action.id];
      return newState;

    default:
      return state;
  }
}

export default comments;
