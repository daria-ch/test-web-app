import React, {Component} from 'react';
import {Link, NavLink as RouterNavLink} from 'react-router-dom';
import {Button, Navbar, NavbarBrand, NavLink} from 'reactstrap';
import {connect} from "react-redux";
import {logoutUser} from "../../../store/actions/usersActions";


class Toolbar extends Component {

    onButtonClick = () => {
        this.props.logoutUser()
    }

    render() {
        return (
            <Navbar color="light" light expand="md" style={{display: 'flex', justifyContent: 'space-between'}}>
                <NavbarBrand tag={RouterNavLink} to="/">News</NavbarBrand>
                <div>
                    {this.props.login ? <Button color="link" tag={Link} to={'/admin'}>Admin</Button> : null}
                    {!this.props.login ? <NavLink tag={RouterNavLink} to="/login">Login</NavLink> :
                        <Button color="link" onClick={this.onButtonClick}>Log out</Button>}
                </div>
            </Navbar>
        );
    }
}


const mapStateToProps = state => ({
    login: state.users.login
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);