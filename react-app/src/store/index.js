import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import songsReducer from "./songs";
import comments from './comments';
import playlists from "./playlists";
import likes from "./likes";
import playlistSongs from "./playlist-songs";


const rootReducer = combineReducers({
  session,
  songsReducer,
  comments,
  playlists,
  likes,
  playlistSongs,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
