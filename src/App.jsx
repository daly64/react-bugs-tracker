import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addBug} from './store/bugsSlice'
import BugsList from "./components/BugsList.jsx";

function App() {
    const dispatch = useDispatch()
    const bugs = useSelector(state => state.bugs)

    const add = () => {
        dispatch(addBug({description: 'ss'}))
    }
    return (<div>
        <h1>Hello world</h1>
        <h2>bugs length : {bugs.length}</h2>
        <BugsList bugs={bugs}/>
        <button onClick={add}>add</button>
    </div>)
}

export default App
