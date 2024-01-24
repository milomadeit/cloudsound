import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink,Route } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllSongs } from "../../../store/songs";
import "./GetSong.css";
import CreateSongComment from "../../CreateSongComment";

import {  useState } from "react";
import image1 from "./logo/heart.png"
import image2 from "./logo/add-to-playlist-3.png"
import image3 from "./logo/delete-2.png"
import image4 from "./logo/edit.png"

import * as commentActions from '../../../store/comments'
const GetSong = () => {

  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch=useDispatch();
  const { trackId } = useParams();
  const songId=trackId

  const comments = Object.values(useSelector((state) => state.comments));
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songsReducer.allSongs[parseInt(songId)]);
   console.log(sessionUser)


  useEffect(() => {
    dispatch(getAllSongs());
    dispatch(commentActions.get_comments_thunk(songId))
      .then(() => setIsLoaded(true));

  }, [dispatch,songId])

  if (!song?.title) {
    return <div>...loading</div>
  }
  const handleClickDelete=(e)=>{
    e.preventDefault()
    const commentId=e.currentTarget.value
    dispatch(commentActions.deleteCommentThunk(trackId,commentId))
    
}
  return (
    <div>

            <CreateSongComment />
            <span> <NavLink exact to="/"><img id="logo1"src={image1} style={{width:"20px", height:"20px"}}/>Like</NavLink></span>
            <span> <NavLink exact to="/"><img id="logo2"src={image2} style={{width:"20px", height:"20px"}}/></NavLink></span>

      <h3>#{song.genre}</h3>
      <h3>{song.title}</h3>
      <h3>{song.artist}</h3>
      <h3>{song.likes}</h3>


      <div>
      <h3>Comments:</h3>
    {isLoaded && (
      comments.map((comment) =>
        <div key={comment.id}>
          <span>User: {comment.author}</span>
          <div>
             {comment.content}

          </div>
{sessionUser && sessionUser.id===comment.user_id && (<span><NavLink exact to="/"><img id="logo4"src={image4} style={{width:"20px", height:"20px"}}/>edit</NavLink><button id="delete-comment-button" value={comment.id} onClick={handleClickDelete} >{comment.id}<img id="logo3"src={image3} style={{width:"20px", height:"20px"}}/></button></span>)}

          <hr></hr>
        </div>
      )
    )}
  </div>


    </div>
  );
};

export default GetSong;
