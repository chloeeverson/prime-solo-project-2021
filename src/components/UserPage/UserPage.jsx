import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {Typography, createMuiTheme, ThemeProvider} from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router-dom';


const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#184473'
      }
  }
})

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const list = useSelector((store)=>store.list);
  console.log(list);
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   dispatch({type: 'FETCH_LIST'})
  // },[]);
  
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
    
<ThemeProvider theme={theme}>
    <Typography variant="h3" align="center" color="primary">SAVED LISTS</Typography>
    <ul>
        {list.map((trip) => 
          <li onClick={() => handleList(trip)} key={trip.id}>{trip.location} {moment(trip.start_date).format('LL')}</li>  
        )}
      </ul>
    </ThemeProvider>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
