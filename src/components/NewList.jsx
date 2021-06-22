import { Typography, Grid, TextField, makeStyles, Button, Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import NewItem from './NewItem'

//change styling for MUI components
const useStyles = makeStyles({
    numberInput: {
        width: '5ch',
        marginRight: 20,

    },
    input: {
        marginTop: 30,
        marginBottom: 30,

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
    }
})
//change default themes set for MUI components 
const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#F49D0C'
        },
        primary: {
            main: '#FFFFFF'
        },
    }

})



function NewList() {
    //declare variables for use of functions
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    //grab stored list information from previous prompt page
    const list = useSelector(store => store.currentList);
    //grab stored items from reducer for rendering
    const items = useSelector(store => store.storeItem);
    //create local states for new item properties adding to list
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);

    //when add item button is clicked: 
    function addItem() {
        //initiate store item reducer action - adding payload of new item properties to stored items array
        dispatch({
            type: 'STORE_ITEM', payload: {
                name: name,
                amount: amount,
            }
        })
        //once added - reset local states to allow for new items to be added
        setName('');
        setAmount(1);
    }
    //on click of saved list button:
    function saveList() {
        //initiate add list reducer - adding new list to be stored in saved lists reducer and database
        dispatch(
            {
                type: 'ADD_LIST', payload: {
                    location: list.location,
                    start_date: list.start_date,
                    days: list.days,
                    items: items,
                }
            });
        //empty the new item and new list reducers
        dispatch({ type: 'RESET_ITEMS' },
            { type: 'RESET_CURRENT_LIST' });
        //redirect user to home page of all saved lists
        history.push('/user');

    }

    return (
        //container for responsive side margins
        <Container>
            {/* grid for responsive design */}
            <Grid align="center">
                {/* new list properties created on previous prompt page and obtained from store */}
                <Typography variant="h3" align="center" color="primary">{list.location}</Typography>
                <Typography variant="subtitle1" align="center" color="primary">{moment(list.start_date).format('LL')}</Typography>
                <Typography variant="subtitle1" align="center" color="primary" >{list.days} days</Typography>
                {/* inputs for adding new item to new list */}
                <div className={classes.input}>
                    <TextField autoComplete="off" className={classes.numberInput}

                        id="standard-number"
                        label="Amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                    <TextField autoComplete="off" className={classes.itemInput} type="text" id="standard-number" label="Item" InputLabelProps={{
                        shrink: true,
                    }} value={name}
                        onChange={(event) => setName(event.target.value)} />
                    {/* on click of button - trigger function which adds new item to new items store */}
                    <Button variant="contained" className={classes.addBtn} size="medium" color="secondary" onClick={addItem}>Add Item</Button>

                </div>
                {/* render new items from store in list format */}
                <List className={classes.root}>
                    {items.map((value, index) => {

                        console.log('mapping index:', index)
                        return (
                            <NewItem key={value.name} index={index} name={value.name} amount={value.amount} />)
                    })}



                </List>
                {/* on click of save list button - trigger function which adds new list to saved lists in database */}
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className={classes.saveBtn} size="large" color="primary" onClick={saveList}>SAVE LIST</Button>
                </ThemeProvider>
            </Grid>
        </Container>

    );

}

export default NewList;