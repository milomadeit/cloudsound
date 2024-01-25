import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as commentActions from '../../store/comments';


function GetComments() {
  const dispatch = useDispatch();

  const { track_id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(commentActions.get_comments_thunk(track_id))
      .then(() => setIsLoaded(true))
  }, [dispatch, track_id]);

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
    {isLoaded && (
      comments.map((comment) =>
        <div key={comment.id}>
          <span>User: {comment.author}</span>
          <div>
            Says: {comment.content}
          </div>
          <hr></hr>
        </div>
      )
    )}
  </>
  )
}

export default GetComments;
