/******************************** IMPORTS ********************************/
// local files
import { csrfFetch } from "./csrf";


/********************************* TYPES *********************************/
const COMMENTS_CREATE_SINGLE_COMMENT = 'comments/CREATE_SINGLE_COMMENT';
const COMMENTS_UPDATE_SINGLE_COMMENT = 'comments/UPDATE_SINGLE_COMMENT';
const COMMENTS_DELETE_SINGLE_COMMENT = 'comments/DELETE_SINGLE_COMMENT';


/**************************** ACTION CREATORS ****************************/
export const actionCreateSingleComment = (newComment) => ({
    type: COMMENTS_CREATE_SINGLE_COMMENT,
    payload: newComment
});

export const actionUpdateSingleComment = (updateComment) => ({
    type: COMMENTS_UPDATE_SINGLE_COMMENT,
    payload: updateComment
});

export const actionDeleteSingleComment = (reviewId) => ({
    type: COMMENTS_DELETE_SINGLE_COMMENT,
    payload: reviewId
});


/***************************** THUNKS (API) ******************************/
export const thunkCreateSingleComment = (videoId, commentData) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${videoId}/comments`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(commentData)
    });
    if (response.ok) {
        const newComment = await response.json();
        dispatch(actionCreateSingleComment(newComment));
        return newComment;
    };
};

export const thunkUpdateSingleComment = (reviewId, updateCommentData) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${reviewId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(updateCommentData)
    });
    if (response.ok) {
        const updateComment = await response.json();
        dispatch(actionUpdateSingleComment(updateComment));
        return updateComment;
    };
};

export const thunkDeleteSingleComment = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${reviewId}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(actionDeleteSingleComment(reviewId))
        return
    };
};


/***************************** STATE SHAPE *******************************/
const initialState = {
    comments: {}
};


/******************************* REDUCER *********************************/
const commentsReducer = (state = initialState, action) => {

    let newState = { ...state };

    switch (action.type) {

        case COMMENTS_CREATE_SINGLE_COMMENT:
            newState.comments = {...state.comments};
            newState[action.payload.id] = {...action.payload};
            return newState;

        case COMMENTS_UPDATE_SINGLE_COMMENT:
            newState.comments = { ...state.comments };
            newState.comments[action.payload.id] = { ...action.payload };
            return newState;

        case COMMENTS_DELETE_SINGLE_COMMENT:
            newState.comments = { ...state.comments };
            delete newState.comments.reviewId;
            return newState;

        default:
            return state;
    };
};


/******************************** EXPORTS ********************************/
export default commentsReducer;
