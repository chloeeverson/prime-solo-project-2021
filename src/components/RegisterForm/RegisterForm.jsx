import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Button, Grid, Container, Typography, TextField, Card, CardHeader, CardContent, makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core';

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
const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#F49D0C'
      }
  }
})

function RegisterForm() {
  const classes=useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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

    <Container align="center" className={classes.register}>
      <Grid noValidate autoComplete="off" onSubmit={registerUser}>
        {/* <Card>
          <CardHeader> */}
          <Grid item lg={2} xs={6} sm={3} md={3}>
          <Typography variant="h5" className={classes.signup}>Sign Up</Typography>
          </Grid>
          {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
          {/* </CardHeader>
          <CardContent> */}
          <Grid item lg={2} xs={6} sm={3} md={3}>
          <TextField noValidate autoComplete="off" required variant="standard" label="Username" color="secondary" value={username}
            onChange={(event) => setUsername(event.target.value)}/>
            </Grid>
            <Grid item lg={2} xs={6} sm={3} md={3}>
          <TextField className={classes.password} required label="Password" variant="standard" color="secondary" value={password} 
            type="password" noValidate autoComplete="off" onChange={(event) => setPassword(event.target.value)}/>
            </Grid>
          <ThemeProvider theme={theme}>
          <Grid item lg={2} xs={6} sm={3} md={3}>
            <Button variant="contained" className={classes.btn} color="primary" align="center" onClick={registerUser}>Sign Up</Button>
            </Grid>
            </ThemeProvider>
  
          {/* </CardContent>
        </Card> */}
      </Grid>
    </Container>
   

    // <form className="formPanel" onSubmit={registerUser}>
    //   <h2>Register User</h2>
    //   {errors.registrationMessage && (
    //     <h3 className="alert" role="alert">
    //       {errors.registrationMessage}
    //     </h3>
    //   )}
    //   <div>
    //     <label htmlFor="username">
    //       Username:
    //       <input
    //         type="text"
    //         name="username"
    //         value={username}
    //         required
    //         onChange={(event) => setUsername(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="password">
    //       Password:
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         required
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <input className="btn" type="submit" name="submit" value="Register" />
    //   </div>
    // </form>
  );
}

export default RegisterForm;
