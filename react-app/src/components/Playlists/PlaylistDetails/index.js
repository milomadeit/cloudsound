import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as plSongActions from '../../../store/playlist-songs';


const PlaylistDetails = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { playlist_id } = useParams()

  useEffect(() => {
    dispatch(plSongActions.get_playlist_songs(playlist_id))
  }, [dispatch]);

  const playlist = useSelector((state) => state.playlists[playlist_id]);
  const pl_songs = Object.values(useSelector((state) => state.playlistSongs));
  const allSongs = Object.values(useSelector((state) => state.songsReducer.allSongs));

  let content = []

  // Get song info
  for (let plSong of pl_songs) {
    const thisSong = allSongs.filter((currSong) => currSong.id === plSong.song_id)
    content.push(thisSong)
  }

  const removeSong = (e) => {
    e.preventDefault()
    const sId = e.target.getAttribute('songid')

    dispatch(plSongActions.remove_song(playlist_id, sId))
  }

  return (
    <>
      <h1>Playlist Details:</h1>
      <h2>--- {playlist.title} ---</h2>

      {content &&
        content.map((thisSong) => (
          <div
            key={thisSong[0].id}
          >{thisSong[0].title}

            <div>By: {thisSong[0].artist}</div>

            <button
              onClick={(e) => removeSong(e)}
              songid={thisSong[0].id}
            >Remove</button>
            <hr></hr>
          </div>
        ))
      }
    </>
  )
}

export default PlaylistDetails;
