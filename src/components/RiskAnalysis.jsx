import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Shield, Users, AlertTriangle } from 'lucide-react';
import './RiskAnalysis.css';

const risksData = [
  {
    category: 'مخاطر مالية',
    icon: <TrendingDown />,
    color: '#ef4444',
    risks: [
      { title: 'ضعف الإقبال في البداية', mitigation: 'حملات تسويقية مكثفة قبل الافتتاح، وتقديم عروض تسجيل مبكر.' },
      { title: 'زيادة غير متوقعة في التكاليف', mitigation: 'وضع هامش طوارئ في الميزانية (15%)، وعقود محددة مع الموردين.' },
    ]
  },
  {
    category: 'مخاطر تشغيلية',
    icon: <AlertTriangle />,
    color: '#f97316',
    risks: [
      { title: 'صعوبة استقطاب كوادر مؤهلة', mitigation: 'تقديم رواتب ومزايا تنافسية، والتعاون مع معاهد تدريب متخصصة.' },
      { title: 'عدم الامتثال لمعايير السلامة', mitigation: 'تدريب دوري للموظفين، وجولات تفتيش منتظمة، وتعيين مسؤول سلامة.' },
    ]
  },
  {
    category: 'مخاطر تتعلق بالسمعة',
    icon: <Shield />,
    color: '#3b82f6',
    risks: [
      { title: 'شكاوى من أولياء الأمور', mitigation: 'نظام واضح وشفاف للتعامل مع الشكاوى، وتطبيق استبيانات رضا دورية.' },
      { title: 'وقوع حوادث (إصابات طفيفة)', mitigation: 'تجهيز بيئة آمنة، وتوفير إشراف دائم، ووجود مسعف أولي مؤهل.' },
    ]
  },
];

const RiskCategory = ({ category, icon, color, risks, index }) => {
  const categoryVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: index * 0.2, duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.div className="risk-category-card" variants={categoryVariant}>
      <div className="risk-category-header" style={{ backgroundColor: color }}>
        <div className="risk-category-icon">{icon}</div>
        <h3>{category}</h3>
      </div>
      <div className="risk-items-container">
        {risks.map((risk, i) => (
          <div key={i} className="risk-item">
            <div className="risk-title">
              <AlertTriangle size={18} className="risk-bullet-icon" />
              <h4>{risk.title}</h4>
            </div>
            <div className="mitigation-plan">
              <Shield size={18} className="mitigation-bullet-icon" />
              <p>{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const RiskAnalysis = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  return (
    <motion.div 
      className="risk-analysis-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="risk-analysis-header">
        <h2>تحليل المخاطر وخطط المواجهة</h2>
        <p>تحديد استباقي للمخاطر المحتملة ووضع استراتيجيات فعالة للتعامل معها لضمان استمرارية ونجاح المشروع.</p>
      </div>
      <div className="risk-analysis-grid">
        {risksData.map((category, index) => (
          <RiskCategory 
            key={index} 
            {...category} 
            index={index} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default RiskAnalysis;
