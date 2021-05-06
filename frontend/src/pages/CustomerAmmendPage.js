import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerInfo, ammendCustomer } from '../actions/customerActions'; //Reused edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_AMMEND_REFRESH } from '../constants/customerConstants'; 

// Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Reused edited
export default function CustomerAmmendPage(props) {
  
  const customerId = props.match.params.id;
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [userCredentialsAdministrator, setCredentialsAdministrator] = useState(false);  //Reused edited
  const userInfo = useSelector((state) => state.userInfo);
  const { loading, error, pptuser } = userInfo;  //Reused edited
  const userAmmend = useSelector((state) => state.userAmmend);  //Reused edited
  const { loading: loadingAmmend, error: errorAmmend, success: successAmmend, } = userAmmend;  //Reused edited
  const dispatch = useDispatch();

  useEffect(() => {
    if (successAmmend) {  //Reused edited
      dispatch({ type: CUSTOMER_AMMEND_REFRESH });  //Reused edited
      props.history.push('/customerdisplay');  //Reused edited
    }
    if (!pptuser) {  //Reused edited
      dispatch(customerInfo(customerId));  //Reused edited
    } else {
      setName(pptuser.name);  //Reused edited
      setEmail(pptuser.email);  //Reused edited
      setCredentialsAdministrator(pptuser.userCredentialsAdministrator);  //Reused edited
    }
  }, [dispatch, props.history, successAmmend, pptuser, customerId]);  //Reused edited
 
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ammendCustomer({ _id: customerId, name, email, userCredentialsAdministrator }));  //Reused edited
  };

  return (

    <div className="pager">         {/* self coded */}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingAmmend && <LoadingBox></LoadingBox>}     {/* edited coded */}
          {errorAmmend && ( //edited code
            <MessageBox variant="danger">{errorAmmend}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
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
              <label htmlFor="userCredentialsAdministrator">Set User As Admnistrator</label>  {/* edited coded */}
              <input
                id="userCredentialsAdministrator" //edited
                type="checkbox"
                checked={userCredentialsAdministrator} //edited
                onChange={(e) => setCredentialsAdministrator(e.target.checked)} //edited
              ></input>
            </div>
            <div>
              <button type="submit" className="primary">  {/* primary class has been edited coded */}
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
