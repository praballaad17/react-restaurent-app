import React, { Component } from 'react'
import {Navbar ,NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <>
            <Navbar dark color="primary">
                <div className="container">
                <NavbarBrand href="/">Restorent Con Fusion</NavbarBrand>
                </div>
            </Navbar>  
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-6">
                            <h1>Restorent Con Fusion</h1>
                            <p>We take inspiration from all around the world as our cheff has sailed all around the world .It not just you are eating food here , you are eating experice from all around the world food, with the most authentic taste.</p>
                        </div>

                    </div>
                    
                </div>
            </Jumbotron>              
            </>
        )
    }
}

export default Header

