import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {editUser, fetchSingleUser, postUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";

class EditUser extends Component {
    state = {
        username: '',
        password: ''
    }

    async componentDidMount() {
        await this.props.fetchSingleUser(this.props.match.params.id);
        this.setState({
            username: this.props.user.username,
            password: this.props.user.password
        });
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    goBack = () => {
        this.props.history.push('/users');
    }

    onSubmitForm = async (event) => {
        event.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password
        }

        await this.props.editUser(this.props.match.params.id, newUser);
        this.props.history.push('/users/' + this.props.match.params.id);

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

const mapStateToProps = state => ({
    user: state.users.user
})

const mapDispatchToProps = dispatch => ({
    fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
    editUser: (id, newUser) => dispatch(editUser(id, newUser))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditUser);