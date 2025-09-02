import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2 } from 'lucide-react';
import './IntroSectionContent.css';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const IntroSectionContent = () => {
  const points = [
    'توفير بيئة تعليمية آمنة ومتطورة للأطفال من عمر سنتين حتى ست سنوات.',
    'تمكين المرأة بزيادة فرص مشاركتها في سوق العمل عبر توفير رعاية موثوقة لأطفالها.',
    'تعزيز الابتكار في التعليم المبكر باستخدام التقنية والتحول الرقمي.'
  ];

  return (
    <motion.div 
      className="intro-section-container"
      variants={itemVariants}
    >
      <motion.div className="intro-card" variants={itemVariants}>
        <div className="intro-header">
          <Target size={30} className="intro-icon" />
          <h3 className="intro-card-title">يدعم هذا المشروع محور تنمية رأس المال البشري في رؤية المملكة 2030 من خلال:</h3>
        </div>
        <ul className="intro-bullet-points-list">
          {points.map((point, index) => (
            <motion.li 
              key={index} 
              className="intro-bullet-point-item"
              variants={itemVariants}
            >
              <CheckCircle2 className="intro-bullet-icon" size={22} />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default IntroSectionContent;