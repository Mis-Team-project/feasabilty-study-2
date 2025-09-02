import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chart from 'react-apexcharts';
import { BarChart, PieChart, TrendingUp, X } from 'lucide-react';
import './FinancialStudy.css'; // Styles will be updated for light theme

const formatCurrency = (value) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', minimumFractionDigits: 0 }).format(value);

// --- Data ---
const establishmentCostData = {
  series: [400000, 200000, 50000, 100000, 200000, 200000],
  labels: ['تجهيزات المبنى والأثاث', 'تجهيزات تقنية ومنصة', 'رخص ورسوم', 'احتياطي تشغيل', 'أثاث ولوازم تعليمية', 'تسويق وإطلاق'],
  total: 1150000
};

const monthlyCostData = {
  series: [150000, 30000, 20000, 10000],
  labels: ['رواتب', 'إيجار', 'مصاريف تشغيلية', 'تسويق وإعلانات'],
  total: 210000
};

const revenueData = {
    series: Array.from({ length: 10 }, (_, i) => (i + 1) * 25 * 1700),
    categories: Array.from({ length: 10 }, (_, i) => (i + 1) * 25),
    breakEvenPoint: 150,
    avgRevenuePerChild: 1700,
};

// --- Chart Options (Updated for Light Theme) --- //
const getChartOptions = (labels) => ({
    chart: { type: 'donut', fontFamily: 'var(--font-family)', background: 'transparent' },
    labels: labels,
    legend: { show: true, position: 'bottom', fontFamily: 'var(--font-family)', labels: { colors: 'var(--text-color)'} },
    responsive: [{ breakpoint: 480, options: { chart: { width: '100%' } } }],
    colors: ['#5DADE2', '#58D68D', '#F5B041', '#EC7063', '#AF7AC5', '#48C9B0'],
    tooltip: { theme: 'light', style: { fontSize: '14px', fontFamily: 'var(--font-family)' } },
    dataLabels: { enabled: true, formatter: (val) => `${Math.round(val)}%` }
});

const breakEvenChartOptions = {
    chart: { type: 'line', fontFamily: 'var(--font-family)', background: 'transparent', zoom: { enabled: false }, toolbar: { show: false } },
    xaxis: { 
        title: { text: 'عدد الأطفال', style: { fontFamily: 'var(--font-family)', color: 'var(--text-color)' } }, 
        categories: revenueData.categories, 
        labels: { style: { colors: 'var(--text-color)' } }
    },
    yaxis: { 
        title: { text: 'الإيرادات / التكاليف (ريال)', style: { fontFamily: 'var(--font-family)', color: 'var(--text-color)' } },
        labels: { formatter: (val) => val.toLocaleString(), style: { colors: 'var(--text-color)' } }
    },
    stroke: { curve: 'smooth', width: [3, 3] },
    colors: ['#27ae60', '#c0392b'],
    legend: { position: 'top', fontFamily: 'var(--font-family)', labels: { colors: 'var(--text-color)' } },
    tooltip: { theme: 'light', style: { fontSize: '14px', fontFamily: 'var(--font-family)' } },
    markers: { size: 5 },
    grid: { borderColor: 'var(--border-color)' },
    annotations: {
        points: [{
            x: revenueData.breakEvenPoint,
            y: revenueData.breakEvenPoint * revenueData.avgRevenuePerChild,
            marker: { size: 8, fillColor: '#fff', strokeColor: '#f39c12', radius: 2 },
            label: { borderColor: '#f39c12', style: { color: '#fff', background: '#f39c12' }, text: 'نقطة التعادل' }
        }]
    }
};

const FinancialStudy = () => {
  const [activeChart, setActiveChart] = useState(null);

  const cards = [
    { id: 'establishment', title: 'تكاليف التأسيس', icon: <BarChart/>, data: establishmentCostData, type: 'donut' },
    { id: 'monthly', title: 'التشغيل الشهري', icon: <PieChart/>, data: monthlyCostData, type: 'donut' },
    { id: 'revenue', title: 'الإيرادات ونقطة التعادل', icon: <TrendingUp/>, data: revenueData, type: 'line' },
  ];

  const handleCardClick = (chartId) => {
    setActiveChart(chartId === activeChart ? null : chartId);
  };
  
  const renderChart = () => {
    const chartInfo = cards.find(c => c.id === activeChart);
    if (!chartInfo) return null;

    let chartComponent;
    if (chartInfo.type === 'donut') {
      chartComponent = <Chart options={getChartOptions(chartInfo.data.labels)} series={chartInfo.data.series} type="donut" width="100%" />;
    } else {
      const costSeries = Array.from({ length: 10 }, (_, i) => ((i + 1) * 25) * (monthlyCostData.total / 150));
      chartComponent = <Chart options={breakEvenChartOptions} series={[{ name: 'الإيرادات', data: chartInfo.data.series }, { name: 'التكاليف', data: costSeries }]} type="line" height={350} />;
    }

    return (
        <motion.div className="chart-modal-backdrop" onClick={() => setActiveChart(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="chart-modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                <div className="chart-modal-header">
                    <h3>{chartInfo.title}</h3>
                    <button onClick={() => setActiveChart(null)} className="close-chart-btn"><X/></button>
                </div>
                <div className="chart-container">{chartComponent}</div>
            </motion.div>
        </motion.div>
    );
  }

  return (
    <div className="financial-study-container">
        <div className="financial-cards-grid">
            {cards.map(card => (
                <div key={card.id} className={`financial-details-card card-${card.id}`}>
                    <div className="card-header">
                        <div className="card-icon">{card.icon}</div>
                        <h4>{card.title}</h4>
                    </div>
                    <ul className="details-list">
                        {card.id !== 'revenue' ? (
                            card.data.labels.map((label, index) => (
                                <li key={index}><span>{label}</span><span className="amount">{formatCurrency(card.data.series[index])}</span></li>
                            ))
                        ) : (
                            <>
                                <li><span>متوسط إيراد الطفل</span><span className="amount">{formatCurrency(card.data.avgRevenuePerChild)}</span></li>
                                <li><span>نقطة التعادل</span><span className="amount">{card.data.breakEvenPoint} طفل</span></li>
                                <li><span>عند نقطة التعادل</span><span className="amount">{formatCurrency(revenueData.breakEvenPoint * revenueData.avgRevenuePerChild)}</span></li>
                            </>
                        )}
                    </ul>
                    <div className="card-footer">
                        {card.data.total && <div className="total-section"><span>الإجمالي</span><span className="total-amount">{formatCurrency(card.data.total)}</span></div>}
                        <motion.button className="view-chart-btn" onClick={() => handleCardClick(card.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            عرض الرسم البياني
                        </motion.button>
                    </div>
                </div>
            ))}
        </div>

        <AnimatePresence>
            {activeChart && renderChart()}
        </AnimatePresence>
    </div>
  );
};

export default FinancialStudy;
