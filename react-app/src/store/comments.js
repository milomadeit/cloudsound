// constants
const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT'


// actions
const get_comments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments: comments
  }
}

const add_comment = (comment, song_id) => {
  return {
    type: ADD_COMMENT,
    comment: comment
  }
}

const edit_comment = (comment_id) => {
  return {
    type: EDIT_COMMENT,
    comment_id: comment_id
  }
}

const delete_comment = (comment_id) => {
  return {
    type: DELETE_COMMENT,
    comment_id: comment_id
  }
}


// thunks
export const get_comments_thunk = () => async (dispatch) => {
  const res = await fetch('/comment-test');
  const data = await res.json();
  // dispatch(get_comments(data.comments))
  if (data) {
    console.log(data, '****************')
  }
  return data
}


// reducer
const comment_reducer = (state = { comments: {} }, action) => {
  let new_state = {};
  switch (action.type) {
    case GET_COMMENTS:
      action.comments.map((comment) => new_state.comments[comment.id] = comment)
      return new_state

    default:
      return state;
  }
}

export default comment_reducer;
