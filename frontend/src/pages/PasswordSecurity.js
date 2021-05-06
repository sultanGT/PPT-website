import React from 'react';

//Code used for security password from: https://github.com/cooljasonmelton/password-checklist/tree/master/src/components
import './UpdatePasswordContainer.css';

const PasswordSecurity = props => {//Reused edited code
    const { data } = props
    const label = data[0]
    const meetsReq = data[1]
    const setActive = () => {//Reused edited code
    const classArr = ["must-line"]
        if (meetsReq) classArr.push('cross-out')
        return classArr.join(' ')
    }

    return (
        <div className="MustContainItem">
            <div className="must-item">
                <li className="must-text">{label}</li>
                <div className={setActive()}></div> {/* reused edited */}</div>
        </div>
  );
}
export default PasswordSecurity; //Reused edited code

