import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";
import {editArticle, fetchSingleArticle} from "../../store/actions/articlesActions";
import {fetchCategories} from "../../store/actions/categoriesActions";

class EditArticle extends Component {

    state = {
        category_id: '',
        user_id: '',
        title: '',
        description: '',
        image: ''
    }

    async componentDidMount() {
        await this.props.fetchSingleArticle(this.props.match.params.id)
        await this.props.fetchCategories();
        this.setState({
            title: this.props.article.title,
            description: this.props.article.description,
            category_id: this.props.article.category_id,
            image: this.props.article.image,
            user_id: this.props.article.user_id
        });

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
        this.props.history.push('/articles/' + this.props.match.params.id);
    }

    onSubmitForm = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });


        await this.props.editArticle(this.props.match.params.id, formData);
        await this.props.history.push('/articles/' + this.props.match.params.id);

    }


    render() {
        let content;
        if (this.props.article) {
            content = <Form onSubmit={this.onSubmitForm}>
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
                    <Input type="file" name="image" id="image" onChange={this.fileChangeHandler}/>
                </FormGroup>
                <Button onClick={this.goBack} style={{margin: '5px'}}>Back</Button>
                <Button onClick={this.onSubmitForm} style={{margin: '5px'}}>Done</Button>
            </Form>
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    article: state.articles.article,
    categories: state.categories.categories
})
const mapDispatchToProps = dispatch => ({
    fetchSingleArticle: (id) => dispatch(fetchSingleArticle(id)),
    fetchCategories: () => dispatch(fetchCategories()),
    editArticle: (id, newArticle) => dispatch(editArticle(id, newArticle))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
