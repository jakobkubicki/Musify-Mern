import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import './RegisterModal.css';

class RegisterModal extends Component {
    state = {
        modal: false,
        fname: '',
        lname: '',
        email: '',
        password: '',
        msg: null,
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error , isAuthenticated} = this.props;
        if(error !== prevProps.error) {
            //Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg})
            }
            else {
                this.setState({ msg: null});
            }
        }

        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        //Clear error
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { fname, lname, email, password, } =this.state;

        //Create user object
        const newUser = {
            fname,
            lname,
            email,
            password
        }

        //Attempt to register
        this.props.register(newUser);

    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register for Musify</ModalHeader>
                    {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="fname">First Name</Label>
                            <Input
                                type="text"
                                name="fname"
                                id="fname"
                                placeholder="First Name *"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Label for="lname">Last Name</Label>
                            <Input
                                type="text"
                                name="lname"
                                id="lname"
                                placeholder="Last Name *"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Label for="email">Email address</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address *"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password *"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Label check>
                                <Input type="checkbox" name="privacy" required="true"/>{' '}
                                Accept our <a href="https://route.com/privacy/">privacy policy</a>
                                <h6>We promise to never share your information with anyone.</h6>
                            </Label>
                            <Button color='dark' style={{ marginTop: '2rem'}} block>
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        );
    }
}

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    });

    export default connect(
        mapStateToProps,
        { register, clearErrors}
    )(RegisterModal);
