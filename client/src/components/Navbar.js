import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import './Navbar.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { BrowserRouter as Router, Route } from "react-router-dom";

class AppNavBar extends Component {
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

    render(){
        const { isAuthenticated, user } =  this.props.auth

        const authLinks = (
            <Fragment>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        <span className="navbar-text mr-3">
                            <strong>{ user ? `Welcome ${user.fname}` : ''}</strong>
                        </span>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/myprofile">
                                My Profile
                        </DropdownItem>
                        <DropdownItem>
                                Another Option
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Logout />
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )

        return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/home">Musify</NavbarBrand>
                        <NavLink href="/Users" style={{color: 'white'}}>Users</NavLink>
                        <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    {isAuthenticated ? authLinks : guestLinks}
                                </Nav>
                            </Collapse>
                </Container>
            </Navbar>
        </div>
        )}
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavBar);