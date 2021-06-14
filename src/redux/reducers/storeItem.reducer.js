import { LensOutlined, Loop } from "@material-ui/icons";

const storeItem = (state = [], action) => {
    console.log('hello from the storeItem reducer');
    if (action.type === `STORE_ITEM`) {
        return [...state, action.payload];
    }
    else if (action.type === `DELETE_NEW_ITEM`){
        return state.filter((item, i) => i != action.payload)
    }
    else if (action.type === 'RESET_ITEMS') {
        return [];
    }
    else if (action.type === 'UPDATE_NEW_ITEM'){
        //payload will be object with its index to be position of item(name) to change and value for you to put into state(amount of item)
        let newState = []
        for (let i=0; i<state.length; i++){
            if (i === action.payload.index){
                newState.push({name: action.payload.name, amount: action.payload.amount})

                
            }
            else {
                newState.push(state[i])
            }
           
        }
        return newState
    }
    return state;
}

export default storeItem;