import savedListReducer from './savedList.reducer';

describe('testing savedListReducer...', () => {

    test('initial state should be an empty OBJECT...', () => {
        let action = {};
        let state = undefined;
        let returnedState = promptsReducer(state, action);
        expect(returnedState).toEqual()
    })

    test('test set saved list...', () => {
        let trip = {
            location: 'Colorado',
            start_date: 2001/01/01,
            days: 5,
            }
        let action = {type: 'SET_SAVED_LIST', payload: trip};
        let state = [];
        let returnedState = userReducer(state, action);
        expect(returnedState).toEqual(trip)
    })

})