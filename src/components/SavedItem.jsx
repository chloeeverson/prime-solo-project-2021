import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, Grid, TextField, makeStyles, Button, Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';


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



function SavedItem(value){
    const labelId = `checkbox-list-label-${value}`;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log('value:',value.name , value.amount, 'list id:' , id )

    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
 
    const [editItem, setEditItem] = useState(false);
    const items = useSelector(store => store.items);

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

    function handleItemSave(value){
        const updatedItem = {
            id: value.id,
            name: name,
            amount: amount,
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
        setAmount(value.amount);
        setName(value.name);

    }
    return(
        <ListItem role={undefined} dense button onClick={handleToggle(value)} >
            {editItem ?
                        <>
                            <TextField className={classes.editAmount} type="text" align="center" color="primary" variant="standard" value={amount}
                            onChange={(event) => setAmount(event.target.value)} />
                            <TextField type="text" align="center" color="primary" variant="standard" value={name}
                            onChange={(event) => setName(event.target.value)} />
                            <ListItemSecondaryAction>

                            <IconButton onClick={() => handleItemSave(value)} edge="end" aria-label="edit">
                                <SaveIcon />
                            </IconButton>
                        
                            </ListItemSecondaryAction></>

                        :

                        


                        <>
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

                        <IconButton onClick={() => handleEditItem(value)} edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => dispatch({ type: 'DELETE_ITEM', payload: { item: value.id, list_id: id } })} edge="end" aria-label="delete">

                                <DeleteIcon />

                            </IconButton>
                        </ListItemSecondaryAction>
                        </> }
                        </ListItem>
    );

}

export default SavedItem;


{/* // <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value)} > */}
                                
                                
                //                 {editItem ?
                //                 <>
                //                     <TextField className={classes.editAmount} type="text" align="center" color="primary" variant="standard" value={amount}
                //                     onChange={(event) => setAmount(event.target.value)} />
                //                     <TextField type="text" align="center" color="primary" variant="standard" value={name}
                //                     onChange={(event) => setName(event.target.value)} />
                //                     <ListItemSecondaryAction>

                //                     <IconButton onClick={() => handleItemSave(value)} edge="end" aria-label="edit">
                //                         <SaveIcon />
                //                     </IconButton>
                                
                //                     </ListItemSecondaryAction></>

                //                 :

                                


                //                 <>
                //                 <ListItemIcon>
                //                     <Checkbox
                //                         edge="start"
                //                         checked={checked.indexOf(value) !== -1}
                //                         tabIndex={-1}
                //                         disableRipple
                //                         inputProps={{ 'aria-labelledby': labelId }}
                //                         color="default"
                //                     />
                //                 </ListItemIcon>
                //                 <ListItemText id={labelId} primary={`${value.amount} ${value.name}`} />
                //                 <ListItemSecondaryAction>

                //                 <IconButton onClick={() => handleEditItem(value)} edge="end" aria-label="edit">
                //                         <EditIcon />
                //                     </IconButton>
                //                     <IconButton onClick={() => dispatch({ type: 'DELETE_ITEM', payload: { item: value.id, list: id } })} edge="end" aria-label="delete">

                //                         <DeleteIcon />

                //                     </IconButton>
                //                 </ListItemSecondaryAction>
                //                 </> }
                //             </ListItem>
                        // );
                //     })}