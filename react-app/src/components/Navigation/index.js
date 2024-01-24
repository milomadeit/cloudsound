import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navigation-nav">
      <NavLink
        activeClassName="navigation-active-link"
        className="navigation-link navigation-home-button"
        exact
        to="/"
      >
        CloudSound
      </NavLink>
      {isLoaded && sessionUser && (
        <>
          <NavLink
            activeClassName="navigation-active-link"
            className="navigation-link"
            exact
            to="/songs/new"
          >
            Upload
          </NavLink>
          <NavLink
            activeClassName="navigation-active-link"
            className="navigation-link"
            exact
            to="/songs/current"
          >
            Manage My Songs
          </NavLink>
          <NavLink
            activeClassName="navigation-active-link"
            className="navigation-link"
            exact
            to="/playlists/new"
          >
            Create Playlist
          </NavLink>
          <NavLink
            activeClassName="navigation-active-link"
            className="navigation-link"
            exact
            to="/playlists"
          >
            My Playlists
          </NavLink>
        </>
      )}
      {isLoaded && <ProfileButton user={sessionUser} />}
    </nav>
  );
}

export default Navigation;
