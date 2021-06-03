const savedList = (state = {}, action) => {
    console.log('hello from the savedList reducer');
    
    // set book list with data from server
    if (action.type === 'SET_SAVED_LIST'){
      //the action payload is a new array from the server
      //it has ALL the information in it - no need to spread 
      //& add to previous state
      return action.payload;
    }
    return state;
  }

export default savedList;