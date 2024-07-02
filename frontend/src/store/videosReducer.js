/******************************** IMPORTS ********************************/
// local files
import { csrfFetch } from "./csrf";
import { normalizeArray } from "../component-resources/index";


/********************************* TYPES *********************************/
const VIDEOS_CREATE_SINGLE_VIDEO = 'videos/CREATE_SINGLE_VIDEO';
const VIDEOS_READ_ALL_VIDEOS = 'videos/READ_ALL_VIDEOS';
const VIDEOS_READ_ALL_USER_VIDEOS = 'videos/READ_ALL_USER_VIDEOS';
const VIDEOS_READ_SINGLE_VIDEO_DETAILS = 'videos/READ_SINGLE_VIDEO_DETAILS';
const VIDEOS_READ_SINGLE_VIDEO_COMMENTS = 'videos/READ_SINGLE_VIDEO_COMMENTS';
const VIDEOS_UPDATE_SINGLE_VIDEO = 'videos/UPDATE_SINGLE_VIDEO'
const VIDEOS_DELETE_SINGLE_VIDEO = 'videos/DELETE_SINGLE_VIDEO';


/**************************** ACTION CREATORS ****************************/
export const actionCreateSingleVideo = (newVideo) => ({
    type: VIDEOS_CREATE_SINGLE_VIDEO,
    payload: newVideo
});

export const actionReadAllVideos = (videos) => ({
    type: VIDEOS_READ_ALL_VIDEOS,
    payload: videos
});

export const actionReadAllUserVideos = (userVideos) => ({
    type: VIDEOS_READ_ALL_USER_VIDEOS,
    payload: userVideos
});

export const actionReadSingleVideoDetails = (singleVideoDetails) => ({
    type: VIDEOS_READ_SINGLE_VIDEO_DETAILS,
    payload: singleVideoDetails
});

export const actionReadSingleVideoComments = (singleVideoComments) => ({
    type: VIDEOS_READ_SINGLE_VIDEO_COMMENTS,
    payload: singleVideoComments
});

export const actionUpdateSingleVideo = (updateVideo) => ({
    type: VIDEOS_UPDATE_SINGLE_VIDEO,
    payload: updateVideo
});

export const actionDeleteSingleVideo = (videoId) => ({
    type: VIDEOS_DELETE_SINGLE_VIDEO,
    payload: videoId
});


/***************************** THUNKS (API) ******************************/
export const thunkCreateSingleVideo = (createVideoData) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(createVideoData)
    });
    if (response.ok) {
        const newVideo = await response.json();
        dispatch(actionCreateSingleVideo(newVideo));
        return newVideo;
    };
};

export const thunkReadAllVideos = () => async (dispatch) => {
    const response = await csrfFetch(`/api/videos`);
    if (response.ok) {
        const videos = await response.json();
        dispatch(actionReadAllVideos(videos.Videos));
        return videos;
    };
};

export const thunkReadAllUserVideos = () => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/current`);
    if (response.ok) {
        const userVideos = await response.json();
        dispatch(actionReadAllUserVideos(userVideos.Videos));
        return userVideos.Videos;
    };
};

export const thunkReadSingleVideoDetails = (videoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${videoId}`);
    if (response.ok) {
        const singleVideoDetails = await response.json();
        dispatch(actionReadSingleVideoDetails(singleVideoDetails))
        return singleVideoDetails;
    }
}

export const thunkReadSingleVideoComments = (videoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${videoId}/comments`);
    if (response.ok) {
        const singleVideoComments = await response.json();
        dispatch(actionReadSingleVideoComments(singleVideoComments.Comments))
        return singleVideoComments;
    }
}

export const thunkUpdateSingleVideo = (videoId, updateVideoData) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${videoId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateVideoData)
    });
    if (response.ok) {
        const updateVideo = await response.json()
        dispatch(actionUpdateSingleVideo(updateVideo))
        return updateVideo;
    }
}

export const thunkDeleteSingleVideo = (videoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${videoId}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(actionDeleteSingleVideo(videoId))
        return response;
    }
}


/***************************** STATE SHAPE *******************************/
const initialState = {
    allVideos: {},
    allUserVideos: [],
    singleVideoDetails: {
        User: {},
        Subject: {},
    },
    singleVideoComments: {},
}


/******************************* REDUCER *********************************/
const videosReducer = (state = initialState, action) => {

    let newState = {...state};

    switch (action.type) {

        case VIDEOS_CREATE_SINGLE_VIDEO:
            newState.allVideos = {...state.allVideos};
            newState.allVideos[action.payload.id] = {...action.payload}
            newState.allVideos[action.payload.id].User = {...action.payload.User}
            newState.allUserVideos = [...state.allUserVideos];
            newState.allUserVideos.push(action.payload);
            newState.singleVideoDetails = {...state.singleVideoDetails};
                newState.singleVideoDetails.User = {...state.singleVideoDetails.User};
                newState.singleVideoDetails.Subject = {...state.singleVideoDetails.Subject};
            newState.singleVideoComments = {...state.singleVideoComments};
            return newState;

        case VIDEOS_READ_ALL_VIDEOS:
            newState.allVideos = normalizeArray(action.payload);
            newState.allUserVideos = [...state.allUserVideos];
            newState.singleVideoDetails = {...state.singleVideoDetails};
                newState.singleVideoDetails.User = {...state.singleVideoDetails.User};
                newState.singleVideoDetails.Subject = {...state.singleVideoDetails.Subject};
            newState.singleVideoComments = {...state.singleVideoComments};
            return newState;

        case VIDEOS_READ_ALL_USER_VIDEOS:
            newState.allVideos = {...state.allVideos};
            newState.allUserVideos = [...action.payload];
            newState.singleVideoDetails = {...state.singleVideoDetails};
                newState.singleVideoDetails.User = {...state.singleVideoDetails.User};
                newState.singleVideoDetails.Subject = {...state.singleVideoDetails.Subject};
            newState.singleVideoComments = {...state.singleVideoComments};
            return newState;

        case VIDEOS_READ_SINGLE_VIDEO_DETAILS:
            newState.allVideos = {...state.allVideos};
            newState.allUserVideos = [...state.allUserVideos];
            newState.singleVideoDetails = {...action.payload};
            newState.singleVideoComments = {...state.singleVideoComments};
            return newState;

        case VIDEOS_READ_SINGLE_VIDEO_COMMENTS:
            newState.allVideos = {...state.allVideos};
            newState.allUserVideos = [...state.allUserVideos];
            newState.singleVideoDetails = {...state.singleVideoDetails};
                newState.singleVideoDetails.User = {...state.singleVideoDetails.User};
                newState.singleVideoDetails.Subject = {...state.singleVideoDetails.Subject};
            newState.singleVideoComments = normalizeArray(action.payload);
            return newState;

        case VIDEOS_UPDATE_SINGLE_VIDEO:
            newState.allVideos = {...state.allVideos};
            newState.allVideos[action.payload.id] = {...action.payload}
            newState.allVideos[action.payload.id].User = {...action.payload.User}
            newState.allUserVideos = [...state.allUserVideos];
            newState.allUserVideos.push(action.payload);
            newState.singleVideoDetails = {...state.singleVideoDetails};
                newState.singleVideoDetails.User = {...state.singleVideoDetails.User};
                newState.singleVideoDetails.Subject = {...state.singleVideoDetails.Subject};
            newState.singleVideoComments = {...state.singleVideoComments};
            return newState;

        case VIDEOS_DELETE_SINGLE_VIDEO:
            newState.allVideos = {...state.allVideos};
            delete newState.allVideos[action.payload]
            newState.allUserVideos = [...state.allUserVideos];
            newState.allUserVideos = newState.allUserVideos.filter(vid => vid.id !== action.payload);
            newState.singleVideoDetails = {...state.singleVideoDetails};
                newState.singleVideoDetails.User = {...state.singleVideoDetails.User};
                newState.singleVideoDetails.Subject = {...state.singleVideoDetails.Subject};
            newState.singleVideoComments = {...state.singleVideoComments};
            return newState;

        default:
            return state;
    };
};


/******************************** EXPORTS ********************************/
export default videosReducer;
