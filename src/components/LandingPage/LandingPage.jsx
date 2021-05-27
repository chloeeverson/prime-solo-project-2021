import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import {Button, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#F49D0C'
      }
  }
})

const useStyles = makeStyles({
  btn: {
      backgroundColor: ''
  }
})

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const classes = useStyles();



  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          {/* <p>
          packMe is designed to help a person pack for their upcoming travel. 
          A user will be able to create their own packing list on the app and keep track of which items they packed using a checkbox system. 
          (STRETCH GOAL: Users will be given suggested packing items to choose from for the purpose of helping users decide and remember what to pack.) 
          Users can make multiple lists. They can save their lists to go back to them at any time. 
          The goal of this app is to create an easier way to manage and organize packing for upcoming travel. 
          </p> */}

        
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <ThemeProvider theme={theme}>
            <Button variant="contained" className={classes.btn} color="primary" onClick={onLogin}>Login</Button>
            </ThemeProvider>
            {/* <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button> */}
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
