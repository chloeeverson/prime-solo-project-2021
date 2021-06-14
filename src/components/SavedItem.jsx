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
import { TextField, makeStyles} from '@material-ui/core';
import { useParams } from 'react-router-dom';



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



function SavedItem(value){
    const labelId = `checkbox-list-label-${value}`;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log('value:',value.name , value.amount, 'list id:' , id )

    const [newAmount, setNewAmount] = useState('');
    const [newName, setNewName] = useState('');
 
    const [editItem, setEditItem] = useState(false);
    const items = useSelector(store => store.items);

    const [checked, setChecked] = useState(false);



    useEffect(() => {
        handleComplete(value);
      },[]);

    function handleComplete(value){
        console.log('in handlecomplete')
        console.log(value)
        if (value.complete == true ){
            console.log(value.name ,'is complete')
            setChecked(true);
        }
    }

    const handleToggle = (value) => () => {
    
        console.log(value)
        console.log(checked)
        if (checked == true){
            setChecked(false)
        }
        else {
            setChecked(true)
        }
      
    
        dispatch({ type: 'UPDATE_COMPLETE', payload: {id: value.id, list_id: id}})
        

    };

    function handleItemSave(value){
        const updatedItem = {
            id: value.id,
            name: newName,
            amount: newAmount,
            list_id: id,
        }
        console.log('updated item info:', updatedItem);
        dispatch({ type: 'UPDATE_ITEM', payload: updatedItem})
        setEditItem(false)
    }
    function handleEditItem(value) {
        console.log('in handleEditItem for item' , value);
        // Turn on edit mode
        setEditItem(true);

        // Set values in state from our list reducer
        setNewAmount(value.amount);
        setNewName(value.name);

    }
    return(
        <ListItem role={undefined} dense button >
            {editItem ?
                        <>
                            <TextField autoComplete="off" className={classes.editAmount} type="text" align="center" color="primary" variant="standard" value={newAmount}
                            onChange={(event) => setNewAmount(event.target.value)} />
                            <TextField autoComplete="off" type="text" align="center" color="primary" variant="standard" value={newName}
                            onChange={(event) => setNewName(event.target.value)} />
                            <ListItemSecondaryAction>

                            <IconButton onClick={() => handleItemSave(value)} edge="end" aria-label="edit">
                                <SaveIcon />
                            </IconButton>
                        
                            </ListItemSecondaryAction></>

                        :

                        


                        <>
                        <ListItemIcon>
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

                        <IconButton onClick={() => handleEditItem(value)} edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => dispatch({ type: 'DELETE_ITEM', payload: { item: value.id, list: id } })} edge="end" aria-label="delete">

                                <DeleteIcon />

                            </IconButton>
                        </ListItemSecondaryAction>
                        </> }
                        </ListItem>
    );

}

export default SavedItem;


