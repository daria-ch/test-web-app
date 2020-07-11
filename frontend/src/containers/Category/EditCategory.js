import React, {Component} from 'react';
import {connect} from "react-redux";
import {editCategory, fetchSingleCategory} from "../../store/actions/categoriesActions";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class EditCategory extends Component {

    state = {
        title: '',
        parent_id: null
    }

    async componentDidMount() {
        await this.props.fetchSingleCategory(this.props.match.params.id);
        this.setState({
            title: this.props.category.title,
            parent_id: this.props.category.parent_id
        });
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    goBack = () => {
        this.props.history.push('/categories');
    }

    onSubmitForm = async (event) => {
        event.preventDefault();

        const newCategory = {
            title: this.state.title,
            parent_id: this.state.parent_id
        }

        await this.props.editCategory(this.props.match.params.id, newCategory);
        this.props.history.push('/categories/' + this.props.match.params.id);

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


const mapStateToProps = state => ({
    category: state.categories.category
})

const mapDispatchToProps = dispatch => ({
    fetchSingleCategory: (id) => dispatch(fetchSingleCategory(id)),
    editCategory: (id, newCategory) => dispatch(editCategory(id, newCategory))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
