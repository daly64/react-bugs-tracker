import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addBug, getBugs,removeBug,resolveBug} from "./store2/bugsSlice.js";

// import {addBug, getBugs, removeBug, resolveBug} from "./store/action.js";

function App() {
    let bugs = useSelector(state => state.bugs.data)
    let error = useSelector(state => state.bugs.error)
    // const state = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBugs())

    }, [dispatch])

    const handleAdd = () => dispatch(addBug('hello'))
    const handleRemove = (id) => dispatch(removeBug(id))
    const handleResolve = (bug) => dispatch(resolveBug(bug))

    let bugsList = bugs && bugs.map(bug =>
        <li key={bug.id}>
            {bug.description}
            <button onClick={() => handleRemove(bug.id)}>remove</button>
            {bug.resolved ? 'yes' : 'no'}
            <button onClick={() => handleResolve(bug)}>resolve</button>
        </li>)

    return <>
        <h1>Hello world</h1>
        <input type="text"/>
        <button onClick={handleAdd}> add</button>
        <ul>{bugsList}</ul>
        <p>{error}</p>
    </>
}

export default App
