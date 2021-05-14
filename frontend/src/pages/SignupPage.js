import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/customerActions';
import { signup } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import PasswordSecurity from './PasswordSecurity';
import GoogleLogin from 'react-google-login';


//Reused code edited from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//function for registering users on the PPT web app and signin for users 
//variable declarations 
export default function SignupPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [password3, setPassword3] = useState("")//selfcoded
  const [password2, setPassword2] = useState("") //selfcoded
  const [confirmPassword, setConfirmPassword] = useState("")
  const redirect = props.location.search ? props.location.search.split('=')[1]: '/';
  const userRegister = useSelector((state) => state.userRegister);//edited
  const { userDetails:  user1, loading: load1, error:  error1, } = userRegister;//edited
  const customerLogin = useSelector((state) => state.customerLogin);//edited
  const { userDetails:  user2, loading: load2, error: error2,} = customerLogin;//edited
  const dispatch = useDispatch();

  const signuploginSubmitHandler = (e) => {
    if (password2 !==  confirmPassword) {//self coded
      alert('Password and confirm password are not matching');
    } else {e.preventDefault();
    dispatch(signup(name, email, password2));//self coded
    }
  }

  const loginSubmitHandler = (e) => { e.preventDefault();
dispatch(login(email, password));
  };

  useEffect(() => {
    if (user2 || user1) {props.history.push(redirect);}}, [props.history, redirect, user2, user1]);

  //Validate Password code used from https://github.com/cooljasonmelton/password-checklist

  // booleans for password validations
  const [containsLowercase, setContainsLowercase] = useState(false) // lowercase letter //edited
  const [containsUppercase, setContainsUppercase] = useState(false) // uppercase letter //edited
  const [containsNumber, setContainsNumber] = useState(false) // number //edited
  const [containsCharacter, setContainsCharacter] = useState(false) // special character //edited
  const [contains8Characters, setContains8Characters] = useState(false) // min 8 characters //edited

  // checks all validations are true
  const [allValid, setAllValid] = useState(false) //edited

  // labels and state boolean corresponding to each validation
  const mustContainData = [ //edited
    ["An uppercase letter (A-Z)", containsLowercase],
    ["A lowercase letter (a-z)", containsUppercase],
    ["A special character (!@#$...)", containsCharacter],
    ["A number (0-9)", containsNumber],
    ["At least 8 characters", contains8Characters],
  ]

  
  //Validate Password code used from https://github.com/cooljasonmelton/password-checklist
  const validatePassword = () => { //edited
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

//self coded
  const loginResponseGoogle = (response) => {
    
    setEmail(response.profileObj.email);
    setPassword3(response.profileObj.googleId);
    dispatch(login(email, password3));

  }

  const signupResponseGoogle = (response) => {
    setName(response.profileObj.givenName);
    setEmail(response.profileObj.email);
    setPassword2(response.profileObj.googleId);
    setConfirmPassword(response.profileObj.googleId);
    dispatch(signup(name, email, password2));
  }

  return (
    <div className='row pager'> {/*styling self coded*/}
      <form autoComplete="username" className="form wide" onSubmit={loginSubmitHandler}>
      <div className='row center'>
          <h1>Sign In</h1> 
        </div>
        {load2 && <LoadingBox></LoadingBox>}
        {error2 && <MessageBox variant="danger">{error2}</MessageBox>}
        <div className=''>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter email" autoComplete="username" required onChange={(e) => setEmail(e.target.value)} 
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" autoComplete="username" required onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>{/*s*/}
        <div>
          <label />
        <div className='row google-form'>
          {/* selfcoded*/}
        <GoogleLogin className='google-button'
          clientId="716649543205-n2eogpdbatti5515opg1frnvu024ae3o.apps.googleusercontent.com"
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
        </div>   {/* selfcoded*/}
      </form>

      <form autoComplete="new-password" className="form wide" onSubmit={signuploginSubmitHandler}>   {/* edited*/}
        <div className='row center'>
          <h1>Create Account</h1>
        </div>
        {load1 && <LoadingBox></LoadingBox>}
        {error1 && <MessageBox variant="danger">{error1}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" autoComplete="new-password" placeholder="Enter name" required onChange={(e) => setName(e.target.value)} 
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter email" autoComplete="new-password" required onChange={(e) => setEmail(e.target.value)}  
          ></input>
        </div>
           {/* selfcoded*/}
        <div>
          <label htmlFor="password2">Password</label>
          <input
            type="password"
            id="password2"
            value={password2} autoComplete="new-password"
            onKeyUp={validatePassword}
            placeholder="Enter password"
            required
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </div>
           {/* edited*/}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" value={confirmPassword} autoComplete="new-password" placeholder="Enter confirm password" onKeyUp={validatePassword} //edited
            required
            onChange={(e) => setConfirmPassword(e.target.value)}//edited
          ></input>
        </div>
        <div>

          <label />
             {/* selfcoded*/}
        <div className='row google-form'>
        <GoogleLogin className='google-button'
          clientId="716649543205-n2eogpdbatti5515opg1frnvu024ae3o.apps.googleusercontent.com"
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
        </div>   {/* selfcoded*/}
        <div className='row center'>
                <div>
              {mustContainData.map(data=> <PasswordSecurity data={data}/>)}
              </div>
              </div>
      </form>

    </div>
  );
}