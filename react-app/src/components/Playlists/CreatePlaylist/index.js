import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as playlistActions from '../../../store/playlists';


const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');

  const userId = useSelector((state) => state.session.user.id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('user_id', userId);

    dispatch(playlistActions.create_playlist_thunk(formData));
    dispatch(playlistActions.get_playlists_thunk());
    history.push('/playlists')
  }

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

      <button type="submit">Create Playlist!</button>
    </form>
  )
}

export default CreatePlaylist;
