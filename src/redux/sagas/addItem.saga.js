import {put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

function* addItemSaga(){
    yield takeLatest('ADD_ITEM', addItem)
}
function* addItem(action){
    try{
      yield axios.post('/item', action.payload);
      yield put({type: 'FETCH_ITEM'})
    } catch(error){
    alert(`Sorry. things are not working at the moment. Try again later`)
    console.log('error adding item', error);
    }
  }



export default addItem;