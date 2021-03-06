import React, { Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import RegisterModal from './auth/registerModal';
import LoginModal from './auth/loginModal';
import Logout from './auth/logout';

class AppNavbar extends Component {
   state = {
       isOpen: false
   }

   static propTypes = {
       auth: PropTypes.object.isRequired
   }

   toggle = () => {
       this.setState({
           isOpen: !this.state.isOpen
       });
   }

   render() {

        const{ isAuthenticated, user } = this.props.auth

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text align-top">
                        <strong>{ user? `Welcome ${user.name}` : null }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Shopping list</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="justify-content-end" style={{ width: "100%" }} navbar>

                            { isAuthenticated ? authLinks : guestLinks}

                            <NavItem > 
                                <NavLink href="//instagram.com"  >insta</NavLink>
                            </NavItem>
                            
                            
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
      
   }

}

const mapStateToProps = state => ( {
    auth: state.auth
}
)

export default connect(mapStateToProps, null)(AppNavbar);