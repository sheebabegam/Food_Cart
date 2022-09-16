import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { UserContext } from './UserContext';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import { color } from "@mui/system";
import { alpha, styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import api from '../../api/userInfo';
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import back from '../../images/back.jpg'

import axios from 'axios';
import { CompressOutlined } from "@mui/icons-material";


const orange = "#F2A74B";
const textLight = "#eaf2f4";
const textDark = "#0D0D0D";
const borderLight = "rgba(206,212,218, .993)";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#9c9a9a',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#9c9a9a',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#9c9a9a',
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#9c9a9a',
        },
    },
});



export default function Register() {
    const classes = useStyles();
    const navigate = useNavigate();

    // Compare data
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3010/userInfo`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, []);

    const LOCAL_STORAGE_KEY = "userInfo";

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userInfo, setuserInfo] = useState([]);

    // console.log(userInfo);

    const retriveContacts = async () => {
        const response = await api.get("/userInfo");
        return response.data;
    }

    function notSubmit() {
        console.log('CANNOT SUBMIT');
    }


    const onSubmit = async (data) => {
        // console.log(data);        
        const request = {
            id: uuidv4(),
            ...data,
        }

        const response = await api.post("/userInfo", request);
        // console.log(response);
        setuserInfo([...userInfo, response.data])
    }


    const mySubmit = (data) => {
        console.log("data--", APIData);
        var cont = APIData.reduce((res) => {
            return res.contact == data.contact
        })
        console.log("cont", cont)
        if (cont) {
            console.log("aleary exist")
        } else {
            onSubmit(data);
            navigate('/login');
        }
    }


    useEffect(() => {

        // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // if (retriveContacts) setuserInfo(retriveContacts);

        const getContacts = async () => {
            const allContacts = await retriveContacts();
            if (allContacts) setuserInfo(allContacts);
        };
        getContacts();
    }, []);

    const contacts = async () => {
        const response = await api.get("/userInfo");
        return response.data;
    }



    useEffect(() => {
        localStorage.setItem("register", "yes");
    }, []);


    return (
        <div className={classes.root}>
            <Grid className={classes.paperContainer}
                container
                direction="column"
                justify="space-evenly"
                alignItems="center">
                <Paper elevation={1} square className={classes.paper}>
                    <Grid container>


                        <Grid item xs={15} className={classes.colors}>
                            <Typography variant='h2' className={classes.grid1}>
                                Don't have an
                                account?
                            </Typography>
                            <br />
                            <br />
                            <Typography variant='h5' className={classes.subtitle}>
                                Register to access all the features of our service.
                            </Typography>
                            <Typography variant='h6' className={classes.subtitle}>
                                Manage your business in one place. It's free.
                            </Typography>
                        </Grid>


                        <Grid item xs={15}>

                            <Container component="main" maxWidth="xs" justify="flex-end" className={classes.containers} >
                                <CssBaseline />
                                <div className={classes.paper1}>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5" className={classes.register}>
                                        Signup
                                    </Typography>
                                    <div className={classes.paper}>

                                        <form className={classes.form} onSubmit={handleSubmit(mySubmit)}>
                                            <CssTextField
                                                className={classes.fields}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="firstname"
                                                label="First Name"
                                                name="firstname"
                                                multiline
                                                inputProps={{ style: { color: "white" } }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'white'
                                                    }
                                                }}
                                                {...register("firstname", {
                                                    required: 'Password is required'
                                                })}
                                            />

                                            <CssTextField
                                                className={classes.fields}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="lastname"
                                                label="Last Name"
                                                name="lastname"
                                                multiline
                                                inputProps={{ style: { color: "white" } }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'white'
                                                    }
                                                }}
                                                {...register("lastname", {
                                                    required: 'Password is required'
                                                })}
                                            />
                                            <CssTextField
                                                className={classes.fields}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="contact"
                                                label="Contact"
                                                name="contact"
                                                multiline
                                                inputProps={{ style: { color: "white" } }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'white'
                                                    }
                                                }}
                                                {...register("contact", {
                                                    required: 'Password is required'
                                                })}
                                            />
                                            <CssTextField
                                                className={classes.fields}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                name="email"
                                                multiline
                                                inputProps={{ style: { color: "white" } }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'white'
                                                    }
                                                }}
                                                {...register("email", {
                                                    required: 'Password is required'
                                                })}
                                            />
                                            <CssTextField
                                                className={classes.fields}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                label="Password"
                                                name="password"
                                                multiline
                                                inputProps={{ style: { color: "white" } }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'white'
                                                    }
                                                }}
                                                {...register("password", {
                                                    required: 'Password is required'
                                                })}
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                // onClick={loginSubmit}
                                                data-toggle="modal">
                                                Submit
                                            </Button>

                                            <Typography style={{ color: 'white' }}>Already have an account. Please <Link to='/login' style={{ color: 'green', fontWeight: 'bold' }}>Sign In</Link></Typography>


                                        </form>

                                    </div>

                                </div>
                            </Container>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}





const useStyles = makeStyles(theme => ({

    paperContainer: {
        height: 660,
        justifyContent: "flex-start",
        // paddingTop: 50,
        backgroundImage: `url(${back})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignContent: "stretch",
        [theme.breakpoints.down("sm")]: {
            alignContent: "flex-start"
        }
    },

    header: {
        padding: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    },
    title: {
        color: theme.palette.primary.contrastText,
        marginBottom: theme.spacing(1)
    },
    subtitle: {
        color: theme.palette.primary.contrastText
    },

    paper1: {
        position: "relative",
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
        display: "flex",
        flexDirection: "column",

        alignItems: "center",

        boxShadow: ".2px .1px 4px 1px rgba(131,153,167,0.6)",

        "&:hover": {
            boxShadow: "0px 0px 6px 5px rgba(131,153,167,0.99)"
        },
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "#9c9a9a !important"
    },
    grid1: {
        marginTop: theme.spacing(25),
    },
    colors: {
        color: "#d5cece",
        textAlign: "center",
        borderColor: 'white'
    },
    register: {
        color: "white"
    },
    register1: {
        color: "#9c9a9a"
    },
    fields: {
        borderColor: '#9c9a9a',
        '.MuiInputLabel-outlined': {
            color: 'white'
        }
    },
    paper: {
        padding: 16,
        backgroundColor: "transparent",
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        display: "block",
        width: "auto",
        [theme.breakpoints.up(1000 + theme.spacing(3))]: {
            width: 1000,
            marginLeft: "auto",
            marginRight: "auto"
        },
        // transform: 'translateX(5%)',

    },
    button: {
        color: "white",
        // background: "rgba(255,255,255,.45)",
        position: "relative",
        fontWeight: 400,
        fontFamily: "Raleway, sans-serif",
        overflow: "hidden",
        marginTop: theme.spacing(3),
        padding: `${theme.spacing(1.6)}px`,
        border: "none",
        borderRadius: "8px",
        letterSpacing: "3px",

        "&::before, &::after": {
            position: "absolute",
            content: '""',
            boxSizing: "border-box",
            borderRadius: "8px",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 1
        },
        "&::before": {
            borderBottom: "2px solid rgba(255,255,255,.58)",
            borderTop: "2px solid rgba(255,255,255,.58)",
            transform: "scale(0,1)"
        },
        "&::after": {
            borderLeft: "3px solid rgba(255,255,255,.58)",
            borderRight: "3px solid rgba(255,255,255,.58)",
            transform: "scale(1,0)"
        },
        "&:hover::before": {
            transform: "scale(1,1)",
            transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s"
        },
        "&:hover::after": {
            transform: "scale(1,1)",
            transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s"
        },
        "&::first-letter": {
            color: orange
        },
        "&:hover": {
            background: "rgba(169,198,217,0.8)",
            color: textLight
        }
    },


}));




// Email Validation
// const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
// const isEmail = re.test(item.email);

// if (!isEmail) {
//     // e.preventDefault;
//     console.log('Invalid email address');
// }