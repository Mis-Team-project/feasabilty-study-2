
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chart from 'react-apexcharts';
import { PieChart, BarChart2, TrendingUp, X, ChevronsRight, ChevronsLeft, DollarSign, Briefcase, TrendingUp as TrendingUpIcon } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import './FinancialEconomicStudy.css';

// Data for the tables
const establishmentCosts = {
  title: 'تكاليف التأسيس',
  icon: <Briefcase />,
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

const monthlyOperation = {
  title: 'التشغيل الشهري',
  icon: <ChevronsRight />,
  total: 210000,
  items: [
    { name: 'رواتب', amount: 150000 },
    { name: 'إيجار', amount: 30000 },
    { name: 'مصاريف تشغيلية', amount: 20000 },
    { name: 'تسويق وإعلانات', amount: 10000 },
  ],
};

const expectedRevenue = {
  title: 'الإيرادات المتوقعة',
  icon: <TrendingUpIcon />,
  total: null, // No total for this one
  items: [
    { name: 'متوسط إيراد الطفل', amount: 1700 },
    { name: 'نقطة التعادل', amount: 150, unit: 'طفل' },
  ],
};

const summaryTablesData = [establishmentCosts, monthlyOperation, expectedRevenue];

// Modal Component
const SummaryModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const chartOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'Tajawal, sans-serif',
    },
    labels: data.items.map(item => item.name),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    colors: ['#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6', '#1abc9c'],
    legend: {
      position: 'bottom',
      labels: {
        colors: '#333' // Corrected: Dark text for legend
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString()} ر.س`
      },
      style: { color: '#333' } // Corrected: Dark text for tooltip
    },
    dataLabels: {
      enabled: true,
      formatter: function (_val, opts) {
          return opts.w.config.series[opts.seriesIndex].toLocaleString()
      },
      style: {
        colors: ['#fff'], // White text on slices
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    stroke: {
      show: false,
    },
  };
  const chartSeries = data.items.map(item => item.amount);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={onClose}><X /></button>
            <h3>{data.title}</h3>
            <div className="chart-container">
              <Chart options={chartOptions} series={chartSeries} type="donut" width="100%" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const FinancialEconomicStudy = () => {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeChart, setActiveChart] = useState('pie');

  const openModal = (data) => {
    if (data.title === expectedRevenue.title) return;
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalData(null), 300); // Delay for exit animation
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut'
      },
    }),
  };

  const chartAreaCharts = {
    pie: {
        options: {
            chart: { type: 'pie', fontFamily: 'Tajawal, sans-serif', toolbar: { show: false } },
            labels: ['تكاليف تأسيس', 'تكاليف تشغيل سنوية'],
            colors: ['#e74c3c', '#3498db'],
            legend: { position: 'bottom', labels: { colors: '#333' } }, // Dark text for legend
            tooltip: { y: { formatter: (val) => `${val.toLocaleString()} ر.س` }, theme: 'light' }, // Use light theme for tooltip
        },
        series: [establishmentCosts.total, monthlyOperation.total * 12],
    },
    bar: {
        options: {
            chart: { type: 'bar', fontFamily: 'Tajawal, sans-serif', stacked: true, toolbar: { show: false } },
            xaxis: { categories: ['التكاليف والإيرادات'], labels: { style: { colors: '#333' } } },
            yaxis: { labels: { style: { colors: '#333' } } },
            colors: ['#e74c3c', '#3498db', '#2ecc71'],
            legend: { position: 'top', horizontalAlign: 'right', labels: { colors: '#333' } },
            tooltip: { y: { formatter: (val) => `${val.toLocaleString()} ر.س` }, theme: 'light' }, // Use light theme
            plotOptions: { bar: { horizontal: false } },
        },
        series: [{ name: 'تأسيس', data: [establishmentCosts.total] }, { name: 'تشغيل سنوي', data: [monthlyOperation.total * 12] }, { name: 'إيراد متوقع (150 طفل)', data: [1700 * 150 * 12] }],
    },
    line: {
        options: {
            chart: { type: 'line', fontFamily: 'Tajawal, sans-serif', toolbar: { show: false } },
            xaxis: { 
                categories: Array.from({ length: 12 }, (_, i) => `شهر ${i + 1}`),
                labels: { style: { colors: '#333' } } 
            },
            yaxis: { title: { text: 'المبلغ (ر.س)', style: { color: '#333' } }, labels: { style: { colors: '#333' } } },
            colors: ['#2ecc71', '#e74c3c', '#f1c40f'],
            stroke: { curve: 'smooth', width: 3 },
            markers: { size: 5 },
            legend: { position: 'top', horizontalAlign: 'right', labels: { colors: '#333' } },
            tooltip: { x: { format: 'dd/MM/yy HH:mm' }, theme: 'light' }, // Use light theme
            annotations: {
                points: [{
                    x: 'شهر 8',
                    y: 1700 * 150,
                    marker: { size: 8, fillColor: '#fff', strokeColor: '#f1c40f', radius: 2 },
                    label: { borderColor: '#f1c40f', style: { color: '#fff', background: '#f1c40f' }, text: 'نقطة التعادل' }
                }]
            }
        },
        series: [
            { name: 'الإيرادات', data: Array.from({ length: 12 }, (_, i) => (1700 * (i + 1) * 15)) }, 
            { name: 'التكاليف', data: Array.from({ length: 12 }, (_, i) => monthlyOperation.total * (i + 1)) },
        ],
    },
};


  return (
    <div className="financial-study-container">
      
      <div className="summary-tables-grid">
        {summaryTablesData.map((table, i) => (
          <motion.div
            key={table.title}
            className="summary-table-card"
            custom={i}
            variants={tableVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="table-header">
              <div className="table-icon">{table.icon}</div>
              <h3>{table.title}</h3>
            </div>
            <ul className="table-items">
              {table.items.map(item => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <span className="item-amount">
                    <AnimatedNumber value={item.amount} />
                    {item.unit ? ` ${item.unit}` : ' ر.س'}
                  </span>
                </li>
              ))}
            </ul>
            {table.total && (
              <div className="table-total">
                <span>الإجمالي</span>
                <span className="total-amount">
                  <AnimatedNumber value={table.total} /> ر.س
                </span>
              </div>
            )}
            {table.title !== expectedRevenue.title && (
                 <button className="summary-btn" onClick={() => openModal(table)}>
                    ملخص
                </button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="interactive-charts-section">
        <div className="chart-controls">
            <button onClick={() => setActiveChart('pie')} className={activeChart === 'pie' ? 'active' : ''}><PieChart/> توزيع التكاليف</button>
            <button onClick={() => setActiveChart('bar')} className={activeChart === 'bar' ? 'active' : ''}><BarChart2/> مقارنة شاملة</button>
            <button onClick={() => setActiveChart('line')} className={activeChart === 'line' ? 'active' : ''}><TrendingUp/> نقطة التعادل</button>
        </div>
        <div className="chart-display-area">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeChart}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Chart 
                        options={chartAreaCharts[activeChart].options} 
                        series={chartAreaCharts[activeChart].series}
                        type={chartAreaCharts[activeChart].options.chart.type}
                        width="100%"
                        height={400}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
      </div>

      <SummaryModal isOpen={isModalOpen} onClose={closeModal} data={modalData} />
    </div>
  );
};

export default FinancialEconomicStudy;
