import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

//project object
let project = (name, bugs = [], progress = 0) => ({id: Date.now(), name, bugs, progress})

// base url
let baseURL = 'http://localhost:3004/projects'

let name = 'Projects'
let initialState = {isLoading: false, data: [], error: ''}

const requestProjects = async (config, {rejectWithValue}) => {
    try {
        return (await axios.request(config)).data
    } catch (err) {
        return rejectWithValue(err.message)
    }
}
const getProjects = createAsyncThunk(
    'projects/get',
    async (arg, {rejectWithValue}) => {
        let config = {baseURL, method: 'GET', data: {}}
        return await requestProjects(config, {rejectWithValue})
    })
const addProject = createAsyncThunk(
    'projects/add',
    async (name, {rejectWithValue}) => {
        let config = {baseURL, method: 'POST', data: project(name)}
        return await requestProjects(config, {rejectWithValue})
    })
const removeProject = createAsyncThunk(
    'projects/remove',
    async (id, {rejectWithValue}) => {
        let config = {baseURL: `${baseURL}/${id}`, method: 'DELETE', data: {}}
        await requestProjects(config, {rejectWithValue})
        return id
    })

const updateProject = createAsyncThunk(
    'projects/update',
    async (project, {rejectWithValue}) => {
        let config = {baseURL: `${baseURL}/${bug.id}`, method: 'PUT', data: project}
        await requestProjects(config, {rejectWithValue})
        return project
    })


const projectsSlice = createSlice({
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

let PENDING = getProjects.pending || addProject.pending || removeProject.pending
let REJECTED = getProjects.rejected || addProject.rejected || removeProject.rejected
let GET_FULFILLED = getProjects.fulfilled
let ADD_FULFILLED = addProject.fulfilled
let REMOVE_FULFILLED = removeProject.fulfilled
let UPDATE_FULFILLED = updateProject.fulfilled

const pending = (state) => ({...state, isLoading: true})
const rejected = (error, state) => ({...state, isLoading: false, error})
const get = (bugs, state) => ({...state, isLoading: false, data: bugs})

const add = (toAddProject, state) => ({...state, data: [...state.data, toAddProject]})
const updateData = (updatedProject, state) => state.data.map(oldProject => oldProject.id === updatedProject.id ? updatedProject : oldProject)
const update = (updatedProject, state) => ({...state, data: updateData(updatedProject, state)})
const remove = (deleteId, state) => ({...state, data: state.data.filter(project => project.id !== deleteId)})


// export const {} = projectsSlice.actions
export {getProjects, addProject, removeProject, updateProject}

export default projectsSlice.reducer