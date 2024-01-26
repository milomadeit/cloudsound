import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SongPlayer.css';
import { setCurrentSong } from '../../store/songs';

const SongPlayer = () => {
    const currentSongsObject = useSelector((state) => state.songsReducer.allSongs);
    const dispatch = useDispatch();
    const currentSongs = Object.values(currentSongsObject);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState({})
    const [currentTrackIndex, setCurrentTrackIndex] = useState(1);
    const audioRef = useRef(null);

    const currentTrack = useSelector((state) => state.songsReducer.currentSong);

    useEffect(() => {
        const current_ref = audioRef.current
        // dispatch(setCurrentSong(currentTrack));  
        if (current_ref) {
            if (isPlaying) {
                current_ref.play();
            } else {
                current_ref.pause();
            }
        }


        // Cleanup function
        return () => {
            if (current_ref) {
                current_ref.pause();
            }
        };
    }, [isPlaying, currentTrack]);

    if (!currentTrack?.song_url) {
        return <div>...loading</div>;
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handlePrevTrack = () => {
        setCurrentTrackIndex(prevIndex =>
            prevIndex - 1 < 0 ? currentSongs.length - 1 : prevIndex - 1
        );
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex(prevIndex =>
            prevIndex < currentSongs.length - 1 ? prevIndex + 1 : 0
        );
    };

	

    return (
        <div className='song-player'>
            <audio ref={audioRef} src={currentTrack.song_url} />
            <div className='song-player-controls'>
                <button onClick={() => handlePrevTrack()} >&lt;&lt;</button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={() => handleNextTrack()} >&gt;&gt;</button>
            </div>
        </div>
    );
};

export default SongPlayer;
