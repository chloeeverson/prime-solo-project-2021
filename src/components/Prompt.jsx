import { Typography, TextField, Grid, makeStyles, Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {KeyboardDatePicker} from '@material-ui/pickers';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    prompt: {
        marginBottom: 30,

    },
    title: {
        marginTop: 50,
        marginBottom: 30,
    },
    btn: {
        marginTop: 35,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
    },
})


function Prompt() {
    const classes = useStyles();
    const history = useHistory();

    const [where, setWhere] = useState('');
    const [when, setWhen] = useState('');
    const [days, setDays] = useState('');

    const dispatch = useDispatch();

    function packingList() {
        console.log('adding to saved lists:', {where}, {when}, 'to saved lists');
        if (where && when && days) {
            dispatch(
                // {
                // type: 'ADD_LIST',
                // payload: {
                //     location: where,
                //     start_date: when,
                //     days: days,
                // }},
                {type: 'ADD_CURRENT_LIST',
                payload: {
                    location: where,
                    start_date: when,
                    days: days,
                }}
            );
        } else {
            dispatch({ type: 'PROMPT_INPUT_ERROR' });
        }
        history.push('/list')
    }
    return (

        <Grid align="center">
            <Grid item>
                <Typography className={classes.title} lg={12} variant="h5">Tell me about your trip!</Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.prompt} lg={2} variant="subtitle1">Where are you going?</Typography>
            </Grid>
            <Grid item>
                <TextField className={classes.prompt} variant="outlined"  required value={where}
            onChange={(event) => setWhere(event.target.value)} />
            </Grid>
            <Grid item>
                <Typography className={classes.prompt} lg={2} variant="subtitle1">Start date:</Typography>
            </Grid>
            <Grid item>
                <TextField className={classes.prompt} type="date" variant="outlined" 
                required value={when}
            onChange={(event) => setWhen(event.target.value)}/>
            </Grid>
            <Grid item>
                <Typography className={classes.prompt} lg={2} variant="subtitle1">How many days?</Typography>
            </Grid>
            <Grid item>
                <TextField className={classes.prompt} type="number" variant="outlined"  required value={days}
            onChange={(event) => setDays(event.target.value)}/>
            </Grid>
            <Button variant="contained" className={classes.btn} size="large" color="primary" onClick={packingList} endIcon={<ArrowForwardIosIcon />}>Packing List</Button>
            {/* <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={when}
          onChange={(event) => setWhen(event.target.value)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        </Grid>
    );

}

export default Prompt;