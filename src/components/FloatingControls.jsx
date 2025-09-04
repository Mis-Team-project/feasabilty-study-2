import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingControls.css';

const FloatingControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayType, setDisplayType] = useState('summary'); // 'summary' or 'detailed'
  const [selectedYear, setSelectedYear] = useState(2025);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  return (
    <div className="floating-controls-container">
      <motion.button
        className="floating-button"
        onClick={togglePanel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SlidersHorizontal size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-panel"
            initial={{ opacity: 0, y: 50, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, x: 50, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="panel-section">
              <h4 className="section-title">نوع العرض</h4>
              <div className="option-group">
                <button
                  className={`option-button ${displayType === 'summary' ? 'active' : ''}`}
                  onClick={() => setDisplayType('summary')}
                >
                  ملخص
                </button>
                <button
                  className={`option-button ${displayType === 'detailed' ? 'active' : ''}`}
                  onClick={() => setDisplayType('detailed')}
                >
                  تفصيلي
                </button>
              </div>
            </div>

            <div className="panel-section">
              <h4 className="section-title">السنة</h4>
              <input
                type="range"
                min="2025"
                max="2035"
                value={selectedYear}
                onChange={handleYearChange}
                className="year-slider"
              />
              <div className="slider-value">{selectedYear}</div>
            </div>

            <div className="panel-section">
              <h4 className="section-title">مساحة فارغة</h4>
              {/* This section is intentionally left blank as per request */}
              <p className="empty-space-text">هذه المساحة مخصصة لميزات مستقبلية.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingControls;