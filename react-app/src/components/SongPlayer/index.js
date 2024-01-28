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
    const [currentTrackIndex, setCurrentTrackIndex] = useState(1);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(1);
    // const [trackProgress, setTrackProgress] = useState(0);

    const currentTrack = useSelector((state) => state.songsReducer.currentSong);
    


    // useEffect to autoplay when currentTrack changes
    useEffect(() => {
        const currentRef = audioRef.current;
        if (!currentRef || !currentTrack.song_url) return;

        currentRef.src = currentTrack.song_url;
        if (isPlaying) {
            currentRef.play().catch((err) => console.error("Error playing the track:", err));
        }

        const playCurrentTrack = async () => {
            try {
                await currentRef.play();
                setIsPlaying(true); 
            } catch (error) {
                // console.error("Playback was prevented:", error);
                setIsPlaying(false); 
            }
        };
    
        // plays new song when currentTrack changes
        // also attempts to auto-play when the component mounts and currentTrack is already set
        if (currentTrack.song_url) {
            playCurrentTrack();
        }
    

    }, [currentTrack, isPlaying]);

    // useEffect to handle play/pause toggles
    useEffect(() => {
        const currentRef = audioRef.current;
        if (!currentRef) return;



        isPlaying ? currentRef.play().catch((err) => console.error("Error playing the track:", err)) : currentRef.pause();
    }, [isPlaying]); // Re-run when isPlaying changes



    const togglePlayPause = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };
    

    const handlePrevTrack = () => {
        const newIndex = currentTrackIndex - 1 < 0 ? currentSongs.length - 1 : currentTrackIndex - 1;
        setCurrentTrackIndex(newIndex); 
        dispatch(setCurrentSong(currentSongs[newIndex]));
    };
    
    
    const handleNextTrack = () => {
        const newIndex = currentTrackIndex < currentSongs.length - 1 ? currentTrackIndex + 1 : 0;
        setCurrentTrackIndex(newIndex);
        dispatch(setCurrentSong(currentSongs[newIndex]));
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume);
        audioRef.current.volume = newVolume;

    }
    



    return (
        <div className='song-player'>
            <audio ref={audioRef} src={currentTrack.song_url} />
            <div className='song-player-controls'>
                <div className='song-player-main'>
                    <img alt='previous' className='next-prev-button' onClick={() => handlePrevTrack()} src={prev} /> 
                    <img alt='play/pause' className='play-pause-button' onClick={togglePlayPause} src={isPlaying ? pause : play} />
                    <img alt='next' className='next-prev-button' onClick={() => handleNextTrack()} src={next}/>
                </div>
                <div className='volume-control'>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={handleVolumeChange}
                />
            </div>
            </div>
        </div>
    );
};

export default SongPlayer;
