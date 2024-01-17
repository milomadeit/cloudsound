import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadSong } from "../../../store/songs";

const UploadSong = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [songFile, setSongFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("audio", songFile);

    setLoading(true);
    await dispatch(uploadSong(formData));
    history.push("/songs");
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Song Title"
          id="title"
        />
      </div>
      <div>
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist Name"
          id="artist"
        />
      </div>
      <div>
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="genre"
          id="genre"
        />
      </div>
      <div>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setSongFile(e.target.files[0])}
        />
      </div>

      <button type="submit">Submit</button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default UploadSong;
