import { Typography, Grid, TextField, makeStyles, Button, Container , createMuiTheme, ThemeProvider} from '@material-ui/core';
import List from '@material-ui/core/List';

import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'

import moment from 'moment';

import NewItem from './NewItem'

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



function PackingList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const list = useSelector(store => store.currentList);
    const items = useSelector(store => store.storeItem);

    console.log('current list:', {list});
    console.log('stored items:' , {items});
    

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);

    const [newName, setNewName] = useState('');
    const [newAmount, setNewAmount] = useState('');

    

  

    function addItem() {
      console.log({items});
  
        dispatch({type: 'STORE_ITEM', payload:{
            name: name, 
            amount: amount,
        }})
        setName('');
        setAmount(1);
    }

    function saveList(){
        console.log('saving list', list.location, list.start_date)
        console.log('adding', {items});
        dispatch(
          {type: 'ADD_LIST', payload:{
            location: list.location,
            start_date: list.start_date,
            days: list.days,
            items: items,
          }});
        dispatch({type: 'RESET_ITEMS'}, 
          {type: 'RESET_CURRENT_LIST'});
        
        history.push('/user');

    }
  
    return (
        <Container>
            <Grid align="center">
                <Typography variant="h3" align="center" color="primary">{list.location}</Typography>
                <Typography variant="subtitle1" align="center" color="primary">{moment(list.start_date).format('LL')}</Typography>
                <Typography variant="subtitle1" align="center" color="primary" >{list.days} days</Typography>
                
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
                    
                    <Button variant="contained" className={classes.addBtn} size="medium" color="secondary" onClick={addItem}>Add Item</Button>
                    
                </div>
               
                <List className={classes.root}>
      {items.map((value, index) => {
  
        console.log('mapping index:', index)
        return (
          <NewItem key={value.name} index={index} name={value.name} amount={value.amount} />)})}
            
          
       
      </List>
   
      <ThemeProvider theme={theme}>
      <Button variant="contained" className={classes.saveBtn} size="large" color="primary" onClick={saveList}>SAVE LIST</Button>
      </ThemeProvider>
            </Grid>
            </Container>

    );

}

export default PackingList;