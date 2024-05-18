import React, { useCallback, useRef, useState } from 'react';

import ReactFlow, { addEdge, useNodesState, useEdgesState, MarkerType, ReactFlowProvider, Controls } from 'reactflow';

import CustomNode from './component/CustomNode';
import FloatingEdge from './component/FloatingEdge'
import CustomConnectionLine from './component/CustomConnectionLine';

import 'reactflow/dist/style.css';
import './index.css';
import SideBar from './component/sidebar/SideBar';
import CustomNode2 from './component/CustomNode2';


const initialEdges = [];

const connectionLineStyle = {
  strokeWidth: 1,
  stroke: 'black',
};

const nodeTypes = {
  custom: CustomNode,
  custom2: CustomNode2,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};
let id = 0;
const getId = () => `dndnode_${id++}`;
const EasyConnectExample = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      console.log(type);
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );


  return (
    <div className="dndflow">
    <ReactFlowProvider>
    <SideBar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineComponent={CustomConnectionLine}
            connectionLineStyle={connectionLineStyle}
        >
          <Controls />
        </ReactFlow>
      </div>
    
    </ReactFlowProvider>
  </div>
 
  );
};

export default EasyConnectExample;
