import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import orderData from '../api/orderData';
import Table from 'react-bootstrap/Table';
import './style.css'
import { width } from '@mui/system';
import { CardTravel } from '@material-ui/icons';
import { useDispatch, useSelector } from "react-redux";

function Order_History() {
    var cart = useSelector((state) => state.addToCart);
    const dispatch = useDispatch();

    const [orderedData, setOrderedData] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:3010/orderData`)
            .then((response) => {
                setOrderedData(response.data);
            })
    }, []);
    console.log('Ordered Data is ===>', orderedData);

    var userdata = localStorage.getItem("userdata", JSON.stringify(userdata));
    var user_details = JSON.parse(userdata);
    console.log('USER CONTACT', user_details.contact);


    // useEffect(() => {
    // const order_count = orderedData.map((data) => {
    //     if (user_details.contact == data.orders.customer_details.customer_phone) {
    //         var arry= [];
    //         arry.push(data.orders.contact)
    //         return arry;
    //     }
    //     console.log('ORDER COUNT', arry);

    // })
    // })




    return (
        <div>
            {/* <h1 style={{color:'#6439ff', textAlign:'left', marginLeft:'83px'}}>Order History</h1> */}
            {/* {
                orderedData.map((data) => {
                    if (user_details.contact == data.orders.customer_details.customer_phone) {
                        console.log('Cart Data', data)
                        return (
                            <p>{data.orders.order_id}</p>
                        )
                    }
                })} */}

            {/* {orderedData.map((data) => {
                if (user_details.contact == data.orders.customer_details.customer_phone) {

                    setCount()
                }

            })} */}

            {/* <p>{count}</p> */}

            <div style={{ boxShadow: '2px 4px 10px 1px rgb(201 201 201 / 47%)', marginLeft: '83px', width: '90%' }}>
                <h1 style={{ color: '#6439ff', textAlign: 'left', marginLeft: '83px' }}>Order History</h1>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <table style={{ borderCollapse: 'separate', borderSpacing: '0px 10px !important', width: '87%' }} className="fixed-height fixed-width fixed-cell table-spacing">
                    <thead style={{ padding: '10px 30px' }}>
                        <tr style={{ color: '#6439ff', padding: '10px 30px' }}  >
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Order details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orderedData.map((data) => {
                                console.log('CUSTOMER CONTACT', data.orders.customer_details.customer_phone)
                                console.log(user_details.contact)
                                if (user_details.contact == data.orders.customer_details.customer_phone) {
                                    return (
                                        <tr style={{ backgroundColor: 'white', padding: '20px 0px' }} className='table_row'>
                                            <td >{data.orders.order_id}</td>
                                            <td>{data.orders.date}</td>
                                            <td>{data.orders.time}</td>
                                            <td>
                                                <Link to={{ pathname: '/order_details' }} state={{ id: data }}><button className='view_button'><b>View order</b></button></Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}


                    </tbody>
                </table>
                </div>
            </div>

            {/* <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <table style={{ borderCollapse: 'collapse' }}>
                    <thead style={{ border: '1px solid black', padding: '0px 10px' }}>
                        <tr >
                            <th style={{ border: '1px solid black', padding: '0px 10px' }}>Order ID</th>
                            <th style={{ border: '1px solid black', padding: '0px 10px' }}>Date</th>
                            <th style={{ border: '1px solid black', padding: '0px 10px' }}>Time</th>
                            <th style={{ border: '1px solid black', padding: '0px 10px' }}>Show details</th>
                        </tr>

                    </thead>
                    <tbody style={{ border: '1px solid black', padding: '0px 10px' }}>

                        {
                            orderedData.map((data) => {
                                console.log('CUSTOMER CONTACT', data.orders.customer_details.customer_phone)
                                console.log(user_details.contact)
                                if (user_details.contact == data.orders.customer_details.customer_phone) {
                                    return (
                                        <tr >
                                            <td style={{ border: '1px solid black', padding: '0px 10px' }}>{data.orders.order_id}</td>
                                            <td style={{ border: '1px solid black', padding: '0px 10px' }}>{data.orders.date}</td>
                                            <td style={{ border: '1px solid black', padding: '0px 10px' }}>{data.orders.time}</td>
                                            <td style={{ border: '1px solid black', padding: '0px 10px' }}>
                                                <Link  to={{pathname: '/order_details'}} state={{id:data }}><i class="bi bi-arrow-right" style={{ fontSize: '48px', color: 'red' }}></i></Link>
                                            </td>
                                        </tr>
                                    )
                                }

                            })



                        }
                    </tbody>


                </table>
            </div> */}

            {/* {
                orderedData.map((order) => {
                    return (
                        <div style={{ marginTop: '100px' }}>
                            <h1>{order.orders.delivery_fee}</h1>
                            <h1>{order.orders.totalPrice}</h1>
                            <h1>{order.orders.tax[0].taxname}</h1>
                        </div>
                    )
                })
            } */}
        </div>
    );
}

export default Order_History;