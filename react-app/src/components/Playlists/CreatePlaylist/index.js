import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistActions from '../../../store/playlists';
import { useModal } from "../../../context/Modal";
import './index.css'


const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();

  const userId = useSelector((state) => state.session.user.id)
  const playlists = Object.values(useSelector((state) => state.playlists))

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length && checkPlaylistNames(title)) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('user_id', userId);

      dispatch(playlistActions.create_playlist_thunk(formData));
      dispatch(playlistActions.get_playlists_thunk());

      closeModal();
    }
  }

  const checkPlaylistNames = (title) => {
    setErrors('');

    for (let pl of playlists) {
      if (pl.title === title) {
        setErrors('A Playlist with that title already exists.')
        return false;
      }
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="plForm">
      <h2>Create A Playlist!</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="plTitle"
        required
      />

      {errors && <p className="plTitle-Error">{errors}</p>}

      <button
        type="submit"
        className="createPlBtn"
      >Create Playlist!</button>
    </form>
  )
}

export default CreatePlaylist;
