import { Typography, Grid, TextField, makeStyles, Button, Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import prompts from '../redux/reducers/prompts.reducer';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import SavedItem from './SavedItem'

const useStyles = makeStyles({
    numberInput: {
        width: '5ch',
        marginRight: 20,
        // marginTop: 20,
    },
    input: {
        marginTop: 30,

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
    }
})
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F49D0C'
        }
    }
})



function SavedList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const [editMode, setEditMode] = useState(false);
    // const [editItem, setEditItem] = useState(false);

    // const [editTitle, setEditTitle] = useState(false);
    // const [editDate, setEditDate] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    // const [amount, setAmount] = useState('');
    // const [name, setName] = useState('');

    const trip = useSelector(store => store.savedList);
    console.log('trip' , trip , 'trip id:', id)
    const items = useSelector(store => store.items);

    //     console.log('current list:', {list});
    //     console.log('stored items:' , {items});


    //     const [name, setName] = useState('');
    //     const [amount, setAmount] = useState(1);

    // const [checked, setChecked] = useState([0]);

    // const handleToggle = (value) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    // };

    //     // useEffect(()=> {
    //     //     dispatch({type: 'FETCH_ITEMS'})
    //     // }, []);


    //     function addItem() {
    //       console.log({items});
    //         // console.log('adding', {amount}, {name});
    //         // dispatch(
    //         // {type: 'ADD_ITEM', payload:{
    //         //     name: name, 
    //         //     amount: amount,
    //         // }})
    //         //    setName('');
    //         // setAmount(1);
    //         dispatch({type: 'STORE_ITEM', payload:{
    //             name: name, 
    //             amount: amount,
    //         }})
    //         setName('');
    //         setAmount(1);
    //     }

    //     function saveList(){
    //         console.log('saving list', list.location, list.start_date)
    //         console.log('adding', {items});
    //         dispatch({type: 'ADD_LIST', payload:{
    //             location: list.location,
    //             start_date: list.start_date,
    //             days: list.days,
    //             items: items,
    //         }});
    //         // {type: 'ADD_ITEM', payload:{
    //         //     name: name, 
    //         //     amount: amount,
    //         // }})
    //         // console.log('adding', {amount}, {name});
    //         // dispatch({type: 'ADD_ITEM', payload:{
    //         //     name: name, 
    //         //     amount: amount,
    //         // }})
    //         dispatch({type: 'RESET_ITEMS'});
    //         history.push('/user');

    //     }

    useEffect(() => {
        console.log('in useEffect param:', id)
        dispatch({ type: 'FETCH_SAVED_LIST', payload: id })
        dispatch({ type: 'FETCH_ITEMS', payload: id })
    }, []);

    function handleEdit() {
        console.log('in handleEdit');
        // Turn on edit mode
        setEditMode(true);

        // Set values in state from our list reducer
        setTitle(trip.location);
        setDate(trip.start_date);

    }
    // function handleEditItem(value) {
    //     console.log('in handleEditItem for item' , value);
    //     // Turn on edit mode
    //     setEditItem(true);

    //     // Set values in state from our list reducer
    //     setAmount(value.amount);
    //     setDate(value.name);

    // }
    // () => dispatch({ type: 'EDIT_ITEM', payload: { item: value.id, list: id } })


    //     function handleTitleEdit(){
    //         console.log('in handleTitleEdit');
    // // Turn on edit mode
    // setEditTitle(true);

    // // Set values in state from our book reducer
    // setTitle( trip.location);

    // function handleDateEdit(){
    //     setEditDate(true);
    //     setDate( trip.start_date );

    // }

    //     }
    function handleSave() {
        console.log('in handleSave');
        const updatedList = {
            id: trip.id,
            location: title,
            start_date: date,
        }
        console.log('Updated trip info:', updatedList);
        dispatch({ type: 'UPDATE_LIST', payload: updatedList })
        setEditMode(false)
        // history.push('/user')
    }

    // function handleItemSave(value){
    //     const updatedItem = {
    //         id: value.id,
    //         name: name,
    //         amount: amount,
    //     }
    //     console.log('updated item info:', updatedItem);
    //     dispatch({ type: 'UPDATE_ITEM', payload: updatedItem })
    //     setEditItem(false)
    // }





    return (
        <Container>



            {trip && trip.location && editMode ?
                <Grid align="center" >
                    {/* <Grid spacing={1} alignItems="flex-end" align="center"> */}
                    <Grid item>
                        <TextField type="text" align="center" color="primary" variant="standard" value={title}
                            onChange={(event) => setTitle(event.target.value)} /></Grid>
                    <Grid item><SaveIcon onClick={handleSave} /></Grid>
                </Grid>
                :
                <Grid align="center">
                    <Grid item>
                        <Typography variant="h3" align="center" color="primary" >{trip.location}</Typography></Grid>
                    <Grid item><EditIcon onClick={handleEdit} /></Grid></Grid>}


            {trip && trip.start_date && editMode ?
                <Grid align="center">
                    <Grid item>
                        <TextField variant="standard" align="center" type="date" color="primary" value={date}
                            onChange={(event) => setDate(event.target.value)} />
                    </Grid>
                    <Grid item>
                        <SaveIcon onClick={handleSave} />
                    </Grid>
                </Grid>
                :
                <Grid align="center">
                    <Grid item>
                        <Typography variant="subtitle1" align="center" color="primary" >{moment(trip.start_date).format('LL')}</Typography>
                    </Grid>
                    <Grid item>
                        <EditIcon onClick={handleEdit} />
                    </Grid>
                </Grid>}

            {/* <div className={classes.input}>
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
                 <TextField className={classes.itemInput} type="text" id="standard-number" label="Item" InputLabelProps={{ 
                        shrink: true,
                    }} value={name}
                     onChange={(event) => setName(event.target.value)} />
                    
                   <Button variant="contained" className={classes.addBtn} size="medium" color="secondary" onClick={addItem}>Add Item</Button>
                    
                 </div> */}
            {/* <ul> */}
                <List className={classes.root}>
                    {items.map((value) => {
                        // const labelId = `checkbox-list-label-${value}`;
                        return (
                            <SavedItem key={value.id} id={value.id} name={value.name} amount={value.amount} />)})}

     
                </List>



{/* //             {/* <ThemeProvider theme={theme}>
//   <Button variant="contained" className={classes.saveBtn} size="large" color="primary" onClick={saveList}>SAVE LIST</Button>
//   </ThemeProvider> */} 

        </Container>

    );

}

export default SavedList;