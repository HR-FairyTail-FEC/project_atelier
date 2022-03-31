import React from 'react';

const Overview = (props) => {
  let details = props.details;
  console.log(details);
  let display;
  if (details.length < 1) {
    display = <div>Page Loading...</div>
  } else {
    display = <div></div>;
  }
  return (
    <div className="overview-container">
      <div>
        {display}
      </div>
    </div>
  );
}

export default Overview;