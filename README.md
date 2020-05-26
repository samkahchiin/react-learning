## Props
### PropTypes
- To prevent confusion when we are working in a large team.

## State
- We should pass function to the `setState` if we need to refer to the previous state. This makes sure the result is always the expected
one if there are simulataneous actions.

```
import PropTypes from 'prop-types';

Person.propTypes = {
  name: PropTypes.string,
  click: PropTypes.func,
  age: PropTypes.number
}
```

### Stateless VS Stateful
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

## Component Lifecycle
### Creation
#### constructor(props)
- must call `super(props)` so that the initial setup is still there
- DO: setup state
- DONT: Cause side effects (Call HTTP and so on)

#### getDerivedStateFromProps(props, state)
- rarely use this
- DO: sync state
- DONT: Cause side effects

#### render()
- prepare and structure JSX Code

#### Render Child Components
- render components

#### componentDidMount()
- DO: Cause side effects
- DONT: Update states (it will trigger rerender)

### Update
#### 1) getDerivedStateFromProps(props, state)
- rarely use this (there is other more elegant way to do this)
- want to initialize/update state based on outside changes (eg. form update)
- DO: sync state
- DONT: Cause side effects

#### 2) shouldComponentUpdate(nextProps, nextState)
- DO: decide whether to continue or not (can cancel update)
- DONT: Cause side effects
- should return true/false
- used for optimization

#### 3) render()

#### 4) Update Child Component Props

#### 5) getSnapshotBeforeUpdate(prevProps, prevState)
- DO: last minute DOM ops
- DONT: Cause side effects

#### 6) componentDidUpdate(prevProps, prevstate, snapshot)
- DO: Cause side effects
- DONT: Update state (triggers rerender)

## Cleanup
#### componentDidUnmount()
- Called when the component disappear

## useEffect (Used in functional component)
- Take a function and perform the function every updates
- can cause side effect here

```
// Will only be called when person changes
useEffect(() => {
  console.log("hi");
}, [props.persons])

// if the second argument is [], then it will only be called for the first time.
// similar to componentDidMount()
```

```
// The function returned will be called after the render() but before the useEffect()
useEffect(() => {
  console.log("hi");
  return () => {
    console.log("cleanup here");
  };
})

```

## Optimization
- If the update is always necessary, do not need to do the following check, because the check will slow down the performance as well.

### Class-based Component
#### `shouldComponentUpdate(nextProps, nextState)`
return false if the rerendering is unnecessary

#### `pureComponent`
If you need to check for all the changes of the props, instead of listing and compare the differences,
use pureComponent instead.

```
import React , { pureComponent } from 'react';

class Person extend pureComponent {
}
```

### Functional Component
#### `React.memo`
Wrap the parent component in `React.memo` to prevent unnecessary rerendering.
eg. `export default React.memo(cockpit);`

## Higher Order Component
### Aux
It becomes clear, once you translate the JSX code to the
React.createElement() calls React actually executes (don’t forget: The React
project build workflow performs this transformation for you!)
JSX:
```
import React from 'react';
const heading = props => (
<h1>{props.title}</h1>
<h2>{props.subtitle}</h2>
);

export default heading;
```

This is NOT allowed because it would be translated to:

```
import React from 'react';
const heading = props => React.createElement('h1', {}, props.title) React.createElement('h2', {}, props.subtitle);

export default heading;
```

This is invalid JavaScript syntax, you’re trying to return two expressions (two `React.createElement()` calls).
You are allowed to do that if you
a) return an array of React.createElement() calls OR
b) return a single React.createElement() call that wraps the other two

a)
```
import React from 'react';
const heading = props => [
React.createElement('h1', {key: 'i1'}, props.title),
React.createElement('h2', {key: 'i2'}, props.subtitle)
];
export default heading;
```

This is equivalent to returning an array of keyed JSX elements.
b)
```
import React from 'react';
import Aux from '../hoc/Aux';
const heading = props => React.createElement(
Aux,
{},
React.createElement('h1', {key: 'i1'}, props.title),
React.createElement('h2', {key: 'i2'}, props.subtitle)
);
export default heading;
```

This is equivalent to using <Aux>.
b) works because we can pass as many children (third argument to React.createElement()) as we want.

### `Fragment`
- equivalent to what aux is doing above

```
import React, { Fragment } from 'react';

<Fragment>
  (... all the fragmented html code here)
</Fragment>
```

### Another form
```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

## Ref
### Class-based components


## Context
- When we need to pass a props across multiple layers

### `contextType` and `useContext`

## Routing
- !(Routing)[routing.pdf]
