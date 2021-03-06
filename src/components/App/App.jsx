import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Prompt from '../Prompt';
import NewList from '../NewList'
import SavedList from '../SavedList'
import './App.css';

function App() {
  //declare variable for use of dispatch function
  const dispatch = useDispatch();

  //on load of page, call fetch user reducer
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);


  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/login" />


          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>


          <ProtectedRoute
            // logged in shows promptPage else shows LoginPage
            exact
            path="/prompt"
          >
            <Prompt />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows listPage else shows LoginPage
            exact
            path="/list"
          >
            <NewList />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows SavedlistPage else shows LoginPage
            exact
            path="/savedlist/:id"
          >
            <SavedList />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>



          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
