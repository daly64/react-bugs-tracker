// actions type
import axios from "axios";

const ADD_BUG = 'bugs/add'
const REMOVE_BUG = 'bugs/remove'
const RESOLVE_BUG = 'bugs/resolve'

const GET_BUGS = 'bugs/get';
const GET_BUGS_SUCCESS = 'bugs/getSuccess';
const GET_BUGS_FAILURE = 'bugs/getFailure';


// actions creators
const addBug = (description) => ({type: ADD_BUG, payload: {description}})
const removeBug = (id) => ({type: REMOVE_BUG, payload: {id}})
const resolveBug = (id) => ({type: RESOLVE_BUG, payload: {id}})

const getBugs = () => {
    return async (dispatch) => {     //nameless functions
        // Initial action dispatched
        dispatch({type: GET_BUGS})
        // Return promise with success and failure actions
        return await axios.get('http://localhost:3004/bugs').then(
            bugs => dispatch({type: GET_BUGS_SUCCESS, payload: bugs.data}),
            err => dispatch({type: GET_BUGS_FAILURE,payload: err})
        );
    };
};

export {ADD_BUG, REMOVE_BUG, RESOLVE_BUG, GET_BUGS, GET_BUGS_SUCCESS, GET_BUGS_FAILURE}
export {addBug, removeBug, resolveBug, getBugs}