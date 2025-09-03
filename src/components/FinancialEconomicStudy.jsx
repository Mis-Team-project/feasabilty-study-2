import React, { useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronsRight, TrendingUp, X } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import './FinancialEconomicStudy.css';

const establishmentCosts = {
  title: "تكاليف التأسيس",
  icon: Briefcase,
  total: 1150000,
  items: [
    { name: 'تجهيزات المبنى والأثاث', amount: 400000 },
    { name: 'تجهيزات تقنية ومنصة إلكترونية', amount: 200000 },
    { name: 'رخص ورسوم', amount: 50000 },
    { name: 'احتياطي تشغيل', amount: 100000 },
    { name: 'أثاث ولوازم تعليمية', amount: 200000 },
    { name: 'تسويق وإطلاق', amount: 200000 },
  ],
};

const monthlyCosts = {
  title: "التشغيل الشهري",
  icon: ChevronsRight,
  total: 210000,
  items: [
    { name: 'رواتب', amount: 150000 },
    { name: 'إيجار', amount: 30000 },
    { name: 'مصاريف تشغيلية', amount: 20000 },
    { name: 'تسويق وإعلانات', amount: 10000 },
  ],
};

const expectedRevenue = {
  title: "الإيرادات المتوقعة",
  icon: TrendingUp,
  items: [
    { name: 'متوسط إيراد الطفل الشهري', amount: 1700, isStatic: true },
    { name: 'نقطة التعادل (عدد الأطفال)', amount: 150, isStatic: true, isCurrency: false },
  ],
};

const SummaryTableCard = ({ data, onDetailsClick }) => (
  <motion.div 
    className="summary-table-card"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="card-header">
      <span className="table-icon"><data.icon size={24} /></span>
      <h3>{data.title}</h3>
    </div>
    <ul className="cost-item-list">
      {data.items.map((item, index) => (
        <li key={index} className="cost-item">
          <span className="item-name">{item.name}</span>
          {item.isStatic ? 
            <span className="item-amount">{new Intl.NumberFormat('en-US').format(item.amount)}{!item.isCurrency ? ' طفل' : ' SAR'}</span> : 
            <AnimatedNumber value={item.amount} className="item-amount" />
          }
        </li>
      ))}
    </ul>
    {data.total && (
      <div className="card-footer">
        <div className="total-section">
          <span className="total-label">الإجمالي</span>
          <AnimatedNumber value={data.total} className="total-amount" />
        </div>
        <button className="summary-btn" onClick={() => onDetailsClick(data)}>
          عرض التفاصيل
        </button>
      </div>
    )}
  </motion.div>
);

const SummaryModal = ({ data, onClose }) => {
  const chartOptions = {
    chart: { type: 'donut', fontFamily: 'IBM Plex Sans Arabic, sans-serif' },
    labels: data.items.map(item => item.name),
    colors: ['#4A90E2', '#50E3C2', '#FF7B54', '#9B59B6', '#F5A623', '#7ED321'],
    legend: { position: 'bottom', fontFamily: 'IBM Plex Sans Arabic, sans-serif' },
    tooltip: {
      y: { formatter: (val) => `${new Intl.NumberFormat('en-US').format(val)} SAR` },
      theme: 'light'
    },
    plotOptions: { pie: { donut: { labels: { show: true, total: { show: true, label: 'الإجمالي', formatter: (w) => `${new Intl.NumberFormat('en-US').format(w.globals.seriesTotals.reduce((a, b) => a + b, 0))} SAR` } } } } },
  };
  const chartSeries = data.items.map(item => item.amount);

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-content" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
        <div className="modal-header">
          <h2>تفاصيل {data.title}</h2>
          <button onClick={onClose} className="close-btn"><X size={24}/></button>
        </div>
        <Chart options={chartOptions} series={chartSeries} type="donut" width="100%" />
      </motion.div>
    </motion.div>
  );
};

const InteractiveChartsSection = () => {
  const [activeChart, setActiveChart] = useState('pie');
  const annualOperatingCosts = monthlyCosts.total * 12;
  const breakevenRevenue = 150 * 1700 * 12;

  const chartData = useMemo(() => ({
    pie: {
      series: [establishmentCosts.total, annualOperatingCosts],
      options: {
        chart: { type: 'pie', fontFamily: 'IBM Plex Sans Arabic, sans-serif' },
        labels: ['تكاليف التأسيس', 'تكاليف التشغيل السنوية'],
        colors: ['#4A90E2', '#50E3C2'],
        legend: { position: 'bottom', fontFamily: 'IBM Plex Sans Arabic, sans-serif' },
        tooltip: { y: { formatter: (val) => `${new Intl.NumberFormat('en-US').format(val)} SAR` }, theme: 'light' },
        title: { text: 'توزيع التكاليف الإجمالية', align: 'center', style: { color: '#333333' } },
      }
    },
    bar: {
        series: [{
            name: 'التكاليف',
            data: [establishmentCosts.total, annualOperatingCosts, 0]
        }, {
            name: 'الإيرادات',
            data: [0, 0, breakevenRevenue]
        }],
        options: {
            chart: { type: 'bar', stacked: true, fontFamily: 'IBM Plex Sans Arabic, sans-serif' },
            plotOptions: { bar: { horizontal: false } },
            xaxis: { categories: ['تكاليف التأسيس', 'التشغيل السنوي', 'إيرادات التعادل السنوية'] },
            colors: ['#FF7B54', '#50E3C2'],
            tooltip: { y: { formatter: (val) => `${new Intl.NumberFormat('en-US').format(val)} SAR` }, theme: 'light' },
            title: { text: 'مقارنة شاملة (سنوي)', align: 'center', style: { color: '#333333' } },
        }
    },
    line: {
      series: [
        { name: 'الإيرادات المتراكمة', data: Array.from({length: 12}, (_, i) => (i + 1) * 150 * 1700) },
        { name: 'التكاليف المتراكمة', data: Array.from({length: 12}, (_, i) => establishmentCosts.total + (i + 1) * monthlyCosts.total) }
      ],
      options: {
          chart: { type: 'line', fontFamily: 'IBM Plex Sans Arabic, sans-serif' },
          xaxis: { categories: ['شهر 1', 'شهر 2', 'شهر 3', 'شهر 4', 'شهر 5', 'شهر 6', 'شهر 7', 'شهر 8', 'شهر 9', 'شهر 10', 'شهر 11', 'شهر 12'] },
          stroke: { curve: 'smooth' },
          colors: ['#50E3C2', '#FF7B54'],
          tooltip: { y: { formatter: (val) => `${new Intl.NumberFormat('en-US').format(val)} SAR` }, theme: 'light' },
          title: { text: 'تحليل نقطة التعادل', align: 'center', style: { color: '#333333' } },
          annotations: {
            xaxis: [{
              x: 'شهر 9',
              borderColor: '#9B59B6',
              label: { borderColor: '#9B59B6', style: { color: '#fff', background: '#9B59B6' }, text: 'نقطة التعادل التقريبية' }
            }]
          }
      }
    }
  }), [annualOperatingCosts, breakevenRevenue]);

  return (
    <section className="interactive-charts-section">
      <div className="chart-controls">
        <button onClick={() => setActiveChart('pie')} className={activeChart === 'pie' ? 'active' : ''}>توزيع التكاليف</button>
        <button onClick={() => setActiveChart('bar')} className={activeChart === 'bar' ? 'active' : ''}>مقارنة شاملة</button>
        <button onClick={() => setActiveChart('line')} className={activeChart === 'line' ? 'active' : ''}>نقطة التعادل</button>
      </div>
      <AnimatePresence mode='wait'>
        <motion.div 
            key={activeChart} 
            className="chart-container-apex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
          <Chart options={chartData[activeChart].options} series={chartData[activeChart].series} type={chartData[activeChart].options.chart.type} height={400} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

const FinancialEconomicStudy = () => {
  const [modalData, setModalData] = useState(null);

  return (
    <div className="financial-study-container">
      <div className="summary-grid">
        <SummaryTableCard data={establishmentCosts} onDetailsClick={setModalData} />
        <SummaryTableCard data={monthlyCosts} onDetailsClick={setModalData} />
        <SummaryTableCard data={expectedRevenue} />
      </div>
      <InteractiveChartsSection />
      <AnimatePresence>
        {modalData && <SummaryModal data={modalData} onClose={() => setModalData(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default FinancialEconomicStudy;
