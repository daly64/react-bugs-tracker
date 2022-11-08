import {configureStore} from "@reduxjs/toolkit";
import bugsReducer from './bugsSlice.js'
import thunk from "redux-thunk";

const store = configureStore({
    reducer: {
        bugs: bugsReducer
    },
    middleware:[thunk]
})
export default store