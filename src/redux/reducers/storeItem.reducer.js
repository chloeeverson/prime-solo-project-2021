const storeItem = (state = [], action) => {
    console.log('hello from the storeItem reducer');
    if (action.type === `STORE_ITEM`) {
        return action.payload;
    }
    return state;
}

export default storeItem;