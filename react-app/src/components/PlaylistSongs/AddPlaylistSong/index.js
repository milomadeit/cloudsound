import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as plSongActions from '../../../store/playlist-songs'


const AddSongToPL = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();

  const [playlistId, setPlaylistId] = useState(0)

  // useEffect(() => {
  //   dispatch(playlistActions.get_playlists_thunk())
  // }, [dispatch]);

  const playlists = Object.values(useSelector((state) => state.playlists))
  const song = useSelector((state) => state.songsReducer.allSongs[songId].title)
  const artist = useSelector((state) => state.songsReducer.allSongs[songId].artist)

  const addSongToPlaylist = (e) => {
    e.preventDefault()
    if (playlistId) {
      const formData = new FormData();
      formData.append('playlistId', playlistId);
      formData.append('songId', songId);

      dispatch(plSongActions.add_song_to_pl(formData, playlistId))
    }
  }

  return (
    <>
      <h1>Add Song to Playlist!</h1>
      <h3>Adding '{song}' by '{artist}' to: </h3>

      <form onSubmit={addSongToPlaylist}>
        <select
          onChange={(e) => setPlaylistId(e.target.value)}
        >
          <option
            key={0}
            value={''}
          >-- Select A Playlist --</option>

          {playlists.map((lst) =>
            <option
              key={lst.id}
              value={lst.id}
            >{lst.title}</option>
          )}
        </select>

        <button
          type="submit"
        >Add Song</button>
      </form>
    </>
  )
}

export default AddSongToPL;
