import { Typography, Grid, TextField, makeStyles, Button, Container , createMuiTheme, ThemeProvider} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
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
    }
})
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F49D0C'
        }
    }
  })



function PackingList() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const list = useSelector(store => store.currentList);
    const items = useSelector(store => store.items);

    console.log('current list:', {list});
    console.log('stored items:' , {items});
    

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);

    const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

    // useEffect(()=> {
    //     dispatch({type: 'FETCH_ITEMS'})
    // }, []);
    

    function addItem() {
        // console.log('adding', {amount}, {name});
        // dispatch(
        // {type: 'ADD_ITEM', payload:{
        //     name: name, 
        //     amount: amount,
        // }})
        //    setName('');
        // setAmount(1);
        // dispatch({type: 'STORE_ITEM', payload:{
        //     name: name, 
        //     amount: amount,
        // }})
        // setName('');
        // setAmount(1);
    }

    function saveList(){
        console.log('saving list', list.location, list.date)
        console.log('adding', {amount}, {name});
        dispatch({type: 'ADD_LIST', payload:{
            location: list.where,
            start_date: list.when,
            days: list.days,
        }})
        {type: 'ADD_ITEM', payload:{
            name: name, 
            amount: amount,
        }})
        console.log('adding', {amount}, {name});
        dispatch({type: 'ADD_ITEM', payload:{
            name: name, 
            amount: amount,
        }})
        setName('');
        setAmount(1);
    }
    
    



    return (
        <Container>
            <Grid align="center">
                <Typography variant="h3" align="center" color="primary">{list.location}</Typography>
                <Typography variant="subtitle1" align="center" color="primary">{moment(list.start_date).format('LL')}</Typography>
                <div className={classes.input}>
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
                    
                    <Button variant="contained" className={classes.addBtn} size="medium" color="textSecondary" onClick={addItem}>Add Item</Button>
                    
                </div>
                {/* <ul> */}
                <List className={classes.root}>
      {items.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
            <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  color="default"
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.amount} ${value.name}`} />
              <ListItemSecondaryAction>
              <IconButton onClick={()=> dispatch({type:'EDIT_ITEM', payload: value.id})} edge="end" aria-label="edit">
              <EditIcon />
              </IconButton>
                <IconButton onClick={()=> dispatch({type:'DELETE_ITEM', payload: value.id})} edge="end" aria-label="delete">
              
                  <DeleteIcon />
                  
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
        {/* {items.map((item) => 
          <li key={item.id}>{item.amount} {item.name}</li>  
        )}
      </ul> */}
      <ThemeProvider theme={theme}>
      <Button variant="contained" className={classes.saveBtn} size="large" color="primary" onClick={saveList}>SAVE LIST</Button>
      </ThemeProvider>
            </Grid>
            </Container>

    );

}

export default PackingList;