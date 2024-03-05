import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../../store/songs";
import {
  FOLK,
  HIP_HOP,
  JAZZ,
  LATIN,
  POP,
  EDM,
  UNDERGROUND,
} from "../../../constants/genre";
import "./GetAllSongs.css";
import GenreSongs from "../../GenreSongs";
import * as playlistActions from "../../../store/playlists";

const GetAllSongs = () => {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.songsReducer.allSongs);
  const songs = Object.values(allSongs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllSongs()).then(() => setLoading(false));
    dispatch(playlistActions.get_playlists_thunk());
  }, [dispatch]);

  if (loading) return <h1>Loading...</h1>;

  const popSongs = songs.filter((s) => s.genre === POP);
  const latinSongs = songs.filter((s) => s.genre === LATIN);
  const folkSongs = songs.filter((s) => s.genre === FOLK);
  const hipHopSongs = songs.filter((s) => s.genre === HIP_HOP);
  const jazzSongs = songs.filter((s) => s.genre === JAZZ);
  const edmSongs = songs.filter((s) => s.genre === EDM);
  const undergroundSongs = songs.filter((s) => s.genre === UNDERGROUND);

  const otherSongs = songs.filter(
    (s) =>
      s.genre !== POP &&
      s.genre !== LATIN &&
      s.genre !== FOLK &&
      s.genre !== HIP_HOP &&
      s.genre !== JAZZ &&
      s.genre !== EDM &&
      s.genre !== UNDERGROUND
  );

  return (
    <div className="get-all-songs-main-div">
      {popSongs.length ? <GenreSongs genre="Pop" songs={popSongs} /> : null}
      {hipHopSongs.length ? (
        <GenreSongs genre="Hip-Hop" songs={hipHopSongs} />
      ) : null}
      {folkSongs.length ? <GenreSongs genre="Folk" songs={folkSongs} /> : null}
      {edmSongs.length ? <GenreSongs genre="EDM" songs={edmSongs} /> : null}
      {jazzSongs.length ? <GenreSongs genre="Jazz" songs={jazzSongs} /> : null}
      {latinSongs.length ? (
        <GenreSongs genre="Latin" songs={latinSongs} />
      ) : null}
      {undergroundSongs.length ? (
        <GenreSongs genre="Underground" songs={undergroundSongs} />
      ) : null}
      {otherSongs.length ? (
        <GenreSongs genre="Other" songs={otherSongs} />
      ) : null}
    </div>
  );
};

export default GetAllSongs;
