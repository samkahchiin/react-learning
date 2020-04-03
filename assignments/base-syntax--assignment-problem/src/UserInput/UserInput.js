import React from 'react';

const userInput = (props) => {
  return (
    <div>
      <p> Enter the name you want to replace </p>
      <input type='text' onChange={props.updateName}/>
    </div>
  )
};

export default userInput;
