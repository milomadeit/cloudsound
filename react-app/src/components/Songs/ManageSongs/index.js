import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserSongs } from "../../../store/songs";
import GenreSongs from "../../GenreSongs";

const ManageSongs = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const currentUserSongs = useSelector(
    (state) => state.songsReducer.currentUserSongs
  );
  const songs = Object.values(currentUserSongs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    dispatch(getCurrentUserSongs()).then(() => setLoading(false));
  }, [dispatch, user, history]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <GenreSongs genre="My Uploads" songs={songs} />
    </div>
  );
};

export default ManageSongs;
