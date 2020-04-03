import React from 'react';
import './UserOutput.css'

const userOutput = (props) => {
  return (
    <div className='UserOutput'>
      <p onClick={props.switchName}>Hi, my name is {props.name}</p>
      <p>I am {props.age} years old</p>
    </div>
  )
};

export default userOutput;
