import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, makeStyles, createMuiTheme, ThemeProvider, Grid } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';

// change default MUI themes for specific components
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

// change styling of MUI components
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

  },
  loginNav: {
    // marginRight: 133,
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
  // declare variables for use of functions
  const location = useLocation();
  const classes = useStyles();

  //grab user info stored in user reducer
  const user = useSelector((store) => store.user);

  //if logged in and on home page - render New List link which will direct to new list prompts 
  //otherwise if logged in and on any other page render Saved list link which will direct to home page of all saved lists
  let loginLinkData = {

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


  return (
    <>
      {/* display conditionally rendered link in upper left corner of nav bar */}
      <div className="nav">
        <Link style={{ color: '#F49D0C', marginLeft: 5 }}

          to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {/* pack me logo when logged in and on home page*/}
        {user.id && location.pathname === "/user" && (
          <ThemeProvider theme={theme}>
            <Grid className={classes.homeLogo}
            >
              <Grid item>
                <CardTravelIcon className={classes.suitcase}
                  style={{ color: '#2c387e', align: 'center' }}

                  align="center" fontSize='large' />
              </Grid>
              <Grid item>

                <Typography className={classes.title} variant="h6" style={{ color: '#2c387e', align: 'center' }} align="center">packMe</Typography>

              </Grid>
            </Grid>
          </ThemeProvider>)}

        {/* pack me logo when logged in and not on home page */}
        {user.id && location.pathname != "/user" && (
          <ThemeProvider theme={theme}>
            <Grid className={classes.logo}
            >
              <Grid item>
                <CardTravelIcon className={classes.suitcase}
                  style={{ color: '#2c387e', align: 'center' }}

                  align="center" fontSize='large' />
              </Grid>
              <Grid item>

                <Typography className={classes.title} variant="h6" style={{ color: '#2c387e', align: 'center' }} align="center">packMe</Typography>

              </Grid>
            </Grid>
          </ThemeProvider>)}

        {/* logout button right corner nav bar when logged in*/}
        {user.id && (
          <>

            <LogOutButton
              className="navLink"

            />
          </>
        )}
      </div>

      {/* pack me logo when not logged in */}
      {!user.id && (
        <ThemeProvider theme={theme}>
          <Grid align="center" className={classes.loginNav}
          >
            <Grid item>
              <CardTravelIcon
                style={{ color: '#2c387e', align: 'center', marginTop: 20 }}

                align="center" fontSize='large' />
            </Grid>
            <Grid item>

              <Typography className={classes.title} variant="h6" style={{ color: '#2c387e', align: 'center', marginBottom: -30 }} align="center">packMe</Typography>

            </Grid>
          </Grid>
        </ThemeProvider>

      )}








    </>
  );
}

export default Nav;
