import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../../store/songs";
import { FOLK, HIP_HOP, JAZZ, LATIN, POP } from "../../../constants/genre";
import "./GetAllSongs.css";
import GenreSongs from "../../GenreSongs";
import * as playlistActions from '../../../store/playlists';

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
  const otherSongs = songs.filter(
    (s) =>
      s.genre !== POP &&
      s.genre !== LATIN &&
      s.genre !== FOLK &&
      s.genre !== HIP_HOP &&
      s.genre !== JAZZ
  );

  return (
    <div className="get-all-songs-main-div">
      <GenreSongs genre="Pop" songs={popSongs} />
      <GenreSongs genre="Latin" songs={latinSongs} />
      <GenreSongs genre="Folk" songs={folkSongs} />
      <GenreSongs genre="Hip-Hop" songs={hipHopSongs} />
      <GenreSongs genre="Jazz" songs={jazzSongs} />
      <GenreSongs genre="Others" songs={otherSongs} />
    </div>
  );
};

export default GetAllSongs;
