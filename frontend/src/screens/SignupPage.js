import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/customerActions';
import { signup } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import MustContainItem from './MustContainItem';


//
export default function SignupPage(props) {
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
  
  const signupSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password));
  }

  const submitHandler = (e) => {
    if (password !==  confirmPassword) {
      alert('Password and confirm password are not matching');
    } else {
      e.preventDefault();
      
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
    
    <div className='row pager'>
      <form className="form wide" onSubmit={submitHandler}>
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

      <form className="form wide" onSubmit={signupSubmitHandler}>
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