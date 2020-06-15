import React, { Component } from 'react';

import {Navbar ,NavbarBrand } from 'reactstrap';
import Menu from './component/menuComponent';
import './App.css';
import { DISHES } from './shared/dishes';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES ,
         
    };
  }
  
  render() {
    return (
      
      <div>
         <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Restorent Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        
      </div>
    );
  }
}
export default App;