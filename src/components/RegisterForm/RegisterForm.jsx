import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Container, Typography, TextField, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';

// change styling for MUI components
const useStyles = makeStyles({

  register: {
    marginTop: 100,

  },
  btn: {
    marginTop: 30,
    marginBottom: 25,
  },
  signup: {
    marginBottom: 15
  },
  password: {
    marginTop: 15,
  }

})
// change default themes of specific MUI components 
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F49D0C'
    }
  }
})

function RegisterForm() {
  // declare variable to use styles function
  const classes = useStyles();
  // create local states for user name and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // grab error info stored in error reducer
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  // send register information to register reducer to post in user database
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    // MUI container for side margins
    <Container align="center" className={classes.register}>
      {/* grid for responsive design */}
      <Grid noValidate autoComplete="off" onSubmit={registerUser}>
        {/* MUI input fields and button for registration form  */}
        <Grid item lg={2} xs={6} sm={3} md={3}>
          <Typography variant="h5" className={classes.signup}>Sign Up</Typography>
        </Grid>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}

        <Grid item lg={2} xs={6} sm={3} md={3}>
          <TextField noValidate autoComplete="off" required variant="standard" label="Username" color="primary" value={username}
            onChange={(event) => setUsername(event.target.value)} />
        </Grid>
        <Grid item lg={2} xs={6} sm={3} md={3}>
          <TextField className={classes.password} required label="Password" variant="standard" color="primary" value={password}
            type="password" noValidate autoComplete="off" onChange={(event) => setPassword(event.target.value)} />
        </Grid>
        <ThemeProvider theme={theme}>
          <Grid item lg={2} xs={6} sm={3} md={3}>
            <Button variant="contained" className={classes.btn} color="primary" align="center" onClick={registerUser}>Sign Up</Button>
          </Grid>
        </ThemeProvider>

      </Grid>
    </Container>


  );
}

export default RegisterForm;
