
import React from 'react';
import {ArrowUpIcon, ArrowDownIcon} from '@primer/octicons-react';
import { Card, Col, Container, Table } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { getMyRate, putMyRate, showInfoNode } from '../api/infonode';
import { Alert, Button } from 'react-bootstrap';

class ShowNodeView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            content: '',
            credibility: 0,
            ratedCnt: 0,
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
        showInfoNode(this.state.id, (data)=>{
            this.setState({
                content: data.content,
                credibility: data.credibility,
                ratedCnt: data.rated_cnt,
            })
            console.log(data)
        }, (err)=>{
        })
        getMyRate(this.state.id, (data)=>{
            if (data > 0){
                this.setState({
                    isUped: true,
                    isDowned: false,
                })
            }
            if (data < 0){
                this.setState({
                    isUped: false,
                    isDowned: true,
                })
            }
        })
    }
    handleUp(){
        putMyRate(this.state.id, 1, (data)=>{
            this.setState({
                credibility: data.credibility,
                ratedCnt: data.rated_cnt,
                isUped: true, 
                isDowned: false,
            })
        }, (err)=>{})
    }
    handleDown(){
        putMyRate(this.state.id, -1, (data)=>{
            this.setState({
                credibility: data.credibility,
                ratedCnt: data.rated_cnt,
                isUped: false, 
                isDowned: true,
            })
        }, (err)=>{})
    }
    getCredibilityClass(){
        if (this.state.credibility > 0.5){
            return "trust-text"
        }
        if (this.state.credibility < -0.5){
            return "untrust-text"
        }
        return "doubt-text"
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
                            <td colSpan="2">{this.state.id}</td>
                        </tr>
                        <tr>
                            <td>节点内容</td>
                            <td colSpan="2">{this.state.content}</td>
                        </tr>
                        <tr>
                            <td>节点可信度</td>
                            <td>
                            <span className={this.getCredibilityClass()}>
                            {this.state.credibility}
                            </span>
                            (评价人数：{this.state.ratedCnt})
                            </td>
                            <td>
                            <Button size='sm' onClick={()=>this.handleUp()} disabled={this.state.isUped}><ArrowUpIcon></ArrowUpIcon>可信</Button>
                            <Button size='sm' onClick={()=>this.handleDown()} disabled={this.state.isDowned}><ArrowDownIcon></ArrowDownIcon>不可信</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                </Card.Body>
            </Card>
        </Container>
    }
}

export default ShowNodeView;