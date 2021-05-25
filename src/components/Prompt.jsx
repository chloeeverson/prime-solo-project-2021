import { Typography, TextField, Grid, makeStyles, Button } from '@material-ui/core';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    prompt: {
        marginBottom: 10,
    },
    title: {
        marginTop: 70,
        marginBottom: 30,
    },
})


function Prompt() {
    const classes = useStyles();
    const [where, setWhere] = useState('');
    const [when, setWhen] = useState('');
    const [days, setDays] = useState('');

    const dispatch = useDispatch();

    function packingList() {
        if (where && when && days) {
            dispatch({
                type: 'PROMPT',
                payload: {
                    location: where,
                    start_date: when,
                    days: days,
                },
            });
        } else {
            dispatch({ type: 'PROMPT_INPUT_ERROR' });
        }
    }
    return (

        <Grid align="center">
            <Grid item>
                <Typography className={classes.title} lg={6} variant="h5">Tell me about your trip!</Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.prompt} lg={6} variant="subtitle1">Where?</Typography>
            </Grid>
            <Grid item>
                <TextField className={classes.prompt} variant="filled" label="City" required value={where}
            onChange={(event) => setWhere(event.target.value)} />
            </Grid>
            <Grid item>
                <Typography className={classes.prompt} lg={6} variant="subtitle1">Start date:</Typography>
            </Grid>
            <Grid item>
                <TextField className={classes.prompt} variant="filled" label="MM/DD/YYYY" required value={when}
            onChange={(event) => setWhen(event.target.value)}/>
            </Grid>
            <Grid item>
                <Typography className={classes.prompt} lg={6} variant="subtitle1">How many days?</Typography>
            </Grid>
            <Grid item>
                <TextField className={classes.prompt} variant="filled" label="Number" required value={days}
            onChange={(event) => setDays(event.target.value)}/>
            </Grid>
            <Button variant="contained" className={classes.btn} color="primary" onClick={packingList}>Packing List</Button>

        </Grid>
    );

}

export default Prompt;