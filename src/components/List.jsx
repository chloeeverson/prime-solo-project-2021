import { Typography, Grid, TextField, makeStyles, Button, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import prompts from '../redux/reducers/prompts.reducer';


const useStyles = makeStyles({
    numberInput: {
        width: '5ch',
        marginRight: 20,
        // marginTop: 20,
    },
    input: {
        marginTop: 20,
       
    },
    addBtn: {
        marginTop: 5,
        marginLeft: 20,
    },
    itemInput: {
        width: '15ch',
    }
})



function List() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const list = useSelector(store => store.currentList);
    const items = useSelector(store => store.items);

    console.log('current list:', {list});

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);

    useEffect(()=> {
        dispatch({type: 'FETCH_ITEMS'})
    }, []);
    

    function addItem() {
        console.log('adding', {amount}, {name}, list.id);

        dispatch({type: 'ADD_ITEM', payload:{
            name: name, 
            amount: amount,
            list_id: list.id
        }})
        setName('');
        setAmount(1);
    }

    return (
        <Container>
            <Grid align="center">
                <Typography variant="h3" align="center" color="primary">{list.location}</Typography>
                <Typography variant="subtitle1" align="center" color="primary">{list.start_date}</Typography>
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

                    <Button variant="contained" className={classes.addBtn} size="medium" color="primary" onClick={addItem}>Add Item</Button>
                </div>
                <ul>
        {items.map((item) => 
          <li key={item.id}>{item.amount} {item.name}</li>  
        )}
      </ul>
            </Grid>
            </Container>

    );

}

export default List;