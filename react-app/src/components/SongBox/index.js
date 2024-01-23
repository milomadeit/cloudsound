import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentSong } from '../../store/songs';
import './SongBox.css';
import DeleteSongModal from '../Songs/DeleteSongModal';

const SongBox = ({ id, artist, title, genre, play_count, likes, song_url, image_url, user_id }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const song = { id, artist, title, genre, play_count, likes, song_url, image_url, user_id };


    // extra functions

    const playSong = () => {
        dispatch(setCurrentSong(song));
    };

    const navigateToSongDetail = (id) => {
        history.push(`/songs/${id}`);
    };

    const showDeleteModal = (e) => {
        e.stopPropagation();
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const isOwner = () => {
        if( user.id === song.user_id) {
            return true
        }
        return false
    }

    return (
        <div className='song-box' onClick={playSong}>
            <img src={image_url} alt={`${title} cover image`} className='song-box-image' />
            <div className='song-box-header'>
                <div className='song-box-info'>
                    <h3 onClick={() => navigateToSongDetail(id)}>{title}</h3>
                    <p onClick={() => navigateToSongDetail(id)}>{artist}</p>
                    <span className="genre-tag">{genre}</span>
                </div>
            </div>
            <div className="song-stats"></div>
            <div className="song-box-actions">
                <button className='song-box-like' type='button'>Like</button> 
                <button>Add to Playlist</button>
				<span>{play_count < 1 || 'undefined' ?  0 : play_count} plays {likes < 1 ? 0 : likes } likes </span>
                {user?.id === song.user_id && (
                    <span>
                        <button className="edit-button" type='button'>Edit</button>
                        <button className="delete-button" type='button' onClick={showDeleteModal}>Delete</button>
                    </span>
                )}
            </div>
            {isDeleteModalOpen && <DeleteSongModal song={song} closeModal={closeDeleteModal} />}
        </div>
    );
};

export default SongBox;
