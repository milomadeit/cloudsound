import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as playlistActions from '../../store/playlists';
import './index.css'


const Playlists = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(playlistActions.get_playlists_thunk())
  }, [dispatch]);

  const playlists = Object.values(useSelector((state) => state.playlists))

  return (
    <>
      <h2
        className="plH2"
      >My Playlists</h2>
      <hr className="plHr"></hr>

      {playlists.map((list) =>
        <div key={list.id}>
          <div
            onClick={(e) => history.push(`/playlists/${list.id}`)}
            className="plDiv"
          >{list.title}</div>
          <hr className="plHr"></hr>
        </div>
      )}
    </>
  )
}

export default Playlists;
