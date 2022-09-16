import React, { useState, useEffect } from "react";
import './modal.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import api from '../../api/orderData';
import { v4 as uuidv4 } from 'uuid';

import { borderRadius } from '@mui/system';

const Modals = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);


  useEffect(() => {
    var order_details = localStorage.getItem("order_details", JSON.stringify(order_details));
    var order_data = JSON.parse(order_details);
    console.log(order_details);
    setOrderData(order_data);
  }, []);

  console.log('ORDER data ---------->', orderData);


  const retriveData = async () => {
    const response = await api.get("/orderData");
    return response.data;
  }
  var order_details = localStorage.getItem("order_details", JSON.stringify(order_details));
  var order_data = JSON.parse(order_details);
  const onSubmit = async (data) => {
    console.log(data);
    const request = {
      id: uuidv4(),
      orders: order_data
    }
    const response = await api.post("/orderData", request);
    // console.log(response);
    setOrderData([...orderData, response.data])
  };

  useEffect(() => {
    const getData = async () => {
      const allData = await retriveData();
      if (allData) setOrderData(allData);
    };
    getData();
  }, []);


  const cart = useSelector((state) => state);
  // console.log(cart);
  const dispatch = useDispatch();

  const toHome = (product, data) => {
    onSubmit(data);
    navigate('/');
    dispatch({ type: "STORE_NAME_RESET", payload: product });
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("myproduct", JSON.stringify([]));
    localStorage.setItem("restaurant_data", JSON.stringify([]));
  }


  return (
    <div className={showHideClassName}>

      <section className="modal-main" >
        <div className='modal_header'>
          <span className="bi bi-check-circle green-color"> </span>
          <label className='xbutton' onClick={handleClose} style={{ cursor: 'pointer', fontSize: '30px' }}>&times;</label>
        </div>
        <hr className="line1" /> <br />

        {children}


        <div style={{ color: 'blue', textAlign: 'center' }}>
          <hr className="line1" />
          <button type="button" onClick={toHome} style={{ backgroundColor: '#1717ba', fontSize: '17px', color: 'white', padding: '7px 20px', borderRadius: '10px', cursor: 'pointer' }}>

            Ok
          </button>
          {/* <button type="button" onClick={handleClose} style={{ backgroundColor: '#1717ba', fontSize: '17px', color: 'white', padding: '7px 20px', borderRadius: '10px', cursor: 'pointer' }}>
            Close
          </button> */}
        </div>
      </section>
    </div>
  );
};

export default Modals;