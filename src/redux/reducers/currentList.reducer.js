const currentList = (state = {}, action) => {
    console.log('hello from the currentList reducer');
    if (action.type === `ADD_CURRENT_LIST`) {
        return action.payload;
    }
    else if (action.type === 'RESET_CURRENT_LIST') {
        return {};
    }
    return state;
}

export default currentList;