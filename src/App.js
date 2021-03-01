import './App.scss';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import React, {useState} from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import HeaderNav from './common/ui/header';
import { Container, Modal } from 'react-bootstrap';
import {testServer} from './api/testconn'
import storageKeys from './common/variable/storagekey'
import NodeSearch from './view/nodesearch'

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div id="modalContainer"></div>
        <p>这个是主页</p>
        <Link to={'/sec'}><Button>你好啊</Button></Link>
        <Button onClick={() => testServer((data) => {
          console.log(data);
          alert("OK");
        })}>测试服务器连接</Button>
      </div>
    );
  }
}

class Secondary extends React.Component {
  render() {
    return (
      <div>
        <p>这个是第二页</p>
        <Link to='/'>返回</Link>
      </div>
    )
  }
}

class ModalTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }
  open() {
    this.setState({showModal: true});
  }
  close() {
    this.setState({showModal: false});
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.open()}>Show Modal</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>测试</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Content</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props) {
    super(props);
    const logined = localStorage.getItem(storageKeys.LOGINED_USERNAME)
    this.state = {
        loginedUserName: logined
    };
  }
  render() {
    return (
      <BrowserRouter>
        <HeaderNav loginedUserName={this.state.loginedUserName} 
         onChangedUserName={(nowUserName) => this.setState({loginedUserName:nowUserName})}></HeaderNav>
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route exact path="/sec" component={Secondary}></Route>
          <Route exact path="/nodesearch" component={NodeSearch}></Route>
          <Route exact path="/modal" component={ModalTest}></Route>
          <Redirect to='/404' ></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
