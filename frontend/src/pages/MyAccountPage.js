import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerInfo, ammendCustomerAccount } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_AMMEND_PROFILE_REFRESH } from '../constants/customerConstants';
import MustContainItem from './MustContainItem';

export default function MyAccountPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

//
  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  const userInfo = useSelector((state) => state.userInfo);
  const { loading, error, pptuser } = userInfo;
  const userAmmendAccount = useSelector((state) => state.userAmmendAccount);
  const {
    success: successUpdate,
    error: errorAmmend,
    loading: loadingAmmend,
  } = userAmmendAccount;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!pptuser) {
      dispatch({ type: CUSTOMER_AMMEND_PROFILE_REFRESH });
      dispatch(customerInfo(pptUserDetails._id));
    } else {
      setName(pptuser.name);
      setEmail(pptuser.email);
    }
  }, [dispatch, pptUserDetails._id, pptuser]);
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !==  confirmPassword) {
      e.preventDefault();
      alert('Password and confirm password are not matching');
    } 
     else {
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
  const [containsLowercase, setContainsLowercase] = useState(false) // lowercase letter
  const [containsUppercase, setContainsUppercase] = useState(false) // uppercase letter
  const [containsNumber, setContainsNumber] = useState(false) // number
  const [containsCharacter, setContainsCharacter] = useState(false) // special character
  const [contains8Characters, setContains8Characters] = useState(false) // min 8 characters

  // checks all validations are true
  const [allValid, setAllValid] = useState(false)

  // labels and state boolean corresponding to each validation
  const mustContainData = [
    ["A lowercase letter (a-z)", containsLowercase],
    ["An uppercase letter (A-Z)", containsUppercase],
    ["A special character (!@#$)", containsCharacter],
    ["A number (0-9)", containsNumber],
    ["At least 8 characters", contains8Characters],
  ]

  const validatePassword = () => {
    // has uppercase letter
    if (password.toLowerCase() !== password) setContainsLowercase(true)
    else setContainsLowercase(false)

    // has lowercase letter
    if (password.toUpperCase() !== password) setContainsUppercase(true)
    else setContainsUppercase(false)

    // has special character
    if (/[~`!#$%^&*+=\-[@';,/{}|":<>?]/g.test(password)) setContainsCharacter(true)
    else setContainsCharacter(false)

    // has number
    if (/\d/.test(password)) setContainsNumber(true)
    else setContainsNumber(false)

    // has 8 characters
    if (password.length >= 8) setContains8Characters(true)
    else setContains8Characters(false)

    // all validations passed
    if (containsLowercase && containsUppercase && containsNumber  && containsCharacter && contains8Characters) setAllValid(true)
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
            {loadingAmmend && <LoadingBox></LoadingBox>}
            {errorAmmend && (
              <MessageBox variant="danger">{errorAmmend}</MessageBox>
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
                value={password}
                onKeyUp={validatePassword}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onKeyUp={validatePassword}
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>

                <div>

              <label />
              <button className="primary" type="submit" disabled={!allValid}>
                Update
              </button>
            </div>
          </>
        )}
                <div className='row center'>
                <div>
              {mustContainData.map(data=> <MustContainItem data={data}/>)}
              </div>
              </div>
      </form>
    </div>
  );
}
