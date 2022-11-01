import {ADD_BUG, GET_BUGS, GET_BUGS_FAILURE, GET_BUGS_SUCCESS, REMOVE_BUG, RESOLVE_BUG} from "./action.js";

let bugs = {
    isLoading: false,
    data: [],
    error: ''
}

/* [
 /*  {id: 0, description: 'bug0', resolved: false},
     {id: 1, description: 'bug1', resolved: false},
     {id: 2, description: 'bug2', resolved: false},
     {id: 3, description: 'bug3', resolved: false},
     {id: 4, description: 'bug4', resolved: false},
]*/
// reducer
export default function reducer(state = bugs, action) {
    let ID = state.length
    switch (action.type) {
        case ADD_BUG:
            return [...state.data, {id: ++ID, description: action.payload.description, resolved: false}]
        case REMOVE_BUG:
            return state.data.filter(bug => bug.id !== action.payload.id)
        case RESOLVE_BUG:
            return state.data.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
        case GET_BUGS:
            return state = {
                isLoading: true,
                data: [],
                error: ''
            }
        case GET_BUGS_SUCCESS:
            return state = {
                isLoading: false,
                data: [...action.payload],
                error: ''
            }
        case GET_BUGS_FAILURE:
            return state = {
                isLoading: false,
                data: [],
                error: action.payload
            }
        default:
            return state
    }


}