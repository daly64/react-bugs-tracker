import React from 'react';
import {useDispatch} from "react-redux";
import {removeBug, resolveBug} from "../store/bugsSlice.js";

const BugComponent = ({bug}) => {
    const dispatch = useDispatch()
    const toggleResole = () => dispatch(resolveBug({id: bug.id}))
    const toggleRemove = () => dispatch(removeBug({id: bug.id}))

    return <div>
        <p>{bug.id} {bug.description} {bug.resolved ? 'yes' : 'no'}</p>
        <button onClick={toggleResole}>toggle resolve</button>
        <button onClick={toggleRemove}> remove</button>

    </div>

}

export default BugComponent;