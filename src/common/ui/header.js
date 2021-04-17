import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginModal from './login.js';
import config from '../../config.js';
import storageKeys from '../variable/storagekey.js'
import RegisterModal from './register.js';

class HeaderNav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id='header'>
                <Navbar bg="dark" variant="dark" >
                    <Link to="/">
                        <Navbar.Brand>{config.APP_NAME}</Navbar.Brand>
                    </Link>
                    <Nav className="mr-auto">
                    </Nav>
                    {
                        this.props.loginedUserName ? 
                        <AuthorizedStatusNav nowUser={this.props.loginedUserName} onLogout={() => this.props.onChangedUserName(null)}></AuthorizedStatusNav>:
                        <UnauthorizedStatusNav onLogined={(loginedUsername) => this.props.onChangedUserName(loginedUsername)}></UnauthorizedStatusNav>
                    }
                </Navbar>
            </div>
        );
    }
}

class UnauthorizedStatusNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModalShow: false,
            registerModalShow: false,
        }
    }
    render() {
        return (
            <Nav>
                <Nav.Link onClick={() => this.setState({registerModalShow: true})}>注册</Nav.Link>
                <Nav.Link onClick={() => this.setState({loginModalShow: true})}>登录</Nav.Link>
                <LoginModal show={this.state.loginModalShow} 
                onHide={() => this.setState({loginModalShow: false})} 
                onLogined={(username) => this.handleLogin(username)}></LoginModal>
                <RegisterModal show={this.state.registerModalShow}
                onHide={() => this.setState({registerModalShow: false})}
                ></RegisterModal>
            </Nav>);
    }
    handleLogin(username) {
        this.props.onLogined(username);
    }
}

class AuthorizedStatusNav extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Nav>
                <Nav.Link>{this.props.nowUser}</Nav.Link>
                <Nav.Link onClick={() => this.handleLogout()}>登出</Nav.Link>
            </Nav>
        );
    }
    handleLogout() {
        localStorage.clear(storageKeys.LOGINED_USERNAME);
        localStorage.clear(storageKeys.AUTH_TOKEN);
        this.props.onLogout();
    }
}

function handleRegister() {
    debugger;
    alert("你点击了注册");
}

function handleLogin() {
    //alert("登录了")
    //let dialog = <LoginDialog></LoginDialog>;
    //ReactDOM.render(<LoginDialog show="true"></LoginDialog>, document.getElementById('modalContainer'));
    //dialog.modal();
}

export default HeaderNav;