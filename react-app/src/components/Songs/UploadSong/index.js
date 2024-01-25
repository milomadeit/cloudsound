import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [errors, setErrors] = useState({})
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    console.log(user.id, 'userrrrr')
    setIsMounted(true);
    return () => setIsMounted(false); // Cleanup function to set isMounted to false
  }, [dispatch, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form_errors = {};
    if (artist.length < 1) form_errors.artist = 'Please include artist name'
    if (title.length < 1) form_errors.title = "Please include a title for your song"
    if (!genre) form_errors.genre = "Please select a genre"

    if (Object.keys(form_errors).length > 0) {
      setErrors(form_errors)
      return;
    }

    const formData = new FormData();
    formData.append("song", songFile);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append('user_id', parseInt(user.id) )

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
      {errors.title && (
            <p>{errors.title}</p>
          )}
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
      {errors.artist && (
            <p>{errors.artist}</p>
          )}
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
      {errors.genre && (
            <p>{errors.genre}</p>
          )}
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
      {errors.songFile && (
            <p>{errors.songFile}</p>
          )}
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
