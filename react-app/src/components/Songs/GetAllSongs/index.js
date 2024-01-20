import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../../store/songs";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FOLK, HIP_HOP, JAZZ, LATIN, POP } from "../../../constants/genre";

const GetAllSongs = () => {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.songs.allSongs);
  const songs = Object.values(allSongs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllSongs()).then(() => setLoading(false));
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
            <br />
          </NavLink>
        ))}
      </div>

      <div>
        <h2>Others</h2>
        {otherSongs.map((song) => (
          <NavLink key={song.id} to={`/songs/${song.id}`} title={song.title}>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <br />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default GetAllSongs;
