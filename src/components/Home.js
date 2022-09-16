import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";

import royal_court from '../images/royal_court.jpg';
import temple_city from '../images/temple_city.jpg';
import background from '../images/background.jpg';
import restaurant from './Data/restaurant.json';


import { useNavigate } from 'react-router-dom';
import Cart from './Cart';




const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    mycontain: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    box: {
        marginRight: 50
    },

    card: {
        width: 445,
        maxHeight: 450,
    },

    media: {
        height: 340
    },

    action: {
        display: 'flex',
        justifyContent: 'space-around'
    },

    pick: {
        fontSize: 40
    },

    fiCardContent: {
        color: "#ffffff",
        backgroundColor: "rgba(0,0,0,.24)"
    },
    fiCardContentTextSecondary: {
        color: "rgba(255,255,255,0.78)"
    }
});

// -------------

const drawerWidth = 440;
const navItems = ['Login', 'Register', 'Contact us'];





function Home(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Food Order App
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;



    return (
        <div>


            <Container component="main" sx={{ p: 3 }} className={classes.imageBack}>
                <Toolbar />
                <Typography variant="h6" paragraph align="center" sx={{ fontSize: 35 }}>
                    Pick your Restaurant
                </Typography>
                <Container className={classes.container}>
                    {restaurant.map((product) => {
                        return (


                            <Box my={4} className={classes.box}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={product.res_image}
                                            title={product.res_name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {product.res_name}
                                            </Typography>

                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className={classes.action}>
                                        <Button size="small" color="primary"
                                            onClick={() => {
                                                navigate(product.route);                                                
                                                const restaurant_details = {
                                                    res_phone: product.res_phone,
                                                    res_name: product.res_name,
                                                    res_address: product.res_address
                                                }
                                                { console.log(restaurant_details) }
                                                localStorage.setItem("restaurant_data", JSON.stringify(restaurant_details))
                                            }
                                            }>

                                            {/* <Cart_MUI props= {restaurant_data} /> */}

                                            <b>View Menu</b>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>


                        )
                    })}

                    {/* <Box my={4}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={temple_city}
                                    title="Restaurant"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Temple City
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.action}>
                                <Button size="small" color="primary">
                                    <b>View Menu</b>
                                </Button>                                
                            </CardActions>
                        </Card>
                    </Box> */}
                </Container>
            </Container>
        </div>
    );
}



Home.propTypes = {

    window: PropTypes.func,
};

export default Home;
