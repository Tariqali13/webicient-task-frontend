import React from 'react';

const AlertMessage = (props) => {
  const { heading, message } = props;
  return (
    <React.Fragment>
      {/* <h2 className="fzl fwm" style={{ marginTop: '0px' }}>
        {heading}
      </h2>
      <br /> */}
      <p>{message}</p>
    </React.Fragment>
  );
};

export default AlertMessage;
