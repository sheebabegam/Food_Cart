import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from 'react';
import { UserContext } from '../components/User_Components/UserContext';


const useStyles = makeStyles(theme => ({
    box2: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'baseline'
    },
}))

const pages = ['Register', 'Login'];

const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const { login, setLogin, handleSignOut, user_details, setIsregister } = useContext(UserContext);


    // var userdata = localStorage.getItem("userdata", JSON.stringify(userdata));
    // var user_details = JSON.parse(userdata);
    // console.log('LOGIN DATA is ===>', user_details);


    // const handleSignOut = (product) => {
    //     var userdata = localStorage.removeItem("userdata");
    //     console.log('REMOVED DATA', userdata)
    //     if (userdata === undefined) {
    //         dispatch({ type: "STORE_NAME_RESET", payload: product });
    //         localStorage.setItem("cart", JSON.stringify([]));
    //         localStorage.setItem("myproduct", JSON.stringify([]));
    //         // localStorage.removeItem("myproduct");
    //         localStorage.setItem("restaurant_data", JSON.stringify([]));
    //         setIsregister(true);
    //         navigate('/')
    //         setLogin(false)
    //     }

    // };

    // const [login, setLogin] = useState(false)
    // const [logout, setLogout] = useState(false)

    // const [isregister, setIsregister] = useState(false);

    // const handleSubmit = () => {
    //     setLogin(false);
    // }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const cart = useSelector((state) => state);
    console.log(cart);
    const dispatch = useDispatch();

    // const [userdata, setUserData]




    // useEffect(() => {
    //     if (user_details !== null) {
    //         setLogin(true)

    //     }

    //     var a = window.location.href.toString().split("/");
    //     console.log(a[3])
    //     if (a[3] == 'login' && user_details == null) {

    //         setLogin(true)
    //     }
    //     console.log(window.location.href)
    //     console.log();
    // }, [userdata]);


    // useEffect(() => {
    //     if (user_details !== null) {
    //         setLogin(true)
    //     }

    //     var b = window.location.href.toString().split("/");
    //     console.log(b[3])
    //     if (b[3] == 'register' && user_details == null) {

    //         setLogin(true)
    //     }
    //     console.log(window.location.href)
    //     console.log();


    // }, [userdata]);

    // var myarr = [];
    // var myproduct = localStorage.getItem("myproduct", JSON.stringify(myproduct));
    // myarr.push(myproduct)

    // console.log(myarr)

console.log('LOGIN', login)

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}>
                        <Box style={{ marginTop: '22px', marginRight: '20px' }}>
                            <Link to='/'>
                                <i class="bi bi-house-door" style={{ color: 'white', fontSize: '30px', marginTop: '50px' }}></i>
                            </Link>
                        </Box>

                        <Button
                            sx={{ my: 2, fontSize: 28, color: 'white', display: 'block', fontFamily: '"Helvetica Neue"' }}
                        >
                            FOOD DELIVERY APP
                        </Button>

                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 50 }} className={classes.box2}>

                        {/* {!login &&
                            <Link to='/'>
                                <Button sx={{ my: 2, fontSize: 15, color: 'white', display: 'block' }}>
                                    Home
                                </Button>
                            </Link>
                        } */}

                        {!login &&
                            (<Link to='/register'>
                                <Button
                                    sx={{ my: 2, fontSize: 15, color: 'white', display: 'block' }}>
                                    Register
                                </Button>
                            </Link>)}


                        {login && (
                            <Link to='/'>
                                {user_details &&
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginLeft: 0 }}>
                                        <Link to='/order_history'>
                                            <Button sx={{ my: 2, fontSize: 15, color: 'white', display: 'block' }}>
                                                Order History
                                            </Button>
                                        </Link>

                                        <h4 style={{ color: 'white', textDecoration: 'none' }}>{user_details.email}</h4>

                                        <Link to='/cart'>
                                            <Button sx={{ my: 2, fontSize: 25, color: 'white', display: 'block' }}>
                                                <ShoppingCartCheckoutIcon />
                                                {cart && cart.length}
                                                {/* {localStorage.setItem("productLength", JSON.stringify(myproduct.length))} */}
                                            </Button>
                                        </Link>

                                        <Button sx={{ my: 2, fontSize: 15, color: 'white', display: 'block' }} onClick={(e) => { handleSignOut(e) }}>
                                            Logout
                                        </Button>
                                    </div>}
                            </Link>)
                        }

                        {!login &&

                            (<Link to='/login'>
                                <Button
                                    onClick={() => {
                                        setIsregister(true);
                                        setLogin(true);
                                    }}
                                    sx={{ my: 2, fontSize: 15, color: 'white', display: 'block' }}>
                                    Login
                                </Button>
                            </Link>)}


                        {/* <Link to='/cart'>
                            <Button sx={{ my: 2, fontSize: 25, color: 'white', display: 'block' }}>
                                <ShoppingCartCheckoutIcon /> {cart.length}
                            </Button>
                        </Link> */}
                        {/* <Link to={{ pathname: '/dellme' }} state={{ login: login }}>link</Link> */}


                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};


export default Navbar;
