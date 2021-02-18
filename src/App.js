import React, { useEffect } from "react";
import './App.css';
import Checkout from "./Checkout";
import Header from './Header';
import Home from "./Home";
import {BrowserRouter as Router,Switch,Route}
from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase";
import {useStateValue} from "./StateProvider";
import Payment from './Payment';
import Orders from "./Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const promise = loadStripe('pk_test_51IL3ttKl4J2RxjByVdXSbLJ0SN1O2hkMayceWvCPq5cKy9Bt3Fw3qLC3SBBz6HWM7a5cCSjBZgvQUp9C2UUi6X7500lanSbfnk');
function App() {
  const[{},dispatch] = useStateValue();
  useEffect(() => {
    //will only runs when app comp runs

    auth.onAuthStateChanged(authUser =>{
      console.log('THE USER IS >>>',authUser);
      if (authUser){
        //the user just logged in
        dispatch({
          type: 'SET_USER',
          user:authUser
        })
      }
      else{
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user:null
        })

      }
    })
  },[])
  return (
    //BEM
    <Router>
    <div className="App">
    
      <Switch>
      <Route path ="/orders">
          <Header/>
          <Orders />
          <h1>order page</h1>
        </Route>
        <Route path ="/login">
          <Login />
          <h1>login page</h1>
        </Route>
        <Route path="/checkout">
            <Header />
            <Checkout />
        </Route>
        <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
        </Route>
        <Route path="/">
            <Header />
          <Home/>

        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
