import userReducer from './user.reducer';
// testing user reducer - all tests should pass
describe('testing userReducer...', () => {

    test('initial state should be an empty OBJECT...', () => {
        let action = {};
        let state = undefined;
        let returnedState = userReducer(state, action);
        expect(returnedState).toEqual({})
    })

    test('test clear/unset user(used on logout)...', () => {
        let action = { type: 'UNSET_USER' };
        let state = { username: 'jdoe', id: 0 };
        let returnedState = userReducer(state, action);
        expect(returnedState).toEqual({})
    })

    //todo - set user action
    test('test set user(used after login)...', () => {
        let user = { username: 'jdoe', id: 0 }
        let action = { type: 'SET_USER', payload: user };
        let state = {};
        let returnedState = userReducer(state, action);
        expect(returnedState).toEqual(user)
    })

})