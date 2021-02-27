import { Form, Modal, Button} from "react-bootstrap";
import React, { useState } from 'react';
import ReactDOM from 'react-dom'

class RegisterModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.setState({isHide: true})}>
                <Modal.Header>
                    <Modal.Title>注册</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group controlId="formLoginUsername">
                        <Form.Label>用户名</Form.Label>
                        <Form.Control value={this.state.username} onChange={e => this.setState({username: e.target.value})}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formLoginPassword">
                        <Form.Label>密码</Form.Label>
                        <Form.Control value={this.state.password} onChange={e => this.setState({password: e.target.value})} type="password"></Form.Control>
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>关闭</Button>
                    <Button variant="primary" onClick={() => this.props.onSuccess(this.state.username, this.state.password)}>注册</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    onRegister(){

    }
}

export default RegisterModal;