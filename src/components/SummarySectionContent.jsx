import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ClipboardList, ShieldCheck, Target } from 'lucide-react'; // Import new icons
import './SummarySectionContent.css';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const SummarySectionContent = () => {
  const summaryData = [
    { 
      label: 'الأثر التنموي', 
      content: 'يساهم المشروع في رفع جودة التعليم المبكر، وتقليل الفجوة التعليمية بين المراحل العمرية، ودعم مشاركة المرأة في الاقتصاد.',
      icon: TrendingUp 
    },
    { 
      label: 'نموذج المشروع', 
      content: 'حضانة + روضة في مبنى مستأجر بمساحة 650–800 م²، تجهيزات تعليمية حديثة، برنامج يومي متكامل.',
      icon: ClipboardList 
    },
    { 
      label: 'الميزة التنافسية', 
      content: '- منصة إلكترونية وتطبيق للأهالي.<br>- كادر مؤهل ومعتمد.<br>- برنامج صحي وسلامة شامل.<br>- دعم لوجستي داخلي.',
      icon: ShieldCheck 
    },
    { 
      label: 'هدف السنة الأولى', 
      content: 'الوصول لـ 150–170 طفل بنسبة إشغال 75% وتحقيق نقطة التعادل بنهاية العام.',
      icon: Target 
    },
  ];

  return (
    <motion.div 
      className="summary-section-container"
      variants={itemVariants}
    >
      <div className="summary-grid">
        {summaryData.map((row, index) => {
          const IconComponent = row.icon; // Get the icon component from the data
          return (
            <motion.div key={index} className="summary-card" variants={itemVariants}>
              <IconComponent size={28} className="summary-card-icon" />
              <h4 className="summary-card-label">{row.label}</h4>
              <p className="summary-card-content" dangerouslySetInnerHTML={{ __html: row.content }}></p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SummarySectionContent;