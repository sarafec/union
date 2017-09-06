import React, { Component } from 'react';
import Main from './main';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        serachTerm: '',
        currentlyDisplayed: ''
      };
  }
  
  render() {
    return (
      <Main />
    );
  }
}

export default App;
