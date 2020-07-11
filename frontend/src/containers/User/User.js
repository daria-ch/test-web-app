import React, {Component} from 'react';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteUser, fetchSingleUser} from "../../store/actions/usersActions";


class User extends Component {
    async componentDidMount() {
        await this.props.fetchSingleUser(this.props.match.params.id);
    }

    goBack = () => {
        this.props.history.push('/');
    }

    deleteUser = (id) => {
        this.props.deleteUser(id);
        this.props.history.push('/users');
    }

    render() {

        let content;

        if (this.props.user) {
            content = <div>
                <div><span>username: </span><p>{this.props.user.username}</p></div>
                <div><span>password:</span><p>{this.props.user.password}</p></div>
                <Button onClick={this.goBack} style={{margin: '5px'}}>Back</Button>
                <Button tag={Link}
                        to={'/users/' + this.props.user.id + '/edit'}
                        style={{margin: '5px'}}>Edit</Button>
                <Button onClick={() => this.deleteUser(this.props.user.id)}
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
    user: state.users.user
})
const mapDispatchToProps = dispatch => ({
    fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
    deleteUser: (id) => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(User);