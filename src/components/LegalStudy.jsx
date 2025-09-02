import React from 'react';
import { motion } from 'framer-motion';
import { School, Building, FireExtinguisher, HeartPulse, FlaskConical } from 'lucide-react';
import './LegalStudy.css';

const licenses = [
  {
    icon: <School size={32} />,
    color: '#87CEEB', // Sky Blue
    title: 'رخصة حضانة وروضة أطفال - وزارة التعليم',
    duration: 'تعتمد على الموافقة',
    fees: '15,000 ريال',
    percentage: '33.3% من إجمالي الرسوم',
  },
  {
    icon: <Building size={32} />,
    color: '#FFA500', // Orange
    title: 'رخصة نشاط تجاري - الشؤون البلدية والقروية',
    duration: 'تعتمد على البلدية',
    fees: '20,000 ريال',
    percentage: '44.4% من إجمالي الرسوم',
  },
  {
    icon: <FireExtinguisher size={32} />,
    color: '#FF474C', // Red
    title: 'شهادة سلامة - الدفاع المدني',
    duration: 'سنة واحدة (تجدد سنوياً)',
    fees: '5,000 ريال',
    percentage: '11.1% من إجمالي الرسوم',
  },
  {
    icon: <HeartPulse size={32} />,
    color: '#4CAF50', // Green
    title: 'شهادة صحة الأطفال - وزارة الصحة',
    duration: 'إصدار إلكتروني سريع',
    fees: '3,000 ريال',
    percentage: '6.7% من إجمالي الرسوم',
  },
  {
    icon: <FlaskConical size={32} />,
    color: '#9370DB', // Purple
    title: 'فحص وتجديد صحي سنوي',
    duration: 'سنوي',
    fees: '2,000 ريال',
    percentage: '4.4% من إجمالي الرسوم',
  },
];

const TimelineCard = ({ item, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.2 } },
  };

  return (
    <motion.div 
      className="timeline-item"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
    >
      <div className="timeline-dot"></div>
      <div className="timeline-card" style={{ borderTopColor: item.color }}>
        <div className="card-header">
          <div className="card-icon" style={{ backgroundColor: item.color }}>{item.icon}</div>
          <h4 className="card-title">{item.title}</h4>
        </div>
        <div className="card-body">
          <p><strong>المدة:</strong> {item.duration}</p>
          <p><strong>الرسوم المقدرة:</strong> {item.fees}</p>
        </div>
        <div className="card-tooltip">{item.percentage}</div>
      </div>
    </motion.div>
  );
};

const LegalStudy = () => {
  return (
    <div className="legal-study-container">
      <div className="timeline">
        {licenses.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LegalStudy;
