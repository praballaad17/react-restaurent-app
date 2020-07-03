import React, { Component } from 'react';
import Home from './home';
import Menu from './menuComponent';
import Contact from './contact';
import Header from './header';
import Footer from './footer';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leader';
import { PROMOTIONS } from '../shared/promotion';
import { Switch , Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES ,
      promotions: PROMOTIONS,
      comments: COMMENTS,
      leaders : LEADERS,
    };
  }
  

  render() {

    const HomePage =() => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
          leader={this.state.leaders.filter((leader)=> leader.featured)[0]}
         />
      )
    }

    return (
      
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default Main;