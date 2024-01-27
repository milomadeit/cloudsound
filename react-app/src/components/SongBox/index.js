import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentSong } from "../../store/songs";
import "./SongBox.css";
import DeleteSongModal from "../Songs/DeleteSongModal";
import OpenModalButton from "../OpenModalButton";
import { likeSong, likeCount, userLikes, unlikeSong } from "../../store/likes";
import addplaylist from "../Songs/logo/add-to-playlist-3.png"
const SongBox = ({id, artist, title, genre, play_count, likes, song_url, image_url, user_id }) => {
  const song = { id, artist, title, genre, play_count, likes, song_url, image_url, user_id };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [isOwner, setIsOwner] = useState(false);

  const isLiked = useSelector(
    (state) => state.likes.likedSongs[id]?.liked === true
  );

  const song_likes = useSelector(
    (state) => state.songsReducer.allSongs[id]?.likes
  );

  useEffect(() => {
    setIsOwner(user?.id === song.user_id);
    dispatch(likeCount(id));
    if (user?.id) {
      dispatch(userLikes(user?.id));
    }
  }, [dispatch, id, user, song.user_id, isLiked]);

  const playSong = () => {
    dispatch(setCurrentSong(song));
  };

  const navigateToSongDetail = (e, id) => {
    e.stopPropagation();
    history.push({
      pathname: `/songs/${id}`,
      state: { song: song },
    });
  };

  const navigateToEditSong = (e, id) => {
    e.stopPropagation();
    history.push({
      pathname: `/songs/${id}/edit`,
      state: { song: song },
    });
  };

  const navigateToAddToPlaylist = (e, id) => {
    e.stopPropagation();
    history.push({
      pathname: `/playlists/add-song/${id}`,
      state: { song: song },
    });
  };

  const likeSongClick = async (e) => {
    e.stopPropagation();

    if (isLiked) {
      await dispatch(unlikeSong(id));
      await dispatch(userLikes(user.id));
    } else {
      await dispatch(likeSong(id));
      await dispatch(userLikes(user.id));
    }
  };

  return (
    <div className="song-box" onClick={playSong}>
      <div className="song-box-header">
        <img
          src={image_url}
          alt={`${title} cover art`}
          className="song-box-image"
        />

        <div
          className="song-box-info"
          onClick={(e) => navigateToSongDetail(e, id)}
        >
          <h3>{title}</h3>
          <p>{artist}</p>
          <span className="genre-tag">{genre}</span>
        </div>
      </div>

      {/* <div className="song-stats">
        <div>
          <i className="fas fa-heart fa-2xs" style={{ color: "#c1c2c2" }}></i>{" "}
          {!song_likes ? 0 : song_likes}
        </div>

        <div>
          <i className="fas fa-play fa-2xs" style={{ color: "#c1c2c2" }}></i>{" "}
          {play_count < 1 || "undefined" ? 0 : play_count}
        </div>
      </div> */}

      <div className="song-box-play-div">
        <button className="song-box-play-btn">
          <i className="fas fa-play" style={{ color: "#ff5500" }} />
        </button>
      </div>

      <div className="song-box-actions">
        {user && (
          <>
            <button
              className={`song-box-action-btn ${
                isLiked ? "song-box-liked" : ""
              }`}
              type="button"
              onClick={(e) => likeSongClick(e)}
            >
              <i
                className="fas fa-heart fa-2xs"
                style={{ color: `${isLiked ? "red" : "black"}` }}
              ></i>{" "}
              {!song_likes ? 0 : song_likes}
            </button>

            <button
              onClick={(e) => navigateToAddToPlaylist(e, id)}
              className="song-box-action-btn"
            >
              <img alt="" id="logo2" src={addplaylist} style={{ width: "20px", height: "20px" }} />
            </button>
          </>
        )}

        {isOwner && (
          <>
            <button
              className="song-box-action-btn"
              onClick={(e) => navigateToEditSong(e, id)}
              type="button"
            >
              Edit
            </button>

            <OpenModalButton
              className="song-box-action-btn"
              buttonText="Delete"
              modalComponent={<DeleteSongModal song={song} />}
            />
          </>
        )}
      </div>
    </div>
  );
};

// fixing

export default SongBox;
