import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      {isLoaded && sessionUser && (
        <>
          <li>
            <NavLink exact to="/songs/new">
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/songs/current">
              Manage My Songs
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/playlists/new">
              Create Playlist
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/playlists">
              My Playlists
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
