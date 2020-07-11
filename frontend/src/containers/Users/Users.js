import React, {Component} from 'react';
import {connect} from "react-redux";
import {Alert, Button} from "reactstrap";
import {Link} from "react-router-dom";
import {fetchUsers} from "../../store/actions/usersActions";

class Users extends Component {

    async componentDidMount() {
        await this.props.fetchUsers();
    }

    render() {
        let content;

        if (this.props.users) {
            content = this.props.users.map(user => {
                return <Alert tag={Link} to={'/users/' + user.id} color="info" key={user.id}>{user.username}</Alert>
            })
        }


        return (
            <div>
                <Button tag={Link} to={'/users/new'} style={{marginBottom: '10px'}}>New user</Button>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {content}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users.users
})

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);