import { Typography, Grid, TextField, makeStyles, Button, Container } from '@material-ui/core';
import { useSelector } from 'react-redux'
import { useState } from 'react'
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

    const title = useSelector(store => store.prompts);
    const list = useSelector(store => store.list);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);

    function addItem() {
        console.log('adding', {number}, {name});

        dispatch({type: 'ADD_ITEM', payload:{
            name: name, 
            amount: amount,
        }})
    }

    return (
        <Container>
            <Grid align="center">
                <Typography variant="h3" align="center" color="primary">{title.location}</Typography>
                <Typography variant="subtitle1" align="center" color="primary">{title.start_date}</Typography>
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
        {list.map((item) => 
          <li key={item.id}>{item.amount} {item.name}</li>  
        )}
      </ul>
            </Grid>
            </Container>

    );

}

export default List;