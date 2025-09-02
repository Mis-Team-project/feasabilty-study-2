import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Pricing.css';

const pricingData = [
  {
    title: 'حضانة بدوام كامل',
    price: '1,800–2,400 ريال',
    description: 'رعاية + وجبات + أنشطة تعليمية',
    icon: '👶',
    color: '#cffafe', // Light Cyan
    hoverDetails: {
      text: 'يشمل وجبات ومتابعة تعليمية متكاملة.',
      target: '60% من الأهالي',
      chartType: 'pie',
      chartData: [
        { name: 'مستهدف', value: 60, fill: '#06b6d4' },
        { name: 'غير مستهدف', value: 40, fill: '#a5f3fc' },
      ],
    },
  },
  {
    title: 'روضة بدوام كامل',
    price: '2,200–2,800 ريال',
    description: 'تعليم مبكر + أنشطة متنوعة',
    icon: '🏫',
    color: '#dcfce7', // Light Green
    hoverDetails: {
      text: 'يشمل مناهج معتمدة وأنشطة إثرائية.',
      target: '30% من الأهالي',
      chartType: 'bar',
      chartData: [
        { name: 'الفئة المستهدفة', 'نسبة الاستهداف': 30 },
      ],
    },
  },
  {
    title: 'النقل (اختياري)',
    price: '250–400 ريال',
    description: 'لكل طفل/شهريًا',
    icon: '🚐',
    color: '#ffedd5', // Light Orange
    hoverDetails: {
      text: 'خدمة نقل آمنة وموثوقة تغطي الأحياء المستهدفة.',
      target: '10% من الأهالي',
      chartType: 'pie',
      chartData: [
        { name: 'مستهدف', value: 10, fill: '#f97316' },
        { name: 'غير مستهدف', value: 90, fill: '#fed7aa' },
      ],
    },
  },
];

const CustomPieChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={100}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} label>
        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
      </Pie>
      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
    </PieChart>
  </ResponsiveContainer>
);

const CustomBarChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <XAxis type="number" hide domain={[0, 100]} />
        <YAxis type="category" dataKey="name" hide />
        <Tooltip formatter={(value) => `${value}%`} />
        <Bar dataKey="نسبة الاستهداف" barSize={20} fill="#22c55e">
            <Cell fill="#22c55e" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

const PricingCard = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    initial: { y: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
    hover: { y: -8, boxShadow: '0 12px 25px rgba(0,0,0,0.1)' },
  };

  const hoverBoxVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <motion.div
      className="pricing-card"
      style={{ backgroundColor: card.color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      <div className="card-icon">{card.icon}</div>
      <h3 className="card-title">{card.title}</h3>
      <p className="card-price">{card.price}</p>
      <p className="card-description">{card.description}</p>
      <button className="card-button">تفاصيل</button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="hover-details-box"
            variants={hoverBoxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="hover-text">{card.hoverDetails.text}</p>
            <p className="hover-target"><strong>الفئة المستهدفة:</strong> {card.hoverDetails.target}</p>
            <div className="chart-container">
              {card.hoverDetails.chartType === 'pie' ? (
                <CustomPieChart data={card.hoverDetails.chartData} />
              ) : (
                <CustomBarChart data={card.hoverDetails.chartData} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <div className="pricing-section">
      <div className="pricing-header">
        <h2>التسعير المرجعي للخدمات</h2>
        <p>نظرة عامة على باقات الأسعار المقترحة، مصممة لتلبية احتياجات مختلف شرائح العملاء.</p>
      </div>
      <div className="pricing-cards-container">
        {pricingData.map((card, index) => (
          <PricingCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
