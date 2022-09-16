import React from "react";
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
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
    <div className="cartcontainer">
      <Link to="/royal">
      <i class="bi bi-reply"></i>
      </Link>
      <div className="cart">
        {cart.map((product) => {
          return (
            <div className="cartcad" key={product.id}>
              <div>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                />
                <h4>{product.name}</h4>
                <p> price: Rs. {product.price}</p>
                <p>{product.quantity}</p>
                <p>Amount : Rs. {product.price * product.quantity}</p>
                <button
                  onClick={() => dispatch({ type: "REMOVE", payload: product })}
                >
                  remove
                </button>
              </div>

              <div>
                <button
                  onClick={() => dispatch({ type: "INCREASE", payload: product })}
                >
                  +
                </button>
                <p>{product.quantity}</p>
                <button
                  onClick={() => {
                    if (product.quantity > 1) {
                      dispatch({ type: "DECREASE", payload: product });
                    } else {
                      dispatch({ type: "REMOVE", payload: product });
                    }
                  }}
                >
                  -
                </button>
              </div>

              <button onClick={submitAlert}>Proceed to Checkout</button>
              <Link to="/">
                <button onClick={() => dispatch({ type: "STORE_NAME_RESET", payload: product })}>Return to Home</button>
              </Link>
            </div>

          );

        })}


      </div>

      {total == 0 ?
        <h2>cart is empty</h2>
        : total < 500 ?
          <h2>total:{total + 50}</h2>
          : <h2>total:{total}</h2>
      }


    </div>
  );
};

export default Cart;