import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

// adds list to saved lists in database
function* addList(action) {
  try {
    yield axios.post('/list', action.payload);
    yield put({ type: 'FETCH_LIST' })
  } catch (error) {
    alert(`Sorry. things are not working at the moment. Try again later`)
    console.log('error adding list', error);
  }
}

// fetches all saved lists from database
function* fetchList() {
  try {
    //yield makes us wait until the async thing (axios) is done
    //keep the response in a variable to access later
    const response = yield axios.get('/list')
    //when its done successfully then 'dispatch' the action to set reducer
    yield put({ type: 'SET_LIST', payload: response.data })

  } catch (error) {
    alert(`Sorry. Things aren't working at the moment. Try again later`);
    console.log('error getting list', error);
  }
}
// updates any edits of saved list properties
function* editList(action) {
  console.log('In edit saga', action.payload);
  try {
    yield axios.put(`/list/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_LIST' })
    yield put({ type: 'SET_SAVED_LIST', payload: action.payload })
  } catch (error) {
    alert(`Sorry. things are not working at the moment. Try again later`)
    console.log('error editing list', error);
  }
}
// deletes specified saved list from database
function* deleteList(action) {
  console.log('In delete list saga', action.payload);
  try {
    yield axios.delete(`/list/${action.payload}`);
    yield put({ type: 'FETCH_LIST' })
  } catch (error) {
    alert(`Sorry. things are not working at the moment. Try again later`)
    console.log('error deleting list', error);
  }
}
// if dispatch called - triggers function that follows
function* listSaga() {
  yield takeLatest('ADD_LIST', addList);
  yield takeLatest('FETCH_LIST', fetchList);
  yield takeLatest('UPDATE_LIST', editList);
  yield takeLatest('DELETE_LIST', deleteList);

}
export default listSaga;