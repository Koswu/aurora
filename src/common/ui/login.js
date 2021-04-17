import { Form, Modal, Button, Alert} from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner'
import React, { useState } from 'react';
import {userLogin, userRegister} from "../../api/user.js"
import storageKeys from "../variable/storagekey.js";

class LoginModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMsg: '',
            isLoading: false,
        };
        this.handleLogin = this.handleLogin.bind(this);
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                <Modal.Header>
                    <Modal.Title>登录</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.errMsg?
                    <Alert variant="danger" onClose={() => this.setState({errMsg:''})} dismissible>{this.state.errMsg}</Alert>:
                    null}
                    <Form>
                    <Form.Group controlId="formLoginUsername">
                        <Form.Label>用户名</Form.Label>
                        <Form.Control value={this.state.username} onChange={e => this.setState({username: e.target.value})}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formLoginPassword">
                        <Form.Label>密码
                        </Form.Label>
                        <Form.Control value={this.state.password} onChange={e => this.setState({password: e.target.value})} type="password"></Form.Control>
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>关闭</Button>
                    <Button variant="primary" onClick={this.handleLogin} disabled={this.state.isLoading}>
                    {this.state.isLoading?<Spinner as="span" animation="border" size="sm"></Spinner>:null}
                    登录
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    handleLogin() {
        this.setState({
            isLoading: true
        });
        userLogin(this.state.username, this.state.password, (response) => {
            localStorage.setItem(storageKeys.AUTH_TOKEN, response.token)
            localStorage.setItem(storageKeys.LOGINED_USERNAME, this.state.username)
            this.props.onLogined(this.state.username);
            this.setState({
                isLoging: false
            });
            console.log(response);
        }, (errMsg) => {
            this.setState({
                isLoading: false,
            });
            this.showErrMsg(errMsg);
            //alert(errMsg);
            //this.setState({errMsg:errMsg});
        })
    }
    showErrMsg(msg) {
        this.setState({
            errMsg: msg,
        });
    }
}

export default LoginModal;