/******************************** IMPORTS ********************************/
// libraries
import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// local files
import commentsReducer from "./commentsReducer";
import sessionReducer from "./sessionReducer";
import subjectsReducer from "./subjectsReducer";
import videosReducer from "./videosReducer";


/******************************* REDUCER *********************************/
const rootReducer = combineReducers({
  session: sessionReducer,
  subjects: subjectsReducer,
  videos: videosReducer,
  comments: commentsReducer,
});


/*********************** CONDITIONAL COMPONENTS **************************/
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


/******************************** EXPORTS ********************************/
export default configureStore;
