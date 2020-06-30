import React from 'react'

// import './custom-button.styles.jsx'
import { CustomButtonContainer } from './custom-button.styles';


const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;


/*  const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <button className = {
    `${ inverted ? 'inverted' : '' } 
    ${ isGoogleSignIn ? 'google-sign-in' : '' } 
    custom-button` } 
    { ...otherProps }
    >
    { children }
  </button>
)

/* Both Input and Button take a 'type=submit' property that connects to the handleSubmit functions  

/* Google Sign-In Button Styling: Conditionaly render a className (google-sign-in)  
based on whether a prop is true (isGoogleSignIn), otherwise render an empty string... but always 
render Custom Button

/* If the 'inverted' prop is true, add the 'inverted' class 

export default CustomButton */