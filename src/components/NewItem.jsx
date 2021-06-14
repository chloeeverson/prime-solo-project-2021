import { useDispatch } from 'react-redux'
import { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import ListItem from '@material-ui/core/ListItem';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField, makeStyles} from '@material-ui/core'; 


const useStyles = makeStyles({
    numberInput: {
        width: '5ch',
        marginRight: 20,
       
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


function NewItem(value) {
    console.log('passing over prop index:', value.index)
    const classes = useStyles();
    const dispatch = useDispatch();

    const [editItem, setEditItem] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAmount, setNewAmount] = useState('');

    function updateItem(index) {
        console.log(index)
        dispatch({ type: 'UPDATE_NEW_ITEM', payload: { index: index, amount: newAmount, name: newName } })
        setEditItem(false);

    }

    function handleEditItem(value) {
        console.log('in handleEditItem for item', value);
        // Turn on edit mode
        setEditItem(true);

        // Set values in state from our list reducer
        setNewAmount(value.amount);
        setNewName(value.name);

    }

    return (
        <ListItem role={undefined} dense button>
            {editItem ?
                <>
                    <TextField autoComplete="off" className={classes.editAmount} type="text" align="center" color="primary" variant="standard" value={newAmount}
                        onChange={(event) => setNewAmount(event.target.value)} />
                    <TextField autoComplete="off" type="text" align="center" color="primary" variant="standard" value={newName}
                        onChange={(event) => setNewName(event.target.value)} />
                    <ListItemSecondaryAction>

                        <IconButton onClick={() => updateItem(value.index)} edge="end" aria-label="edit">
                            <SaveIcon />
                        </IconButton>

                    </ListItemSecondaryAction></>

                :

                <>
              <ListItemText primary={`${value.amount} ${value.name}`} />
              <ListItemSecondaryAction>
              <IconButton onClick={() => handleEditItem(value)} edge="end" aria-label="edit">
              <EditIcon />
              </IconButton>
                <IconButton onClick={()=> dispatch({type:'DELETE_NEW_ITEM', payload: value.index})} edge="end" aria-label="delete">
              
                  <DeleteIcon />
                  
                </IconButton>
              </ListItemSecondaryAction>
              </>}
            </ListItem >
    );
}

export default NewItem;