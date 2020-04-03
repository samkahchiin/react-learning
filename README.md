## Stateless VS Stateful
- stateless
  * dumb
  * presentational component
  * it is encouraged to use as many as of these in the apps. Easier to manage.
  * no internal management of state
  * state is fix
  * receive data and render it, but does not manage/track changes to data

- stateful
  * smart component
  * can set/manage state
  * state is changing along the time
  * prior to React 16.8, functional component cannot use state (Only class component can do that)
  * after React 16.8, functional component can use `useState()`

## Class VS useState
### Using `class`

In `app.js`:

```
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value'
  };

  switchNameHandler = () => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: 'Maximilian', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
        >
          My Hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
```

### Using `useState`

In `app.js`
```
import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ]
  });

  const [otherState, setOtherState] = useState('some other value');

  console.log(personsState, otherState);

  const switchNameHandler = () => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    setPersonsState({
      persons: [
        { name: 'Maximilian', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}
      />
      <Person
        name={personsState.persons[1].name}
        age={personsState.persons[1].age}
      >
        My Hobbies: Racing
      </Person>
      <Person
        name={personsState.persons[2].name}
        age={personsState.persons[2].age}
      />
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
};

export default app;
```

- [`setState` in functional components](public/setstate.pdf)

### Passing method references between components

In `app.js`:
```
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  }

  nameChangedHandler = (event) => {
    this.setState( {
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    } )
  }

  render () {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={() => this.switchNameHandler('Maximilian!!')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
```

## Class-based VS functional-based Components

| ---------- | ----------- |
| class-based | functional |
| ---------- | ----------- |
| class XY extends Component | const XY = props => { ... } |
| Access to state | Access to state (usestate()) |
| Lifecycle hook  | Cannot use lifecycle hook |
| Access states and props via 'this' | Access props via "props" |
| eg. this.state.XY & this.props.XY | props.XY |
| Use if you want to manage state & access Lifecycle Hook & don't want to use React hook | All other cases |


## CSS Styles (Inline style VS Stylesheet)

### Inline style
- If we just want to apply the style in fix component, easier to understand which style each component is

#### Adding pseudo into inline style
- Use Radium
```
npm install --save radium
```

```
import Radium from 'radium';

=============================
const style = {
  ':hover': {
    backgroundColor: 'red',
    color: 'white'
  }
}

============================

style[':hover'] = {
  backgroundColor: 'green'
}

=============================
export default Radium(App);
```

#### Adding media queries into inline style

`Person.js`
```
import Radium, { StyleRoot } from 'radium';

===========================================
const person = (props) => {
  const style = {
    '@media (min-width: 500px)': {
      width: '500px';
    }
  };
  return (
  )
}

export default Radium(person);
```

`App.js`

```
<StyleRoot>
  <App />
</StyleRoot>
===========================================

```

### Stylesheet
- Generally better for performance than inline styles.

### Styled Components
```
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

class App extends Component {
  render() {
      return (
        <div className="App">
          <h1>Hi, I am a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>
            Toggle Persons
          </StyledButton>
          {persons}
        </div>
      );
  }
}
```


### [CSS Module](https://github.com/css-modules/css-modules)
- [Setup CSS Module](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2)
- You can write normal CSS code and make sure, that it only applies to a given component.

In Post.css File
```
.Post {
    color: red;
}
```
In Post Component File

```
import classes from './Post.css';
 
const post = () => (
    <div className={classes.Post}>...</div>
);
```

- On the other hand, if we want to define a global css class, we can use `:global`.

Example:
```
:global .Post { ... } 
```

Now you can use `className="Post"` anywhere in your app and receive that styling.

## What is two-way binding?
- Two-way data binding means that when you change something in the browser (for example, the content of a form input), it immediately updates the place where you store that data. 

## [Error boundaries](https://reactjs.org/docs/error-boundaries.html)

```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

Use it as a regular element:
```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
