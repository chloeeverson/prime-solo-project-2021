
const currentList = (state = [], action) => {
    console.log('hello from the currentList reducer');
    //when click next button on prompt page - store list property information
    if (action.type === `ADD_CURRENT_LIST`) {
        return action.payload;
    }
    // empty store of list properties so its reset when next new list made
    else if (action.type === 'RESET_CURRENT_LIST') {
        return [];
    }
    return state;
}

export default currentList;