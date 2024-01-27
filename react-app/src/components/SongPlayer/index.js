import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SongPlayer.css';
import { setCurrentSong } from '../../store/songs';
import play from './icons/play.png'
import pause from './icons/pause.png'
import next from './icons/next.png'
import prev from './icons/prev.png'

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
            currentRef.pause();
        };
    }, [currentTrack]);


    // if (!currentTrack?.song_url) {
    //     return <div>...click on a song to play</div>;
    // }

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
                <img style={{
                    filter: "invert(100%)"
                }} className='next-prev-button' src={prev} onClick={() => handlePrevTrack()} />
                <img style={{
                    filter: "invert(100%)"
                }} className='play-pause-button' onClick={togglePlayPause} src={isPlaying ? pause : play} />
                <img style={{
                    filter: "invert(100%)"
                }} className='next-prev-button' src={next} onClick={() => handleNextTrack()} />
            </div>
        </div>
    );
};

export default SongPlayer;
