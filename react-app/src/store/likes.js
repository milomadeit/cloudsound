const LIKE_SONG = 'likes/LIKE_SONG';
const UNLIKE_SONG = 'likes/UNLIKE_SONG';
const GET_LIKES = 'likes/GET_LIKES';

const like = (songId, likeCount) => {
    return {
        type: LIKE_SONG,
        payload: { songId, likeCount },
    };
};

const unlike = (songId, likeCount) => {
    return {
        type: UNLIKE_SONG,
        payload: { songId, likeCount },
    };
};


const getLikes = (likes, songId) => {
    return {
        type: GET_LIKES,
        payload: {likes, songId}
    };
};


export const likeSong = (songId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/likes/tracks/${songId}`, { method: "POST" });
        if (!response.ok) throw new Error('Response not OK');
        const { likeCount } = await response.json();
        dispatch(like(songId, likeCount));
    } catch (error) {
        console.error("Error liking song:", error);
    }
};


export const unlikeSong = (trackId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/likes/tracks/${trackId}`, {
            method: "DELETE",
        });
        if (!response.ok)throw new Error('Response not OK');
        const {likes, trackId}= await response.json()
        dispatch(unlike(trackId, likes))
        
    } catch (error) {
        console.error("Error liking song:", error);
    }
    
};


export const likeCount = (trackId) => async (dispatch) => {
	const response = await fetch(`api/likes/tracks/${trackId}`, {
		method: 'GET',
	});

	if (response.ok) {
		const {likes, track_id} = await response.json();
        dispatch(getLikes(likes, trackId))
		return {likes, trackId};
	}

	const errors = response.json();
	return errors;

}


const initialState = {
    likedSongs: {},
 
};

const likes = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_SONG: {
            const { songId, likeCount } = action.payload;
            return {
                ...state,
                likedSongs: {
                    ...state.likedSongs,
                    [songId]: {
                        ...state.likedSongs[songId],
                        likes: likeCount, // update
                    },
                },
            };
        }
        case UNLIKE_SONG: {
            const { songId, likeCount } = action.payload;
            return {
                ...state,
                likedSongs: {
                    ...state.likedSongs,
                    [songId]: {
                        ...state.likedSongs[songId],
                        likes: likeCount,
                    },
                },
            };
        }
        case GET_LIKES: {
            const { songId, likes } = action.payload;
            return {
                ...state,
                likedSongs: {
                    ...state.likedSongs,
                    [songId]: {
                        ...state.likedSongs[songId],
                        likes: likes, // update
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default likes;