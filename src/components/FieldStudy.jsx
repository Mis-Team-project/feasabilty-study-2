import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Users, DollarSign, Route, TrendingUp, AlertTriangle, Trophy, 
  Building2, Scale, GraduationCap, MapPin
} from 'lucide-react';
import RiyadhMap from './RiyadhMap'; // Import RiyadhMap component
import './FieldStudy.css';

const locationsData = [
  {
    name: 'حي الملقا',
    mapUrl: 'https://www.google.com/maps/place/%D8%A7%D9%84%D9%85%D9%84%D9%82%D8%A7%D8%8C+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6',
    reasons: [
      { text: 'كثافة سكانية عالية من الفئة المستهدفة', icon: <Users /> },
      { text: 'متوسط دخل مرتفع للأسر', icon: <DollarSign /> },
      { text: 'قربه من طرق رئيسية وحيوية', icon: <Route /> },
    ],
    expectations: [
      { text: 'إمكانية الوصول لنقطة التعادل خلال 12–14 شهرًا', icon: <TrendingUp /> },
      { text: 'الطلب على التعليم النوعي مرتفع جداً', icon: <Trophy /> },
      { text: 'منافسة قائمة تتطلب تميزًا في الخدمة', icon: <AlertTriangle /> },
    ],
  },
  {
    name: 'حي القيروان',
    mapUrl: 'https://www.google.com/maps/place/%D8%A7%D9%84%D9%82%D9%8A%D8%B1%D9%88%D9%88%D8%A7%D9%86%D8%8C+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6',
    reasons: [
      { text: 'نمو عمراني متسارع وجذب للسكان الجدد', icon: <Building2 /> },
      { text: 'منافسة أقل نسبيًا مقارنة بالأحياء المجاورة', icon: <Scale /> },
      { text: 'موقع استراتيجي بالقرب من مشاريع كبرى', icon: <Route /> },
    ],
    expectations: [
      { text: 'فرصة للاستحواذ على شريحة كبيرة من السوق', icon: <TrendingUp /> },
      { text: 'إمكانية تقديم خدمات بأسعار تنافسية', icon: <DollarSign /> },
    ],
  },
  {
    name: 'حي النرجس',
    mapUrl: 'https://www.google.com/maps/place/%D8%A7%D9%84%D9%86%D8%B1%D8%AC%D8%B3%D8%8C+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6',
    reasons: [
      { text: 'توسع عمراني كبير ومستمر', icon: <Building2 /> },
      { text: 'قربه من جامعة نورة والمطار', icon: <GraduationCap /> },
      { text: 'مزيج سكاني بدخل متوسط إلى عالٍ', icon: <DollarSign /> },
    ],
    expectations: [
      { text: 'نمو مستمر في عدد السكان والطلب', icon: <TrendingUp /> },
      { text: 'فرصة لتأسيس سمعة قوية في حي جديد', icon: <Trophy /> },
    ],
  },
];

const FieldStudy = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <div className="field-study-container">
      <RiyadhMap /> {/* Render RiyadhMap component here */}
      <div className="field-study-header">
        <h2>ترشيح المواقع الأنسب</h2>
        <p>تحليل لأبرز الأحياء المرشحة في شمال الرياض بناءً على معايير ديموغرافية واقتصادية.</p>
      </div>
      <div className="field-study-grid">
        {locationsData.map((location, index) => (
          <motion.div 
            key={index} 
            className="location-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            custom={index}
          >
            <h3 className="card-title">{location.name}</h3>
            
            <div className="card-section">
              <h4>الأسباب</h4>
              <ul className="card-list">
                {location.reasons.map((reason, i) => (
                  <li key={i}>
                    {React.cloneElement(reason.icon, { className: 'list-icon' })}
                    <span>{reason.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-section">
              <h4>التوقعات</h4>
              <ul className="card-list">
                {location.expectations.map((exp, i) => (
                  <li key={i}>
                    {React.cloneElement(exp.icon, { className: 'list-icon' })}
                     <span>{exp.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="map-button">
              <MapPin size={20} />
              عرض الموقع على الخريطة
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FieldStudy;