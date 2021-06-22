import storeItemReducer from './storeItem.reducer';

// store item reducer testing - all tests should pass

describe('testing storeItemReducer...', () => {

    test('initial state should be an empty ARRAY...', () => {
        let action = [];
        let state = undefined;
        let returnedState = storeItemReducer(state, action);
        expect(returnedState).toEqual([])
    })

    test('test store item...', () => {
        let item = {
            amount: 1,
            name: 'toothbrush',
        }
        let action = { type: 'STORE_ITEM', payload: item };
        let state = [];
        let returnedState = storeItemReducer(state, action);
        expect(returnedState).toEqual([...state, item])
    })

    test('test delete new item...', () => {
        let index = 4
        let action = { type: 'DELETE_NEW_ITEM', payload: index };
        let state = [];
        let returnedState = storeItemReducer(state, action);
        expect(returnedState).toEqual(state.filter((i) => i != index))
    })

    test('test reset items', () => {
        let action = { type: 'RESET_ITEMS' };
        let state = [{ amount: 2, name: 'toothbrush' }, { amount: 7, name: 'shirts' }];
        let returnedState = storeItemReducer(state, action);
        expect(returnedState).toEqual([])
    })

    test('test update new item...', () => {
        let edit = { index: 0, amount: 1, name: 'shirt' }
        let newState = [{ amount: 1, name: 'shirt' }]
        let action = { type: 'UPDATE_NEW_ITEM', payload: edit };
        let state = [{ amount: 7, name: 'shirts' }];
        let returnedState = storeItemReducer(state, action);
        expect(returnedState).toEqual(newState);
    })

})