import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerInfo, amendCustomerAccount } from '../actions/customerActions';//edited coded 
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_AMMEND_ACCOUNT_REFRESH } from '../constants/customerConstants'; //edited coded 
import PasswordSecurity from './PasswordSecurity';


//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
export default function MyAccountPage() {//edited coded 
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const customerLogin = useSelector((state) => state.customerLogin);//edited coded 
  const { userDetails } = customerLogin;
  const userInfo = useSelector((state) => state.userInfo);
  const { loading, error, customer } = userInfo;//edited coded 
  const userAmendAccount = useSelector((state) => state.userAmendAccount);//edited coded 
  const userAmendAccount2 = useSelector((state) => state.userAmendAccount);//edited coded 
  const {success: successUpdate, error: errorAmend, loading: loadingAmend, } = userAmendAccount;
  const {success: successUpdate2, error: errorAmend2, loading: loadingAmend2, } = userAmendAccount2;
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!customer) { dispatch({ type: CUSTOMER_AMMEND_ACCOUNT_REFRESH });//edited coded 
      dispatch(customerInfo(userDetails._id));//edited coded 
    } else { setName(customer.name);//edited coded 
      setEmail(customer.email);//edited coded 
    }
  }, [dispatch, userDetails._id, customer]);//edited coded 

  const profileSubmitHandler = (e) => {e.preventDefault();//edited coded 
      dispatch(amendCustomerAccount({customerId: customer._id, name, email,   //edited coded  
        })
      );
    };

  const passwordSubmitHandler = (e) => {//edited coded 
    e.preventDefault();
    if (password !==  confirmPassword) {
      e.preventDefault();
      alert('Password and confirm password are not matching');
    } 
     else {
      dispatch(
        amendCustomerAccount({//edited coded 
          customerId: customer._id,//edited coded 
          name,email,password,
     
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
    ["An uppercase letter (A-Z)", containsLowercase],
    ["A lowercase letter (a-z)", containsUppercase],
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
      <form className="form wide" onSubmit={profileSubmitHandler}>{/*edited*/}
        <div className='row center'>
          <h1>My Account</h1>
        </div>
        {loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingAmend && <LoadingBox></LoadingBox>}
            {errorAmend && (<MessageBox variant="danger">{errorAmend}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">Profile Updated Successfully</MessageBox>//edited
            )}
        <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <div className='row center'>
              <button className="primary half" type="submit">Update Profile</button>
              </div>
            </div>
          </>
        )}
      </form>
      <form className="form wide" onSubmit={passwordSubmitHandler}>{/* self coded*/}
      <div className='row center'>
          <h1>My Account Password</h1>{/*self coded*/}
        </div>
        {loading ? ( <LoadingBox></LoadingBox> ) : error ? ( <MessageBox variant="danger">{error}</MessageBox>) : (
          <>
            {loadingAmend2 && <LoadingBox></LoadingBox>}
            {errorAmend2 && ( <MessageBox variant="danger">{errorAmend2}</MessageBox>
            )} {/*self coded*/}
            {successUpdate2 && (<MessageBox variant="success"> Password Updated Successfully</MessageBox>
            )} {/* self coded */}
            <div>
              <label htmlFor="password">Password</label>
              <input id="password"  type="password" value={password}  onKeyUp={validatePassword} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
              ></input> {/* edited*/}
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label> {/* edited*/}
              <input id="confirmPassword"type="password" value={confirmPassword} onKeyUp={validatePassword} placeholder="Enter confirm password" onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
                <div>
              <label />
              <div className='row center'>
              <button className="primary half" type="submit" disabled={!allValid}>Update Password </button>
              </div>
            </div>
          </>
        )}
                <div className='row center'>{/* edited*/}
                <div>
                {mustContainData.map(data=> <PasswordSecurity data={data}/>)}
              </div>
              </div>
      </form>
    </div>
  );
}
