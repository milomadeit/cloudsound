import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentSong } from '../../store/songs';
import './SongBox.css';

const SongBox = ({ id, artist, title, genre, play_count, likes, song_url, image_url, user_id }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	const playSong = () => {
        dispatch(setCurrentSong({
            id,
            artist,
            title,
            genre,
            play_count,
            likes,
            song_url,
            image_url,
            user_id
        }));
    };
    
	const navigateToSongDetail = (id) => {
        history.push(`/songs/${id}`);
    };

	const handleEditClick = (e, id) => {
		e.stopPropagation(); 
		//  thunk action for editing song
		console.log(`edit song with ID: ${id}`);
	};
	
	const handleDeleteClick = (e, id) => {
		e.stopPropagation(); //
		//  thunk action for deleting song
		console.log(`delete song with ID: ${id}`);
	};
	

	

    return (
        <div className='song-box'onClick={playSong} >
            <img src={image_url} alt={`${title} cover image`} className='song-box-image' />
            <div className='song-box-header'>
                <div className='song-box-info'>
                    <h3 onClick={() => navigateToSongDetail(id)}>{title}</h3>
                    <p onClick={() => navigateToSongDetail(id)}>{artist}</p>
                <span className="genre-tag">{genre}</span>
                </div>
            </div>
            <div className="song-stats">
            </div>
                <div className="song-box-actions"> 
				<span>{play_count < 1 || 'undefined' ?  0 : play_count} plays {likes < 1 ? 0 : likes } likes </span>
				{user && (
					<span>
						<button className="edit-button" type='button' onClick={(e) => handleEditClick(e, id)}>Edit</button>
						<button className="delete-button" type='button' onClick={(e) => handleDeleteClick(e, id)}>Delete</button>
					</span>
					)}
				</div>
        </div>
    );
}

export default SongBox;
