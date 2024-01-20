import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './SongPlayer.css';

const SongPlayer = () => {
    const currentUserSongsObject = useSelector((state) => state.songs.allSongs);
    const currentUserSongs = Object.values(currentUserSongsObject);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef(null);

    const currentTrack = currentUserSongs[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }

        // Cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
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
            prevIndex - 1 < 0 ? currentUserSongs.length - 1 : prevIndex - 1
        );
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex(prevIndex =>
            prevIndex < currentUserSongs.length - 1 ? prevIndex + 1 : 0
        );
    };

	console.log(currentTrack)

    return (
        <div className='song-player'>
            <audio ref={audioRef} src={currentTrack.song_url} />
            <div className='song-player-controls'>
                <button onClick={handlePrevTrack}>&lt;&lt;</button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={handleNextTrack}>&gt;&gt;</button>
            </div>
        </div>
    );
};

export default SongPlayer;
