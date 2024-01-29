import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { editSong } from "../../../store/songs";
import { FOLK, HIP_HOP, JAZZ, LATIN, POP } from "../../../constants/genre";
import "./EditSong.css";

const EditSong = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const song = location.state.song;
  const [songFile, setSongFile] = useState(null);
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [genre, setGenre] = useState(song.genre);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form_errors = {};
    if (artist.length < 1) form_errors.artist = "Please include artist name";
    if (title.length < 1)
      form_errors.title = "Please include a title for your song";
    if (!genre) form_errors.genre = "Please select a genre";
    if (imageUrl.length > 0 && !imageUrl.match(/\.(jpeg|jpg|gif|png)$/))
      form_errors.imageUrl = "Image URL must end in .png, .jpg, or .jpeg";

    if (Object.keys(form_errors).length > 0) {
      setErrors(form_errors);
      return;
    }

    const formData = new FormData();
    formData.append("song", songFile);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append('image_url', imageUrl);

    if (isMounted) setLoading(true);

    try {
      const result = await dispatch(editSong(song.id, formData));
      if (result.ok) {
        history.push("/");
      } else {
        setErrors(result.data)
        setLoading(false)
        return result.data
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
    setLoading(false);
  };

  return (
    <form
      className="edit-song-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="edit-form-label-input-div">
        <label className="edit-form-label" htmlFor="title">
          Title
        </label>
        <input
          className="edit-form-input-text"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Song Title"
          id="title"
        />
      </div>
      {errors.title && <p className="p-error">{errors.title}</p>}

      <div className="edit-form-label-input-div">
        <label className="edit-form-label" htmlFor="artist">
          Artist
        </label>
        <input
          className="edit-form-input-text"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist Name"
          id="artist"
        />
      </div>
      {errors.artist && <p className="p-error">{errors.artist}</p>}

      <div className="edit-form-label-input-div">
        <label className="edit-form-label" htmlFor="genre">
          Genre
        </label>
        <select
          className="edit-form-input-select"
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
      {errors.genre && <p className="p-error">{errors.genre}</p>}

      <div className="upload-form-label-input-div">
      <label className="upload-form-label" htmlFor="artist">
          Image
        </label>
        <input
          className="upload-form-input-text"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          id="artist"
        />
      </div>
         {errors.imageUrl && <p className="p-error">{errors.imageUrl}</p>}
      

      <div className="edit-form-label-input-div edit-form-label-input-file-div">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setSongFile(e.target.files[0])}
        />
      </div>
      {errors.songFile && <p className="p-error">{errors.songFile}</p>}

      <button className="edit-form-btn" type="submit" disabled={loading}>
        Update Song
      </button>
      {loading && <p>Loading...</p>}
      {errors && (<p className="p-error">{errors.error}</p>)}
    </form>
  );
};

export default EditSong;
