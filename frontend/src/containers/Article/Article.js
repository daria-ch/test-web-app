import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {deleteArticle, fetchSingleArticle} from "../../store/actions/articlesActions";

class Article extends Component {

    componentDidMount() {
        this.props.fetchSingleArticle(this.props.match.params.id);
    }

    goBack = () => {
        this.props.history.push('/');
    }

    deleteArticle = (id) => {
        this.props.deleteArticle(id);
        this.props.history.push('/');
    }


    render() {

        let content = null;
        if (this.props.article) {
            content = <Card>
                <CardImg top width="100%" src={'http://localhost:8000/uploads/' + this.props.article.image}
                         alt="Card image cap"/>
                <CardBody>
                    <CardTitle>{this.props.article.title}</CardTitle>
                    <CardText>{this.props.article.description}</CardText>
                    <div>
                        <Button onClick={this.goBack} style={{margin: '5px'}}>Back</Button>
                        {this.props.login ?
                            <Button onClick={() => this.deleteArticle(this.props.article.id)}
                                    style={{margin: '5px'}}>Delete</Button> : null}
                        {this.props.login ? <Button tag={Link}
                                                    to={'/articles/' + this.props.article.id + '/edit'}
                                                    style={{margin: '5px'}}>Edit</Button> : null}
                    </div>

                </CardBody>
            </Card>
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
    login: state.users.login
})
const mapDispatchToProps = dispatch => ({
    fetchSingleArticle: (id) => dispatch(fetchSingleArticle(id)),
    deleteArticle: (id) => dispatch(deleteArticle(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);