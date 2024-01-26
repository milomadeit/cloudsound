import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentSong } from '../../store/songs';
import './SongBox.css';
import DeleteSongModal from '../Songs/DeleteSongModal';
import OpenModalButton from '../OpenModalButton';
import { likeSong, likeCount, userLikes, unlikeSong } from '../../store/likes';


const SongBox = ({ id, artist, title, genre, play_count, likes, song_url, image_url, user_id }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const [isOwner, setIsOwner] = useState(false);
    const song = { id, artist, title, genre, play_count, likes, song_url, image_url, user_id };
    const song_likes = useSelector((state) => state.likes.likedSongs[id]?.likes)
    useEffect(() => {
        setIsOwner(user?.id === song.user_id);

        dispatch(likeCount(id))



    }, [dispatch, id, user, song.user_id, song_likes]);




    // extra functions

    const playSong = () => {
        dispatch(setCurrentSong(song));
    };

    const navigateToSongDetail = (e, id) => {
        e.stopPropagation()
        history.push({
            pathname: `/songs/${id}`,
            state: { song: song }
        });
    };

    const navigateToEditSong = (e, id) => {
        e.stopPropagation()
        history.push({
            pathname: `/songs/${id}/edit`,
            state: { song: song }
        });
    };

    const likeSongClick = async () => {
        dispatch(likeSong(id, song_likes))
    }




    return (
        <div className='song-box' onClick={playSong}>
            <img src={image_url} alt={`${title} cover art`} className='song-box-image' />
            <div className='song-box-header'>
                <div className='song-box-info'>
                    <h3 onClick={(e) => navigateToSongDetail(e, id)}>{title}</h3>
                    <p onClick={(e) => navigateToSongDetail(e, id)}>{artist}</p>
                    <span className="genre-tag">{genre}</span>
                </div>
            </div>

            <div className="song-stats"></div>

            <div className="song-box-actions">
                <button className='song-box-like' type='button' onClick={() => likeSongClick()}>Like</button>
                <button>Add to Playlist</button>
                <span>{play_count < 1 || 'undefined' ? 0 : play_count} plays {song_likes < 1 ? 0 : song_likes} likes </span>
                {isOwner && (
                    <span>
                        <button onClick={(e) => navigateToEditSong(e, id)} className="edit-button" type='button'>Edit</button>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteSongModal song={song} />}
                        />
                    </span>
                )}
            </div>
        </div>
    );
};


// fixing

export default SongBox;
