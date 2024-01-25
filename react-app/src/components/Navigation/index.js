import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

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
        CLOUDSOUND
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
          <ProfileButton user={sessionUser} />
        </>
      )}
      {isLoaded && !sessionUser && (
        <div className="nav-signIn-signUp-div">
          <OpenModalButton
            buttonText="Sign In"
            modalComponent={<LoginFormModal />}
            className="nav-sign-in-up-btn nav-sign-in-btn"
          />
          <OpenModalButton
            buttonText="Create account"
            modalComponent={<SignupFormModal />}
            className="nav-sign-in-up-btn nav-sign-up-btn"
          />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
