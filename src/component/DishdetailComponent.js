import React,{Component}  from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText
        , Breadcrumb,BreadcrumbItem, Button,Modal,ModalBody,ModalHeader,Row,Col,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
       this.state = {
        isModalOpen: false
       }
        }
   
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        return(
            <div>
            <Button onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="author" md={2}>Your Name</Label><br/>
                    <Col md={10}>
                        <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name" 
                               className="form-control"
                               validators={{
                                required, minLength: minLength(1), maxLength: maxLength(15)
                            }} />
                                 <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                             />
                    </Col>
                </Row>
                
                <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label><br />
                    <Col md={10}>
                            <Control.select model=".rating" name="rating"
                                    className="form-control">
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                        </Control.select>
                    </Col>
                </Row>
                <Row className="form-group">
                        <Label htmlFor="comment" md={2}>Your Feedback</Label> <br />
                        <Col md={10}>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                rows="12"
                                className="form-control" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Send Feedback
                            </Button>
                        </Col>
                    </Row>
            </LocalForm>                         
            </ModalBody>
        </Modal>
            </div>
        )
    }
}

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <div className="m-1" >
                <FadeTransform
                    in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
           </div> 
        );
    }
    else{
        return(
        <div></div>
        );
        }
}

function RenderComments({comments ,postComment, dishId}) {
    if (comments != null) {
        const list = comments.map((comment)=> {

            return(
                <div>  
                    <Fade in>     
                        <li key="comment.id">
                            <h6 className="py-1">{comment.comment}</h6>
                            <h6 className="py-2">--{comment.author},
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</h6>  
                        </li>
                    </Fade>
                </div>
            )
        })
        return(
            <div>
                <ul className="list-unstyled">
                    <h4>Comments</h4>
                    <Stagger in>
                    {list}
                    </Stagger>
                    <CommentForm className="py-2" postComment={postComment} dishId={dishId}/> 
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
        
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
            return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-lg-5 col-sm-12">
                  <RenderDish dish={props.dish} /> </div>
                  <div className="col-lg-6 col-sm-6">
                 <RenderComments comments={props.comments}
                 postComment={props.postComment}
                 dishId={props.dish.id} />
                 </div>

             </div> 
             
            </div>
        )}
        else {
            return(
            <div></div>
        ) }  
    }

export default DishDetail;