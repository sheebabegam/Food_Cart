import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Cart_boot() {
    const cart = useSelector((state) => state);
    console.log('cart is', cart);
    const dispatch = useDispatch();
    const addition = (acc, currentvalue) => {
        return acc + (currentvalue.gst * currentvalue.quantity) + currentvalue.price * currentvalue.quantity;
    };
    const total = cart.reduce(addition, 0);

    const submitAlert = (e) => {
        alert('Your Order is successfully placed');
    }

    return (
        <div>
            {cart.map((product) => {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                price: Rs. {product.price} <br />
                                Quantity : {product.quantity} <br />
                                Amount : Rs. {product.price * product.quantity}
                            </Card.Text>
                            <Button
                                onClick={() => dispatch({ type: "REMOVE", payload: product })}
                            >
                                remove
                            </Button>
                            <Button
                                onClick={() => dispatch({ type: "INCREASE", payload: product })}
                            >
                                +
                            </Button>
                            <p>{product.quantity}</p>
                            <Button
                                onClick={() => {
                                    if (product.quantity > 1) {
                                        dispatch({ type: "DECREASE", payload: product });
                                    } else {
                                        dispatch({ type: "REMOVE", payload: product });
                                    }
                                }}
                            >
                                -
                            </Button>
                        </Card.Body>
                        <Button onClick={submitAlert}>Proceed to Checkout</Button>
                        <Link to="/">
                            <button onClick={() => dispatch({ type: "STORE_NAME_RESET", payload: product })}>Return to Home</button>
                        </Link>
                    </Card>

                );

            })}

            {
                total == 0 ?
                    <h2>cart is empty</h2>
                    : total < 500 ?
                        <h2>total:{total + 50}</h2>
                        : <h2>total:{total}</h2>
            }
        </div>

    )



}

export default Cart_boot;