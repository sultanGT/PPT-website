import React from 'react';

//Code used for security password from: https://github.com/cooljasonmelton/password-checklist/tree/master/src/components
import './UpdatePasswordContainer.css';

const MustContainItem = props => {
    const { data } = props
    const label = data[0]
    const meetsReq = data[1]

    const setClass = () => {
        const classArr = ["must-line"]
        if (meetsReq) classArr.push('cross-out')
        return classArr.join(' ')
    }

    return (
        <div className="MustContainItem">
            <div className="must-item">
                <li className="must-text">{label}</li>
                <div className={setClass()}></div>
            </div>
        </div>
  );
}

export default MustContainItem;

