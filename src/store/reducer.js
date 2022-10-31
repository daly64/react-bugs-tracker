import {ADD_BUG, REMOVE_BUG, RESOLVE_BUG} from "./action.js";

let bugs=[
    {id: 0, description: 'bug0', resolved: false},
    {id: 1, description: 'bug1', resolved: false},
    {id: 2, description: 'bug2', resolved: false},
    {id: 3, description: 'bug3', resolved: false},
    {id: 4, description: 'bug4', resolved: false},
]
export default function reducer(state = bugs, action) {
    let ID = state.length
    switch (action.type) {
        case ADD_BUG:
            return [...state, {id: ++ID, description: action.payload.description, resolved: false}]
        case REMOVE_BUG:
            return state.filter(bug => bug.id !== action.payload.id)
        case RESOLVE_BUG:
            return state.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
        default:
            return state
    }


}