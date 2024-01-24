import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentSong } from '../../store/songs';
import './SongBox.css';
import DeleteSongModal from '../Songs/DeleteSongModal';
import OpenModalButton from '../OpenModalButton';
import { likeSong, unlikeSong, likeCount } from '../../store/likes';

const SongBox = ({ id, artist, title, genre, play_count, likes, song_url, image_url, user_id }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isOwner, setIsOwner ] = useState(false);
    const song = { id, artist, title, genre, play_count, likes, song_url, image_url, user_id };
    const song_likes = useSelector(state => state.songsReducer.allSongs[id].likes);
    const currentSongLikes = song?.likes;


    useEffect(() => {
        setIsOwner(user?.id === song.user_id);
        dispatch(likeCount(id))
    }, [user, song, song_likes]);
    
    
    

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

    const likeSongClick = async () => {

       likes += 1
       const like = await dispatch(likeSong(id, likes))
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
                <button className='song-box-like' type='button' onClick={() => likeSongClick()}>Like</button> 
                <button>Add to Playlist</button>
				<span>{play_count < 1 || 'undefined' ?  0 : play_count} plays {song_likes < 1 ? 0 : song_likes } likes </span>
                {isOwner && (
                    <span>
                        <button className="edit-button" type='button'>Edit</button>
                        <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSongModal song={song} />}
            />
                    </span>
                )}
            </div>
            {isDeleteModalOpen && <DeleteSongModal song={song} closeModal={closeDeleteModal} />}
        </div>
    );
};

export default SongBox;
