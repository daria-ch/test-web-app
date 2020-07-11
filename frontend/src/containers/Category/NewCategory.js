import React, {Component} from 'react';
import {connect} from "react-redux";
import {postCategory} from "../../store/actions/categoriesActions";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class NewCategory extends Component {

    state = {
        title: '',
        parent_id: null
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    goBack = () => {
        this.props.history.push('/categories');
    }

    onSubmitForm = async (event) => {
        event.preventDefault();

        const category = {
            title: this.state.title,
            parent_id: this.state.parent_id
        }

        await this.props.postCategory(category);
        await this.props.history.push('/categories');

    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Enter title"
                               value={this.state.title} onChange={this.inputChangeHandler}/>
                    </FormGroup>
                    <Button onClick={this.goBack} style={{margin: '5px'}}>Back</Button>
                    <Button onClick={this.onSubmitForm} style={{margin: '5px'}}>Done</Button>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postCategory: (category) => dispatch(postCategory(category))
})
export default connect(null, mapDispatchToProps)(NewCategory);