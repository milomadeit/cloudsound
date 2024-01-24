import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserSongs } from "../../../store/songs";
import SongBox from "../../SongBox";

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
      history.push('/');
      return; 
    }
    dispatch(getCurrentUserSongs()).then(() => setLoading(false));
  }, [dispatch, user, history ]);


  if (loading) return <h1>Loading...</h1>;


  return (
    <div>
      <div>
        <h2>Recent Uploads</h2>
        {songs.map((song) => (
          <SongBox 
          id={song.id}
          artist={song.artist}
          title={song.title}
          genre={song.genre}
          image_url={song.image_url}
          play_count={song.play_count}
          likes={song.likes}
          song_url={song.song_url}
          user_id={song.user_id}
          />
        ))}
      </div>

    </div>
  );
};

export default ManageSongs;
