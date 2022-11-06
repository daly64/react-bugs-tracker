// actions type
import axios from "axios";

const GET_BUGS = 'bugs/get'
const ADD_BUG = 'bugs/add'
const REMOVE_BUG = 'bugs/remove'
const RESOLVE_BUG = 'bugs/resolve'
const FAILURE = 'bugs/requestFailure';
const LOADING = 'bugs/requestLoading';


// actions creators

const addBug = (description) => {
    return async (dispatch) => {
        dispatch({type: LOADING})
        let bugToAdd = {id: Date.now(), description, resolved: false}
        return await axios.post('http://localhost:3004/bugs', bugToAdd).then(
            res => dispatch({type: ADD_BUG, payload: res.data}),
            err => dispatch({type: FAILURE, payload: err})
        )
    }
}
const removeBug = (id) => {
    return async (dispatch) => {
        dispatch({type: LOADING})
        return await axios.delete(`http://localhost:3004/bugs/${id}`).then(
            res => dispatch({type: REMOVE_BUG, payload: {id, data: res.data}}),
            err => dispatch({type: FAILURE, payload: err})
        )
    }
}
const resolveBug = (bug) => {
    return async (dispatch) => {
        dispatch({type: LOADING})
        // let bugToUpdate = (await axios.get(`http://localhost:3004/bugs/${id}`)).data
        let updatedBug = {...bug, resolved: !bug.resolved}
        return await axios.put(`http://localhost:3004/bugs/${bug.id}`, updatedBug).then(
            res => dispatch({type: RESOLVE_BUG, payload: {id: bug.id, data: res.data}}),
            err => dispatch({type: FAILURE, payload: err})
        )
    }
}

const getBugs = () => {
    return async (dispatch) => {
        dispatch({type: LOADING})
        return await axios.get('http://localhost:3004/bugs').then(
            bugs => dispatch({type: GET_BUGS, payload: bugs.data}),
            err => dispatch({type: FAILURE, payload: err})
        )
    }
}

export {
    ADD_BUG,
    LOADING,
    FAILURE,
    REMOVE_BUG,
    RESOLVE_BUG,
    GET_BUGS,
}
export {addBug, removeBug, resolveBug, getBugs}