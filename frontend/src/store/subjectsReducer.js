/******************************** IMPORTS ********************************/
// local files
import { csrfFetch } from "./csrf";
import { normalizeArray } from "../component-resources/index";


/********************************* TYPES *********************************/
const SUBJECTS_READ_ALL_SUBJECTS = 'SUBJECTS/READ_ALL_SUBJECTS';
const SUBJECTS_READ_SINGLE_SUBJECT_DETAILS = 'SUBJECTS/READ_SINGLE_SUBJECT_DETAILS';


/**************************** ACTION CREATORS ****************************/
export const actionReadAllSubjects = (allSubjects) => ({
    type: SUBJECTS_READ_ALL_SUBJECTS,
    payload: allSubjects
});

export const actionReadSingleSubjectDetails = (singleSubjectDetails) => ({
    type: SUBJECTS_READ_SINGLE_SUBJECT_DETAILS,
    payload: singleSubjectDetails
});


/***************************** THUNKS (API) ******************************/
export const thunkReadAllSubjects = () => async (dispatch) => {
    const response = await csrfFetch(`/api/subjects`);
    if (response.ok) {
        const allSubjects = await response.json();
        dispatch(actionReadAllSubjects(allSubjects.Subjects));
        return allSubjects;
    };
};

export const thunkReadSingleSubjectDetails = (subjectId) => async (dispatch) => {
    const response = await csrfFetch(`/api/subjects/${subjectId}/videos`);
    if (response.ok) {
        const singleSubjectDetails = await response.json();
        dispatch(actionReadSingleSubjectDetails(singleSubjectDetails));
        return singleSubjectDetails;
    };
};


/***************************** STATE SHAPE *******************************/
const initialState = {
    allSubjects: {},
    singleSubjectDetails: {
        Videos: [],
    },
};


/******************************* REDUCER *********************************/
const subjectsReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {

        case SUBJECTS_READ_ALL_SUBJECTS:
            newState.allSubjects = [...action.payload];
            newState.singleSubjectDetails = {...state.singleSubjectDetails};
            // newState.singleSubjectDetails.Videos = [...state.singleSubjectDetails.Videos];
            // newState.allSubjects = JSON.parse(JSON.stringify(action.payload));
            // newState.singleSubjectDetails =  JSON.parse(JSON.stringify(state.singleSubjectDetails));
            return newState;

        case SUBJECTS_READ_SINGLE_SUBJECT_DETAILS:
            newState.allSubjects = [...state.allSubjects];
            newState.singleSubjectDetails = {...action.payload};
            newState.singleSubjectDetails.Videos = [...action.payload.Videos];
            return newState;

        default:
            return newState;
    };
};


/******************************** EXPORTS ********************************/
export default subjectsReducer;
