import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/customerActions';
import { signup } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import './UpdatePasswordContainer.css';
import MustContainItem from './MustContainItem';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")





  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { 
    pptUserDetails:  user1, 
    loading: load1, 
    error:  error1,

  } = userRegister;

  const customerLogin = useSelector((state) => state.customerLogin);
  
  const { 
    pptUserDetails:  user2, 
    loading: load2, 
    error: error2,
   } = customerLogin;


  const dispatch = useDispatch();
  
  const submitHandler2 = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  const submitHandler = (e) => {
    if (password !==  confirmPassword) {
      alert('Password and confirm password are not matching');
    } else {
      e.preventDefault();
      dispatch(signup(name, email, password));
      dispatch(login(email, password));

    }
  };

  useEffect(() => {
    if (user2 || user1) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, user2, user1]);

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
    
    <div className='row pager'>
      <form className="form signupForm" onSubmit={submitHandler2}>
        <div>
          <h1>Sign In</h1> 
        </div>
        {load2 && <LoadingBox></LoadingBox>}
        {error2 && <MessageBox variant="danger">{error2}</MessageBox>}
        <div className=''>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
      </form>

      <form className="form signupForm" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {load1 && <LoadingBox></LoadingBox>}
        {error1 && <MessageBox variant="danger">{error1}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onKeyUp={validatePassword}
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Enter confirm password"
            onKeyUp={validatePassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" disabled={!allValid}>
            Register
          </button>
        </div>
        <div className='row center'>
                <div>
              {mustContainData.map(data=> <MustContainItem data={data}/>)}
              </div>
              </div>
      </form>

    </div>
  );
}
