import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Video, FileText, MessageSquare } from 'lucide-react';
import './WebAppSection.css';

const features = [
  {
    title: 'تسجيل ودفع إلكتروني',
    icon: CreditCard,
    description: 'نظام متكامل لتسجيل الطلاب ودفع الرسوم بسهولة وأمان عبر الإنترنت.',
    color: '#2980b9'
  },
  {
    title: 'بث مباشر للفصول',
    icon: Video,
    description: 'تمكين أولياء الأمور من متابعة أبنائهم مباشرة خلال اليوم الدراسي.',
    color: '#c0392b'
  },
  {
    title: 'تقارير يومية',
    icon: FileText,
    description: 'إرسال تقارير مفصلة عن أداء الطفل ونشاطاته اليومية.',
    color: '#27ae60'
  },
  {
    title: 'تواصل فوري',
    icon: MessageSquare,
    description: 'قناة تواصل مباشرة وفورية بين الإدارة وأولياء الأمور.',
    color: '#f39c12'
  },
];

const FeatureIcon = ({ feature }) => {
  const [isHovered, setHovered] = useState(false);
  const { icon: Icon, title, description, color } = feature;

  return (
    <motion.div
      className="feature-icon-wrapper"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ '--feature-color': color }}
    >
      <div className="icon-container">
          <Icon size={40} />
      </div>
      <h4 className="feature-title">{title}</h4>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="feature-tooltip"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <p className="tooltip-description">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WebAppSection = () => {
  return (
    <motion.div 
        className="web-app-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
    >
        <div className="features-grid">
            {features.map((feature, index) => (
            <FeatureIcon key={index} feature={feature} />
            ))}
        </div>
        <div className="cost-section">
            <div className="cost-item">
                <span className="cost-label">تكلفة التطوير</span>
                <span className="cost-value">120,000 <span className="currency">ريال</span></span>
            </div>
            <div className="cost-separator"></div>
            <div className="cost-item">
                <span className="cost-label">صيانة سنوية</span>
                <span className="cost-value">30,000 <span className="currency">ريال</span></span>
            </div>
        </div>
    </motion.div>
  );
};

export default WebAppSection;
