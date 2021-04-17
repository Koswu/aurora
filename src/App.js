import './App.scss';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import React, {useState} from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import ReactCanvasNest from 'react-canvas-nest';
import HeaderNav from './common/ui/header';
import { Container, Modal } from 'react-bootstrap';
import {testServer} from './api/testconn.js'
import storageKeys from './common/variable/storagekey.js'
import NodeSearch from './view/nodesearch.js'
import InfoNodeEdit from './view/nodeedit.js'
import InfoNodeAdd from './view/nodeadd.js'
import SourceNodeAdd from './view/sourceadd.js'
import GraphView from './view/showgraph.js'
import ShowNodeView from './view/shownode.js'
import Footer from './common/ui/footer.js'
import SourceNodeSearch from './view/sourcesearch';
import ShowSourceNodeView from './view/showsource';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="center-area">
        <Link to={'/infonode/add'} ><Button>增加信息节点</Button></Link>
        <Link to={'/infonode/search'}><Button>信息节点检索</Button></Link>
        <Link to={'/sourcenode/add'}><Button>添加外部来源</Button></Link>
        <Link to={'/sourcenode/search'}><Button>外部来源节点检索</Button></Link>
        <Link to={'/graph'}><Button>查看节点关系</Button></Link>
        <Button onClick={() => testServer((data) => {
          console.log(data);
          alert("OK");
        })}>测试服务器连接</Button>
        <p>这个是主页</p>
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
          <Route exact path="/infonode/add" component={InfoNodeAdd}></Route>
          <Route exact path="/infonode/search" component={NodeSearch}></Route>
          <Route exact path="/sourcenode/add" component={SourceNodeAdd}></Route>
          <Route exact path="/sourcenode/search" component={SourceNodeSearch}></Route>
          <Route path="/infonode/:id" component={ShowNodeView}></Route>
          <Route path="/infonode/edit/:id" component={InfoNodeEdit}></Route>
          <Route path="/sourcenode/:id" component={ShowSourceNodeView}></Route>
          <Route exact path="/graph" component={GraphView}></Route>
          <Redirect to='/404' ></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
