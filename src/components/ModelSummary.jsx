
import React, { useState, useMemo } from 'react';
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import { SlidersHorizontal, UserPlus, TrendingUp, Wallet, Landmark, DollarSign } from 'lucide-react';
import './ModelSummary.css';

// --- Default Data ---
const INITIAL_CAPITAL = 1150000;
const AVG_REVENUE_PER_CHILD = 1700;
const FIXED_COSTS_MONTHLY = 215000;

// --- Helper Components ---
const AnimatedNumber = ({ value }) => {
  // This is a simplified version. For a true count-up, a library or a useEffect hook would be needed.
  // For now, we'll just format it.
  return <span className="kpi-value">{Math.round(value).toLocaleString('ar-EG')}</span>;
};

const KpiCard = ({ icon, label, value, color, note }) => {
  return (
    <div 
      className="kpi-card" 
      style={{ '--card-color': color }}
    >
      <div className="kpi-icon-wrapper">{icon}</div>
      <div className="kpi-content">
        <span className="kpi-label">{label}</span>
        <AnimatedNumber value={value} />
        {note && <span className="kpi-note">{note}</span>}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">الشهر: {label}</p>
        <p className="tooltip-item" style={{ color: '#8884d8' }}>عدد الأطفال: {data.childrenCount.toFixed(0)}</p>
        <p className="tooltip-item" style={{ color: '#82ca9d' }}>الإيراد: {data.revenue.toLocaleString('ar-EG')} ريال</p>
        <p className="tooltip-item" style={{ color: '#ffc658' }}>المصروفات: {data.totalCosts.toLocaleString('ar-EG')} ريال</p>
        <p className="tooltip-item" style={{ color: '#ff8042' }}>صافي الربح: {data.netProfit.toLocaleString('ar-EG')} ريال</p>
        <p className="tooltip-item" style={{ color: '#00C49F' }}>الربح التراكمي: {data.cumulativeProfit.toLocaleString('ar-EG')} ريال</p>
      </div>
    );
  }
  return null;
};


// --- Main Component ---
const ModelSummary = () => {
  const [initialChildren, setInitialChildren] = useState(100);
  const [growthRate, setGrowthRate] = useState(5); // in percent
  const [variableCost, setVariableCost] = useState(300);

  const projectionData = useMemo(() => {
    let cumulativeProfit = 0;
    const data = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const childrenCount = Math.round(initialChildren * Math.pow(1 + growthRate / 100, i));
      const revenue = childrenCount * AVG_REVENUE_PER_CHILD;
      const variableCosts = childrenCount * variableCost;
      const totalCosts = FIXED_COSTS_MONTHLY + variableCosts;
      const netProfit = revenue - totalCosts;
      cumulativeProfit += netProfit;
      
      return {
        month: `شهر ${month}`,
        childrenCount,
        revenue,
        variableCosts,
        totalCosts,
        netProfit,
        cumulativeProfit,
      };
    });
    return data;
  }, [initialChildren, growthRate, variableCost]);

  return (
    <div className="model-summary-container">
      
      {/* --- KPIs Section --- */}
      <div className="kpi-grid">
        <KpiCard icon={<Landmark size={32} />} label="رأس المال المبدئي" value={INITIAL_CAPITAL} color="#2196F3" note="ريال" />
        <KpiCard icon={<DollarSign size={32} />} label="الإيراد المتوسط للطفل" value={AVG_REVENUE_PER_CHILD} color="#4CAF50" note="ريال/شهرياً" />
        <KpiCard icon={<Wallet size={32} />} label="المصروف المتغير للطفل" value={variableCost} color="#FF9800" note="ريال/شهرياً" />
        <KpiCard icon={<TrendingUp size={32} />} label="المصروفات الثابتة" value={FIXED_COSTS_MONTHLY} color="#F44336" note="ريال/شهرياً" />
        <KpiCard icon={<UserPlus size={32} />} label="عدد الأطفال عند الافتتاح" value={initialChildren} color="#FFC107" note="طفل" />
      </div>

      {/* --- Interactive Calculator --- */}
      <div className="interactive-calculator">
        <div className="calculator-header">
          <SlidersHorizontal />
          <h3>الحاسبة التفاعلية</h3>
        </div>
        <div className="calculator-controls">
          <div className="control-item">
            <label>عدد الأطفال عند الافتتاح: <strong>{initialChildren}</strong></label>
            <input type="range" min="30" max="200" value={initialChildren} onChange={(e) => setInitialChildren(Number(e.target.value))} />
          </div>
          <div className="control-item">
            <label>معدل النمو الشهري: <strong>{growthRate}%</strong></label>
            <input type="range" min="0" max="15" value={growthRate} onChange={(e) => setGrowthRate(Number(e.target.value))} />
          </div>
          <div className="control-item">
            <label>المصروف المتغير للطفل: <strong>{variableCost} ريال</strong></label>
            <input type="range" min="100" max="800" value={variableCost} onChange={(e) => setVariableCost(Number(e.target.value))} />
          </div>
        </div>
      </div>

      {/* --- Charts Section --- */}
      <div className="charts-section">
        {/* Growth Timeline */}
        <div className="chart-wrapper">
          <h4>نمو عدد الأطفال (12 شهر)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="childrenCount" name="عدد الأطفال" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Combo Chart */}
        <div className="chart-wrapper">
          <h4>الإيرادات والمصروفات والأرباح الشهرية</h4>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="totalCosts" name="المصروفات" fill="#ffc658" />
              <Line type="monotone" dataKey="revenue" name="الإيراد" stroke="#82ca9d" strokeWidth={3} />
              <Area type="monotone" dataKey="netProfit" name="صافي الربح" fill="#ff8042" stroke="#ff8042" fillOpacity={0.6} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default ModelSummary;

