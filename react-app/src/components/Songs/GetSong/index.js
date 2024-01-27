import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useLocation, useHistory } from "react-router-dom";
import { getAllSongs } from "../../../store/songs";
import CreateSongComment from "../../CreateSongComment";
import OpenModalButton from "../../OpenModalButton";
import EditCommentModal from "../../EditCommentModal";
import AddSongToPlaylistModal from "../../AddSongToPlaylistModal"
import "./GetSong.css";
import { likeSong, likeCount, userLikes, unlikeSong } from "../../../store/likes";


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
  const [isOwner, setIsOwner] = useState(false);
  const song_check = location.state?.song || song



  useEffect(() => {
    setIsOwner(user?.id === song_check?.user_id);
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


  const handleClickAddToPlaylist = (e) => {
    e.preventDefault()

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
      state: { song: song }
    });
  };

  console.log(song)
  return (
    <div className="container-for-song-details">

      {user && (<div><CreateSongComment /></div>)}
      <div className="first-container-for-song-details">


        {user ? (
          <div className="if-logged-in-features-on-song-details-page">

            <span onClick={(e) => likeSongClick(e)}><img
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
            {user.id && <span><OpenModalButton buttonText={<img alt="" id="logo7" src={addplaylist} style={{ width: "20px", height: "20px" }} />}
                    modalComponent={<AddSongToPlaylistModal props={{ trackId }} />}
                  /></span>}
            {user.id === song.user_id && <span><button onClick={(e) => navigateToEditSong(e, song.id)}>Update song</button></span>}
          </div>
        ) : (<div className="empty-div-in-case-no-user"></div>)}



        <div className="song-details-page-likes-and-times-played">
          <span className="inner-song-details-page-likes-and-times-played"><div><img id="logo6" src={play} alt="play" style={{ width: "20px", height: "20px" }} />{song.play_count}</div><div> <img id="logo1" src={heart} alt="heart" style={{ width: "20px", height: "20px" }} />{song.likes}</div></span>
        </div>

      </div>





      <div className="song-info-on-song-details-page">
        <h1>{song.title}</h1>
        <h2>{song.artist}</h2>
        <h3>{song.genre}</h3>



      </div>


      <div className="comments-container-for-song-details-page">

        {comments.length === 1 && <span className="chatcloud-and-number-of-comments"><div><img alt="" id="logo5" src={chatcloud} style={{ width: "20px", height: "20px" }} /></div><div><h3>{comments.length} comment</h3></div></span>}
        {comments.length > 1 && <span className="chatcloud-and-number-of-comments"><div><img alt="" id="logo5" src={chatcloud} style={{ width: "20px", height: "20px" }} /></div><div><h3>{comments.length} comments</h3></div></span>}
        {comments.length === 0 && <span className="chatcloud-and-number-of-comments"><div><img alt="" id="logo5" src={chatcloud} style={{ width: "20px", height: "20px" }} /></div><div><h3>No comments yet</h3></div></span>}
        <div className="container-for-list-of-comments">
          {isLoaded && (comments.map((comment) =>
            <div key={comment.id} id="individual-comment-in-the-list-song-details-page">
              <div>User: {comment.author}</div>
              <div>{comment.content} </div>
              {user && user.id === comment.user_id && (
                <span>
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
        </div>
      </div>


    </div>
  );
};

export default GetSong;

// button id="edit-comment-button" value={comment.id} onClick={onClickEdit}><img id="logo4"src={image4} style={{width:"20px", height:"20px"}}/>edit</button>
