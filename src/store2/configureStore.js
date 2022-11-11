import {configureStore} from "@reduxjs/toolkit";
import bugsReducer from './bugsSlice.js'
import projectsReducer from './projectsSlice.js'
import thunk from "redux-thunk";

const store = configureStore({
    reducer: {
        bugs: bugsReducer,
        projects: projectsReducer,
    },
    middleware:[thunk]
})
export default store