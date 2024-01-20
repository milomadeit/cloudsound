import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const GetSong = () => {
  const { songId } = useParams();
  const song = useSelector((state) => state.songs.allSongs[songId]);

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
