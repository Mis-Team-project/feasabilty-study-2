import React, { useState } from 'react';
import { SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingControls.css';

const FloatingControls = ({ theme, toggleTheme }) => {
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
              <h4 className="section-title">المظهر</h4>
              <div className="option-group">
                <button
                  className={`option-button ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => theme === 'dark' && toggleTheme()}
                >
                  <Sun size={20} /> فاتح
                </button>
                <button
                  className={`option-button ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => theme === 'light' && toggleTheme()}
                >
                  <Moon size={20} /> داكن
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingControls;