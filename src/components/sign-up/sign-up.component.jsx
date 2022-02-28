import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
  constructor() {
    super();

    // user enters to these fields
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  render() {
    return (
      <div className='sign-up'>
        <h2 className='title'>
          I do not have an account
          <span>Sign up with your email and password</span>
        </h2>
      </div>
    );
  }
}
