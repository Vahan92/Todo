import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import List from './components/List';
import Input from './components/Input';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">          
          <List />
          <Input/>
        </div>
      </Provider>
    );
  }
}

export default App;
