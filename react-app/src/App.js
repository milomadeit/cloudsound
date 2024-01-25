import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import UploadSong from "./components/Songs/UploadSong";
import GetComments from "./components/GetComments";
import CreatePlaylist from "./components/Playlists/CreatePlaylist";
import Playlists from "./components/Playlists/index";
import GetAllSongs from "./components/Songs/GetAllSongs";
import GetSong from "./components/Songs/GetSong";
import ManageSongs from "./components/Songs/ManageSongs";
import EditSong from "./components/Songs/EditSong";
import SongPlayer from "./components/SongPlayer";
import CreateSongComment from "./components/CreateSongComment";
import PlaylistDetails from "./components/Playlists/PlaylistDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          {sessionUser && (
            <Route path="/songs/new">
              <UploadSong />
            </Route>
          )}

          {sessionUser && (
            <Route path="/songs/:songId/edit">
              <EditSong />
            </Route>
          )}

          <Route exact path="/songs/current">
            <ManageSongs />
          </Route>
          <Route exact path="/tracks/:trackId">
            <GetSong />
            <GetComments />
          </Route>

          <Route path={["/tracks/:trackId/comments/new","/tracks/:trackId"]}>
            <CreateSongComment />
          </Route>

          {sessionUser && (
            <Route path="/playlists/new">
              <CreatePlaylist />
            </Route>
          )}

          <Route path="/playlists/:playlist_id">
            <PlaylistDetails />
          </Route>

          <Route path="/playlists">
            <Playlists />
          </Route>

          <Route path="/">
            <GetAllSongs />
          </Route>

        </Switch>
      )}
      <SongPlayer />
    </>
  );
}

export default App;
