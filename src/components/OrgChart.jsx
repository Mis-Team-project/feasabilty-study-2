import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
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
  // Level 1: Top Management
  { id: '1', type: 'custom', data: { label: 'الإدارة العليا (مدير عام)', icon: 'Briefcase', department: 'management' }, position: { x: 350, y: 25 } },

  // Level 2: Main Departments
  { id: '2', type: 'custom', data: { label: 'الإدارة المساندة', department: 'support' }, position: { x: 0, y: 150 } },
  { id: '3', type: 'custom', data: { label: 'الإدارة المالية', department: 'finance' }, position: { x: 350, y: 150 } },
  { id: '4', type: 'custom', data: { label: 'إدارة الحضانة والروضة', department: 'childcare' }, position: { x: 700, y: 150 } },

  // Level 3: Sub-departments & Roles
  // Support
  { id: '2-1', type: 'custom', data: { label: 'دعم فني', icon: 'Wrench', department: 'support' }, position: { x: -100, y: 275 } },
  { id: '2-2', type: 'custom', data: { label: 'نظافة', icon: 'Sparkles', department: 'support' }, position: { x: 50, y: 275 } },
  { id: '2-3', type: 'custom', data: { label: 'سائقين للخدمات اللوجستية', icon: 'Truck', department: 'support' }, position: { x: -50, y: 375 } },
  
  // Finance
  { id: '3-1', type: 'custom', data: { label: 'محاسب', icon: 'Calculator', department: 'finance' }, position: { x: 250, y: 275 } },
  { id: '3-2', type: 'custom', data: { label: 'أمين صندوق', icon: 'Wallet', department: 'finance' }, position: { x: 450, y: 275 } },

  // Childcare
  { id: '4-1', type: 'custom', data: { label: 'منسقة', icon: 'Clipboard', department: 'childcare' }, position: { x: 600, y: 275 } },
  { id: '4-2', type: 'custom', data: { label: 'معلمات', icon: 'Book', department: 'childcare' }, position: { x: 800, y: 275 } },
  { id: '4-3', type: 'custom', data: { label: 'مربيات', icon: 'Heart', department: 'childcare' }, position: { x: 650, y: 375 } },
  { id: '4-4', type: 'custom', data: { label: 'موظفة صحة وسلامة', icon: 'Shield', department: 'childcare' }, position: { x: 850, y: 375 } },
];

const initialEdges = [
  // Connections from Top Management to Departments
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  { id: 'e1-4', source: '1', target: '4', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },

  // Connections to Support Roles
  { id: 'e2-21', source: '2', target: '2-1', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-22', source: '2', target: '2-2', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-23', source: '2', target: '2-3', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  
  // Connections to Finance Roles
  { id: 'e3-31', source: '3', target: '3-1', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  { id: 'e3-32', source: '3', target: '3-2', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },

  // Connections to Childcare Roles
  { id: 'e4-41', source: '4', target: '4-1', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  { id: 'e4-42', source: '4', target: '4-2', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  { id: 'e4-43', source: '4', target: '4-3', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
  { id: 'e4-44', source: '4', target: '4-4', type: 'smoothstep', markerEnd: { type: 'arrowclosed' } },
];

const OrgChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ height: 500, direction: 'ltr' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
      >
      </ReactFlow>
    </div>
  );
};

export default OrgChart;
