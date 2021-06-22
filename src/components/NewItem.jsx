import { useDispatch } from 'react-redux'
import { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, makeStyles } from '@material-ui/core';

//change styling for MUI components
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

//for each item in list:
function NewItem(value) {
    console.log('passing over prop index:', value.index)
    //declare variables for use of functions
    const classes = useStyles();
    const dispatch = useDispatch();

    //create local states for edit mode, and updated item properties
    const [editItem, setEditItem] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAmount, setNewAmount] = useState('');

    //when save button for item is clicked:
    function updateItem(index) {
        console.log(index)
        //initiate update new item reducer with payload of of updated item values and it's index in array
        dispatch({ type: 'UPDATE_NEW_ITEM', payload: { index: index, amount: newAmount, name: newName } })
        setEditItem(false);

    }
    //when edit button for item is clicked
    function handleEditItem(value) {
        console.log('in handleEditItem for item', value);
        // Turn on edit mode
        setEditItem(true);

        // Set values in state from our item reducer
        setNewAmount(value.amount);
        setNewName(value.name);

    }

    return (
        <ListItem role={undefined} dense button>
            {/* when in edit mode, item turns into text field to allow for change in values */}
            {editItem ?
                <>
                    <TextField autoComplete="off" className={classes.editAmount} type="text" align="center" color="primary" variant="standard" value={newAmount}
                        onChange={(event) => setNewAmount(event.target.value)} />
                    <TextField autoComplete="off" type="text" align="center" color="primary" variant="standard" value={newName}
                        onChange={(event) => setNewName(event.target.value)} />
                    <ListItemSecondaryAction>
                        {/* when save button clicked - initiate update item function */}
                        <IconButton onClick={() => updateItem(value.index)} edge="end" aria-label="edit">
                            <SaveIcon />
                        </IconButton>

                    </ListItemSecondaryAction></>

                :

                <>
                    {/* when not in edit mode - item is rendered as list item with non editting abilities */}
                    <ListItemText primary={`${value.amount} ${value.name}`} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => handleEditItem(value)} edge="end" aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        {/* delete button for item available - on click will trigger delete item reducer 
                        which delete item permanently from database */}
                        <IconButton onClick={() => dispatch({ type: 'DELETE_NEW_ITEM', payload: value.index })} edge="end" aria-label="delete">

                            <DeleteIcon />

                        </IconButton>
                    </ListItemSecondaryAction>
                </>}
        </ListItem >
    );
}

export default NewItem;