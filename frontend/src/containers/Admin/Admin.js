import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";

class Admin extends Component {

    render() {
        return (
            <div>

                <ListGroup>
                    <ListGroupItem tag={Link} to={'/users'}>Users</ListGroupItem>
                    <ListGroupItem tag={Link} to={'/articles'}>Articles</ListGroupItem>
                    <ListGroupItem tag={Link} to={'/categories'}>Categories</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}


export default Admin;