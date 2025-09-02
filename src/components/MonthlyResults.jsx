import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, BarChart, AreaChart, LineChart as LineChartIcon, Combine } from 'lucide-react';
import './MonthlyResults.css';

const data = [
  { month: 1, studentCount: 100, revenue: 170000, expenses: 245000, netProfit: -75000, cumulativeProfit: -1225000 },
  { month: 2, studentCount: 105, revenue: 178500, expenses: 247000, netProfit: -68500, cumulativeProfit: -1293500 },
  { month: 3, studentCount: 110, revenue: 187000, expenses: 249000, netProfit: -62000, cumulativeProfit: -1355500 },
  { month: 4, studentCount: 115, revenue: 195500, expenses: 250500, netProfit: -55000, cumulativeProfit: -1410500 },
  { month: 5, studentCount: 120, revenue: 204000, expenses: 251500, netProfit: -47500, cumulativeProfit: -1458000 },
  { month: 6, studentCount: 127, revenue: 215900, expenses: 253100, netProfit: -37200, cumulativeProfit: -1050000 },
  { month: 7, studentCount: 135, revenue: 229500, expenses: 254000, netProfit: -24500, cumulativeProfit: -1025500 },
  { month: 8, studentCount: 145, revenue: 246500, expenses: 256000, netProfit: -9500, cumulativeProfit: -1016000 },
  { month: 9, studentCount: 155, revenue: 263500, expenses: 257500, netProfit: 6000, cumulativeProfit: -1010000 },
  { month: 10, studentCount: 165, revenue: 280500, expenses: 260000, netProfit: 20500, cumulativeProfit: -989500 },
  { month: 11, studentCount: 172, revenue: 292400, expenses: 265000, netProfit: 27400, cumulativeProfit: -962100 },
  { month: 12, studentCount: 179, revenue: 304300, expenses: 268700, netProfit: 35600, cumulativeProfit: -650000 },
];

const kpis = {
  peakRevenue: Math.max(...data.map(d => d.revenue)),
  peakProfit: Math.max(...data.map(d => d.netProfit)),
  finalStudentCount: data[data.length - 1].studentCount,
};

const formatCurrency = (value) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', minimumFractionDigits: 0 }).format(value);

// Updated chart options for Light Theme
const getBaseChartOptions = () => ({
    chart: { fontFamily: 'var(--font-family)', background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
    colors: ['#27ae60', '#c0392b', '#f39c12', '#8e44ad'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    legend: { position: 'top', fontFamily: 'var(--font-family)', labels: { colors: 'var(--text-color)' }, horizontalAlign: 'center' },
    xaxis: { categories: data.map(d => `شهر ${d.month}`), labels: { style: { colors: 'var(--text-color)', fontFamily: 'var(--font-family)' } } },
    yaxis: { labels: { formatter: (val) => val.toLocaleString(), style: { colors: 'var(--text-color)', fontFamily: 'var(--font-family)' } } },
    tooltip: {
        theme: 'dark',
        style: { fontSize: '14px', fontFamily: 'var(--font-family)' },
        shared: true, intersect: false,
        custom: ({ dataPointIndex }) => {
            const monthData = data[dataPointIndex];
            return `
                <div class="chart-tooltip">
                    <strong>شهر ${monthData.month}</strong>
                    <ul>
                        <li><span class="tooltip-label">عدد الأطفال:</span> <span class="tooltip-value">${monthData.studentCount}</span></li>
                        <li><span class="tooltip-label" style="color: #4CAF50;">الإيرادات:</span> <span class="tooltip-value">${formatCurrency(monthData.revenue)}</span></li>
                        <li><span class="tooltip-label" style="color: #F44336;">المصروفات:</span> <span class="tooltip-value">${formatCurrency(monthData.expenses)}</span></li>
                        <li><span class="tooltip-label" style="color: #FFC107;">الربح الصافي:</span> <span class="tooltip-value">${formatCurrency(monthData.netProfit)}</span></li>
                        <li><span class="tooltip-label" style="color: #9b59b6;">الربح التراكمي:</span> <span class="tooltip-value">${formatCurrency(monthData.cumulativeProfit)}</span></li>
                    </ul>
                </div>
            `;
        }
    },
    grid: { borderColor: 'var(--table-border-color)' }
});

const MonthlyResults = () => {
  const [chartType, setChartType] = useState('line');

  const seriesConfig = {
      line: [
        { name: 'الإيرادات', type: 'line', data: data.map(d => d.revenue) },
        { name: 'المصروفات', type: 'line', data: data.map(d => d.expenses) },
        { name: 'الربح الصافي', type: 'line', data: data.map(d => d.netProfit) },
        { name: 'الربح التراكمي', type: 'line', data: data.map(d => d.cumulativeProfit) },
      ],
      area: [
        { name: 'الإيرادات', type: 'area', data: data.map(d => d.revenue) },
        { name: 'المصروفات', type: 'area', data: data.map(d => d.expenses) },
      ],
      bar: [{ name: 'الربح الصافي', type: 'bar', data: data.map(d => d.netProfit) }],
      combo: [
        { name: 'الربح الصافي', type: 'column', data: data.map(d => d.netProfit) },
        { name: 'الربح التراكمي', type: 'line', data: data.map(d => d.cumulativeProfit) },
      ]
  };

  const chartOptions = getBaseChartOptions();
  chartOptions.chart.type = chartType === 'area' ? 'area' : (chartType === 'bar' ? 'bar' : 'line');
  chartOptions.chart.stacked = chartType === 'area';

  if (chartType === 'combo') {
    chartOptions.colors = ['#f39c12', '#8e44ad'];
    chartOptions.stroke = { width: [0, 3], curve: 'smooth' };
  } else if (chartType === 'area') {
      chartOptions.colors = ['#27ae60', '#c0392b'];
      chartOptions.fill = { type: 'gradient', gradient: { opacityFrom: 0.6, opacityTo: 0.1 } };
  } else if (chartType === 'bar') {
      chartOptions.colors = ['#f39c12'];
  }

  return (
    <div className="monthly-results-container">
        <div className="data-table-wrapper">
            <div className="table-container">
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>الشهر</th><th>الأطفال</th><th>الإيرادات</th><th>المصروفات</th><th>الربح الصافي</th><th>الربح التراكمي</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.month}>
                                <td>{row.month}</td>
                                <td>{row.studentCount}</td>
                                <td>{formatCurrency(row.revenue)}</td>
                                <td>{formatCurrency(row.expenses)}</td>
                                <td style={{ color: row.netProfit < 0 ? '#c0392b' : '#27ae60' }}>{formatCurrency(row.netProfit)}</td>
                                <td style={{ color: row.cumulativeProfit < 0 ? '#c0392b' : '#27ae60' }}>{formatCurrency(row.cumulativeProfit)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <motion.div className="kpi-cards-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.2 }}>
            <KpiCard icon={<TrendingUp/>} title="أعلى إيراد شهري" value={formatCurrency(kpis.peakRevenue)} color="#27ae60" />
            <KpiCard icon={<Target/>} title="أعلى ربح صافي" value={formatCurrency(kpis.peakProfit)} color="#f39c12" />
            <KpiCard icon={<Users/>} title="عدد الأطفال النهائي" value={`${kpis.finalStudentCount} طفل`} color="#8e44ad" />
        </motion.div>

        <div className="chart-section-wrapper">
            <div className="chart-controls">
                <button onClick={() => setChartType('line')} className={chartType === 'line' ? 'active' : ''}><LineChartIcon size={18}/> خطي</button>
                <button onClick={() => setChartType('area')} className={chartType === 'area' ? 'active' : ''}><AreaChart size={18}/> مساحي</button>
                <button onClick={() => setChartType('bar')} className={chartType === 'bar' ? 'active' : ''}><BarChart size={18}/> أعمدة</button>
                <button onClick={() => setChartType('combo')} className={chartType === 'combo' ? 'active' : ''}><Combine size={18}/> مختلط</button>
            </div>
            <motion.div className="chart-wrapper" key={chartType} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <Chart options={chartOptions} series={seriesConfig[chartType]} type={chartOptions.chart.type} height={350} />
            </motion.div>
        </div>
    </div>
  );
};

const KpiCard = ({ icon, title, value, color }) => (
    <motion.div className="kpi-card" whileHover={{ y: -5, boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05))' }}>
        <div className="kpi-icon" style={{ backgroundColor: color }}>{icon}</div>
        <div className="kpi-content">
            <span className="kpi-title">{title}</span>
            <span className="kpi-value">{value}</span>
        </div>
    </motion.div>
);

export default MonthlyResults;
