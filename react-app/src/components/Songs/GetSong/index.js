import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllSongs } from "../../../store/songs";

const GetSong = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector((state) => state.songsReducer.allSongs[parseInt(songId)]);

  useEffect(() => {
    dispatch(getAllSongs())

  }, [dispatch])

  if (!song?.title) {
    return <div>...loading</div>
  }

  return (
    <div>
      <h1>{song.title}</h1>
      <h2>By: {song.artist}</h2>

      <h3>Genre: {song.genre}</h3>

      <h3>Likes: {song.likes}</h3>
    </div>
  );
};

export default GetSong;
