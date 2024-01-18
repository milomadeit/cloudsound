import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './AllSongs.css';

function AlSongs() {
	const dispatch = useDispatch();
	songs = useSelector((state) => state.songs.allSongs)

	useEffect(() => {
		dispatch(getAllSongs());

	},[dispatch])


	return (
		<div>
			
		</div>
	)


}