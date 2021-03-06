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
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';


class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error) {
            //check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg})
            }
            else {
                this.setState({msg:null})
            }
        }

        //  if registration is  proper then it will be authenticated and modal should close
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }

        
    }

    toggle = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
    
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = this.state;

        //create user object
        const newUser = {
            name, 
            email,
            password
        }
        
        // Attempt to register
        this.props.register(newUser);
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    register
                </NavLink> 
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}

                >
                    <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="form-control"
                                    onChange={this.onChange}
                                    required
                                />
                                
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="form-group"
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for="password">password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="passowrd"
                                    placeholder="password"
                                    className="form-group"
                                    onChange={this.onChange}
                                    required
                                />

                                <Button
                                    color="dark"
                                    style={{marginTop: '1rem'}}
                                    
                                >Register</Button>


                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors } )(RegisterModal)