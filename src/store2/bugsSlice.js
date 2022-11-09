import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

let name = 'Bugs'
let initialState = {isLoading: false, data: [], error: ''}


const getBugs = createAsyncThunk(
    'bugs/get',
    async (arg, {rejectWithValue}) => {
        try {
            return (await axios.get('http://localhost:3004/bugs')).data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    })
const addBug = createAsyncThunk(
    'bugs/add',
    async (description, {rejectWithValue}) => {
        try {
            let bugToAdd = {id: Date.now(), description: description, resolved: false}

            await axios.post('http://localhost:3004/bugs', bugToAdd)
            return bugToAdd
        } catch (err) {
            return rejectWithValue(err.message)
        }
    })
const removeBug = createAsyncThunk(
    'bugs/remove',
    async (id, {rejectWithValue}) => {
        try {
            await axios.delete(`http://localhost:3004/bugs/${id}`)
            return id
        } catch (err) {
            return rejectWithValue(err.message)
        }
    })
const resolveBug = createAsyncThunk(
    'bugs/resolved',
    async (bug, {rejectWithValue}) => {
        try {
            let updatedBug = {...bug, resolved: !bug.resolved}
            await axios.put(`http://localhost:3004/bugs/${bug.id}`, updatedBug)
            return updatedBug
        } catch (err) {
            return rejectWithValue(err.message)
        }
    })


/*
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
*/


const bugsSlice = createSlice({
    name,
    initialState,
    reducers: {
        /* getBugs: (state, {payload}) => {
         },
           addBug: (state, {payload}) => {
         },
         removeBug: (state, {payload}) => {
         },
         resolveBug: (state, {payload}) => {
         }*/
    },
    extraReducers: builder => {
        builder
            .addCase(
                getBugs.pending || addBug.pending || removeBug.pending,
                (state) => ({...state, isLoading: true}))
            .addCase(getBugs.rejected || addBug.rejected || removeBug.rejected,
                (state, {payload}) => ({...state, isLoading: false, error: payload}))
            .addCase(getBugs.fulfilled, (state, {payload}) => ({...state, isLoading: false, data: payload}))
            .addCase(addBug.fulfilled, (state, {payload}) => ({...state, data: [...state.data, payload]}))
            .addCase(removeBug.fulfilled, (state, {payload}) => ({
                ...state,
                data: [...state.data.filter(bug => bug.id !== payload)]
            }))
            .addCase(resolveBug.fulfilled, (state, {payload}) => {
                let updatedData = state.data.map(bug => bug.id === payload.id ? {...bug, resolved: !bug.resolved} : bug)
                return {...state, data: [...updatedData]}
            })


    }
})
export const {} = bugsSlice.actions
export {getBugs, addBug, removeBug, resolveBug}

export default bugsSlice.reducer