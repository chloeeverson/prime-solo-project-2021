import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'


function* addItem(action) {
    try {
        yield axios.post('/items', action.payload);
        yield put({ type: 'FETCH_LIST' })
    } catch (error) {
        alert(`Sorry. things are not working at the moment. Try again later`)
        console.log('error adding item', error);
    }
}


function* addItemSaga() {
    yield takeLatest('ADD_ITEM', addItem)
}
export default addItemSaga;