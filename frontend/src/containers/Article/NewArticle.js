import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {postArticle} from "../../store/actions/articlesActions";
import {fetchCategories} from "../../store/actions/categoriesActions";

class NewArticle extends Component {
    state = {
        category_id: '',
        user_id: 13,
        title: '',
        description: '',
        image: ''
    }

    async componentDidMount() {
        await this.props.fetchCategories();
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    goBack = () => {
        this.props.history.push('/');
    }

    onSubmitForm = async (event) => {
        event.preventDefault();


        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });


        await this.props.postArticle(formData);
        await this.props.history.push('/');

    }


    render() {

        return (
            <div>
                <Form onSubmit={this.onSubmitForm}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Enter title"
                               value={this.state.title}
                               onChange={this.inputChangeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" placeholder="Enter description"
                               value={this.state.description}
                               onChange={this.inputChangeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input type="select" name="category_id" id="category_id" onChange={this.inputChangeHandler}
                               value={this.state.category_id}>
                            {this.props.categories ? this.props.categories.map(category => {
                                return <option value={category.id} key={category.id}>{category.title}</option>
                            }) : null}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">Image</Label>
                        <Input type="file" name="image" id="image" onChange={this.fileChangeHandler}
                        />
                    </FormGroup>
                    <Button onClick={this.goBack} style={{margin: '5px'}}>Back</Button>
                    <Button onClick={this.onSubmitForm} style={{margin: '5px'}}>Done</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories
})
const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    postArticle: (article) => dispatch(postArticle(article))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);