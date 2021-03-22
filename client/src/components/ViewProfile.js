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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './ViewProfile.css';
import MyProfile from "./MyProfile";

class ViewProfile extends Component {


    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render(){
        const { isAuthenticated, user } =  this.props.auth

        const authLinks = (
            <Fragment>
                <div class="container">
                                <div class="main-body">
                
                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                            <img src="https://www.seekpng.com/png/full/847-8474751_download-empty-profile.png" alt="Admin" className="rounded-circle" width="150"></img>
                                        <div className="mt-3">
                                        <h4>{ user ? `${user.fname} ${user.lname}` : ''}</h4>
                                        <p className="text-secondary mb-1">{ user ? `${user.email}` : ''}</p>
                                        <p className="text-muted font-size-sm">{ user ? `${user.street}, ${user.city} ${user.state}` : ''}</p>
                                        
                                        <a className="btn btn-primary" href='/editprofile'>Update Profile</a>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                <h6 class="mb-0">Full Name</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                { user ? `${user.fname} ${user.lname}` : ''}
                                </div>
                            </div>
                            <hr></hr>
                            <div class="row">
                                <div class="col-sm-3">
                                <h6 class="mb-0">Email</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                { user ? `${user.email}` : ''}
                                </div>
                            </div>
                            <hr></hr>
                            <div class="row">
                                <div class="col-sm-3">
                                <h6 class="mb-0">Phone</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                { user ? `${user.phone}` : ''}
                                </div>
                            </div>
                            <hr></hr>
                            <div class="row">
                                <div class="col-sm-3">
                                <h6 class="mb-0">Address</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                { user ? `${user.street}, ${user.city} ${user.state}, ${user.country}` : ''}
                                </div>
                            </div>
                            <hr></hr>
                            <div class="row">
                                <div class="col-sm-3">
                                <h6 class="mb-0">Gender</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                { user ? `${user.gender}` : ''}
                                </div>
                            </div>
                            <hr></hr>
                            <div class="row">
                                <div class="col-sm-3">
                                <h6 class="mb-0">Age</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                { user ? `${user.age}` : ''}
                                </div>
                            </div>
                            <hr></hr>
                            <div class="row">
                                <div class="col-sm-3">
                                <h6 class="mb-0">Skills</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                { user ? `${user.skills}` : ''}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>  
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                Please login to view your profile
            </Fragment>
        )

        return(
        <div className="profile">
            {isAuthenticated ? authLinks : guestLinks}
        </div>
        )}
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(ViewProfile);