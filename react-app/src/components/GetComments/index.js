import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
