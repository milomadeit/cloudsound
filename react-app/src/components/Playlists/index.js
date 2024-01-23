import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as playlistActions from '../../store/playlists';


const Playlists = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(playlistActions.get_playlists_thunk())
  }, [dispatch]);

  const playlists = Object.values(useSelector((state) => state.playlists))

  return (
    <>
      <h1>Playlists: </h1>
      {playlists.map((list) =>
        <div key={list.id}>
          <span
            onClick={(e) => history.push(`/playlists/${list.id}`)}
          >Title: {list.title}</span>
          <hr></hr>
        </div>
      )}
    </>
  )
}

export default Playlists;
