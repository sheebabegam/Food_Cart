import { useEffect, useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/actions/cart";
import restaurant from './Data/restaurant.json';
import makeStyles from "@material-ui/core/styles/makeStyles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';




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
    height: 650,
  },

  media: {
    height: 350,
    width: 400
  },

  action: {
    display: 'flex',
    justifyContent: 'space-around'
  }
})

export default function Dellme_Menu() {

  var cart = useSelector((state) => state.addToCart);
  const dispatch = useDispatch();
  var cart = localStorage.getItem("cart", JSON.stringify(cart));
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  // console.log('CART in DELLME', cart);

  const classes = useStyles();

  const [buttonText, setButtonText] = useState(false);

  const [arr, setArr] = useState(cart);
  const [addCart, setAddCart] = useState([]);
  const [alertBox, setAlertBox] = useState(false);

  // const cart = localStorage.getItem("cart", JSON.stringify(product));
  
  var cart_details = JSON.parse(cart);

  // var myproduct = localStorage.getItem("myproduct", JSON.stringify(myproduct));


  var userdata = localStorage.getItem("userdata", JSON.stringify(userdata));
  var user_details = JSON.parse(userdata);


  // var cart1 = [];
  // var cart1 = localStorage.getItem("cart");

  // useEffect(() => {
  //   console.log(restaurant);
  //   localStorage.setItem("cart", JSON.stringify([]));
  // }, []);

  const addcart = (product, e) => {
    console.log(user_details.contact)
    if (user_details.contact == undefined) {
      alert("Please Login")
      return
    }

    // if (user_details.contact == true) {

    console.log('PRODUCT is', product);
    e.preventDefault();


    // arr.push(product.menu_id);
    // setArr([...arr]);
    // console.log('ARRAY', arr);

    addCart.push(product);
    setAddCart([...addCart]);
    // setArr([...arr]);
    localStorage.setItem("cart", JSON.stringify([...addCart], e));
    var carts = localStorage.getItem("cart", JSON.stringify(cart));
    var cart_details = JSON.parse(carts);
    console.log(cart_details)
    for (var item in cart_details) {
      console.log(cart_details[item].menu_id);
      // arr.push(arr[item].menu_id);
    }
    setArr([...arr]);
    console.log('CARTS', [...arr])
    // }
  }



  return (
    <div className={classes.container}>

      {restaurant[0].menus.map((product, i) =>

        <div className="card" key={product.menu_id}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={product.menu_image}
                title={product.menu_name}
              />

              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  {product.menu_name}
                </Typography>
              </CardContent>

            </CardActionArea>

            <CardActions className={classes.action}>
              {/* <Button
                onClick={() => {
                  dispatch({ type: "ADD", payload: product });
                }
                }>
                {" "}
                <AddShoppingCartIcon /> Add To Cart
              </Button> */}

              <Button
                onClick={(
                  (e) => {
                    {
                      user_details.contact &&
                        dispatch({ type: "ADD", payload: product });

                    }
                    addcart(product, e)
                  }
                )}
              >
                {" "}
                {/* {user_details.contact && arr.includes(product.menu_id) ? 'Added' : 'Add to Cart'} */}
                {arr.includes(product.menu_id) ? 'Added' : 'Add to Cart'}
                {/* {buttonText} */}
                {/* Add */}
              </Button>


              <Typography gutterBottom variant="h6" component="h6">
                Rs. {product.menu_price}
              </Typography>
            </CardActions>
          </Card>
        </div>
      )}


    </div>
  );
}
