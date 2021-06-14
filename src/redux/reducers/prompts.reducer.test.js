import promptsReducer from './prompts.reducer';

describe('testing promptsReducer...', () => {

    test('initial state should be an empty ARRAY...', () => {
        let action = [];
        let state = undefined;
        let returnedState = promptsReducer(state, action);
        expect(returnedState).toEqual()
    })

    test('test add prompts...', () => {
        let trip = {
            location: 'Colorado',
            start_date: 2001/01/01,
            days: 5,
            }
        let action = {type: 'ADD_PROMPTS', payload: trip};
        let state = [];
        let returnedState = userReducer(state, action);
        expect(returnedState).toEqual(trip)
    })

})