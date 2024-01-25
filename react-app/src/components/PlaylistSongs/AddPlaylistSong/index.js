import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";


const AddSongToPL = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { songId } = useParams();

  const [playlistId, setPlaylistId] = useState(0)

  // useEffect(() => {
  //   dispatch(playlistActions.get_playlists_thunk())
  // }, [dispatch]);

  const playlists = Object.values(useSelector((state) => state.playlists))

  const addSongToPlaylist = (e) => {
    e.preventDefault()
    if (playlistId) {
      const formData = new FormData();
      formData.append('playlistId', playlistId);
      formData.append('song_id', songId);
    }

    console.log('*** PL id ***', playlistId)
  }

  return (
    <>
      <h1>Add Song to Playlist!</h1>

      <form onSubmit={addSongToPlaylist}>
        <select
          onChange={(e) => setPlaylistId(e.target.value)}
        >
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
