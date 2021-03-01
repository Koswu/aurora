import { Form, Modal, Button, Alert, Spinner} from "react-bootstrap";
import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import {userRegister} from '../../api/user'

class RegisterModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            nowMsg: '',
            msgType: 'danger',
            isLoading: false,
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.showErrMsg = this.showErrMsg.bind(this);
        this.showSuccessMsg = this.showSuccessMsg.bind(this);
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                <Modal.Header>
                    <Modal.Title>注册</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.nowMsg?
                    <Alert variant={this.state.msgType} onClose={() => this.setState({nowMsg:''})} dismissible>{this.state.nowMsg}</Alert>:
                    null}
                    <Form>
                    <Form.Group controlId="formLoginUsername">
                        <Form.Label>用户名</Form.Label>
                        <Form.Control value={this.state.username} onChange={e => this.setState({username: e.target.value})}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formLoginPassword">
                        <Form.Label>密码</Form.Label>
                        <Form.Control value={this.state.password} onChange={e => this.setState({password: e.target.value})} type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={this.state.email} onChange={e=>this.setState({email: e.target.value})} type="email"></Form.Control>
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>关闭</Button>
                    <Button variant="primary" onClick={this.handleRegister} disabled={this.state.isLoading}>
                    {this.state.isLoading?<Spinner as="span" animation="border" size="sm"></Spinner>:null}
                    注册</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    handleRegister(){
        this.setState({
            isLoading: true,
        });
        userRegister(this.state.username, this.state.password, this.state.email, (response) => {
            this.showSuccessMsg("注册成功");
            this.setState({
                isLoading:false,
            })
        }, (errMsg) => {
            this.setState({
                isLoading: false,
            })
            this.showErrMsg(errMsg);
        })
    }
    showErrMsg(msg) {
        this.setState({
            nowMsg: msg,
            msgType: 'danger',
        });
    }
    showSuccessMsg(msg){
        this.setState({
            nowMsg: msg,
            msgType: 'success',
        });
    }
    clearMsg(){
        this.setState({
            nowMsg: '',
        });
    }
}

export default RegisterModal;