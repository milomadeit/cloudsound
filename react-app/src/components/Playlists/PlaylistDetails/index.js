// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import * as playlistActions from '../../store/playlists';


const PlaylistDetails = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const { playlist_id } = useParams()

  // useEffect(() => {
  //   dispatch(playlistActions.get_playlists_thunk())
  // }, [dispatch]);

  const playlist = useSelector((state) => state.playlists[playlist_id])

  return (
    <>
      <h1>Playlist Details:</h1>
      <h2>--- {playlist.title} ---</h2>
    </>
  )
}

export default PlaylistDetails;
