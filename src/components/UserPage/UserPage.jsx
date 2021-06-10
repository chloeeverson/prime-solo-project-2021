import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {Typography, createMuiTheme, ThemeProvider, CardContent, Container, Card, Grid, makeStyles} from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router-dom';


const theme = createMuiTheme({
  // palette: {
  //     primary: {
  //         main: '#F49D0C'
  //     },
  //     secondary: {
  //       main: '#184473'
  //   },
  // }
})

const useStyles = makeStyles({
    list: {
      marginTop: 15,
    },
    listItem: {

    }

})

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const list = useSelector((store)=>store.list);
  console.log(list);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch({type: 'FETCH_LIST'})
  },[]);
  
  function handleList(trip){
    console.log('clicked on list' , trip.location)
    // dispatch({type: 'SET_SAVED_LIST', payload: trip})
    history.push(`/savedlist/${trip.id}`)
  }


  return (
    // <div className="container">
    //   <h2>Welcome, {user.username}!</h2>
    //   <p>Your ID is: {user.id}</p>
      // <LogOutButton className="btn" />
    // </div>
    <Container>
<ThemeProvider theme={theme}>
    <Typography variant="h3" align="center" color="primary">SAVED LISTS</Typography>
    <Grid align="center" className={classes.list} container spacing={6}>
        {list.map((trip) => 
          <Grid item lg={6} med={3} xs={12} onClick={() => handleList(trip)} key={trip.id}>
            <Card  style={{backgroundColor: '#cddc39'}} className={classes.listItem}>
              <CardContent>
                <Typography color="primary" variant="h5">
                {trip.location}
        </Typography>
        <Typography color="primary">
        {moment(trip.start_date).format('LL')}</Typography>
        <Typography color="primary">
        {trip.days} days</Typography>
        </CardContent></Card>  
        </Grid>)}
      </Grid>
    </ThemeProvider>
    </Container>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
