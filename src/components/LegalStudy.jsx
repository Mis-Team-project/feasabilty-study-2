import React from 'react';
import { motion } from 'framer-motion';
import './LegalStudy.css';

const totalFees = 45000; // 15000 + 20000 + 5000 + 3000 + 2000

const licenses = [
  {
    icon: '🏫',
    color: '#e0f2fe', // Sky Blue
    borderColor: '#0ea5e9',
    title: 'رخصة حضانة وروضة',
    authority: 'وزارة التعليم',
    duration: 'تعتمد على الموافقة',
    fees: 15000,
  },
  {
    icon: '🏢',
    color: '#fff7ed', // Orange
    borderColor: '#f97316',
    title: 'رخصة نشاط تجاري',
    authority: 'وزارة الشؤون البلدية والقروية',
    duration: 'تعتمد على البلدية',
    fees: 20000,
  },
  {
    icon: '🚒',
    color: '#fee2e2', // Red
    borderColor: '#ef4444',
    title: 'شهادة سلامة',
    authority: 'الدفاع المدني',
    duration: 'سنة واحدة (تجدد سنوياً)',
    fees: 5000,
  },
  {
    icon: '⚕️',
    color: '#f0fdf4', // Green
    borderColor: '#22c55e',
    title: 'شهادة صحية للأطفال',
    authority: 'وزارة الصحة',
    duration: 'إصدار إلكتروني فوري',
    fees: 3000,
  },
  {
    icon: '🧪',
    color: '#f5f3ff', // Purple
    borderColor: '#8b5cf6',
    title: 'فحص وتجديد سنوي',
    authority: 'متطلبات صحية سنوية',
    duration: 'سنوي',
    fees: 2000,
  },
];

const formatCurrency = (value) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', minimumFractionDigits: 0 }).format(value);

const TimelineItem = ({ item, isLast }) => {
  const percentage = ((item.fees / totalFees) * 100).toFixed(0);

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div className="timeline-item" variants={itemVariants}>
      <div className="timeline-connector">
        <div className="timeline-dot" style={{ borderColor: item.borderColor }}></div>
        {!isLast && <div className="timeline-line"></div>}
      </div>
      <div className="timeline-content-wrapper">
        <div className="timeline-card" style={{ background: item.color, borderRight: `5px solid ${item.borderColor}` }}>
          <div className="timeline-card-header">
            <div className="timeline-icon">{item.icon}</div>
            <div className="timeline-title-group">
              <h4 className="timeline-title">{item.title}</h4>
              <p className="timeline-authority">{item.authority}</p>
            </div>
          </div>
          <div className="timeline-details">
            <div className="detail-item">
              <strong>الرسوم التقديرية:</strong>
              <span>{formatCurrency(item.fees)}</span>
            </div>
            <div className="detail-item">
              <strong>المدة / الصلاحية:</strong>
              <span>{item.duration}</span>
            </div>
          </div>
          <div className="tooltip">{`تمثل ${percentage}% من إجمالي الرسوم`}</div>
        </div>
      </div>
    </motion.div>
  );
};

const LegalStudy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
  };

  return (
    <div className="legal-study-section">
      <div className="legal-header">
        <h2>الدراسات التنظيمية والقانونية</h2>
        <p>خارطة طريق للحصول على التراخيص والموافقات اللازمة لتأسيس وتشغيل المركز.</p>
      </div>
      <motion.div 
        className="timeline-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {licenses.map((item, index) => (
          <TimelineItem key={index} item={item} isLast={index === licenses.length - 1} />
        ))}
      </motion.div>
    </div>
  );
};

export default LegalStudy;
