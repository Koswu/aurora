import { Container, Card, Form, Button, Alert } from "react-bootstrap";
//import {Select, Option} from "../common/ui/select.js"

import {addInfoNode, searchInfoNode, getInfoNodes, getExternalSourceNode} from "../api/infonode.js"
import React from 'react';

class InfoNodeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inferenceOption: [],
            externalSourceOption: [],
            isLoading: false,
            nowMsg: '',
            nowMsgType: 'danger',
        };
        this.showErrorMsg = this.showErrorMsg.bind(this)
        this.showSuccessMsg = this.showSuccessMsg.bind(this)
        this.onFormSubmit = this.handleSubmit.bind(this)
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
    componentDidMount() {
            getInfoNodes((data)=>{
                this.setState({inferenceOption:data})
            },(errMsg) => {
            })
            getExternalSourceNode((data) => {
                this.setState({externalSourceOption:data})
            },(errMsg) => {console.log(errMsg)})

    }
    handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        this.setState({isLoading: true})
        addInfoNode(formData.get("content"), formData.getAll("inference_nodes").map(parseInt), formData.getAll("external_nodes").map(parseInt), 
        (data) => {
            this.showSuccessMsg("创建成功")
            window.location.reload();
        }, (errMsg) => {
            this.showErrorMsg(errMsg);
        })

    }
    render() {
        return (
            <Container>
            {this.state.nowMsg?
            <Alert variant={this.state.nowMsgType}>{this.state.nowMsg}</Alert>:null}
            <Card>
                <Card.Header>
                <Card.Title>创建信息节点</Card.Title></Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>节点内容</Form.Label>
                            <Form.Control name="content" as="textarea" rows={5}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>论据节点</Form.Label>
                            <Form.Control name="inference_nodes" as="select" multiple>
                            {
                                this.state.inferenceOption.map((element, index) =>  {
                                    console.log(element);
                                    return <option value={element.id} >{element.content}</option>
                                })
                            }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>外部论据节点</Form.Label>
                            <Form.Control name="external_nodes" as="select" multiple>
                            {
                                this.state.externalSourceOption.map((element) => {
                                    return <option value={element.id}>{element.description} {element.url}</option>
                                })
                            }
                            </Form.Control>
                        </Form.Group>
                    <Button disabled={this.state.isLoading} type="submit" variant="primary" block>提交</Button>
                    </Form>
                </Card.Body>
            </Card>
            </Container>
        );
    }
}

export default InfoNodeEdit;