import React from 'react';
import {ArrowUpIcon, ArrowDownIcon} from '@primer/octicons-react';
import { Card, Container, Table } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { showSourceNode } from '../api/infonode';
import { Alert, Button } from 'react-bootstrap';

class ShowSourceNodeView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            nodeData: '',
            nowMsg: '',
            nowMsgType: 'danger',
            idExist: true,
            isUped: true,
            isDowned: true,
        }
        this.showErrorMsg = this.showErrorMsg.bind(this)
        this.showSuccessMsg = this.showSuccessMsg.bind(this)
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
        showSourceNode(this.state.id, (data)=>{
            console.log(data)
            this.setState({
                nodeData: data
            })
        }, (err)=>{

        })
    }
    render() {
        return <Container>
            {this.state.nowMsg?
            <Alert variant={this.state.nowMsgType}>{this.state.nowMsg}</Alert>:null}
            {this.state.idExist?null:
            <Redirect to="/404"></Redirect>}
            <Card>
                <Card.Header>
                    <Card.Title>节点详情</Card.Title>
                </Card.Header>
                <Card.Body>
                <Table>
                    <tbody>
                        <tr>
                            <td>节点ID</td>
                            <td>{this.state.id}</td>
                        </tr>
                        <tr>
                            <td>节点内容</td>
                            <td>{this.state.nodeData.description||''}</td>
                        </tr>
                        <tr>
                            <td>URL</td>
                            <td>{this.state.nodeData.url||''}</td>
                        </tr>
                    </tbody>
                </Table>
                </Card.Body>
            </Card>
        </Container>
    }
}

export default ShowSourceNodeView;