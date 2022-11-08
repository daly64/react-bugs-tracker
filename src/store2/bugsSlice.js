import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

let name = 'Bugs'
let initialState = {isLoading: false, data: [], error: ''}

/*export const getBugs = createAsyncThunk(
    'bugs/get',
    async () => (await axios.get('http://localhost:3004/bugs')).data)*/


/*export const getBugs = createAsyncThunk(
    "bugs/get",
    async () => await axios.get('http://localhost:3004/bugs').then(
        bugs => bugs.data, err => err)
);*/

export const getBugs = createAsyncThunk(
    'bugs/get',
    async (data, {rejectWithValue}) => {

        try {
            return (await axios.get('http://localhost:3004/bugs')).data
        } catch (err) {
            return rejectWithValue(err.message)
        }


    }
)

const bugsSlice = createSlice({
    name,
    initialState,
    reducers: {
        /*getBugs: (state, {payload}) => {
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
            .addCase(getBugs.pending, (state) => ({...state, isLoading: true}))
            .addCase(getBugs.rejected, (state, {payload}) => ({...state, isLoading: false, error: payload}))
            .addCase(getBugs.fulfilled, (state, {payload}) => ({...state, isLoading: false, data: payload}))

    }
})
export const {addBug, removeBug, resolveBug} = bugsSlice.actions
export default bugsSlice.reducer