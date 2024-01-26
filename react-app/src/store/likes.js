import { getAllSongs } from "./songs";

const LIKE_SONG = 'likes/LIKE_SONG';
const UNLIKE_SONG = 'likes/UNLIKE_SONG';
const GET_LIKES = 'likes/GET_LIKES';
const SET_USER_LIKES = 'likes/SET_USER_LIKES';

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

const setUserLikes = (likedSongIds) => {
    return {
        type: SET_USER_LIKES,
        payload: likedSongIds,
    };
};


export const likeSong = (trackId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/likes/tracks/${trackId}`, { method: "POST" });
        if (!response.ok) throw new Error('Response not OK');
        const { likeCount } = await response.json();
        dispatch(like(trackId, likeCount));
        dispatch(getAllSongs())
    } catch (error) {
       return error
    }
};


export const unlikeSong = (trackId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/likes/tracks/${trackId}`, {
            method: "DELETE",
        });
        if (!response.ok)throw new Error('Response not OK');
        const {likes, track_id} = await response.json()
        dispatch(unlike(track_id, likes))
        dispatch(getAllSongs())
        
    } catch (error) {
        return error
    }
    
};


export const likeCount = (trackId) => async (dispatch) => {
	const response = await fetch(`/api/likes/tracks/${trackId}`, {
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

export const userLikes = (userId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/likes/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user likes');
        const likedSongIds= await response.json();
        dispatch(setUserLikes(likedSongIds));
    } catch (error) {
        return error
    }
};


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
        case SET_USER_LIKES: {
            const likedTrackIds = action.payload;
            const updatedLikedSongs = {};
            likedTrackIds.forEach(trackId => {
                updatedLikedSongs[trackId] = { liked: true };
            });
            return {
                ...state,
                likedSongs: updatedLikedSongs,
            };
        }        
        default:
            return state;
    }
};

export default likes;