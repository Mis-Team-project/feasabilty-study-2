
import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Users, Baby, School, Activity } from 'lucide-react';
import './MarketStudy.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const populationData = [
  { name: 'الأطفال (2–6 سنوات)', value: 50000 },
  { name: 'الفئات الأخرى', value: 200000 },
];

const childrenData = [
  { name: 'الأطفال (2–6)', 'عدد': 50000 },
  { name: 'باقي السكان', 'عدد': 200000 },
];

const facilitiesData = [
  { name: 'مرخصة حالياً', 'عدد': 120 },
  { name: 'الطلب المتوقع', 'عدد': 200 },
];

const gapData = [
  { name: 'العرض الحالي', 'عدد': 120 },
  { name: 'الطلب المتوقع', 'عدد': 200 },
  { name: 'النقص', 'عدد': 80 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={14}>
      {`${new Intl.NumberFormat('ar-SA').format(value)}`}
    </text>
  );
};

const cards = [
  {
    icon: <Users size={48} color="#0088FE" />,
    title: 'السكان',
    value: '+250,000 نسمة',
    subtitle: 'عدد السكان في الأحياء المستهدفة',
    chart: (
      <PieChart width={220} height={220}>
        <Pie data={populationData} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={90} fill="#8884d8" dataKey="value" nameKey="name">
          {populationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => new Intl.NumberFormat('ar-SA').format(value)} />
        <Legend iconSize={10} />
      </PieChart>
    ),
  },
  {
    icon: <Baby size={48} color="#00C49F" />,
    title: 'الأطفال',
    value: '50,000 طفل',
    subtitle: 'الأطفال من عمر سنتين حتى ست سنوات',
    chart: (
      <BarChart width={220} height={220} data={childrenData} margin={{ top: 25, right: 10, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(value) => new Intl.NumberFormat('ar-SA').format(value)} />
        <Tooltip formatter={(value) => new Intl.NumberFormat('ar-SA').format(value)} />
        <Bar dataKey="عدد" fill="#00C49F">
            <LabelList dataKey="عدد" position="top" formatter={(value) => new Intl.NumberFormat('ar-SA').format(value)} />
        </Bar>
      </BarChart>
    ),
  },
  {
    icon: <School size={48} color="#FFBB28" />,
    title: 'الروضات والحضانات',
    value: '120 منشأة',
    subtitle: 'عدد الروضات والحضانات المرخصة',
    chart: (
      <BarChart width={220} height={220} data={facilitiesData} margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
         <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="عدد" fill="#FFBB28">
            <LabelList dataKey="عدد" position="top" />
        </Bar>
      </BarChart>
    ),
  },
  {
    icon: <Activity size={48} color="#FF8042" />,
    title: 'الفجوة السوقية',
    value: 'قلة المنشآت التفاعلية',
    subtitle: 'الطلب أعلى من العرض الحالي',
    chart: (
       <BarChart width={220} height={220} data={gapData} margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
         <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="عدد" fill="#FF8042">
            <LabelList dataKey="عدد" position="top" />
        </Bar>
      </BarChart>
    ),
  },
];

const MarketStudyCard = ({ icon, title, value, subtitle, chart }) => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="market-study-card">
      <div className="card-icon">{icon}</div>
      <div className="card-value">{value}</div>
      <div className="card-title">{title}</div>
      <div className="card-subtitle">{subtitle}</div>
      <div className="card-button-container">
        <button
          className="card-button"
          onMouseEnter={() => setShowChart(true)}
          onMouseLeave={() => setShowChart(false)}
        >
          عرض التفاصيل
        </button>
        {showChart && (
          <div className="chart-popup">
            <ResponsiveContainer width="100%" height="100%">
              {chart}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

const MarketStudy = () => {
  return (
    <div className="market-study-container">
      {cards.map((card, index) => (
        <MarketStudyCard key={index} {...card} />
      ))}
    </div>
  );
};

export default MarketStudy;
