// actions type
import axios from "axios";

const ADD_BUG = 'bugs/add'

const FAILURE = 'bugs/requestFailure';
const LOADING = 'bugs/requestLoading';


const REMOVE_BUG = 'bugs/remove'
const RESOLVE_BUG = 'bugs/resolve'

const GET_BUGS = 'bugs/get'


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
            res => dispatch({type: REMOVE_BUG, payload: {id}}),
            err => dispatch({type: FAILURE, payload: err})
        )
    }
}
const resolveBug = (id) => {
    return async (dispatch) => {
        dispatch({type: LOADING})
        let bugToUpdate = (await axios.get(`http://localhost:3004/bugs/${id}`)).data
        let updatedBug = {...bugToUpdate, resolved: true}
        return await axios.put(`http://localhost:3004/bugs/${id}`, updatedBug).then(
            res => dispatch({type: RESOLVE_BUG, payload: {id}}),
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