import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserSongs } from "../../../store/songs";
import { FOLK, HIP_HOP, JAZZ, LATIN, POP } from "../../../constants/genre";
import OpenModalButton from "../../OpenModalButton";
import DeleteSongModal from "../DeleteSongModal";

const ManageSongs = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserSongs = useSelector(
    (state) => state.songsReducer.currentUserSongs
  );
  const songs = Object.values(currentUserSongs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUserSongs()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <h1>Loading...</h1>;

  const popSongs = songs.filter((s) => s.genre === POP);
  const latinSongs = songs.filter((s) => s.genre === LATIN);
  const folkSongs = songs.filter((s) => s.genre === FOLK);
  const hipHopSongs = songs.filter((s) => s.genre === HIP_HOP);
  const jazzSongs = songs.filter((s) => s.genre === JAZZ);
  const otherSongs = songs.filter(
    (s) =>
      s.genre !== POP &&
      s.genre !== LATIN &&
      s.genre !== FOLK &&
      s.genre !== HIP_HOP &&
      s.genre !== JAZZ
  );

  return (
    <div>
      <div>
        <h2>Pop</h2>
        {popSongs.map((song) => (
          <NavLink key={song.id} to={`/songs/${song.id}`} title={song.title}>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <button onClick={() => history.push(`/songs/${song.id}/edit`)}>
              Edit
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSongModal song={song} />}
            />
            <br />
          </NavLink>
        ))}
      </div>

      <div>
        <h2>Latin</h2>
        {latinSongs.map((song) => (
          <NavLink key={song.id} to={`/songs/${song.id}`} title={song.title}>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <button onClick={() => history.push(`/songs/${song.id}/edit`)}>
              Edit
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSongModal song={song} />}
            />
            <br />
          </NavLink>
        ))}
      </div>

      <div>
        <h2>Folk</h2>
        {folkSongs.map((song) => (
          <NavLink key={song.id} to={`/songs/${song.id}`} title={song.title}>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <button onClick={() => history.push(`/songs/${song.id}/edit`)}>
              Edit
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSongModal song={song} />}
            />
            <br />
          </NavLink>
        ))}
      </div>

      <div>
        <h2>Hip-Hop</h2>
        {hipHopSongs.map((song) => (
          <NavLink key={song.id} to={`/songs/${song.id}`} title={song.title}>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <button onClick={() => history.push(`/songs/${song.id}/edit`)}>
              Edit
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSongModal song={song} />}
            />
            <br />
          </NavLink>
        ))}
      </div>

      <div>
        <h2>Jazz</h2>
        {jazzSongs.map((song) => (
          <NavLink key={song.id} to={`/songs/${song.id}`} title={song.title}>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <button onClick={() => history.push(`/songs/${song.id}/edit`)}>
              Edit
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSongModal song={song} />}
            />
            <br />
          </NavLink>
        ))}
      </div>

      <div>
        <h2>Others</h2>
        {otherSongs.map((song) => (
          <div>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <button onClick={() => history.push(`/songs/${song.id}/edit`)}>
              Edit
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSongModal song={song} />}
            />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSongs;
