import React, {Component} from 'react';
import {connect} from "react-redux";
import {postUser} from "../../store/actions/usersActions";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class NewUser extends Component {

    state = {
        username: '',
        password: ''
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    goBack = () => {
        this.props.history.push('/users');
    }

    onSubmitForm = async (event) => {
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        await this.props.postUser(user);
        await this.props.history.push('/users');

    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Enter username"
                               value={this.state.username} onChange={this.inputChangeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter password"
                               value={this.state.password} onChange={this.inputChangeHandler}/>
                    </FormGroup>
                    <Button onClick={this.goBack} style={{margin: '5px'}}>Back</Button>
                    <Button onClick={this.onSubmitForm} style={{margin: '5px'}}>Done</Button>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postUser: (user) => dispatch(postUser(user))
})
export default connect(null, mapDispatchToProps)(NewUser);