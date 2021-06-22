import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';


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
    },
    editAmount: {
        width: '5ch',
    }
})


//for individual item:
function SavedItem(value) {
    //set variable for checkbox to link to item
    const labelId = `checkbox-list-label-${value}`;
    //declare variables for use of functions
    const classes = useStyles();
    const dispatch = useDispatch();
    //use saved list id params for list id value for item
    const { id } = useParams();

    //set local states for updated item values, edit mode, and item complete mode
    const [newAmount, setNewAmount] = useState('');
    const [newName, setNewName] = useState('');
    const [editItem, setEditItem] = useState(false);
    //if item complete set local state to checked
    const [checked, setChecked] = useState(false);


    //on page load- inititiate handle complete function
    useEffect(() => {
        handleComplete(value);
    }, []);

    //if items reflect complete in database - mark as complete on page load with checkbox filled
    function handleComplete(value) {
        console.log('in handlecomplete')
        console.log(value)
        if (value.complete == true) {
            console.log(value.name, 'is complete')
            setChecked(true);
        }
    }


    //toggles checkbox feature between true/false based on click
    const handleToggle = (value) => () => {

        console.log(value)
        console.log(checked)
        if (checked == true) {
            setChecked(false)
        }
        else {
            setChecked(true)
        }

        //initiate saga to update whether item is complete or not in database based on toggle value
        dispatch({ type: 'UPDATE_COMPLETE', payload: { id: value.id, list_id: id } })


    };
    //when click save button - initiate saga which permanently updates item in database
    //and toggles edit mode back to false
    function handleItemSave(value) {
        const updatedItem = {
            id: value.id,
            name: newName,
            amount: newAmount,
            list_id: id,
        }
        console.log('updated item info:', updatedItem);
        dispatch({ type: 'UPDATE_ITEM', payload: updatedItem })
        setEditItem(false)
    }
    //when edit button clicked for item - sets edit mode to true 
    //and sets textfield inputs to be item's current values
    function handleEditItem(value) {
        console.log('in handleEditItem for item', value);
        // Turn on edit mode
        setEditItem(true);

        // Set values in state from our list reducer
        setNewAmount(value.amount);
        setNewName(value.name);

    }
    return (
        <ListItem role={undefined} dense button >
            {/* when in edit mode - item is in textfield form to allow for editing of properties */}
            {editItem ?
                <>
                    <TextField autoComplete="off" className={classes.editAmount} type="text" align="center" color="primary" variant="standard" value={newAmount}
                        onChange={(event) => setNewAmount(event.target.value)} />
                    <TextField autoComplete="off" type="text" align="center" color="primary" variant="standard" value={newName}
                        onChange={(event) => setNewName(event.target.value)} />
                    <ListItemSecondaryAction>
                        {/* on click of save button - initiate handle save item function  */}
                        <IconButton onClick={() => handleItemSave(value)} edge="end" aria-label="edit">
                            <SaveIcon />
                        </IconButton>

                    </ListItemSecondaryAction></>

                :



                // when item not in edit mode - list item is not able to be edited
                <>
                    <ListItemIcon>
                        {/* on click of checkbox - initiates toggle function */}
                        <Checkbox onClick={handleToggle(value)}
                            edge="start"
                            checked={checked}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            color="default"
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value.amount} ${value.name}`} />
                    <ListItemSecondaryAction>
                        {/* on click of edit button - handle edit item function triggered */}
                        <IconButton onClick={() => handleEditItem(value)} edge="end" aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        {/* on click of delete button - delete item action initiated - with end result deleting item permanently from database */}
                        <IconButton onClick={() => dispatch({ type: 'DELETE_ITEM', payload: { item: value.id, list: id } })} edge="end" aria-label="delete">

                            <DeleteIcon />

                        </IconButton>
                    </ListItemSecondaryAction>
                </>}
        </ListItem>
    );

}

export default SavedItem;


