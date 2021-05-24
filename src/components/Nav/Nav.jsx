import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import { Typography, makeStyles, createMuiTheme, ThemeProvider, Box, Grid, Container, AppBar, ToolBar } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#000000'
      }
  }
})


const useStyles = makeStyles({
  btn: {
    margin: 60,
  },

  title: {
    marginTop: 2,
  },
  logo: {
    // alignItems: "center",
    // justifyContent: "center"
  },
  titleHome: {
    alignItems: 'center'
  }

})


function Nav() {
  

  const classes = useStyles();

  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Saved Lists';
  }

  return (
    
    <div className="nav">
        {/* <Link
          // className="navLink" 
          to={loginLinkData.path}>
          {loginLinkData.text}
        </Link> */}

      <Link to="/home">
        {/* <h2 className="nav-title">packMe</h2> */}
        <ThemeProvider theme={theme}>
        <Grid className={classes.logo}
          >
          <Grid item>
            <CardTravelIcon color="primary" fontSize='large' />
          </Grid>
          <Grid item>
            
              <Typography className={classes.title} variant="h5" color="primary" align="left">packMe</Typography>
          {/* <Grid item className={classes.titleHome}>
          <Typography align="center" variant="h1">SAVED LISTS</Typography>
          </Grid> */}
          </Grid>
        </Grid>
        </ThemeProvider>
      </Link>
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
