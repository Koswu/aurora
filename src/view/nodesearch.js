import { map } from 'jquery';
import React from 'react';
import {Container, Accordion, Form, Button, Alert, Card} from 'react-bootstrap';
import {searchNode} from  '../api/infonode'
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
                    {this.state.searchResult}
                </Accordion>
            </Container>
        );
    }
    handleSearch() {
        searchNode(this.state.keyword, (res) =>{
            let infocards = map(res, (element, index) => {
                return (
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                                {element.content}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                            ID: {element.id} <br/>

                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                );
            })
            this.setState({
                searchResult:infocards
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