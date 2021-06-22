import { Typography, Grid, TextField, makeStyles, Button, Container, createMuiTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import SavedItem from './SavedItem'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

//change of styling for MUI components
const useStyles = makeStyles({
    numberInput: {
        width: '5ch',
        marginRight: 20,

    },
    input: {
        marginTop: 30,
        marginBottom: 20,

    },
    addBtn: {
        marginTop: 5,
        marginLeft: 20,
    },
    itemInput: {
        width: '15ch',
    },
    saveBtn: {
        marginTop: 20,
    },
    editAmount: {
        width: '5ch',
    },
    daysAmount: {
        width: '5ch',
        marginLeft: -125,
    },
    days: {
        marginTop: -25,
        marginLeft: -30,
        marginBottom: 10,
    },
    deleteIcon: {
        marginLeft: -13,
    },
    deleteBtn: {
        padding: 10,
        marginTop: 40,
        marginBottom: 40,

    },
})



function SavedList() {
    // declare variables for use of functions
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    //use params for use as as list id value for payloads
    const { id } = useParams();
    //create local states for edit mode, list properties and new item properties
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [days, setDays] = useState('');
    const [amount, setAmount] = useState(1);
    const [name, setName] = useState('');
    //grab list properties stored for specific list
    const trip = useSelector(store => store.savedList);
    //grab items stored for specified list 
    const items = useSelector(store => store.items);


    //on click of add item button - send payload of new item to add item reducer 
    //- eventually adding new item to database and stored items array
    function addItem() {

        console.log('adding', { amount }, { name });

        dispatch({
            type: 'ADD_ITEM', payload: {
                name: name,
                amount: amount,
                list_id: id,
            }
        })
        //reset local state of new item textfield to allow for more items to be added
        setName('');
        setAmount(1);
    }

    //on page load render specified saved list and its items onto page
    useEffect(() => {
        console.log('in useEffect param:', id)
        dispatch({ type: 'FETCH_SAVED_LIST', payload: id })
        dispatch({ type: 'FETCH_ITEMS', payload: id })
    }, []);

    //on click of edit button trigger function:
    function handleEdit() {
        console.log('in handleEdit');
        // Turn on edit mode
        setEditMode(true);

        // Set values in state from our list reducer
        setTitle(trip.location);
        setDate(trip.start_date.slice(0, 10));
        setDays(trip.days);

    }
    //on clock of save button:
    function handleSave() {
        console.log('in handleSave');
        const updatedList = {
            id: trip.id,
            location: title,
            start_date: date,
            days: days,
        }
        console.log('Updated trip info:', updatedList);
        //update list to reflect changes by triggering events stemmed from update list reducer
        dispatch({ type: 'UPDATE_LIST', payload: updatedList })
        //reset edit mode to false
        setEditMode(false)
        // history.push('/user')
    }

    //set local state for open / close of alert
    const [open, setOpen] = useState(false);
    //set state of open to true
    const handleClickOpen = () => {
        setOpen(true);
    };
    //set state of open to false
    const handleClose = () => {
        setOpen(false);
    };
    //on confirmation of alert to delete:
    function deleteList() {
        //set local state of open back to false
        setOpen(false);
        //trigger delete list reducer which end result is permanent delete of list from database
        dispatch({ type: 'DELETE_LIST', payload: id });
        //redirect user back to home page
        history.push('/user');

    }



    return (
        // container for responsive side margins
        <Container>


            {/* if there's trip info and in edit mode: */}
            {trip && trip.location && editMode ?
                // grid for responsive design
                <Grid align="center" >
                    {/* textfields for list properties to allow for editing */}
                    <Grid item>
                        <TextField autoComplete="off" type="text" align="center" color="primary" variant="standard" value={title}
                            onChange={(event) => setTitle(event.target.value)} /></Grid>
                    <Grid item>
                        <TextField autoComplete="off" variant="standard" align="center" type="date" color="primary" value={date}
                            onChange={(event) => setDate(event.target.value)} />
                    </Grid>


                    <Grid item>
                        <TextField autoComplete="off" className={classes.daysAmount} variant="standard" type="number" color="primary" value={days}
                            onChange={(event) => setDays(event.target.value)} />
                        <Typography variant="subtitle1" className={classes.days} color="inherit">days</Typography>
                    </Grid>
                    {/* on click of save button - trigger handle save function */}
                    <Grid item><SaveIcon onClick={handleSave} /></Grid>
                </Grid>


                // when not in edit mode - list properties are rendered without ability to edit
                :
                <Grid align="center">
                    <Grid item>
                        <Typography variant="h3" align="center" color="primary" >{trip.location}</Typography></Grid>
                    <Grid item>
                        <Typography variant="subtitle1" align="center" color="primary" >{moment(trip.start_date).format('LL')}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" align="center" color="primary" >{trip.days} days</Typography>
                    </Grid>
                    <Grid item>
                        {/* on click of edit button - inituate handle edit function */}
                        <EditIcon onClick={handleEdit} /></Grid></Grid>}






            {/* textfields for adding new item  */}
            <Grid align="center">
                <Grid item className={classes.input}>
                    <TextField className={classes.numberInput}

                        id="standard-number"
                        label="Amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                    <TextField className={classes.itemInput} autoComplete="off" type="text" id="standard-number" label="Item" InputLabelProps={{
                        shrink: true,
                    }} value={name}
                        onChange={(event) => setName(event.target.value)} />
                    {/* on click of add item button - initiate add item function */}
                    <Button variant="contained" autoComplete="off" style={{ backgroundColor: '#ff9800' }} className={classes.addBtn} size="medium" onClick={addItem}>Add Item</Button>

                </Grid>
            </Grid>



            {/* items rendered to DOM via mapping of stored items array */}
            <List className={classes.root}>
                {items.map((value) => {
                    if (value.complete === true) {
                        console.log(value.name, 'is complete')

                    }
                    return (
                        //component for features for each item
                        <SavedItem key={value.id} complete={value.complete} id={value.id} name={value.name} amount={value.amount} />)
                })}


            </List>



            {/* delete button  */}
            <Grid align="center">
                <Button style={{ backgroundColor: '#e91e63' }} variant="contained" className={classes.deleteBtn} endIcon={<DeleteIcon fontSize="large" style={{ color: 'black' }} className={classes.deleteIcon} />} onClick={handleClickOpen} />
                {/* alert when click of delete button */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this list?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* if click cancel - alert is closed and saved list isn't deleted */}
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        {/* on click of yes - delete list function triggered - end result: list deleted permanently from database */}
                        <Button onClick={deleteList} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>

    );

}

export default SavedList;