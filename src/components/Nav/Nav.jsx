import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, makeStyles, createMuiTheme, ThemeProvider, Box, Grid, Container, AppBar, ToolBar } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#000000'
    },
    textSecondary: {
      main: '#000000'
    },
    primary: {
      main: '#F49D0C'
    }
  }
})


const useStyles = makeStyles({
  btn: {
    margin: 60,
  },

  title: {
    marginTop: -4,
  
  },
  homeLogo: {
    marginTop: 5, 
    marginLeft: 4,
    

  },
  logo: {
    marginTop: 5,
    marginLeft: -16,
    // alignItems: "center",
    // justifyContent: "center"
  },
  loginNav: {
    marginRight: 133,
    marginTop: 5
  },
  titleHome: {
    alignItems: 'center'
  },
  suitcase: {
    marginLeft: 17,
   
  },
  


})


function Nav() {

  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  let loginLinkData = {
    // path: '/login',
    // text: 'Login / Register',
    path: '',
    text: '',
  };

  if (user.id != null && location.pathname != "/user") {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Saved Lists';

  }

  if (user.id != null && location.pathname === "/user") {
    loginLinkData.path = '/prompt';
    loginLinkData.text = 'New List';

  }

  // if (user.id != null && location.pathname != "/list" && location.pathname != "/prompt") {
  //   dispatch({type: 'RESET_CURRENT_LIST'})

  // }

  

  return (

      <div className="nav">
      <Link style={{color: '#F49D0C', marginLeft: 5}}
        // className="navLink" 
        to={loginLinkData.path}>
        {loginLinkData.text}
      </Link>


{user.id && location.pathname === "/user" && (
        <ThemeProvider theme={theme}>
        <Grid className={classes.homeLogo}
        >
          <Grid item>
            <CardTravelIcon className={classes.suitcase} 
            style={{color: '#2c387e', align: 'center'}} 
            
            align="center" fontSize='large' />
          </Grid>
          <Grid item>

            <Typography className={classes.title} variant="h6" style={{color: '#2c387e', align: 'center'}} align="center">packMe</Typography>
            {/* <Grid item className={classes.titleHome}>
          <Typography align="center" variant="h1">SAVED LISTS</Typography>
          </Grid> */}
          </Grid>
        </Grid>
      </ThemeProvider>)}
      
      
  {user.id && location.pathname != "/user" && (
    <ThemeProvider theme={theme}>
        <Grid className={classes.logo}
        >
          <Grid item>
            <CardTravelIcon className={classes.suitcase} 
            style={{color: '#2c387e', align: 'center'}} 
            
            align="center" fontSize='large' />
          </Grid>
          <Grid item>

            <Typography className={classes.title} variant="h6" style={{color: '#2c387e', align: 'center'}} align="center">packMe</Typography>
            {/* <Grid item className={classes.titleHome}>
          <Typography align="center" variant="h1">SAVED LISTS</Typography>
          </Grid> */}
          </Grid>
        </Grid>
      </ThemeProvider>)}
     
     
      {!user.id && (
        <ThemeProvider theme={theme}>
        <Grid align="center" className={classes.loginNav}
        >
          <Grid item>
            <CardTravelIcon 
            style={{color: '#2c387e', align: 'center'}} 
            
            align="center" fontSize='large' />
          </Grid>
          <Grid item>

            <Typography  className={classes.title} variant="h6" style={{color: '#2c387e', align: 'center'}} align="center">packMe</Typography>
            {/* <Grid item className={classes.titleHome}>
          <Typography align="center" variant="h1">SAVED LISTS</Typography>
          </Grid> */}
          </Grid>
        </Grid>
      </ThemeProvider>

      )}




        {user.id && (
          <>
            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}
            <LogOutButton 
            className="navLink" 
            // className={classes.logout}
            />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
  
  </div>

  );
}

export default Nav;
