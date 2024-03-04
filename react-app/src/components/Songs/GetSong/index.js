import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { getAllSongs } from "../../../store/songs";
import CreateSongComment from "../../CreateSongComment";
import OpenModalButton from "../../OpenModalButton";
import EditCommentModal from "../../EditCommentModal";
import AddSongToPlaylistModal from "../../AddSongToPlaylistModal"
import "./GetSong.css";
import { likeSong, likeCount, userLikes, unlikeSong } from "../../../store/likes";
import { setCurrentSong } from "../../../store/songs";


import heart from "../logo/heart.png"
import addplaylist from "../logo/add-to-playlist-3.png"
import trashbin from "../logo/delete-2.png"
import edit from "../logo/edit.png"
import chatcloud from "../logo/chatting.png"
import play from "../logo/play.png"


import * as commentActions from '../../../store/comments'
const GetSong = () => {

  const history = useHistory()
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const songId = trackId
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songsReducer.allSongs[parseInt(songId)]);
  const isLiked = useSelector(state => state.likes.likedSongs[songId]?.liked === true);
  // const [isOwner, setIsOwner] = useState(false);
  const song_check = location.state?.song || song



  useEffect(() => {
    // setIsOwner(user?.id === song_check?.user_id);
    dispatch(getAllSongs());
    dispatch(likeCount(songId));
    if (user?.id) {
      dispatch(userLikes(user?.id));
    }


    dispatch(commentActions.get_comments_thunk(songId))
      .then(() => setIsLoaded(true));

  }, [dispatch, songId, song_check, user])

  if (!song?.title) {
    return <div>...loading</div>
  }
  const handleClickDeleteComment = (e) => {
    e.preventDefault()
    const commentId = e.currentTarget.value
    dispatch(commentActions.deleteCommentThunk(trackId, commentId))
  }





  const likeSongClick = async (e) => {
    e.stopPropagation()
    if (!user?.id) return

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
      state: { song: song }
    });
  };

  const playSong = () => {
    dispatch(setCurrentSong(song));
  };


  return (
    <div className="container-for-song-details">
      
      <div onClick={playSong} className="starter">
        <div className="song-info-on-song-details-page">
          <h1 className="song-info title">{song.title}</h1>
          <h2 className="song-info artist">{song.artist}</h2>
          <h3 className="song-info genre">{song.genre}</h3>
          
        </div>
        <img className='song-artwork' src={song.image_url}/>

        <div className="song-details-page-likes-and-times-played">
          <span className="inner-song-details-page-likes-and-times-played">
            <div className="song-info-data" ><img id="logo6" src={play} alt="play" style={{ width: "20px", height: "20px" }} />{song.play_count}</div>
            <div className="song-info-data"  onClick={(e) => likeSongClick(e)}><img
              id="logo1"
              src={heart}
              alt="heart"
              style={{
                width: "20px",
                height: "20px",
                filter: isLiked ? "invert(20%) sepia(94%) saturate(7461%) hue-rotate(358deg) brightness(103%) contrast(119%)" : "none",
              }}
            />{song.likes}
            </div>   
            {user ? (
          <div className="song-info-data" >
            
            {user.id && <span ><OpenModalButton buttonText={<img alt="" id="logo7" src={addplaylist} style={{ width: "20px", height: "20px" }} />}
                    modalComponent={<AddSongToPlaylistModal props={{ trackId }} />}
                  /></span>}
            {user.id === song.user_id && <span className="song-info-edit"><button onClick={(e) => navigateToEditSong(e, song.id)}>Update song</button></span>}
          </div>
        ) : (<div className="empty-div-in-case-no-user"></div>)}
            </span>
            </div>
        </div>
      <div className="first-container-for-song-details">


      </div>
      {user && (<div><CreateSongComment /></div>)}
      <div className="comments-container-for-song-details-page">

        {comments.length === 1 && <span className="chatcloud-and-number-of-comments"><div><img alt="" id="logo5" className="comment-logo" src={chatcloud} style={{ width: "20px", height: "20px" }} /></div><div><h3>{comments.length} comment</h3></div></span>}
        {comments.length > 1 && <span className="chatcloud-and-number-of-comments"><div><img alt="" id="logo5" className="comment-logo" src={chatcloud} style={{ width: "20px", height: "20px" }} /></div><div><h3>{comments.length} comments</h3></div></span>}
        {comments.length === 0 && <span className="chatcloud-and-number-of-comments"><div><img alt="" id="logo5" className="comment-logo" src={chatcloud} style={{ width: "20px", height: "20px" }} /></div><div><h3>No comments yet</h3></div></span>}
        <div className="container-for-list-of-comments">
          {isLoaded && (comments.map((comment) =>
            <div key={comment.id} className="individual-comment-in-the-list-song-details-page">
              <div>User: {comment.author}</div>
              <div>{comment.content} </div>
              {user && user.id === comment.user_id && (
                <span className="buttons-span">
                  <OpenModalButton buttonText={<img alt="" id="logo2" src={edit} style={{ width: "20px", height: "20px" }} />}
                    modalComponent={<EditCommentModal props={{ comment, trackId }} />}
                  />
                  <button id="delete-comment-button"
                    value={comment.id}
                    onClick={(e) => handleClickDeleteComment(e)}>
                    <img alt="" id="logo3" src={trashbin} style={{ width: "20px", height: "20px" }} />
                  </button>
                </span>)}

            </div>

          ))
          }
          <div className="space">

          </div>
        </div>
  </div>
</div>
  );
};

export default GetSong;

// button id="edit-comment-button" value={comment.id} onClick={onClickEdit}><img id="logo4"src={image4} style={{width:"20px", height:"20px"}}/>edit</button>
