import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sun } from 'lucide-react';
import './DailyProgram.css';

const scheduleData = [
  { time: '7:30–9:00', start: 7.5, end: 9, title: 'استقبال وأنشطة حرة', description: 'استقبال الأطفال في الصباح الباكر مع إتاحة الفرصة لهم للعب الحر المنظم.', icon: '👫', color: '#3498db' },
  { time: '9:00–10:00', start: 9, end: 10, title: 'نشاط تعليمي (لغة/رياضيات)', description: 'جلسات تعليمية تفاعلية تركز على أساسيات اللغة العربية والرياضيات.', icon: '📚', color: '#f1c40f' },
  { time: '10:00–10:30', start: 10, end: 10.5, title: 'استراحة', description: 'وقت للراحة وتناول وجبة خفيفة صحية.', icon: '☕', color: '#e67e22' },
  { time: '10:30–12:00', start: 10.5, end: 12, title: 'أنشطة إبداعية وبرمجة مبسطة', description: 'ورش عمل فنية وتجارب علمية بسيطة ومقدمة في مفاهيم البرمجة.', icon: '🎨💻', color: '#9b59b6' },
  { time: '12:00–13:00', start: 12, end: 13, title: 'وجبة غذاء', description: 'وجبة غداء متوازنة ومغذية.', icon: '🍽️', color: '#2ecc71' },
  { time: '13:00–15:00', start: 13, end: 15, title: 'ألعاب حركية وفنية', description: 'أنشطة في الملعب الخارجي أو ألعاب حركية داخلية وأنشطة فنية ختامية.', icon: '🤸', color: '#e74c3c' },
];

const AccordionItem = ({ item, isOpen, onClick, itemRef }) => (
  <motion.div ref={itemRef} className="accordion-item" layout>
    <motion.div className="item-header" onClick={onClick} layout>
      <div className="item-icon-wrapper" style={{ backgroundColor: item.color }}>
        <span className="item-icon" title={item.title}>{item.icon}</span>
      </div>
      <div className="item-info">
        <span className="item-time">{item.time}</span>
        <h4 className="item-title">{item.title}</h4>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown /></motion.div>
    </motion.div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="item-content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <p>{item.description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const DailyProgram = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [sunPosition, setSunPosition] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const calculateTimeBasedSunPosition = useCallback(() => {
    if (!containerRef.current) return;

    const now = new Date();
    const currentTime = now.getHours() + now.getMinutes() / 60;
    const totalHeight = containerRef.current.offsetHeight;
    const programStart = 7.5;
    const programEnd = 15;
    const totalDuration = programEnd - programStart;

    let progress = (currentTime - programStart) / totalDuration;
    progress = Math.max(0, Math.min(1, progress));

    setSunPosition(progress * totalHeight);
  }, []);

  useEffect(() => {
    if (openIndex !== null) {
      const timer = setTimeout(() => {
        const itemElement = itemRefs.current[openIndex];
        if (itemElement) {
          const newY = itemElement.offsetTop + itemElement.offsetHeight / 2;
          setSunPosition(newY);
        }
      }, 300); 
      return () => clearTimeout(timer);
    } else {
      calculateTimeBasedSunPosition();
    }
  }, [openIndex, calculateTimeBasedSunPosition]);

  useEffect(() => {
    if (openIndex !== null) return;
    
    calculateTimeBasedSunPosition();
    const interval = setInterval(calculateTimeBasedSunPosition, 60000);
    window.addEventListener('resize', calculateTimeBasedSunPosition);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', calculateTimeBasedSunPosition);
    };
  }, [openIndex, calculateTimeBasedSunPosition]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div layout className="daily-program-container" ref={containerRef}>
      <motion.div 
        className="sun-indicator" 
        animate={{ top: sunPosition }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <Sun size={24} />
      </motion.div>
      <div className="schedule-accordion">
        {scheduleData.map((item, index) => (
          <AccordionItem 
            key={index} 
            item={item} 
            isOpen={openIndex === index} 
            onClick={() => handleToggle(index)}
            itemRef={el => itemRefs.current[index] = el} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DailyProgram;
