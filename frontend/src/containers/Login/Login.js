import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {loginUser} from "../../store/actions/usersActions";

class Login extends Component {

    state = {
        username: '',
        password: '',
        loginUsername: 'daria_ch',
        loginPassword: 'qwerty123',
        logIn: false
    };

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    checkLogin = async (loginData) => {
        if (loginData.username === this.state.loginUsername && loginData.password === this.state.loginPassword) {
            this.setState({logIn: true});
            this.props.loginUser(loginData);
            this.props.history.push('/');
        } else {
            alert('Login or password incorrect')
        }
    };

    submitFormHandler = async event => {
        event.preventDefault();

        const login = {
            username: this.state.username,
            password: this.state.password,
        };

        await this.checkLogin(login);
    };


    render() {

        return (
            <Form onSubmit={this.submitFormHandler} style={{width: '300px', textAlign: 'center', margin: '0 auto'}}>
                <FormGroup>
                    <Label for="username">Name</Label>
                    <Input type="text" name="username" id="username" placeholder="Enter your name"
                           value={this.state.username}
                           onChange={this.inputChangeHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter password"
                           value={this.state.password}
                           onChange={this.inputChangeHandler}/>
                </FormGroup>
                <Button onClick={this.submitFormHandler} color="info">Log in</Button>{' '}
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    login: state.users.login,
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: (userData) => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);