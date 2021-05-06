import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/customerActions';
import { signup } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import PasswordSecurity from './PasswordSecurity';
import GoogleLogin from 'react-google-login';


//
export default function SignupPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { 
    userDetails:  user1, 
    loading: load1, 
    error:  error1,

  } = userRegister;

  const customerLogin = useSelector((state) => state.customerLogin);
  
  const { 
    userDetails:  user2, 
    loading: load2, 
    error: error2,
   } = customerLogin;

  const dispatch = useDispatch();
  
  const signuploginSubmitHandler = (e) => {
    if (password2 !==  confirmPassword) {
      alert('Password and confirm password are not matching');
    } else {
    e.preventDefault();
    dispatch(signup(name, email, password2));
    }
  }

  const loginSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
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
    ["An uppercase letter (A-Z)", containsLowercase],
    ["A lowercase letter (a-z)", containsUppercase],
    ["A special character (!@#$...)", containsCharacter],
    ["A number (0-9)", containsNumber],
    ["At least 8 characters", contains8Characters],
  ]

  

  const validatePassword = () => {
    // has uppercase letter
    if (password2.toLowerCase() !== password2) setContainsLowercase(true)
    else setContainsLowercase(false)

    // has lowercase letter
    if (password2.toUpperCase() !== password2) setContainsUppercase(true)
    else setContainsUppercase(false)

    // has special character
    if (/[~`!#$%^&*+=\-[@';,/{}|":<>?]/g.test(password2)) setContainsCharacter(true)
    else setContainsCharacter(false)

    // has number
    if (/\d/.test(password2)) setContainsNumber(true)
    else setContainsNumber(false)

    // has 8 characters
    if (password2.length >= 8) setContains8Characters(true)
    else setContains8Characters(false)

    // all validations passed
    if (containsLowercase && containsUppercase && containsNumber  && containsCharacter && contains8Characters) setAllValid(true)
    else setAllValid(false)
  }

  //google id


  const loginResponseGoogle = (response) => {
    
    setEmail(response.profileObj.email);
    setPassword(response.profileObj.googleId);
    dispatch(login(email, password));

  }


  const signupResponseGoogle = (response) => {
    setName(response.profileObj.givenName);
    setEmail(response.profileObj.email);
    setPassword2(response.profileObj.googleId);
    setConfirmPassword(response.profileObj.googleId);
    dispatch(signup(name, email, password2));
  }



  
  return (

    
    
    <div className='row pager'>
      <form autoComplete="username" className="form wide" onSubmit={loginSubmitHandler}>
      <div className='row center'>
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
            autoComplete="username"
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
            autoComplete="username"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
        <div className='row google-form'>
        <GoogleLogin className='google-button'
          clientId="714794464338-1d4era4sfqk47117qvk53deeiujvu68h.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={loginResponseGoogle}
          onFailure={loginResponseGoogle}
          cookiePolicy={'single_host_origin'}
        />
         <p>OR</p>
          <button className="primary half" type="submit">
            Sign In
          </button>
        </div>
        </div>
      </form>

      <form autoComplete="new-password" className="form wide" onSubmit={signuploginSubmitHandler}>
        <div className='row center'>
          <h1>Create Account</h1>
        </div>
        {load1 && <LoadingBox></LoadingBox>}
        {error1 && <MessageBox variant="danger">{error1}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            autoComplete="new-password"
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
            autoComplete="new-password"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password2">Password</label>
          <input
            type="password"
            id="password2"
            value={password2}
            autoComplete="new-password"
            onKeyUp={validatePassword}
            placeholder="Enter password"
            required
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            autoComplete="new-password"
            placeholder="Enter confirm password"
            onKeyUp={validatePassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>

          <label />
        <div className='row google-form'>
        <GoogleLogin className='google-button'
          clientId="714794464338-1d4era4sfqk47117qvk53deeiujvu68h.apps.googleusercontent.com"
          buttonText="Signup with Google"
          onSuccess={signupResponseGoogle}
          onFailure={signupResponseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <p>OR</p>
          <button className="primary half" type="submit" disabled={!allValid}>
            Sign up
          </button>
        </div>
        </div>
        <div className='row center'>
                <div>
              {mustContainData.map(data=> <PasswordSecurity data={data}/>)}
              </div>
              </div>
      </form>

    </div>
  );
}