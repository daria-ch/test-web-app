import React, {Component} from 'react';
import {fetchCategories} from "../../store/actions/categoriesActions";
import {connect} from "react-redux";
import {Alert, Button} from "reactstrap";
import {Link} from "react-router-dom";

class Categories extends Component {

    async componentDidMount() {
        await this.props.fetchCategories();
    }


    render() {
        let content;

        if (this.props.categories) {
            content = this.props.categories.map(category => {
                return <Alert tag={Link} to={'/categories/' + category.id} color="info"
                              key={category.id}>{category.title}</Alert>
            })
        }


        return (
            <div>
                <Button tag={Link} to={'/categories/new'} style={{marginBottom: '10px'}}>New category</Button>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {content}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories
})
const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
})


export default connect(mapStateToProps, mapDispatchToProps)(Categories);