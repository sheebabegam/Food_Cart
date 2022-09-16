import React, { useState, useEffect } from 'react';
import Home from './components/Home'
import { HashRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Dellme_Restaurant from './components/Dellme_Restaurant';
import Dan_Jelly_Restaurant from './components/Dan_Jelly_Restaurant';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Register from './components/User_Components/Register';
import Login from './components/User_Components/Login';
import Order_History from './components/Order_History';
import Show_Order_Details from './components/Show_Order_Details';
import { UserContext } from './components/User_Components/UserContext';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

function App() {

  const [login, setLogin] = useState(false)
  const [isregister, setIsregister] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector((state) => state);
  console.log(cart);
  const dispatch = useDispatch();

  var userdata = localStorage.getItem("userdata", JSON.stringify(userdata));
  var user_details = JSON.parse(userdata);
  console.log('LOGIN DATA is ===>', user_details);


  const handleSignOut = (product) => {
    var userdata = localStorage.removeItem("userdata");
    console.log('REMOVED DATA', userdata)
    if (userdata === undefined) {
      dispatch({ type: "STORE_NAME_RESET", payload: product });
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("myproduct", JSON.stringify([]));
      // localStorage.removeItem("myproduct");
      localStorage.setItem("restaurant_data", JSON.stringify([]));
      setIsregister(true);
      navigate('/')
      setLogin(false)
    }

  };


  useEffect(() => {
    if (user_details !== null) {
      setLogin(true)

    }

    var a = window.location.href.toString().split("/");
    console.log(a[3])
    if (a[3] == 'login' && user_details == null) {

      setLogin(true)
    }
    console.log(window.location.href)
    console.log();
  }, [userdata]);


  useEffect(() => {
    if (user_details !== null) {
      setLogin(true)
    }

    var b = window.location.href.toString().split("/");
    console.log(b[3])
    if (b[3] == 'register' && user_details == null) {

      setLogin(true)
    }
    console.log(window.location.href)
    console.log();


  }, [userdata]);



  return (
    <div className="App">
      <Navbar />
      <UserContext.Provider value={{ login, setLogin, handleSignOut, user_details, setIsregister }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dellme" element={<Dellme_Restaurant />} />
          <Route path="/danjelly" element={<Dan_Jelly_Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order_history" element={<Order_History />} />
          <Route path="/order_details" element={<Show_Order_Details />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;