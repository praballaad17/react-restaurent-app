import React , { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText} from 'reactstrap';

 
class DishDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
    }

    formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      } 
    
renderDish(dish) {
    if (dish != null) {
        return(
            <div>
            <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
           </div> 
        );
    }
    else {
        return(
        <div></div>
        )
        }
}

renderComments(comments) {
    if (comments != null) {
        return comments.map( comment => (
              
            <div key={comment.id}>       
                <ul className="list-unstyled">

                    <li>{comment.comment}</li>
                    <li>--{comment.author}, 
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </li>        
                </ul>            
            </div>
            
        ));

    }
    else{
        return(
            <div></div>
        );
    }
}

    render() {
        const {dish} = this.props;
        
            return(
            <div className="container">    
                <div className="row">
                <div className="col-12 col-md-5 m-1">     
                   {this.renderDish(dish)}      
                </div> 
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.renderComments(dish.comments)}
                </div>
            </div>
            </div>
        )}
            }

export default DishDetail;