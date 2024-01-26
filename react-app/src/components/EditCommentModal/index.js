
import { editCommentThunk } from "../../store/comments";
import { useModal } from "../../context/Modal";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./EditCommentModal.css";
import { postCommentThunk } from "../../store/comments";
import { useParams,useHistory} from 'react-router-dom';
import image from "../CreateSongComment/logo-create-comment/message.png"


const EditCommentModal = (props) => {

const { closeModal } = useModal();
const dispatch = useDispatch();
  const history = useHistory();
  const commentId=props.props.comment.id
  const trackId=props.props.trackId
  const content=props.props.comment.content

  const [comment, setComment] = useState(`${content}`);
  const [errors, setErrors] = useState({});


  const user= useSelector((state) => state.session.user);
  if(!user){return history.push(`/`)};
 const handleSubmit = (e) => {
    e.preventDefault();


    setErrors({});
    const formData = new FormData();
    formData.append("comment", comment);

    dispatch(editCommentThunk(formData,trackId,commentId)).then(res=>{
        if(typeof res ==="string"){

            errors.content=res
            setErrors(errors)
        }
closeModal()

    })
}




  return (
   

    <>
        {errors.content ? (<>{errors.content}</>) : (
            <div className="edit-a-comment">


             <form onSubmit={handleSubmit}>

                    <div className="errors">{errors.comment}</div>
                   <div className="input-field-1">
                    <label>

                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment"
                            required
                        />
                    </label>


                    <button id="submit-for-post-a-comment"type="submit" ><img id="send-logo"src={image} style={{width:"20px", height:"20px"}}/></button>
        </div>
                </form>
</div>
        )}

      </>


  );
};

export default EditCommentModal;
