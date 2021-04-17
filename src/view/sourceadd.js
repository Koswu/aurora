import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import React from 'react';
import { addInfoNode, addExternalSourceNode } from "../api/infonode";

class SourceNodeAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            nowMsg: '',
            nowMsgType: 'danger',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showSuccessMsg = this.showSuccessMsg.bind(this);
        this.showErrorMsg = this.showErrorMsg.bind(this);
    }
    showErrorMsg(msg) {
        this.setState({
            nowMsg: msg,
            nowMsgType: 'danger',
        })
    }
    showSuccessMsg(msg) {
        this.setState({
            nowMsg: msg,
            nowMsgType: 'success',
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        this.setState({isLoading: true});
        addExternalSourceNode(formData.get('description'), formData.get('url'), (data) => {
            this.showSuccessMsg("创建成功")
        }, (errMsg) => {
            this.showErrorMsg(errMsg)
        })
    }
    render() {
        return (<Container>
            <Card>
                <Card.Header>
                    <Card.Title>创建外部来源</Card.Title>
                </Card.Header>
                <Card.Body>
                    {this.state.nowMsg?<Alert variant={this.state.nowMsgType}>{this.state.nowMsg}</Alert>:null}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>网站描述</Form.Label>
                            <Form.Control name="description"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="url" name="url"></Form.Control>
                        </Form.Group>
                        <Button type="submit" varient="primary" block disabled={this.state.isLoading}>提交</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>);
    }
}

export default SourceNodeAdd;