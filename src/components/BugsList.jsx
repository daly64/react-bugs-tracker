import React from 'react';
import BugComponent from "./BugComponent.jsx";

function BugsList({bugs}) {
    return (
        bugs.map(bug => (
            <BugComponent key={bug.id} bug={bug}></BugComponent>
        ))
    )

}

export default BugsList;