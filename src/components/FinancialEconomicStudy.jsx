import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wallet, Banknote, TrendingUp, BarChart, PieChart, LineChart, X, Landmark, Receipt, PiggyBank } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber'; // Assuming you'll create this component
// import CustomPieChart from './CustomPieChart'; // Will be created later
// import CustomBarChart from './CustomBarChart'; // Will be created later

import './FinancialEconomicStudy.css';

const financialData = {
  initialCosts: {
    title: 'تكاليف التأسيس',
    icon: <Landmark size={40} />,
    total: 350000,
    details: [
      { name: 'تراخيص وإنشاءات', amount: 150000 },
      { name: 'تجهيزات داخلية', amount: 80000 },
      { name: 'أثاث ومعدات', amount: 60000 },
      { name: 'تسويق مبدئي', amount: 30000 },
      { name: 'مصاريف قانونية وإدارية', amount: 30000 },
    ],
  },
  monthlyOperations: {
    title: 'التشغيل الشهري',
    icon: <Receipt size={40} />,
    total: 45000,
    details: [
      { name: 'رواتب موظفين', amount: 25000 },
      { name: 'إيجار', amount: 10000 },
      { name: 'فواتير وخدمات', amount: 5000 },
      { name: 'صيانة ومستلزمات', amount: 3000 },
      { name: 'مصاريف متنوعة', amount: 2000 },
    ],
  },
  expectedRevenue: {
    title: 'الإيرادات المتوقعة',
    icon: <PiggyBank size={40} />,
    total: 60000, // Placeholder, actual calculation will be dynamic
    details: [
      { name: 'رسوم اشتراك شهرية (عدد الأطفال * رسوم الطفل)', amount: 60000, childrenCount: 30, feePerChild: 2000 },
      { name: 'خدمات إضافية (اختياري)', amount: 5000 },
    ],
  },
};

const FinancialEconomicStudy = () => {
  const [activeCard, setActiveCard] = useState(null); // State to manage which card's chart is shown

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
  };

  const chartModalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <motion.section 
      ref={sectionRef} 
      className="financial-economic-study-container"
      initial="hidden"
      animate={controls}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="financial-study-header">
        <h2>الدراسة الاقتصادية والمالية (تقديرية)</h2>
        <p>تحليل شامل للتكاليف والإيرادات المتوقعة للمشروع.</p>
      </div>

      <motion.div className="summary-cards-container">
        {Object.entries(financialData).map(([key, card]) => (
          <motion.div
            key={key}
            className={`summary-card ${activeCard === key ? 'active' : ''}`}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => setActiveCard(key === activeCard ? null : key)}
          >
            <div className="card-header">
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
            </div>
            <div className="card-total">
              <AnimatedNumber value={card.total} /> ريال
            </div>
            <button className="view-chart-button">
              عرض الرسم البياني <BarChart size={18} />
            </button>
          </motion.div>
        ))}
      </motion.div>

      {activeCard && (
        <motion.div 
          className="chart-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="chart-modal-content"
            variants={chartModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="chart-modal-header">
              <h3>{financialData[activeCard].title} - الرسم البياني</h3>
              <button onClick={() => setActiveCard(null)} className="close-btn"><X size={24} /></button>
            </div>
            <div className="chart-display-area">
              {/* Conditional rendering for different chart types based on activeCard */}
              {activeCard === 'initialCosts' || activeCard === 'monthlyOperations' ? (
                // <CustomPieChart data={financialData[activeCard].details} />
                <div className="placeholder-chart-pie">Pie Chart for {financialData[activeCard].title}</div>
              ) : (
                // <CustomBarChart data={financialData[activeCard].details} />
                <div className="placeholder-chart-bar">Bar Chart/Line Chart for {financialData[activeCard].title}</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default FinancialEconomicStudy;
