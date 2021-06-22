import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  // declare variable to use history function which allows for directing to specified views/ pages
  const history = useHistory();

  return (
    <div>
      {/* registration form / in separate component */}
      <RegisterForm />
      {/* sign in link - directs to sign in page with sign in form for existing user */}
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            // redirect to login page
            history.push('/login');
          }}
        >
          Sign In
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
