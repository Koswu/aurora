import { map } from 'jquery';
import {Link } from 'react-router-dom'
import React from 'react';
import {Container, Accordion, Form, Button, Alert, Card} from 'react-bootstrap';
import {searchInfoNode, editInfoNode, deleteInfoNode} from  '../api/infonode.js'
class NodeSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword:'',
            errMsg:'',
            searchResult:null,
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.showErrMsg = this.showErrMsg.bind(this);
    }
    render() {
        return (
            <Container>
                {this.errMsg?<Alert variant="danger">{this.errMsg}</Alert>:null}
                <Form>
                    <Form.Control value={this.state.keyword} 
                    onChange={(e) => this.setState({keyword:e.target.value})}  
                    type="search" placeholder="搜索节点..."></Form.Control>
                    <Button variant="primary" onClick={this.handleSearch}>搜索</Button>
                </Form>
                <Accordion>
                    {map(this.state.searchResult, (element, index) => {
                        return (
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={index+1}>
                                        {element.content}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index+1}>
                                <Card.Body>
                                    ID: {element.id} <br/>
                                    <div className="text-right">
                                        <Link to={"/infonode/"+element.id}><Button veriant="info">详情</Button></Link>
                                        <Button variant="danger" onClick={()=>this.handleDelete(element.id)}>删除</Button>
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        );
                    })
                    }
                </Accordion>
            </Container>
        );
    }
    handleDelete(id){
        deleteInfoNode(id, ()=>{
            let nextres = this.state.searchResult.filter(element => element.id != id)
            this.setState({
                searchResult: nextres,
            })
        }, ()=>{

        })
    }
    handleSearch() {
        searchInfoNode(this.state.keyword, (res) =>{
            this.setState({
                searchResult:res
            });
            console.log(res)
        }, (errMsg) => {
            this.showErrMsg(errMsg);
        })
    }
    showErrMsg(msg) {
        this.setState({
            errMsg: msg,
        })
    }
}

export default NodeSearch;