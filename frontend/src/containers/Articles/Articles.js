import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {fetchArticles} from "../../store/actions/articlesActions";
import ArticleItem from "../../components/ArticleItem/ArticleItem";


class Articles extends Component {

    async componentDidMount() {
        this.props.fetchArticles();
    }


    render() {

        return (
            <div>
                {this.props.login ? <Button tag={Link} to={'/articles/new'}>New article</Button> : null}
                {
                    this.props.articles.reverse().map(article => {
                        return <ArticleItem
                            key={article.id}
                            id={article.id}
                            title={article.title}
                            description={article.description}
                            image={article.image}/>
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articles.articles,
    login: state.users.login
})
const mapDispatchToProps = dispatch => ({
    fetchArticles: () => dispatch(fetchArticles())
})

export default connect(mapStateToProps, mapDispatchToProps)(Articles);