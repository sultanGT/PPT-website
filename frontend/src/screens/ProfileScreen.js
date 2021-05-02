import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerInfo, ammendCustomerAccount } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import MustContainItem from './MustContainItem';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, pptuser } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!pptuser) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(customerInfo(pptUserDetails._id));
    } else {
      setName(pptuser.name);
      setEmail(pptuser.email);
    }
  }, [dispatch, pptUserDetails._id, pptuser]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        ammendCustomerAccount({
          customerId: pptuser._id,
          name,
          email,
          password,
     
        })
      );
    }
  };

    //Validate Password code used from https://github.com/cooljasonmelton/password-checklist



  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false) // uppercase letter
  const [containsLL, setContainsLL] = useState(false) // lowercase letter
  const [containsN, setContainsN] = useState(false) // number
  const [containsSC, setContainsSC] = useState(false) // special character
  const [contains8C, setContains8C] = useState(false) // min 8 characters

  // checks all validations are true
  const [allValid, setAllValid] = useState(false)

  // labels and state boolean corresponding to each validation
  const mustContainData = [
    ["An lowercase letter (a-z)", containsUL],
    ["A uppercase letter (A-Z)", containsLL],
    ["A special character (!@#$)", containsSC],
    ["A number (0-9)", containsN],
    ["At least 8 characters", contains8C],
  ]

  const validatePassword = () => {
    // has uppercase letter
    if (password.toLowerCase() !== password) setContainsUL(true)
    else setContainsUL(false)

    // has lowercase letter
    if (password.toUpperCase() !== password) setContainsLL(true)
    else setContainsLL(false)

    // has special character
    if (/[~`!#$%^&*+=\-[@';,/{}|":<>?]/g.test(password)) setContainsSC(true)
    else setContainsSC(false)

    // has number
    if (/\d/.test(password)) setContainsN(true)
    else setContainsN(false)

    // has 8 characters
    if (password.length >= 8) setContains8C(true)
    else setContains8C(false)

    // all validations passed
    if (containsUL && containsLL && containsN  && containsSC && contains8C) setAllValid(true)
    else setAllValid(false)
  }

  return (
    <div className='pager'>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onKeyUp={validatePassword}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onKeyUp={validatePassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>

                <div>

              <label />
              <button className="primary" type="submit" disabled={!allValid}>
                Update
              </button>
              <div className='row center'>
                <div>
              {mustContainData.map(data=> <MustContainItem data={data}/>)}
              </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
