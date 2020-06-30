import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

/* Using Higer Order Components for the loading spinner (component that returns a component)
If isLoading is true, show the spinner; if it's false, just return the otherProps */
const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? ( // if isLoading is true, load the Spinner
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} /> // If isLoading is false, load the other props (hats etc)
    );
  };
  return Spinner;
};

export default WithSpinner;

/*
ANOTHER WAY TO WRITE IT

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

*/