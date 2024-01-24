const LIKE_SONG = 'likes/LIKE_SONG';
const UNLIKE_SONG = 'likes/UNLIKE_SONG';
const GET_LIKES = 'likes/GET_LIKES';

const like = (trackId, likeCount) => {
    return {
        type: LIKE_SONG,
        payload: { trackId, likeCount },
    };
};

const unlike = (trackId, likeCount) => {
    return {
        type: UNLIKE_SONG,
        payload: { trackId, likeCount },
    };
};


const getLikes = (trackId, likes) => {
    return {
        type: GET_LIKES,
        payload: {trackId, likes}
    };
};


export const likeSong = (trackId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/likes/tracks/${trackId}`, { method: "POST" });
        if (!response.ok) throw new Error('Response not OK');
        const { likeCount } = await response.json();
        dispatch(like(trackId, likeCount));
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
        const {likes, trackId} = await response.json()
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
        dispatch(getLikes(track_id, likes))
		return {likes, track_id};
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
            const { trackId, likeCount } = action.payload;
            return {
                ...state,
                likedSongs: {
                    ...state.likedSongs,
                    [trackId]: {
                        ...state.likedSongs[trackId],
                        likes: likeCount, // update
                    },
                },
            };
        }
        case UNLIKE_SONG: {
            const { trackId, likeCount } = action.payload;
            return {
                ...state,
                likedSongs: {
                    ...state.likedSongs,
                    [trackId]: {
                        ...state.likedSongs[trackId],
                        likes: likeCount,
                    },
                },
            };
        }
        case GET_LIKES: {
            const { trackId, likes } = action.payload;
            return {
                ...state,
                likedSongs: {
                    ...state.likedSongs,
                    [trackId]: {
                        ...state.likedSongs[trackId],
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