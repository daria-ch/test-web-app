import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {Route, Switch} from "react-router";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Articles from "./containers/Articles/Articles";
import Login from "./containers/Login/Login";
import Article from "./containers/Article/Article";
import EditArticle from "./containers/Article/EditArticle";
import NewArticle from "./containers/Article/NewArticle";
import Admin from "./containers/Admin/Admin";
import Users from "./containers/Users/Users";
import Categories from "./containers/Categories/Categories";
import NewUser from "./containers/User/NewUser";
import User from "./containers/User/User";
import EditUser from "./containers/User/EditUser";

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
                        <Route path="/admin" exact component={Admin}/>
                        <Route path="/articles" exact component={Articles}/>
                        <Route path="/articles/new" exact component={NewArticle}/>
                        <Route path="/articles/:id/edit" exact component={EditArticle}/>
                        <Route path="/articles/:id" exact component={Article}/>
                        <Route path="/users" exact component={Users}/>
                        <Route path="/users/new" exact component={NewUser}/>
                        <Route path="/users/:id" exact component={User}/>
                        <Route path="/users/:id/edit" exact component={EditUser}/>
                        <Route path="/categories" exact component={Categories}/>
                        <Route path="/categories/new" exact component={Categories}/>
                        <Route path="/categories/:id" exact component={Categories}/>
                        <Route path="/categories/:id/edit" exact component={Categories}/>
                        <Route render={() => <h1>Not found</h1>}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;