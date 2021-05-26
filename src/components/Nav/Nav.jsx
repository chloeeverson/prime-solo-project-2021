import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

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
  logo: {
    // alignItems: "center",
    // justifyContent: "center"
  },
  titleHome: {
    alignItems: 'center'
  },
  suitcase: {
    marginLeft: 15,
  }

})


function Nav() {

  const location = useLocation();
  const classes = useStyles();

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
    loginLinkData.text = 'Create New List';

  }

  return (

    <div className="nav">
      <Link
        // className="navLink" 
        to={loginLinkData.path}>
        {loginLinkData.text}
      </Link>

      {/* <Link to="/home"> */}
      {/* <h2 className="nav-title">packMe</h2> */}
      <ThemeProvider theme={theme}>
        <Grid className={classes.logo}
        >
          <Grid item>
            <CardTravelIcon className={classes.suitcase} color="secondary" align="center" fontSize='medium' />
          </Grid>
          <Grid item>

            <Typography className={classes.title} variant="subtitle1" color="textSecondary" align="center">packMe</Typography>
            {/* <Grid item className={classes.titleHome}>
          <Typography align="center" variant="h1">SAVED LISTS</Typography>
          </Grid> */}
          </Grid>
        </Grid>
      </ThemeProvider>
      {/* </Link> */}
      <div>




        {user.id && (
          <>
            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}
            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>


  );
}

export default Nav;
