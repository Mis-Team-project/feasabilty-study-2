import React from 'react';
import { motion } from 'framer-motion';
import './RisksAndSolutions.css';

const riskData = [
  {
    risk: 'ضعف الإقبال في البداية',
    solution: 'حملات تسويقية مكثفة، عروض تعريفية، بناء شراكات استراتيجية مع المدارس والشركات.',
    impactLevel: 'عالي',
    value: 90,
    color: '#dc3545' // Red
  },
  {
    risk: 'تغير التشريعات الحكومية',
    solution: 'متابعة مستمرة للأنظمة والتواصل مع الجهات المختصة لضمان التوافق الكامل.',
    impactLevel: 'متوسط',
    value: 60,
    color: '#ffc107' // Yellow
  },
  {
    risk: 'صعوبة استقطاب الكفاءات',
    solution: 'تقديم حزمة رواتب ومزايا تنافسية، توفير بيئة عمل جاذبة، والتدريب المستمر.',
    impactLevel: 'متوسط',
    value: 55,
    color: '#ffc107' // Yellow
  },
  {
    risk: 'أعطال تقنية في المنصة',
    solution: 'اعتماد بنية تحتية سحابية موثوقة، وجود خطة دعم فني وعقود صيانة استباقية.',
    impactLevel: 'منخفض',
    value: 30,
    color: '#28a745' // Green
  },
];

const RiskItem = ({ item }) => {
  return (
    <motion.div 
      className="risk-item-wrapper"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="risk-header">
        <span className="risk-name">{item.risk}</span>
        <span className="risk-impact-label" style={{ backgroundColor: item.color }}>{item.impactLevel}</span>
      </div>
      <div className="progress-bar-container">
        <motion.div 
          className="progress-bar-fill"
          style={{ '--risk-color': item.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${item.value}%` }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="risk-solution" style={{ borderRight: `5px solid ${item.color}`}}>
        <strong>الحل المقترح:</strong>
        <p>{item.solution}</p>
      </div>
    </motion.div>
  );
};

const RisksAndSolutions = () => {
  return (
    <div className="risks-solutions-container">
      {riskData.map((item, index) => (
        <RiskItem key={index} item={item} />
      ))}
    </div>
  );
};

export default RisksAndSolutions;
