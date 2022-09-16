import React, { useState, useEffect } from "react";
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from '@mui/material';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Container } from '@mui/system';
import { useNavigate } from "react-router-dom";

import './Modal/modal.css';
import Modals from './Modal/Modals.js';
import { CopyToClipboard } from "react-copy-to-clipboard";

import ReactTooltip from "react-tooltip";

const useStyles = makeStyles({
  backImage: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 1000,
    height: 500
  },

  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: 30,
    marginLeft: 30
  },

  box: {
    marginRight: 50
  },

  card: {
    width: 400,
    height: 750,
  },

  media: {
    height: 400,
    width: 400
  },

  action: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  cardview: {
    height: 300,
    width: 300,
    backgroundColor: "#999999",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"


  },
  rightline: {
    width: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
})



const Cart = () => {
  const cart = useSelector((state) => state);
  const navigate = useNavigate();
  var userdata = localStorage.getItem("userdata", JSON.stringify(userdata));
  var user_details = JSON.parse(userdata)
  var restaurant_data = localStorage.getItem("restaurant_data", JSON.stringify(restaurant_data));
  var restaurant_details = JSON.parse(restaurant_data)
  console.log('Restaurant Data is --->', restaurant_data);

  const [show, setShow] = useState(false);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(cart);

  const dispatch = useDispatch();

  const addition = (acc, currentvalue) => {
    return acc + currentvalue.menu_price * currentvalue.quantity;
  };

  const total = cart.reduce(addition, 0);


  const submitAlert = (totalamount) => {

    var menu_details = {
      order_id: order_id,
      date: date,
      time: time,
      menus: cart,
      totalPrice: totalamount.toFixed(2),
      delivery_fee: 20,
      tax: [
        {
          taxname: "gst",
          taxpercentage: "5",
          taxamount: (totalamount * (5 / 100)).toFixed(2)
        },
        {
          taxname: "cgst",
          taxpercentage: "7",
          taxamount: (totalamount * (7 / 100)).toFixed(2)
        }
      ],
      clear_amount: ((total + 20) + ((total * (5 / 100)) + (total * (7 / 100)))).toFixed(2),


      customer_details: {
        customer_name: user_details.firstname,
        customer_phone: user_details.contact,
        customer_email: user_details.email
      },

      restaurant_details: {
        restaurant_name: restaurant_details.res_name,
        restaurant_phone: restaurant_details.res_phone,
        restaurant_address: restaurant_details.res_address
      }

    }

    var order_details = localStorage.setItem("order_details", JSON.stringify(menu_details));
    console.log('ORDER DATA :', order_details)

    console.log("MENU_DETAILS to send", menu_details);
  }




  const classes = useStyles();


  // Modal


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

var currentdate = new Date();
  var date = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear();

  var time = currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

  var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + "@"
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

  console.log('DATE-TIME is', datetime);
  console.log('Current Date', currentdate);

  let order_id = user_details.contact + "@" + datetime;
  console.log('ORDER ID is', order_id);


  const [copytext, setCopyText] = useState(order_id);

  const handleCopy = () => {
    navigator.clipboard.writeText(copytext);
    // alert('Copied');
    // <ReactTooltip place="top" id='tool' effect="solid" event="click" border={true}/>
  }


  return (
    <div className="cartcontainer">
      <Button variant="contained" aria-label="outlined primary button group" onClick={() => navigate(-1)} style={{ marginTop: 50 }} > Back to Menu</Button>
      <br />
      {/* <Link to="/">
        <Button>Return to Home</Button>
      </Link> */}

      <div className={classes.container}>
        {
          cart.map((product) => {
            console.log('CART is :', product)
            return (
              <div>
                <div className="card" key={product.menu_id}>

                  <div className={classes.cardview}>

                    <h1>Menu Name: {product.menu_name}</h1>
                    <h4>Single product price: {product.menu_price}</h4>
                    <h4>Total quantity: {product.quantity}</h4>
                    <h4>Actual price: {product.menu_price * product.quantity}</h4>

                    <div className={classes.rightline}>
                      <button onClick={() => { dispatch({ type: "INCREASE", payload: product }) }}> + </button>

                      <p>{product.quantity}</p>

                      <button onClick={() => {
                        if (product.quantity > 1) {
                          dispatch({ type: "DECREASE", payload: product });
                        } else {
                          dispatch({ type: "REMOVE", payload: product });

                        }
                      }}> - </button>

                      <button
                        onClick={() => { dispatch({ type: "REMOVE", payload: product }) }}
                      >
                        Remove
                      </button>
                    </div>


                  </div>

                </div>
                <div>

                  <Button
                    onClick={() => dispatch({ type: "STORE_NAME_RESET", payload: product })}
                  >Clear Cart</Button>
                </div>
              </div>

            )
          })

        }
        {
          total > 0 &&
          <div>
            <h3>Actual product(s) price: {(total).toFixed(2)}</h3>
            <h3>Total Tax Amount:{((total * (5 / 100)) + (total * (7 / 100))).toFixed(2)}</h3>
            <h3>Delivery Fee: 20.00</h3>
            <h3>Total Price to pay: {((total + 20) + ((total * (5 / 100)) + (total * (7 / 100)))).toFixed(2)}</h3>
            <Button variant="contained" aria-label="outlined primary button group" onChange={submitAlert(total)} onClick={handleShow}>Buy Now</Button>
            {/* <Button variant="contained" aria-label="outlined primary button group" onClick={handleShow}>Buy Now</Button> */}
          </div>

        }

        <Modals show={show} handleClose={handleClose}>

          <div style={{ color: 'black', textAlign: 'center', fontSize: '20px' }}>
            <br />
            <label><b>Order id :</b> </label>
            <input id='copy' style={{ fontSize: '20px' }} value={order_id} onChange={(e) => setCopyText(e.target.value)} />
            <button onClick={handleCopy} data-for='tool' data-tip='Copied'>Copy</button>
            <ReactTooltip place="top" id='tool' effect="solid" event="click" border={true} />
            <br />
            <br />
            <br />

          </div>
        </Modals>

      </div>




    </div>
  );
};

export default Cart;