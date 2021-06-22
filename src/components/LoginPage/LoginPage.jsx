import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  // used for directing to different page
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        {/* sign up link - redirects to registration form page */}
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Sign Up
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
