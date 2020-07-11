import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteCategory, fetchSingleCategory} from "../../store/actions/categoriesActions";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

class Category extends Component {

    async componentDidMount() {
        await this.props.fetchSingleCategory(this.props.match.params.id);
    }

    goBack = () => {
        this.props.history.push('/categories');
    }

    deleteUser = (id) => {
        this.props.deleteCategory(id);
        this.props.history.push('/categories');
    }


    render() {
        let content;

        if (this.props.category) {
            content = <div>
                <div><span>title: </span><p>{this.props.category.title}</p></div>
                <Button onClick={this.goBack} style={{margin: '5px'}}>Back</Button>
                <Button tag={Link}
                        to={'/categories/' + this.props.category.id + '/edit'}
                        style={{margin: '5px'}}>Edit</Button>
                <Button onClick={() => this.deleteUser(this.props.category.id)}
                        style={{margin: '5px'}}>Delete</Button>
            </div>

        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    category: state.categories.category
})
const mapDispatchToProps = dispatch => ({
    fetchSingleCategory: (id) => dispatch(fetchSingleCategory(id)),
    deleteCategory: (id) => dispatch(deleteCategory(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category);