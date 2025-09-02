import React, { useCallback, useLayoutEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
} from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';
import './OrgChart.css';

import {
  Briefcase, Wrench, Sparkles, Truck, Calculator, Wallet,
  Clipboard, Book, Heart, Shield
} from 'lucide-react';

const iconMapping = {
  Briefcase, Wrench, Sparkles, Truck, Calculator, Wallet,
  Clipboard, Book, Heart, Shield
};

const CustomNode = ({ data }) => {
  const Icon = iconMapping[data.icon];
  return (
    <div className={`custom-node-card department-${data.department}`}>
      <div className="node-content">
        {Icon && <Icon className="node-icon" size={20} />}
        <span>{data.label}</span>
      </div>
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const initialNodes = [
  { id: '1', type: 'custom', data: { label: 'الإدارة العليا (مدير عام)', icon: 'Briefcase', department: 'management' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'custom', data: { label: 'الإدارة المساندة', department: 'support' }, position: { x: 0, y: 0 } },
  { id: '3', type: 'custom', data: { label: 'الإدارة المالية', department: 'finance' }, position: { x: 0, y: 0 } },
  { id: '4', type: 'custom', data: { label: 'إدارة الحضانة والروضة', department: 'childcare' }, position: { x: 0, y: 0 } },
  { id: '2-1', type: 'custom', data: { label: 'دعم فني', icon: 'Wrench', department: 'support' }, position: { x: 0, y: 0 } },
  { id: '2-2', type: 'custom', data: { label: 'نظافة', icon: 'Sparkles', department: 'support' }, position: { x: 0, y: 0 } },
  { id: '2-3', type: 'custom', data: { label: 'سائقين للخدمات اللوجستية', icon: 'Truck', department: 'support' }, position: { x: 0, y: 0 } },
  { id: '3-1', type: 'custom', data: { label: 'محاسب', icon: 'Calculator', department: 'finance' }, position: { x: 0, y: 0 } },
  { id: '3-2', type: 'custom', data: { label: 'أمين صندوق', icon: 'Wallet', department: 'finance' }, position: { x: 0, y: 0 } },
  { id: '4-1', type: 'custom', data: { label: 'منسقة', icon: 'Clipboard', department: 'childcare' }, position: { x: 0, y: 0 } },
  { id: '4-2', type: 'custom', data: { label: 'معلمات', icon: 'Book', department: 'childcare' }, position: { x: 0, y: 0 } },
  { id: '4-3', type: 'custom', data: { label: 'مربيات', icon: 'Heart', department: 'childcare' }, position: { x: 0, y: 0 } },
  { id: '4-4', type: 'custom', data: { label: 'موظفة صحة وسلامة', icon: 'Shield', department: 'childcare' }, position: { x: 0, y: 0 } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-4', source: '1', target: '4', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-21', source: '2', target: '2-1', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-22', source: '2', target: '2-2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-23', source: '2', target: '2-3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3-31', source: '3', target: '3-1', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3-32', source: '3', target: '3-2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4-41', source: '4', target: '4-1', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4-42', source: '4', target: '4-2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4-43', source: '4', target: '4-3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4-44', source: '4', target: '4-4', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 60;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  dagreGraph.setGraph({ rankdir: direction, ranksep: 70, nodesep: 25 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = direction === 'TB' ? 'top' : 'left';
    node.sourcePosition = direction === 'TB' ? 'bottom' : 'right';
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  return { nodes, edges };
};

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useLayoutEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    
    window.requestAnimationFrame(() => {
        fitView();
    });
  }, [fitView, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
      fitView
    />
  );
};

const OrgChart = () => {
  return (
    <div className="org-chart-container" style={{ direction: 'ltr' }}>
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </div>
  );
};

export default OrgChart;
