import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, School, ShieldCheck, Building, Tv, ToyBrick, Video, Smartphone } from 'lucide-react';
import './TechnicalStudy.css';

const tabs = [
  { id: 'location', label: 'الموقع', icon: <MapPin /> },
  { id: 'equipment', label: 'التجهيزات', icon: <School /> },
  { id: 'systems', label: 'الأنظمة', icon: <ShieldCheck /> },
];

const contentData = {
  location: [
    { icon: <Building />, text: 'مبنى مستأجر بمساحة 700 م²' },
    { icon: <MapPin />, text: 'حي الملقا أو الأحياء المماثلة' },
    { icon: <Tv />, text: 'موقع استراتيجي بالقرب من الخدمات والمواصلات' },
  ],
  equipment: [
    { icon: <School />, text: 'فصول دراسية مجهزة' },
    { icon: <Tv />, text: 'صالة أنشطة' },
    { icon: <ToyBrick />, text: 'ملعب خارجي' },
    { icon: <ToyBrick />, text: 'ركن ألعاب داخلي' },
  ],
  systems: [
    { icon: <Video />, text: 'كاميرات مراقبة CCTV' },
    { icon: <ShieldCheck />, text: 'بوابة دخول ذكية' },
    { icon: <Smartphone />, text: 'منصة تواصل فوري مع أولياء الأمور' },
  ],
};

const TechnicalStudy = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <div className="technical-study-container">
      <div className="tabs-menu">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="tab-icon">{tab.icon}</div>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="tab-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="content-list">
              {contentData[activeTab].map((item, index) => (
                <li key={index} className="content-list-item">
                  <div className="content-icon">{item.icon}</div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechnicalStudy;
