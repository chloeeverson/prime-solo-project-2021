import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Button, Grid, Container, Typography, TextField, Card, CardHeader, CardContent, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';

//change of styling with MUI components
const useStyles = makeStyles({

  login: {
    marginTop: 100,

  },
  btn: {
    marginTop: 30,
    marginBottom: 25,
  },
  signin: {
    marginBottom: 15
  },
  password: {
    marginTop: 15,
  }

})

//changing default theme colors
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F49D0C'
    }
  }
})


function LoginForm() {
  //declaring classes for MUI styling so can target specific components to change
  const classes = useStyles();

  //creating local states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //grabbing error store
  const errors = useSelector(store => store.errors);

  //declaring variable to use dispatch function
  const dispatch = useDispatch();

  //declaring variable to utilize history function
  const history = useHistory();


  //if have correct login - on "sign in" redirect to home / otherwise render login error
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push('/user')
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <>
      {/* mui container for side margins */}
      <Container align="center" className={classes.login}>
        {/* grid for responsive design */}
        <Grid noValidate autoComplete="off" onSubmit={login}>

          <Grid item lg={2} xs={6} sm={3} md={3}>
            {/* login inputs / button */}
            <Typography variant="h5" className={classes.signin}>Sign In</Typography>
          </Grid>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
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
              <Button variant="contained" className={classes.btn} color="primary" align="center" onClick={login}>Sign In</Button>
            </Grid>
          </ThemeProvider>

        </Grid>
      </Container>

    </>
  );
}

export default LoginForm;
