import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import * as commentActions from '../../store/comments';


function GetComments() {
  const dispatch = useDispatch();
  // const { songId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(commentActions.get_comments_thunk())
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  const comments = Object.values(useSelector((state) => state.comments));

  return (
    <>
      {isLoaded && (
        comments.map((comment) =>
          <div key={comment.id}>
            <span>user_id: {comment.user_id} </span>
            <div>
              Content: {comment.content}
            </div>
          </div>
        )
      )}
    </>
  )
}

export default GetComments;
