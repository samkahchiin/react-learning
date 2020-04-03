import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    chars: []
  }

  changeListener = (event) => {
    this.setState({
      chars: event.target.value.split("")
    });
  }

  deleteChar = (idx) => {
    let chars = [...this.state.chars];
    chars.splice(idx, 1);
    this.setState({
      chars: chars
    });
  }

  render() {
    let chars = this.state.chars.map(function(char, idx) {
      return (
        <CharComponent
          key={idx}
          text={char}
          click={() => this.deleteChar(idx)}
        />
      )
    }, this);

    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box ().</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>

        <input type="text" onChange={this.changeListener} value={this.state.chars.join("")}/>
        <p>Text length: {this.state.chars.length}</p>
        <ValidationComponent length={this.state.chars.length}/>
        {chars}

      </div>
    );
  }
}

export default App;
