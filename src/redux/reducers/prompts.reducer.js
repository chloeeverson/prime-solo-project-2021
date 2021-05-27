// import {put} from 'redux-saga/effects'
// import axios from 'axios'

// function* addLocation(action){
//     try{
//       yield axios.post('/location', action.payload);
//       yield put({type: 'FETCH_LOCATION'})
//     } catch(error){
//     alert(`Sorry. things are not working at the moment. Try again later`)
//     console.log('error adding location', error);
//     }
//   }

// export default addLocation;

// function* addLocation(action){
//     try{
//       yield axios.post('/location', action.payload);
//       yield put({type: 'FETCH_LOCATION'})
//     } catch(error){
//     alert(`Sorry. things are not working at the moment. Try again later`)
//     console.log('error adding location', error);
//     }
//   }

// export default addLocation;

const prompts = (state = [], action) => {
    // set book list with data from server
    if (action.type === 'ADD_PROMPTS'){
      //the action payload is a new array from the server
      //it has ALL the information in it - no need to spread 
      //& add to previous state
      return action.payload;
    }
    return state;
  }

export default prompts;