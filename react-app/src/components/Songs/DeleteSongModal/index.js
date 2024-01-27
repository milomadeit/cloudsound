import React from "react";
import { useDispatch } from "react-redux";
import { deleteSong } from "../../../store/songs";
import { useModal } from "../../../context/Modal";
import "./DeleteSongModal.css";

const DeleteSongModal = ({ song }) => {
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const onDeleteSong = async () => {
    await dispatch(deleteSong(song.id));

    closeModal();
  };

  return (
    <div className="delete-song-modal-div">
      <h2>Are you sure you want to delete song: {song.title} ?</h2>
      {/* {errors && <p>{errors}</p>} */}
      <div className="delete-song-modal-buttons-div">
        <button className="delete-song-modal-delete-btn" onClick={onDeleteSong}>
          Delete
        </button>
        <button className="delete-song-modal-cancel-btn" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteSongModal;
