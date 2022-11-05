import {ADD_BUG, FAILURE, GET_BUGS, LOADING, REMOVE_BUG, RESOLVE_BUG} from "./action.js";

let bugs = {
    isLoading: false,
    data: [],
    error: ''
}

// reducer
export default function reducer(state = bugs, action) {
    switch (action.type) {
        case RESOLVE_BUG:
            let updatedData = state.data.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
            return state = {...state, data: [...updatedData]}
        case REMOVE_BUG:
            let dataAfterRemove = state.data.filter(bug => bug.id !== action.payload.id)
            return state = {...state, data: [...dataAfterRemove]}
        case GET_BUGS:
            return state = {...state, data: [...action.payload]}
        case ADD_BUG:
            return {...state, data: [...state.data, action.payload]}
        case LOADING:
            return state = {...state, isLoading: true}
        case FAILURE:
            return state = {...state, error: action.payload.message}

        default:
            return state
    }


}