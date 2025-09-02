import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { LineChart, BarChart, AreaChart as AreaChartIcon, TrendingUp, TrendingDown, Target, Table } from 'lucide-react';
import './AnnualSummary.css';

const formatCurrency = (value) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', minimumFractionDigits: 0 }).format(value);

// --- Annual Data ---
const annualData = {
  years: ['1', '2', '3'],
  revenue: [2730000, 4540000, 4290000],
  expenses: [3050000, 3380000, 3000000],
  netProfit: [-320000, 1160000, 1290000],
};

// --- KPI Calculations ---
const kpis = {
  peakRevenue: Math.max(...annualData.revenue),
  peakNetProfit: Math.max(...annualData.netProfit),
  lowestLossYear: annualData.years[annualData.netProfit.indexOf(Math.min(...annualData.netProfit.filter(p => p < 0)))],
};

// --- Chart Options ---
const getChartOptions = (chartType) => ({
    chart: {
        fontFamily: 'var(--font-family)',
        background: 'transparent',
        toolbar: { show: false },
        stacked: chartType === 'area',
    },
    colors: ['#27ae60', '#c0392b', '#8e44ad'],
    dataLabels: { enabled: false },
    stroke: {
        curve: 'smooth',
        width: chartType === 'combo' ? [4, 4, 0] : 3,
    },
    legend: { position: 'top', fontFamily: 'var(--font-family)', labels: { colors: 'var(--text-color)' } },
    xaxis: { categories: annualData.years.map(y => `السنة ${y}`), labels: { style: { colors: 'var(--text-color)', fontFamily: 'var(--font-family)' } } },
    yaxis: { labels: { formatter: (val) => val.toLocaleString(), style: { colors: 'var(--text-color)', fontFamily: 'var(--font-family)' } } },
    tooltip: {
        theme: 'light',
        shared: true,
        intersect: false,
        style: { fontSize: '14px', fontFamily: 'var(--font-family)' },
        y: {
            formatter: (val) => formatCurrency(val),
        }
    },
    grid: { borderColor: 'var(--border-color)' },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: chartType === 'area' ? 0.7 : 1,
            opacityTo: chartType === 'area' ? 0.3 : 1,
        }
    }
});

const AnnualSummary = () => {
    const [chartType, setChartType] = useState('line'); // line, area, combo

    const series = [
        { name: 'إجمالي الإيرادات', type: chartType === 'combo' ? 'column' : 'line', data: annualData.revenue },
        { name: 'إجمالي المصروفات', type: chartType === 'combo' ? 'column' : 'line', data: annualData.expenses },
        { name: 'صافي الربح', type: 'line', data: annualData.netProfit },
    ];

    if (chartType === 'area') {
        series.pop(); // Remove net profit from stacked area view for clarity
    }

    const options = getChartOptions(chartType);
    if (chartType === 'combo') {
      options.stroke.width = [0, 0, 3];
      options.colors = ['#2ecc71', '#e74c3c', '#8e44ad'];
    }

    return (
        <section className="annual-summary-container">
            <h2 className="section-title"><Table />ملخص البيانات السنوية</h2>

            <div className="data-table-wrapper">
              <div className="table-container">
                <table className="results-table"> {/* Changed class name */}
                    <thead>
                        <tr>
                            <th>السنة</th>
                            <th>إجمالي الإيرادات</th>
                            <th>إجمالي المصروفات</th>
                            <th>صافي الربح</th>
                        </tr>
                    </thead>
                    <tbody>
                        {annualData.years.map((year, index) => (
                            <tr key={year}>
                                <td>{`السنة ${year}`}</td>
                                <td>{formatCurrency(annualData.revenue[index])}</td>
                                <td>{formatCurrency(annualData.expenses[index])}</td>
                                <td style={{ color: annualData.netProfit[index] < 0 ? '#c0392b' : '#27ae60' }}>
                                    {formatCurrency(annualData.netProfit[index])}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>

            <div className="kpi-cards-grid">
                <KpiCard icon={<TrendingUp />} title="أعلى إجمالي إيراد" value={formatCurrency(kpis.peakRevenue)} color="#27ae60" />
                <KpiCard icon={<Target />} title="أعلى صافي ربح" value={formatCurrency(kpis.peakNetProfit)} color="#8e44ad" />
                <KpiCard icon={<TrendingDown />} title="سنة أقل خسارة" value={`السنة ${kpis.lowestLossYear}`} color="#f39c12" />
            </div>

            <div className="chart-section-wrapper">
                 <h3 className="subsection-title">التحليل البياني</h3>
                <div className="chart-controls">
                    <button onClick={() => setChartType('line')} className={chartType === 'line' ? 'active' : ''}><LineChart size={18} /> خطي</button>
                    <button onClick={() => setChartType('area')} className={chartType === 'area' ? 'active' : ''}><AreaChartIcon size={18} /> مساحي متراكم</button>
                    <button onClick={() => setChartType('combo')} className={chartType === 'combo' ? 'active' : ''}><BarChart size={18} /> مختلط</button>
                </div>
                <motion.div key={chartType} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Chart 
                        options={options} 
                        series={series} 
                        type={chartType === 'area' ? 'area' : 'line'}
                        height={400} 
                    />
                </motion.div>
            </div>
        </section>
    );
};

const KpiCard = ({ icon, title, value, color }) => (
    <motion.div className="kpi-card" whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}>
        <div className="kpi-icon" style={{ backgroundColor: color }}>{icon}</div>
        <div className="kpi-content">
            <span className="kpi-title">{title}</span>
            <span className="kpi-value">{value}</span>
        </div>
    </motion.div>
);

export default AnnualSummary;
