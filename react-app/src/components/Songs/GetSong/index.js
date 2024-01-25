import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams,  NavLink, useLocation, useHistory } from "react-router-dom";
import { getAllSongs } from "../../../store/songs";
import CreateSongComment from "../../CreateSongComment";
import OpenModalButton from "../../OpenModalButton";
import EditCommentModal from "../../EditCommentModal";
import "./GetSong.css";
import { likeSong, likeCount, userLikes, unlikeSong } from "../../../store/likes";


import heart from "../logo/heart.png"
import addplaylist from "../logo/add-to-playlist-3.png"
import trashbin from "../logo/delete-2.png"
import edit from "../logo/edit.png"


import * as commentActions from '../../../store/comments'
const GetSong = () => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory()
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch=useDispatch();
  const { trackId } = useParams();
  const songId=trackId
  const comments = Object.values(useSelector((state) => state.comments));
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songsReducer.allSongs[parseInt(songId)]);
  const isLiked = useSelector(state => state.likes.likedSongs[songId]?.liked === true);
  const [isOwner, setIsOwner ] = useState(false);
  const song_check = location.state.song;



  useEffect(() => {
    setIsOwner(user?.id === song_check.user_id);
    dispatch(getAllSongs());
    dispatch(likeCount(songId));
    if (user?.id) {
        dispatch(userLikes(user?.id));
    }
    
    dispatch(commentActions.get_comments_thunk(songId))
      .then(() => setIsLoaded(true));

  }, [dispatch,songId])

  if (!song?.title) {
    return <div>...loading</div>
  }
  const handleClickDeleteComment=(e)=>{
    e.preventDefault()
    const commentId=e.currentTarget.value
    dispatch(commentActions.deleteCommentThunk(trackId,commentId))
  }

  const likeSongClick = async (e) => {
    e.stopPropagation()
    
    if (isLiked) {
        await dispatch(unlikeSong(songId)); 
        await dispatch(userLikes(user.id))
    } else {
        await dispatch(likeSong(songId));
        await dispatch(userLikes(user.id))
        
    }
  };

  const navigateToEditSong = (e, id) => {
    e.stopPropagation()
    history.push({
        pathname: `/songs/${id}/edit`,
        state: {song: song}
     });
};


  return (
    <div>
      <div>
        <h1>{song.title}</h1>
        <h2>{song.artist}</h2>
        <h3>{song.genre}</h3>
        <h3>{song.likes}</h3>

      </div>
      {user && (
        <div>
          <span  onClick={(e) => likeSongClick(e)}><img
        id="logo1"
        src={heart}
        alt="heart"
        style={{
          width: "20px",
          height: "20px",
          filter: isLiked ? "invert(20%) sepia(94%) saturate(7461%) hue-rotate(358deg) brightness(103%) contrast(119%)" : "none",
        }}
        onClick={(e) => likeSongClick(e)}
      />
      </span>
        <span> <NavLink exact to="/"><img id="logo2"src={addplaylist} style={{width:"20px", height:"20px"}}/></NavLink></span>
        <span><button onClick={(e) => navigateToEditSong(e, song.id)}>Edit</button></span>
        
        <CreateSongComment />
        </div>
      )}
      <div>
        <h3>Comments:</h3>
        {isLoaded && ( comments.map((comment) =>
          <div key={comment.id}>
            <div>User: {comment.author}</div>
              <div>{comment.content} </div>
              {sessionUser && sessionUser.id===comment.user_id && (
                <span>
                  <OpenModalButton buttonText={<img id="logo2"src={edit} style={{width:"20px", height:"20px"}}/>}
                  modalComponent={<EditCommentModal props={{comment,trackId}} />}
                  />
                  <button id="delete-comment-button" 
                  value={comment.id} 
                  onClick={(e) => handleClickDeleteComment(e)}>
                  <img id="logo3"src={trashbin} style={{width:"20px", height:"20px"}}/>
                  </button>
                </span>)}

        </div>
      ))
    }
  </div>


    </div>
  );
};

export default GetSong;

// button id="edit-comment-button" value={comment.id} onClick={onClickEdit}><img id="logo4"src={image4} style={{width:"20px", height:"20px"}}/>edit</button>
