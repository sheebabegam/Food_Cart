import React, { useState, useEffect } from 'react';
import axios from 'axios';
import orderData from '../api/orderData';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css'

function Show_Order_Details(props) {
    console.log('PROPS -->', props);
    const location = useLocation()

    const [orderedData, setOrderedData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3010/orderData`)
            .then((response) => {
                setOrderedData(response.data);
            })
    }, []);
    console.log('Ordered Data is ===>', orderedData);

    console.log(location.state.id.orders.menus)
    return (
        <div>
            <div className='main_shadow'>
                <h1 className='order_detail' style={{color:'#6439ff'}}>Order Details</h1>

                <div className='menu'>
                  {
                    location.state.id.orders.menus.map((items) => {
                        return (

                            <div className='menu_details'>
                                <div style={{ color: '#6439ff', padding: '0.5px 0px', }}>
                                    <h3>Menu Details</h3>
                                </div>
                                <div className='menu_flex'>

                                    <label><h6>Menu Name</h6> <p>:</p> <p>{items.menu_name}</p></label>
                                    <label><h6>Menu Type</h6> <p>:</p> <p>{items.menu_type}</p></label>
                                    <label><h6>Price</h6> <p>:</p> <p>{items.menu_price}</p></label>
                                    <label><h6>Quantity</h6> <p>:</p> <p>{items.quantity}</p></label>


                                    {/* <label><b>Menu Type : </b>{items.menu_type}</label><br />
                                    <label><b>Price : </b></label>{items.menu_price}<br />
                                    <label><b>Quantity : </b>{items.quantity}</label><br /> */}

                                </div>
                            </div>
                        )
                    })
                }  
                </div>
                


            </div>
        </div>


    );
}

export default Show_Order_Details;