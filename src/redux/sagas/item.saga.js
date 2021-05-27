import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'


function* addItem(action) {
    try {
        yield axios.post('/items', action.payload);
        yield put({ type: 'FETCH_ITEMS' })
    } catch (error) {
        alert(`Sorry. things are not working at the moment. Try again later`)
        console.log('error adding item', error);
    }
}

function* fetchItems(){
    try{
      //yield makes us wait until the async thing (axios) is done
      //keep the response in a variable to access later
      const response = yield axios.get('/items/')
      //when its done successfully then 'dispatch' the action to set reducer
      yield put({type: 'SET_ITEMS', payload: response.data})
  
    } catch(error){
      alert(`Sorry. Things aren't working at the moment. Try again later`);
      console.log('error getting items', error);
    }
  }



function* itemSaga() {
    yield takeLatest('ADD_ITEM', addItem)
    yield takeLatest('FETCH_ITEMS', fetchItems)
}
export default itemSaga;