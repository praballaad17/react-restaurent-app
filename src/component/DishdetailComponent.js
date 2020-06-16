import React , { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText} from 'reactstrap';

 

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <div className="col-12 col-md-5 m-1" >
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
    else{
        return(
        <div></div>
        );
        }
}

function RenderComments({comments}) {
    if (comments != null) {
        const list = comments.map((comment)=> {

            return(
                <div  className="col-12 col-md-5 m-1">       
                   <li key="comment.id">
                    <h6>{comment.comment}</h6>
                    <h6>--{comment.author},
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</h6>            
                </li>
                </div>
            )
        })
        return(
            <div>
                <ul className="list-unstyled">
                    <h4>Comments</h4>
                    {list}
                </ul>
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }
}

    const DishDetail = (props) => { 
        const {dish} = props;
        if(dish != null){
            return(
            <div className="container">
                <div className="row">
                  <RenderDish dish={dish} /> 
                 <RenderComments comments={dish.comments} />
             </div>  
            </div>
        )}
        else {
            return(
            <div></div>
        ) }  
    }

export default DishDetail;