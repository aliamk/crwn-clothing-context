import React from 'react';

// import './form-input.styles.scss'

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './form-input.styles';

const FormInput = ({ handleChange, label, ...props }) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} {...props} />
    {label ? (
      <FormInputLabel className={props.value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;


/*
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className='form-input' onChange={handleChange} {...otherProps} />

    {
      label ? (
        <label 
          className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`}
        >
          {label}
        </label>
        ) : null }
  </div>
)

/* The label will always have the class name 'form-input-label', 
but if a user types anything, then the property of SHRINK
will be added 

export default FormInput  

*/