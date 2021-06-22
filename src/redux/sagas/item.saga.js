import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

//new item added to saved items for specific list clicked into
function* addItem(action) {
    try {
        yield axios.post('/items', action.payload);
        yield put({ type: 'FETCH_ITEMS', payload: action.payload.list_id })
    } catch (error) {
        alert(`Sorry. things are not working at the moment. Try again later`)
        console.log('error adding item to saved list', error);
    }
}

//fetch all items specific to list clicked into
function* fetchItems(action) {
    console.log('in item saga', action.payload)
    try {
        //yield makes us wait until the async thing (axios) is done
        //keep the response in a variable to access later
        const response = yield axios.get(`/items/${action.payload}`)
        //when its done successfully then 'dispatch' the action to set reducer
        yield put({ type: 'SET_ITEMS', payload: response.data })

    } catch (error) {
        alert(`Sorry. Things aren't working at the moment. Try again later`);
        console.log('error getting items', error);
    }
}

// updates edited item to database
function* editItem(action) {
    console.log('In edit item saga', action.payload);
    try {
        yield axios.put(`/items/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_ITEMS', payload: action.payload.list_id })
    } catch (error) {
        alert(`Sorry. things are not working at the moment. Try again later`)
        console.log('error editing item', error);
    }
}

//updates whether item is complete or not in database
function* completeItem(action) {
    console.log('In complete item saga', action.payload);
    try {
        yield axios.put(`/items/complete/${action.payload.id}`, action.payload.id);
        yield put({ type: 'FETCH_ITEMS', payload: action.payload.list_id })
    } catch (error) {
        alert(`Sorry. things are not working at the moment. Try again later`)
        console.log('error completing item', error);
    }
}
// deletes item permanently from database
function* deleteItem(action) {
    try {
        console.log('action payload', action.payload);

        yield axios.delete(`/items/${action.payload.item}`);
        yield put({ type: 'FETCH_ITEMS', payload: action.payload.list });

    } catch (error) {
        console.log('error in Delete item saga', error);
    }
}

//if dispatch called - triggers function that follows
function* itemSaga() {
    yield takeLatest('ADD_ITEM', addItem)
    yield takeLatest('FETCH_ITEMS', fetchItems)
    yield takeLatest('DELETE_ITEM', deleteItem);
    yield takeLatest('UPDATE_ITEM', editItem)
    yield takeLatest('UPDATE_COMPLETE', completeItem)
}
export default itemSaga;