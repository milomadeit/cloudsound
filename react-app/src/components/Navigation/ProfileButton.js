import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setCurrentUserSongsLoaded } from "../../store/songs";
import { clearLikesState } from '../../store/likes';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();

    await dispatch(logout()).then(() => {
      dispatch(setCurrentUserSongsLoaded());
      dispatch(clearLikesState());
      history.push("/");
    });
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i
          className="fas fa-user-circle fa-lg"
          style={{ color: "#ff5500" }}
        ></i>
      </button>

      <div className={ulClassName} ref={ulRef}>
        <div className="profile-user-details">
          <div>Hello, {user.username}</div>
          <div>{user.email}</div>
        </div>

        <button className="signout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </>
  );
}

export default ProfileButton;
