import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {Typography, createMuiTheme, ThemeProvider} from '@material-ui/core';


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
  // const dispatch = useDispatch();
  // dispatch({type: 'FETCH_LIST'})
  return (
    // <div className="container">
    //   <h2>Welcome, {user.username}!</h2>
    //   <p>Your ID is: {user.id}</p>
      // <LogOutButton className="btn" />
    // </div>
<ThemeProvider theme={theme}>
    <Typography variant="h2" align="center" color="primary">SAVED LISTS</Typography>
    <ul>
        {list.map((trip) => 
          <li key={trip.id}>{trip.location} {trip.start_date}</li>  
        )}
      </ul>
    </ThemeProvider>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
