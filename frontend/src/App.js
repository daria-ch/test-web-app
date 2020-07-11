import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {Route, Switch} from "react-router";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Articles from "./containers/Articles/Articles";
import Login from "./containers/Login/Login";
import Article from "./containers/Article/Article";
import EditArticle from "./containers/Article/EditArticle";
import NewArticle from "./containers/Article/NewArticle";

class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar/>
                </header>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        <Route path="/" exact component={Articles}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/articles/new" exact component={NewArticle}/>
                        <Route path="/articles/:id/edit" exact component={EditArticle}/>
                        <Route path="/articles/:id" exact component={Article}/>
                        <Route render={() => <h1>Not found</h1>}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;