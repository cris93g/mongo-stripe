import React, { Component } from 'react';
import store from "./redux/store"
import './App.css';
import {Provider} from "react-redux"

import { HashRouter as Router } from "react-router-dom";
import Auth from "./components/auth/Auth"
import Landing from "./components/Landing/Landing"


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
        <Auth/>
        <Landing/>
     
      </div>

      </Router>
       </Provider>
    );
  }
}

export default App;
