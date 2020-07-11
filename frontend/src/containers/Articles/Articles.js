import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchArticles} from "../../store/actions/articlesActions";
import ArticleItem from "../../components/ArticleItem/ArticleItem";

class Articles extends Component {

    async componentDidMount() {
        this.props.fetchArticles();
    }


    render() {

        return (
            <div>
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
    articles: state.articles.articles
})
const mapDispatchToProps = dispatch => ({
    fetchArticles: () => dispatch(fetchArticles())
})

export default connect(mapStateToProps, mapDispatchToProps)(Articles);