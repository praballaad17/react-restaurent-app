import React, { Component } from 'react';
import Main from './component/mainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      
      <div>
        <BrowserRouter>
         <Main />
         </BrowserRouter>
      </div>
    );
  }
}
export default App;