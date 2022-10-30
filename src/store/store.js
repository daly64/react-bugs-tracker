import {configureStore} from "@reduxjs/toolkit"
import bugsReducer from './bugsSlice.js '

export default configureStore({
    reducer: {
        bugs:bugsReducer
    }
})