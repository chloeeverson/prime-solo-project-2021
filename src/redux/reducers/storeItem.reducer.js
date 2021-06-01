const storeItem = (state = [], action) => {
    console.log('hello from the storeItem reducer');
    if (action.type === `STORE_ITEM`) {
        return [...state, action.payload];
    }
    else if (action.type === 'RESET_ITEMS') {
        return [];
    }
    return state;
}

export default storeItem;