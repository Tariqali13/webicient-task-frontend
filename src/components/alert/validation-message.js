import React from 'react';

const ValidationMessage = (props) => {
  const { heading, errors } = props;
  const errorArray = Object.values(errors);
  return (
    <React.Fragment>
      {/* <h1 className="fzl fwm">{heading}</h1> */}
      {/* <br/> */}
      <ul style={{ listStyleType: 'circle' }}>
        {errorArray &&
          errorArray.length > 0 &&
          errorArray.map((error) => <li>{error}</li>)}
      </ul>
    </React.Fragment>
  );
};

export default ValidationMessage;
