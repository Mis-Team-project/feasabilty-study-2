import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import './RisksAndSolutions.css';

const risksData = [
  {
    name: 'ضعف الإقبال',
    impactLevel: 'high',
    impactValue: 90, // Percentage for the progress bar
    solution: 'عروض تعريفية وشراكات مع المدارس والمؤسسات المحيطة.',
  },
  {
    name: 'تغير التشريعات',
    impactLevel: 'medium',
    impactValue: 60,
    solution: 'متابعة مستمرة للأنظمة والتواصل مع الجهات التنظيمية.',
  },
  {
    name: 'أعطال تقنية',
    impactLevel: 'low',
    impactValue: 30,
    solution: 'اعتماد بنية احتياطية سحابية وتوفير دعم فني دائم.',
  },
];

const RisksAndSolutions = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="risks-solutions-section">
      <motion.div 
        className="risks-list"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {risksData.map((risk, index) => (
          <motion.div key={index} className="risk-item" variants={itemVariants}>
            <div className="risk-name">{risk.name}</div>
            <div className="progress-bar-container">
              <div
                className={`progress-bar ${risk.impactLevel}`}
                style={{ width: isLoaded ? `${risk.impactValue}%` : '0%' }}
                role="progressbar"
                aria-valuenow={risk.impactValue}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`${risk.name} - مستوى التأثير`}
              >
                <span className="progress-percentage">{isLoaded ? `${risk.impactValue}%` : ''}</span>
              </div>
            </div>
            <div className="solution-box">
                <Lightbulb className="solution-icon" size={20} />
                <p className="solution-text">{risk.solution}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RisksAndSolutions;
