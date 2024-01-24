import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as commentActions from '../../store/comments';


function GetComments() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  const [commented, setCommented] = useState(false);

  const comments = Object.values(useSelector((state) => state.comments));
  const currUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(commentActions.get_comments_thunk(songId))
  }, [dispatch]);

  // check if user has already commented
  useEffect(() => {
    comments.map((comment) => {
      if (currUser.id === comment.user_id) {
        setCommented(true)
      }
    })
  }, [comments])

  return (
    <>
      <h3>Comments:</h3>

      {currUser && !commented &&
        <button
          onClick={(e) => history.push(`/songs/${songId}/comments/new`)}
          hidden={commented}
        >Add Comment</button>
      }

      {comments.map((comment) =>
        <div key={comment.id}>
          <span>User: {comment.author}</span>
          <div>
            Says: {comment.content}
          </div>
          <hr></hr>
        </div>
      )
      }
    </>
  )
}

export default GetComments;
