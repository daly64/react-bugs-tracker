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
const updateBug = createAsyncThunk(
    'bugs/update',
    async (bug, {rejectWithValue}) => {
        try {
            let updatedBug = {...bug}
            await axios.put(`http://localhost:3004/bugs/${bug.id}`, updatedBug)
            return updatedBug
        } catch (err) {
            return rejectWithValue(err.message)
        }
    })


const bugsSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(PENDING, (state) => pending(state))
            .addCase(REJECTED, (state, {payload}) => rejected(payload, state))
            .addCase(GET_FULFILLED, (state, {payload}) => get(payload, state))
            .addCase(ADD_FULFILLED, (state, {payload}) => add(payload, state))
            .addCase(REMOVE_FULFILLED, (state, {payload}) => remove(payload, state))
            .addCase(UPDATE_FULFILLED, (state, {payload}) => update(payload, state))


    }
})

let PENDING = getBugs.pending || addBug.pending || removeBug.pending
let REJECTED = getBugs.rejected || addBug.rejected || removeBug.rejected
let GET_FULFILLED = getBugs.fulfilled
let ADD_FULFILLED = addBug.fulfilled
let REMOVE_FULFILLED = removeBug.fulfilled
let UPDATE_FULFILLED = updateBug.fulfilled

const pending = (state) => ({...state, isLoading: true})
const rejected = (error, state) => ({...state, isLoading: false, error})
const get = (bugs, state) => ({...state, isLoading: false, data: bugs})

const add = (toAddBug, state) => ({...state, data: [...state.data, toAddBug]})
const update = (updatedBug, state) => ({
    ...state,
    data: state.data.map(oldBug => oldBug.id === updatedBug.id ? updatedBug : oldBug)
})
const remove = (deleteId, state) => ({...state, data: state.data.filter(bug => bug.id !== deleteId)})


export const {} = bugsSlice.actions
export {getBugs, addBug, removeBug, updateBug}

export default bugsSlice.reducer