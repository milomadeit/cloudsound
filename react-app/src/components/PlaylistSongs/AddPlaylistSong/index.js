import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as plSongActions from '../../../store/playlist-songs'
import { getAllSongs } from "../../../store/songs";


const AddSongToPL = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { songId } = useParams();

  const [playlistId, setPlaylistId] = useState(0)

  
  const playlists = Object.values(useSelector((state) => state.playlists))
  const songDetails = useSelector((state) => state.songsReducer.allSongs[songId]);
  const song = songDetails ? songDetails.title : '';
  const artist = songDetails ? songDetails.artist : '';


  useEffect(() => {

    dispatch(getAllSongs())
    
  }, [dispatch]);
  
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
      {songDetails ? (
        <>
          <h3>Adding '{song}' by '{artist}' to: </h3>
          <form onSubmit={addSongToPlaylist}>
            <select onChange={(e) => setPlaylistId(e.target.value)}>
              <option key={0} value={''}>-- Select A Playlist --</option>
              {playlists.map((lst) => (
                <option key={lst.id} value={lst.id}>{lst.title}</option>
              ))}
            </select>
            <button type="submit">Add Song</button>
          </form>
        </>
      ) : (
        <p>Loading song details...</p>
      )}
    </>
  );
  
}

export default AddSongToPL;
