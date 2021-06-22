import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, CardContent, Container, Card, Grid, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

// change styling for MUI components
const useStyles = makeStyles({
  list: {
    marginTop: 15,
  }
})

// home page
function UserPage() {
  //grab saved lists stored in redux
  const list = useSelector((store) => store.list);

  //create variables for using functions
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  //on page load inititiate reducer to fetch saved lists
  useEffect(() => {
    dispatch({ type: 'FETCH_LIST' })
  }, []);

  //when click on specific list- redirect to that list's page with packing items
  function handleList(trip) {
    console.log('clicked on list', trip.location)
    history.push(`/savedlist/${trip.id}`)
  }


  return (
    //container for responsive side margins
    <Container>
      {/* title */}
      <Typography variant="h3" align="center" color="primary">SAVED LISTS</Typography>
      {/* grid for responsive design */}
      <Grid align="center" className={classes.list} container spacing={6}>
        {/* render each list and it's properties in seperate cards  */}
        {list.map((trip) =>
          <Grid item lg={6} med={3} xs={12} onClick={() => handleList(trip)} key={trip.id}>
            <Card style={{ backgroundColor: '#cddc39' }} className={classes.listItem}>
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

    </Container>
  );
}


export default UserPage;
