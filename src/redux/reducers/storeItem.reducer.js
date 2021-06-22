
const storeItem = (state = [], action) => {
    console.log('hello from the storeItem reducer');
    // add new item to items array for new list
    if (action.type === `STORE_ITEM`) {
        return [...state, action.payload];
    }
    //delete new item specifified
    else if (action.type === `DELETE_NEW_ITEM`) {
        return state.filter((item, i) => i != action.payload)
    }
    // empty stored items array to allow for reset of new items for new list
    else if (action.type === 'RESET_ITEMS') {
        return [];
    }
    // update item with new values
    else if (action.type === 'UPDATE_NEW_ITEM') {
        // create newState array
        // if item that was updated - value will be action payload - updated item values
        // if not that item - return original state of item
        let newState = []
        for (let i = 0; i < state.length; i++) {
            if (i === action.payload.index) {
                newState.push({ name: action.payload.name, amount: action.payload.amount })


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