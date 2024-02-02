import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSongs } from "../../../store/songs";
import GenreSongs from "../../GenreSongs";

const ManageSongs = () => {
  const dispatch = useDispatch();
  const currentUserSongsLoaded = useSelector(
    (state) => state.songsReducer.currentUserSongsLoaded
  );
  const currentUserSongs = useSelector(
    (state) => state.songsReducer.currentUserSongs
  );
  const songs = Object.values(currentUserSongs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUserSongsLoaded) {
      dispatch(getCurrentUserSongs()).then(() => setLoading(false));
    }
  }, [currentUserSongsLoaded, dispatch]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <GenreSongs genre="My Uploads" songs={songs} />
    </div>
  );
};

export default ManageSongs;
