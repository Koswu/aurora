import Graphin, { Utils } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import {fetchAllGraph} from '../api/graph.js'

class GraphView extends React.Component {
    constructor(props){
        super(props);
        this.ref = React.createRef()
        this.state = {
            data: Utils.mock(10).circle().graphin(),
            layout: {type: 'dagre'},
            title: "全局节点关系图"
        }
        this.handleClick = this.handleClick.bind(this)
        this.convertGraphResponse = this.convertGraphResponse.bind(this)
    }
    componentDidMount() {
        fetchAllGraph((response) =>{
            console.log(response);
            const data = this.convertGraphResponse(response)
            console.log(data)
            this.setState({
                data: data,
            })
        }, (errMsg)=> {

        })
    }
    render() {
        return (
            <Container fluid>
            <Graphin height={800} data={this.state.data} layout={this.state.layout} >
            </Graphin>
            </Container>
        );
    }
    handleClick() {
        debugger;
        fetchAllGraph((response) =>{
            console.log(response);
            const data = this.convertGraphResponse(response)
            console.log(data)
            this.setState({
                data: data,
            })
        }, (errMsg)=> {

        })
        /*
        this.setState({
            data: Utils.mock(10).circle().graphin()
        })
        */
    }
    convertGraphResponse(response) {
        const edges = response.relations.map((value, index)=> {
            return {
                target: "node-" + value.from_id,
                source: "node-" + value.to_id,
            }
        })
        const sources_node = response.sources.map((value, index) => {
            return {
                id: "node-" + value.id,
                style: {
                    keyshape: {
                        fill: 'red',
                        stroke: 'red',
                    },
                    label: {
                        value: value.description,
                    }
                }
            }
        })
        const infos_node = response.infos.map((value) => {
            return {
                id: "node-" + value.id,
                style: {
                    label: {
                        value: value.content,
                    }
                },
            }
        })
        return{
            edges: edges,
            nodes: sources_node.concat(infos_node),
        }
    }
}

export default GraphView;