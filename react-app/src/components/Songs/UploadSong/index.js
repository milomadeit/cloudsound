import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadSong } from "../../../store/songs";
import { FOLK, HIP_HOP, JAZZ, LATIN, POP } from "../../../constants/genre";

const UploadSong = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [songFile, setSongFile] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // Cleanup function to set isMounted to false
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("song", songFile);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);

    if (isMounted) setLoading(true);

    try {
      const result = await dispatch(uploadSong(formData));
      if (result.ok) {
        history.push("/");
      } else {
        console.log('Song upload failed:', result.data);
        // Handle the error data
      }
    } catch (error) {
      console.error('An error occurred', error);
      // Handle network or other unexpected errors
    }
    setLoading(false);
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
        <select
          name="genre"
          id="genre"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value={POP}>Pop</option>
          <option value={LATIN}>Latin</option>
          <option value={FOLK}>Folk</option>
          <option value={HIP_HOP}>Hip-Hop</option>
          <option value={JAZZ}>Jazz</option>
        </select>
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
