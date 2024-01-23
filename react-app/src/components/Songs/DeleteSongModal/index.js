import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSong } from "../../../store/songs";
import { useModal } from "../../../context/Modal";

const DeleteSongModal = ({ song }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const onDeleteSong = async () => {
    const data = await dispatch(deleteSong(song.id));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h2>Are you sure you want to delete song: {song.title} ?</h2>
      {errors && <p>{errors}</p>}
      <button onClick={closeModal}>Cancel</button>
      <button onClick={onDeleteSong}>Delete</button>
    </>
  );
};

export default DeleteSongModal;
