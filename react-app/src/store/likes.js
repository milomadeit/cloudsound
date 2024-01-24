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


const getLikes = (likes) => {
    return {
        type: GET_LIKES,
        payload: likes,
    };
};


export const likeSong = (trackId) => async (dispatch) => {
    const response = await fetch(`/api/likes/tracks/${trackId}`, {
        method: "POST",
    });
    if (response.ok) {
        const { likeCount } = await response.json();
        dispatch(like(trackId, likeCount)); 
    } else {
        const errors = await response.json();
        console.log(errors);
        return errors;
    }
};

export const unlikeSong = (trackId) => async (dispatch) => {
    const response = await fetch(`/api/likes/tracks/${trackId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const { likeCount } = await response.json();
        dispatch(unlike(trackId, likeCount)); 
    } else {
        const errors = await response.json(); 
        console.log(errors);
        return errors;
    }
};


export const likeCount = (trackId) => async (dispatch) => {
	const response = await fetch(`api/likes/tracks/${trackId}`, {
		method: 'GET',
	});

	if (response.ok) {
		const likes = await response.json();
        console.log(likes, 'liiiikkeeees')
		return likes;
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
            const {songId, likeCount } = action.payload;
            return {
                ...state,
                likedSongs: {
                  ...state.likedSongs,
                    [songId]: {
                        ...state.likedSongs[songId],
                        like: likeCount,
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
      
            return {
                ...state,
              
            };
        }
        default:
            return state;
    }
};

export default likes;
