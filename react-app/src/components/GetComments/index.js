import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import * as commentActions from '../../store/comments';


function GetComments() {
  const dispatch = useDispatch();
  // const { songId } = useParams();

  // console.log(params, '**********')

  useEffect(() => {
    dispatch(commentActions.get_comments_thunk())
  }, [dispatch]);

  // const comments = useSelector((state) => state.comments);

  return (
    <>
      <h1>Viewing All Comments</h1>
      <div>comment 1</div>
    </>
  )
}

export default GetComments;
