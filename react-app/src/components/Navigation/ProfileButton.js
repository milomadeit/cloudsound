import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
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
