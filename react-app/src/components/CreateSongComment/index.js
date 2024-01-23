import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./CreateSongComment.css";
import { postCommentThunk } from "../../store/comments";
import { useParams,useHistory} from 'react-router-dom';


function CreateSongComment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { trackId } = useParams();



  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const user= useSelector((state) => state.session.user);
  if(!user){return history.push(`/`)};
  const handleSubmit = (e) => {
    e.preventDefault();


    setErrors({});
    const formData = new FormData();
    formData.append("comment", comment);

    dispatch(postCommentThunk(formData,trackId)).then(res=>{

        console.log(res)
        history.push(`/tracks/${trackId}/comments`)})



}



  return (
    <div className="post-a-comment">
    <h1>Post a comment!</h1>

     <form onSubmit={handleSubmit}>

            <div className="errors">{errors.comment}</div>
           <div className="input-field-1">
            <label>
                Comment:
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment"
                />
            </label>


            <button id="submit-for-post-a-comment"type="submit" >Submit</button>
</div>
        </form>
        </div>


  );
}

export default CreateSongComment;


// dispatch(postCommentThunk(formData,trackId)).then(res=>history.push(`/tracks/${trackId}/comments`))
//     .catch(
//       async (res) => {


//          console.log("Add comment")

// });
