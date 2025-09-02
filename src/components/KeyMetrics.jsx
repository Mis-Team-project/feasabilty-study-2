import React from 'react';
import { TrendingUp, DollarSign, Target } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './KeyMetrics.css';

// --- Data Generation ---
const generateProjectionData = () => {
    let cumulativeProfit = 0;
    const data = Array.from({ length: 36 }, (_, i) => {
        const month = i + 1;
        const childrenCount = Math.round(100 * Math.pow(1 + 0.05, i));
        const revenue = childrenCount * 1700;
        const variableCosts = childrenCount * 300;
        const fixedCosts = 215000;
        const totalCosts = fixedCosts + variableCosts;
        const netProfit = revenue - totalCosts;
        cumulativeProfit += netProfit;
        return { month, childrenCount, revenue, totalCosts, netProfit, cumulativeProfit };
    });
    return data;
};

const fullProjectionData = generateProjectionData();

const annualSummaryData = Array.from({ length: 3 }, (_, i) => {
    const yearData = fullProjectionData.slice(i * 12, (i + 1) * 12);
    return {
        name: `سنة ${i + 1}`,
        revenue: yearData.reduce((acc, d) => acc + d.revenue, 0),
        totalCosts: yearData.reduce((acc, d) => acc + d.totalCosts, 0),
        netProfit: yearData.reduce((acc, d) => acc + d.netProfit, 0),
    };
});

// --- Helper Components ---
const formatCurrency = (value) => value.toLocaleString('ar-EG', { style: 'currency', currency: 'SAR', minimumFractionDigits: 0 });

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-sparkline-tooltip">
        <p className="tooltip-label"><strong>{`شهر ${data.month}`}</strong></p>
        <p>عدد الأطفال: {data.childrenCount}</p>
        <p>الإيراد: {formatCurrency(data.revenue)}</p>
        <p>الربح الصافي: {formatCurrency(data.netProfit)}</p>
        <p>الربح التراكمي: {formatCurrency(data.cumulativeProfit)}</p>
      </div>
    );
  }
  return null;
};

const Sparkline = ({ data, dataKey, strokeColor }) => (
    <div className="sparkline-container">
        <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#aaa', strokeWidth: 1, strokeDasharray: '3 3'}}/>
                <Area type="monotone" dataKey={dataKey} stroke={strokeColor} fill={strokeColor} fillOpacity={0.2} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const MetricCard = ({ icon, title, value, color, tooltipText, children }) => (
    <div 
        className="metric-card"
        style={{ '--metric-color': color }}
        title={tooltipText}
    >
        <div className="metric-header">
            <div className="metric-icon">{icon}</div>
            <h3 className="metric-title">{title}</h3>
        </div>
        <div className="metric-body">
            <span className="metric-value">{value}</span>
        </div>
        {children && <div className="metric-footer">{children}</div>}
    </div>
);

const GaugeChart = () => {
    const data = [{ name: 'نقطة التعادل (150 طفل)', value: 150 }, { name: 'السعة المتبقية', value: 100 }];
    return (
        <div className="summary-chart-wrapper">
             <h3 className="summary-chart-title">الوصول لنقطة التعادل</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="80%" startAngle={180} endAngle={0} innerRadius={80} outerRadius={110} fill="#8884d8" paddingAngle={2} dataKey="value">
                        <Cell fill="#4CAF50" />
                        <Cell fill="#e0e0e0" />
                    </Pie>
                     <Tooltip formatter={(value, name) => [``, name]} />
                     <Legend iconType="circle" align="center" verticalAlign="bottom" wrapperStyle={{fontSize: '14px'}}/>
                </PieChart>
            </ResponsiveContainer>
            <div className="gauge-center-text">
                <span className="gauge-value">الشهر 14</span>
                <span className="gauge-label">هو شهر التعادل المتوقع</span>
            </div>
        </div>
    )
};

const AnnualSummaryChart = () => (
    <div className="summary-chart-wrapper">
        <h3 className="summary-chart-title">الملخص المالي السنوي (3 سنوات)</h3>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={annualSummaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
                <YAxis tickFormatter={(value) => `${value / 1000000}م`} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ direction: 'rtl', fontFamily: 'Cairo' }} formatter={(value) => [formatCurrency(value), null]} labelStyle={{ fontWeight: 'bold' }} />
                <Legend wrapperStyle={{ direction: 'rtl', fontFamily: 'Cairo' }}/>
                <Bar dataKey="revenue" name="الإيرادات" fill="#2196F3" />
                <Bar dataKey="totalCosts" name="التكاليف" fill="#F44336" />
                <Bar dataKey="netProfit" name="صافي الربح" fill="#FFC107" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

// --- Main Component ---
const KeyMetrics = () => {
    return (
        <div className="key-metrics-container">
            <div className="metrics-grid">
                <MetricCard icon={<Target size={30} />} title="نقطة التعادل" value="الشهر 14 تقريبًا" color="#4CAF50" tooltipText="الوصول لنقطة التعادل عند 150 طفل في الشهر 14" />
                <MetricCard icon={<DollarSign size={30} />} title="إجمالي الإيرادات (3 سنوات)" value="> 11.5 مليون ريال" color="#2196F3" tooltipText="إجمالي الإيرادات المتوقعة على مدار السنوات الثلاث الأولى">
                    <Sparkline data={fullProjectionData} dataKey="revenue" strokeColor="#2196F3" />
                </MetricCard>
                <MetricCard icon={<TrendingUp size={30} />} title="إجمالي الأرباح الصافية (3 سنوات)" value="~ 3.2 مليون ريال" color="#FFC107" tooltipText="إجمالي الأرباح التراكمية بنهاية السنة الثالثة">
                    <Sparkline data={fullProjectionData} dataKey="cumulativeProfit" strokeColor="#FFC107" />
                </MetricCard>
            </div>
            <div className="charts-grid">
                <GaugeChart />
                <AnnualSummaryChart />
            </div>
        </div>
    );
};

export default KeyMetrics;
