import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import {Button, Grid, Container, Typography, TextField, Card, CardHeader, CardContent, makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({

  login: {
      marginTop: 100,
    
  },
  btn: {
      marginTop: 20,
      marginBottom: 15,
  },
  signin: {
      marginBottom: 10
  },
  password: {
    marginTop: 10,
  }

})
const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#F49D0C'
      }
  }
})


function LoginForm() {

  const classes=useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

 

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
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <>
    <form>
    <Container align="center" className={classes.login}>
      <Grid noValidate autoComplete="off" onSubmit={login} lg={2} xs={6} sm={3} md={3}>
        {/* <Card>
          <CardHeader> */}
          <Typography variant="h5" className={classes.signin}>Sign In</Typography>
          {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
          {/* </CardHeader>
          <CardContent> */}
          <TextField required id="standard-required" label="Username" color="secondary" value={username}
            onChange={(event) => setUsername(event.target.value)}/>
          <TextField className={classes.password} required label="Password" variant="standard" color="secondary" value={password} 
            type="password" onChange={(event) => setPassword(event.target.value)}/>
          <ThemeProvider theme={theme}>
            <Button variant="contained" className={classes.btn} color="primary" align="center" onClick={login}>Sign In</Button>
            </ThemeProvider>
  
          {/* </CardContent>
        </Card> */}
      </Grid>
    </Container>
    </form>
  

    {/* <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form> */}
    </>
  );
}

export default LoginForm;
