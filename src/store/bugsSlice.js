import {createSlice} from '@reduxjs/toolkit'


let name = 'Bugs'
let initialState = [
    {id: 0, description: 'bug1', resolved: false},
    {id: 1, description: 'bug2', resolved: false},
    {id: 2, description: 'bug3', resolved: false},
    {id: 3, description: 'bug4', resolved: false},
    {id: 4, description: 'bug5', resolved: true}
]
let lastID = initialState.length - 1
const Slice = createSlice({
    name,
    initialState,
    reducers: {
        addBug: (bugs, {payload}) => {
            bugs.push({id: ++lastID, description: payload.description, resolved: false})
        },
        removeBug: (bugs, {payload}) => bugs.filter(bug => bug.id !== payload.id),
        resolveBug: (bugs, {payload}) => bugs.map(bug => bug.id === payload.id
            ? {...bug, resolved: !bug.resolved} : bug)
    }
})

export const {addBug, removeBug, resolveBug} = Slice.actions
export default Slice.reducer
