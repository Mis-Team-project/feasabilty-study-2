import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Landmark, TrendingUp, Wallet, Zap, BarChart2 } from 'lucide-react';
import './FinancialStudy.css';

// --- Data --- 
const formatCurrency = (value) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', minimumFractionDigits: 0 }).format(value);

const capitalData = [
  { name: 'تجهيز وتأثيث', value: 450000, color: '#3b82f6' },
  { name: 'أنظمة تقنية وأمنية', value: 150000, color: '#8b5cf6' },
  { name: 'رسوم تأسيس', value: 50000, color: '#ec4899' },
  { name: 'رأس مال عامل', value: 750000, color: '#f97316' },
];

const totalCapital = capitalData.reduce((sum, item) => sum + item.value, 0);

const annualFlowData = [
    {
        name: 'السنة الأولى (تقديري)',
        إيرادات: 2930000,
        تكاليف: 2550000, 
        ربح: 380000,
    },
];

const netProfit = annualFlowData[0].ربح;

// --- Components --- 

const StatCard = ({ icon, title, value, color, description }) => (
    <div 
        className="stat-card" 
        style={{ borderBottom: `4px solid ${color}` }}
    >
        <div className="stat-card-header">
            {icon}
            <span className="stat-card-title">{title}</span>
        </div>
        <p className="stat-card-value">{value}</p>
        {description && <p className="stat-card-description">{description}</p>}
    </div>
);

const CapitalPieChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onPieEnter = (_, index) => setActiveIndex(index);
    const onPieLeave = () => setActiveIndex(null);

    return (
        <div className="financial-chart-wrapper pie-chart-section">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={ActiveShape}
                        data={capitalData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                    >
                        {capitalData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const ActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    return (
      <g>
        <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#1e293b" fontSize={18} fontWeight="bold">{payload.name}</text>
        <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#475569" fontSize={16}>{formatCurrency(payload.value)}</text>
        <sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ filter: `drop-shadow(0 4px 8px ${fill}B3)` }}
        />
      </g>
    );
  };

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name} : ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

const AnnualFlowBarChart = () => (
    <div className="financial-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={annualFlowData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(val) => `${val/1000000}م`} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 14 }}/>
                <Tooltip formatter={(value) => formatCurrency(value)} cursor={{ fill: '#f1f5f9' }}/>
                <Legend />
                <Bar dataKey="إيرادات" fill="#22c55e" name="الإيرادات" barSize={35}>
                    <LabelList dataKey="إيرادات" position="insideRight" formatter={(value) => formatCurrency(value)} style={{ fill: 'white' }}/>
                </Bar>
                <Bar dataKey="تكاليف" fill="#ef4444" name="التكاليف" barSize={35}>
                    <LabelList dataKey="تكاليف" position="insideRight" formatter={(value) => formatCurrency(value)} style={{ fill: 'white' }}/>
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const FinancialStudy = () => {
  return (
    <div 
        className="financial-study-section"
    >
        <div className="financial-header">
            <h2>الدراسة المالية التقديرية</h2>
            <p>تحليل لأهم المؤشرات المالية للمشروع، بما في ذلك رأس المال المطلوب، والإيرادات والتكاليف السنوية المتوقعة.</p>
        </div>

        <div className="stats-grid">
            <StatCard icon={<Wallet size={32} />} title="رأس المال الإجمالي" value={formatCurrency(totalCapital)} color="#3b82f6" description="التكلفة التقديرية لتأسيس وتشغيل المشروع."/>
            <StatCard icon={<TrendingUp size={32} />} title="صافي الربح المتوقع" value={formatCurrency(netProfit)} color="#22c55e" description="ربح السنة الأولى بعد طرح التكاليف."/>
            <StatCard icon={<Zap size={32} />} title="نقطة التعادل" value="10-12 شهر" color="#f97316" description="المدة المتوقعة للوصول إلى نقطة التعادل."/>
        </div>

        <div className="financial-block">
            <h3 className="block-title"><Landmark size={24} /> توزيع رأس المال المطلوب</h3>
            <CapitalPieChart />
        </div>

        <div className="financial-block">
            <h3 className="block-title"><BarChart2 size={24} /> الإيرادات والتكاليف السنوية</h3>
            <AnnualFlowBarChart />
        </div>

    </div>
  );
};

export default FinancialStudy;
