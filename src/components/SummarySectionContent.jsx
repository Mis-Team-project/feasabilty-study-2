import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import './SummarySectionContent.css';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const SummarySectionContent = () => {
  const summaryData = [
    { label: 'الأثر التنموي', content: 'يساهم المشروع في رفع جودة التعليم المبكر، وتقليل الفجوة التعليمية بين المراحل العمرية، ودعم مشاركة المرأة في الاقتصاد.' },
    { label: 'نموذج المشروع', content: 'حضانة + روضة في مبنى مستأجر بمساحة 650–800 م²، تجهيزات تعليمية حديثة، برنامج يومي متكامل.' },
    { label: 'الميزة التنافسية', content: '- منصة إلكترونية وتطبيق للأهالي.<br>- كادر مؤهل ومعتمد.<br>- برنامج صحي وسلامة شامل.<br>- دعم لوجستي داخلي.' },
    { label: 'هدف السنة الأولى', content: 'الوصول لـ 150–170 طفل بنسبة إشغال 75% وتحقيق نقطة التعادل بنهاية العام.' },
  ];

  return (
    <motion.div 
      className="summary-section-container"
      variants={itemVariants}
    >
      <div className="summary-grid">
        {summaryData.map((row, index) => (
          <motion.div key={index} className="summary-card" variants={itemVariants}>
            <FileText size={24} className="summary-card-icon" />
            <h4 className="summary-card-label">{row.label}</h4>
            <p className="summary-card-content" dangerouslySetInnerHTML={{ __html: row.content }}></p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SummarySectionContent;