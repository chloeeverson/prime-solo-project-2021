import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import list from './list.reducer';
import items from './item.reducer';
import currentList from './currentList.reducer'
import storeItem from './storeItem.reducer'
import savedList from './savedList.reducer'


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  list, //all saved lists
  items,//stores saved items specific to saved list clicked on
  currentList,//sets current list properties from prompt page
  storeItem,//stores new items added to be accessed to render on page
  savedList, //stores list properties for saved item clicked on from home page

});

export default rootReducer;
