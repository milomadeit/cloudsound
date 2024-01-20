import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllSongs } from "../../../store/songs";

const GetSong = () => {
  const dispatch=useDispatch();
  const { songId } = useParams();
  const song = useSelector((state) => state.songsReducer.allSongs[parseInt(songId)]);
  console.log(songId)
  console.log(song)

  useEffect(() => {
    dispatch(getAllSongs())

  }, [dispatch])

  if (!song?.title) {
    return <div>...loading</div>
  }

  return (
    <div>
      <h1>{song.title}</h1>
      <h2>{song.artist}</h2>

      <h3>{song.genre}</h3>

      <h3>{song.likes}</h3>
    </div>
  );
};

export default GetSong;
