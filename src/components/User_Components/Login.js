import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import { color } from "@mui/system";
import { alpha, styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import api from '../../api/userInfo';
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import final_log from '../../images/final_log.jpg';
import { Link } from 'react-router-dom';


import axios from 'axios';
import { CompressOutlined } from "@mui/icons-material";


const orange = "#F2A74B";
const textLight = "#eaf2f4";
const textDark = "#0D0D0D";
const borderLight = "rgba(206,212,218, .993)";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
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

    // useEffect(() => {
    //     localStorage.setItem("check_login", "yes");
    // }, []);

    const mySubmit = () => {

        for (let i = 0; i < APIData.length; i++) {
            let input_contact = document.getElementById("contact").value;
            let matchContact = APIData[i].contact == input_contact
            if (matchContact) {
                let input_password = document.getElementById("password").value;
                if (APIData[i].password == input_password) {
                    console.log("You Are Successfully Logged In");
                    console.log('APIData is', APIData[i]);
                    localStorage.setItem("userdata", JSON.stringify(APIData[i]));
                    navigate('/');
                } else {
                    console.log("Incorrect password");
                }
            }
        }
    }




    return (
        <div className={classes.root}>
            <Grid className={classes.paperContainer}
                container
                direction="column"
                justify="space-evenly"
                alignItems="center">
                <Paper elevation={1} square className={classes.paper}>
                    <Grid container>


                        <Grid item xs={15}>

                            <Container component="main" maxWidth="xs" justify="flex-end" className={classes.containers} >
                                <CssBaseline />
                                <div className={classes.paper1}>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5" className={classes.register}>
                                        Sign In
                                    </Typography>
                                    <div className={classes.paper}>

                                        <form className={classes.form} onSubmit={handleSubmit(mySubmit)}>
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
                                                    required: 'Contact is required'
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
                                                data-toggle="modal">
                                                Submit
                                            </Button>

                                            <Typography>Please Login after <Link to='/register'>Sign up</Link></Typography>

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
        height: 655,
        justifyContent: "flex-start",
        paddingTop: 80,
        backgroundImage: `url(${final_log})`,
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
        marginTop: theme.spacing(2),
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
        display: "flex",
        flexDirection: "column",

        alignItems: "center",

        boxShadow: ".2px .1px 4px 1px rgba(131,153,167,0.6)",

        "&:hover": {
            boxShadow: "0px 0px 6px 5px rgba(255,255,255,0.99)"
        },
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "white !important"
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
        color: "white",
        fontWeight: 'bold'
    },
    register1: {
        color: "white"
    },
    fields: {
        borderColor: 'white',
        '.MuiInputLabel-outlined': {
            color: 'white'
        }
    },
    paper: {
        padding: 16,
        backgroundColor: "transparent",
    },
    header: {
        padding: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
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
    },

    button: {
        color: "white",
        position: "relative",
        fontWeight: 400,
        fontFamily: "Raleway, sans-serif",
        overflow: "hidden",
        marginTop: theme.spacing(6),
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
            opacity: 1,
            color: 'white',
            fontWeight: 'bolder'
        },
        "&::before": {
            borderBottom: "2px solid rgba(255,255,255,.58)",
            borderTop: "2px solid rgba(255,255,255,.58)",
            transform: "scale(0,1)"
        },
        "&::after": {
            borderLeft: "3px solid rgba(255,255,255,.58)",
            borderRight: "3px solid rgba(255,255,255,.58)",
            transform: "scale(1,0)",
            color: 'white',
            fontWeight: 'bolder'
        },
        "&:hover::before": {
            transform: "scale(1,1)",
            transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s"
        },
        "&:hover::after": {
            transform: "scale(1,1)",
            transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s",
            color: 'white',
            fontWeight: 'bolder'
        },
        "&::first-letter": {
            color: orange
        },
        "&:hover": {
            background: "rgba(169,198,217,0.8)",
            color: textLight,
            color: 'white',
            fontWeight: 'bolder'
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