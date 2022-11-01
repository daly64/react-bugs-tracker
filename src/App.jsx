import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addBug, getBugs, removeBug, resolveBug} from "./store/action.js";

function App() {
    const bugs = useSelector(state => state.data)
    // const bugs = []
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBugs())
    }, [dispatch])

    const handleAdd = () => dispatch(addBug('hello'))
    const handleRemove = (id) => dispatch(removeBug(id))
    const handleResolve = (id) => dispatch(resolveBug(id))

    let bugsList = bugs ? bugs.map(bug =>
        <li value={bug.id} key={bug.id}>
            {bug.description}
            <button onClick={() => handleRemove(bug.id)}>remove</button>
            {bug.resolved ? 'yes' : 'no'}
            <button onClick={() => handleResolve(bug.id)}>resolve</button>
        </li>) : <></>

    return <>
        <h1>Hello world</h1>
        <input type="text"/>
        <button onClick={handleAdd}> add</button>
        <ol>{bugsList}</ol>
    </>
}

export default App
