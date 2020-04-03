import React from 'react';

const validationComponent = (props) => {
  let text = "";

  if (props.length >= 5) {
    text = "Text long enough";
  } else {
    text = "Text too short";
  }

  return (
    <div>
      <p>Validation Message: {text}</p>
    </div>
  )
};

export default validationComponent;
