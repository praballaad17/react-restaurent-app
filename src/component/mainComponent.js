import React, { Component } from 'react';
import Home from './home';
import Menu from './menuComponent';
import { addComment, fetchDishes } from '../redux/actionCreator';
import DishDetail from './DishdetailComponent';
import Contact from './contact';
import Header from './header';
import Footer from './footer';
import About from './about';
import { Switch , Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())}
});


class Main extends Component {

  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

    const HomePage =() => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
          leader={this.props.leaders.filter((leader)=> leader.featured)[0]}
         />
      )
    }

    const DishwithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment={this.props.addComment} />
    ); 
    }

    return (
      
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
          <Route path='/menu/:dishId' component={DishwithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Main));