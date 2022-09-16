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
import Dellme_Menu from './Dellme_Menu';


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

    var userdata = localStorage.getItem("userdata", JSON.stringify(userdata));
    var user_details = JSON.parse(userdata);
    console.log('LOGIN DATA is ===>', user_details);


    const handleSignOut = (product) => {
        // var userdata = localStorage.removeItem("userdata");
        var userdata = localStorage.setItem("userdata", JSON.stringify([]));
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

    const [login, setLogin] = useState(false)
    const [logo, setLogo] = useState(false)

    const [isregister, setIsregister] = useState(false);

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
            setLogin(true);
            localStorage.removeItem('check_login');
        }

        var b = window.location.href.toString().split("/");
        console.log(b[3])
        if (b[3] == 'register' && user_details == null) {

            setLogin(true)
        }

        if (b[3] == '') {
            setLogo(true)
        }
        console.log(window.location.href)
        console.log();


    }, [userdata]);

    useEffect(() => {

        console.log('testing')
        var b = window.location.href.toString().split("/");

        console.log('BBB', b)


        if (b[3] === '') {
            console.log('CHECKING --->', b)
            setLogo(false)
        } else {
            setLogo(true)
        }



    });



    // var myarr = [];
    // var myproduct = localStorage.getItem("myproduct", JSON.stringify(myproduct));
    // myarr.push(myproduct)

    // console.log(myarr)



    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{ backgroundColor:'#6439ff'}}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, backgroundColor:'#6439ff'}}>
                        {/* {logo || user_details.length == 0 || (
                            <Box style={{ marginTop: '22px', marginRight: '20px' }}>
                                <Link to='/'>
                                    <i class="bi bi-house-door" style={{ color: 'white', fontSize: '30px', marginTop: '50px' }}></i>
                                </Link>
                            </Box>
                        )} */}

                        {logo && (
                            <Box style={{ marginTop: '22px', marginRight: '20px' }}>
                                <Link to='/'>
                                    <i class="bi bi-house-door" style={{ color: 'white', fontSize: '30px', marginTop: '50px' }}></i>
                                </Link>
                            </Box>
                        )}

                        <Button
                            sx={{ my: 2, fontSize: 28, color: 'white', display: 'block', fontFamily: '"Helvetica Neue"' }}
                        >
                            FOOD DELIVERY APP
                        </Button>

                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 50, display:'flex', justifyContent:'end', alignItems:'center'}} className={classes.box2}>

                        {!login || user_details.length == 0 &&
                            (<Link to='/register'>
                                <Button
                                    sx={{ my: 2, fontSize: 20, color: 'white', display: 'block', textTransform:'capitalize' }}
                                >
                                    Sign up
                                </Button>
                            </Link>)}


                        {login && (
                            <Link to='/'>
                                {user_details.length !== 0 &&
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginLeft: 0 }}>
                                        <Link to='/order_history'>
                                            <Button sx={{ my: 2, fontSize: 20, color: 'white', textDecoration: 'none', display: 'block', textTransform:'capitalize' }}>
                                                Order History
                                            </Button>
                                        </Link>

                                        <Button style={{ my: 2, color: 'white', textDecoration: 'none', fontSize: 20, backgroundColor:'#6439ff', textTransform:'lowercase' }}>{user_details.email}</Button>

                                        <Link to='/cart'>
                                            <Button sx={{ my: 2, fontSize: 20, color: 'white', display: 'block', minWidth:'0px', padding:'0px' }}>
                                                <ShoppingCartCheckoutIcon sx={{ fontSize: 20, minWidth:'0px', padding:'0px' }}/>
                                                {cart && cart.length}
                                            </Button>
                                        </Link>

                                        <Button sx={{ my: 2, fontSize: 20, color: 'white', display: 'block', textTransform:'capitalize' }} onClick={(e) => { handleSignOut(e) }}>
                                            Logout
                                        </Button>
                                    </div>}
                            </Link>)
                        }

                        {!login || user_details.length == 0 &&
                            (<Link to='/login'>
                                <Button
                                    onClick={() => {
                                        setIsregister(true);
                                        setLogin(true);
                                        setLogo(true)
                                    }}
                                    sx={{ my: 2, fontSize: 20, color: 'white', display: 'block', textTransform:'capitalize' }}>
                                    Sign in
                                </Button>
                            </Link>)}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};


export default Navbar;
