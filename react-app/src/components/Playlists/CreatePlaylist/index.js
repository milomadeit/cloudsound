import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as playlistActions from '../../../store/playlists';


const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState('');

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
      history.push('/playlists')
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Playlist Title"
          />
        </label>
      </div>

      {errors && <p>{errors}</p>}

      <button
        type="submit"
        disabled={title.length ? false : true}
      >Create Playlist!</button>
    </form>
  )
}

export default CreatePlaylist;
