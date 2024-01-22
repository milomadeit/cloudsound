import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as commentActions from '../../store/comments';
import * as likeActions from '../../store/likes';


function GetComments() {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(likeActions.get_likes_thunk(songId))
    dispatch(commentActions.get_comments_thunk(songId))
      .then(() => setIsLoaded(true))
  }, [dispatch, songId]);

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
