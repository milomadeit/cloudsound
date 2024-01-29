import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as plSongActions from "../../store/playlist-songs";
import { getAllSongs } from "../../store/songs";
import "./AddSongToPlaylistModal.css";

const AddSongToPlaylistModal = (props) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const songId = props.props.trackId;
  const [playlistId, setPlaylistId] = useState(0);

  const playlists = Object.values(useSelector((state) => state.playlists));
  const songDetails = useSelector(
    (state) => state.songsReducer.allSongs[songId]
  );
  const song = songDetails ? songDetails.title : "";
  const artist = songDetails ? songDetails.artist : "";

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const addSongToPlaylist = (e) => {
    e.preventDefault();
    if (playlistId) {
      const formData = new FormData();
      formData.append("playlistId", playlistId);
      formData.append("songId", songId);

      dispatch(plSongActions.add_song_to_pl(formData, playlistId));
      closeModal();
    }
  };

  return (
    <div className="add-to-playlist-modal-div">
      <h2>Add Song to Playlist!</h2>
      {songDetails ? (
        <>
          <h3>
            Adding '{song}' by '{artist}' to:{" "}
          </h3>
          <form
            className="add-to-playlist-modal-form"
            onSubmit={addSongToPlaylist}
          >
            <select
              className="add-to-playlist-modal-form-select"
              onChange={(e) => setPlaylistId(e.target.value)}
            >
              <option key={0} value={""}>
                -- Select A Playlist --
              </option>
              {playlists.map((lst) => (
                <option key={lst.id} value={lst.id}>
                  {lst.title}
                </option>
              ))}
            </select>
            <button type="submit">Add Song</button>
          </form>
        </>
      ) : (
        <p>Loading song details...</p>
      )}
    </div>
  );
};

export default AddSongToPlaylistModal;
