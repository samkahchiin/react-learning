import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    persons: [
      { name: "Small", age: 10 },
      { name: "Big", age: 12 },
      { name: "Oval", age: 13 }
    ]
  }

  updateNameHandler = (event) => {
    this.setState({
      persons: [
        { name: "Ella", age: 10 },
        { name: event.target.value, age: 12 },
        { name: "Oval", age: 13 }
      ]
    });
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: "Ella", age: 10 },
        { name: newName, age: 12 },
        { name: "Oval", age: 13 }
      ]
    });
  }

  render() {
    const style = {
      backgroundColor: 'white',
      border: '1px solid gray',
      cursor: 'pointer',
      margin: '1px 2px',
      fontSize: '20px',
      borderRadius: '2px'
    }
    // NOTE: How to access this in map function
    // 1) Pass 'this' as the second args in map function
    // 2) Create a variable to hold 'this'
    // eg. var self = this;
    let persons = this.state.persons.map(function(person, idx) {
      return <UserOutput key={idx} name={person.name} age={person.age} switchName={this.switchNameHandler.bind(this, 'inner event')}/>
    }, this);

    return (
      <div className="App">
        <UserInput updateName={this.updateNameHandler}/>
        <button style={style} onClick={() => this.switchNameHandler('COVID-19')}>Click me to update the name to COVID-19</button>
        {persons}

        <ol>
          <li>Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets</li>
        </ol>
      </div>
    );
  }
}

export default App;
