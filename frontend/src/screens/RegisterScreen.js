import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/customerActions';
import { signup } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

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
  
  const signupSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  const submitHandler = (e) => {
    if (password !==  confirmPassword) {
      e.preventDefault();
        alert('Password and confirm password are not matching');
    } 
      else if (password.toLowerCase() !== password) {
        e.preventDefault();
        alert('Password must contain a lower case character');
    }
      else if (password.toUpperCase() !== password) {
        e.preventDefault();
        alert('Password must contain an upper case character');
    }
      else if (/[!@?]/g.test(password)) {
        e.preventDefault();
        alert('Password must contain a special character case character e.g., @!?/');
    }
      else if (/\d/.test(password)) {
        e.preventDefault();
        alert('Password must contain a number');
    }
      else if (password.length >= 8) {
        e.preventDefault();
        alert('Password must contain more than 8 characters');
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

  

  
  return (
    
    <div className='row pager'>
      <form className="form signupForm" onSubmit={signupSubmitHandler}>
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
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" >
            Register
          </button>
        </div>
        <div className='row center'>
                <div>
              </div>
              </div>
      </form>

    </div>
  );
}
