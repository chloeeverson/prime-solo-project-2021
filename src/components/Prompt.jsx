import { Typography, TextField, Grid, makeStyles, Button, withStyles } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//change styling of MUI components
const useStyles = makeStyles({
  prompt: {
    marginBottom: 15,

  },
  answer: {
    marginBottom: 25,
    textAlign: "center",
  },
  title: {
    marginTop: 50,
    marginBottom: 30,
  },
  btn: {
    marginTop: 25,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
})


// change styling of MUI textfields
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: '#cddc39',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary',
      },
    },
  },
})(TextField);


function Prompt() {
  // declare variables for use of functions
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();


  //create local states for prompt answers
  const [where, setWhere] = useState('');
  const [when, setWhen] = useState('');
  const [days, setDays] = useState('');
  //enable button for next page only if all fields are complete
  const isEnabled = where.length > 0 && when.length > 0 && days.length > 0
  //on click of packing list button:
  function packingList() {
    //if all fields complete:
    if (where && when && days) {
      //and list information to current list store to be used on next page
      dispatch(

        {
          type: 'ADD_CURRENT_LIST',
          payload: {
            location: where,
            start_date: when,
            days: days,
          }
        }
      );
    } else {
      //display error if error
      dispatch({ type: 'PROMPT_INPUT_ERROR' });
    }
    //redirect user to next page - where user can add items to list
    history.push('/list')
  }
  return (
    //grid for responsive design
    <Grid align="center">
      {/* prompts with textfields for answers. Answers saved to local state and added to store on click of submit button */}
      <Grid item>
        <Typography className={classes.title} lg={12} variant="h5">Tell me about your trip!</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.prompt} lg={2} variant="subtitle1">Where are you going?</Typography>
      </Grid>
      <Grid item>
        <CssTextField inputProps={{ style: { textAlign: 'center' } }} className={classes.answer} variant="outlined" required value={where}
          onChange={(event) => setWhere(event.target.value)} />
      </Grid>
      <Grid item>
        <Typography className={classes.prompt} lg={2} variant="subtitle1">Start date:</Typography>
      </Grid>
      <Grid item>
        <CssTextField inputProps={{ style: { textAlign: 'center' } }} className={classes.answer} type="date" variant="outlined"
          required value={when}
          onChange={(event) => setWhen(event.target.value)} />
      </Grid>
      <Grid item>
        <Typography className={classes.prompt} lg={2} variant="subtitle1">How many days?</Typography>
      </Grid>
      <Grid item>
        <CssTextField inputProps={{ min: 0, style: { textAlign: 'center' } }} className={classes.answer} type="number" variant="outlined" required value={days}
          onChange={(event) => setDays(event.target.value)} />
      </Grid>
      {/* when button clicked - initiate function which adds list to reducer to use on next page */}
      <Button variant="contained" className={classes.btn} disabled={!isEnabled} size="large" color="primary" onClick={packingList} endIcon={<ArrowForwardIosIcon />}>Packing List</Button>


    </Grid>
  );

}

export default Prompt;