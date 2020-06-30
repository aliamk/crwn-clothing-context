import React from 'react';

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

// import './sign-in.styles.scss'

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <ButtonsBarContainer>
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}

export default SignIn;

/* class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { email, password } = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: '', password: '' }) //clears the fields
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = event => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }
 
  render() {
    return(
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={ this.handleSubmit } >
          <FormInput 
            name='email' 
            type='email' 
            value={this.state.email} 
            handleChange={this.handleChange}
            label="email"
            required />
          {/* <label>Email</label> 
          <FormInput 
            name='password' 
            type='password' 
            value={this.state.password} 
            handleChange={this.handleChange} //was onChange
            label="password"
            required />
          {/* <label>Password</label> 
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton onClick={ signInWithGoogle } isGoogleSignIn>
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

// isGoogleSignIn styles the button

export default SignIn
*/