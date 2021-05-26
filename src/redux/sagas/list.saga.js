import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* fetchList(){
    try{
      //yield makes us wait until the async thing (axios) is done
      //keep the response in a variable to access later
      const response = yield axios.get('/list')
      //when its done successfully then 'dispatch' the action to set reducer
      yield put({type: 'SET_LIST', payload: response.data})
  
    } catch(error){
      alert(`Sorry. Things aren't working at the moment. Try again later`);
      console.log('error getting list', error);
    }
  }

  function* fetchListSaga() {
    yield takeLatest('FETCH_LIST', fetchList)
}
export default fetchListSaga;