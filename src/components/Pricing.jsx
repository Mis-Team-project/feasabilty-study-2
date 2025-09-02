import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Baby, School, Bus } from 'lucide-react';
import './Pricing.css';

const pricingData = [
  {
    title: 'حضانة بدوام كامل',
    price: '1,200 – 1,500 ريال',
    description: 'رعاية + وجبات + أنشطة تعليمية',
    icon: <Baby size={40} />,
    color: '#c7d2fe',
    hoverDetails: {
      text: 'يشمل وجبات + متابعة تعليمية',
      target: '60% من الأهالي',
      chart: {
        type: 'pie',
        data: [{ name: 'مستهدف', value: 60 }, { name: 'غير مستهدف', value: 40 }],
      },
    },
  },
  {
    title: 'روضة بدوام كامل',
    price: '1,800 – 2,200 ريال',
    description: 'تعليم مبكر + أنشطة متنوعة',
    icon: <School size={40} />,
    color: '#fecdd3',
    hoverDetails: {
      text: 'يشمل مناهج + أنشطة',
      target: '30% من الأهالي',
      chart: {
        type: 'bar',
        data: [{ name: 'الفئة', مستهدف: 30, 'غير مستهدف': 70 }],
      },
    },
  },
  {
    title: 'خدمات إضافية',
    price: '300 – 500 ريال',
    description: 'نقل مدرسي + أنشطة ترفيهية',
    icon: <Bus size={40} />,
    color: '#fef08a',
    hoverDetails: {
      text: 'يشمل أنشطة + خدمة نقل',
      target: '10% من الأهالي',
      chart: {
        type: 'pie',
        data: [{ name: 'مستهدف', value: 10 }, { name: 'غير مستهدف', value: 90 }],
      },
    },
  },
];

const COLORS = ['#3b82f6', '#d1d5db'];

const PricingCard = ({ card, isHovered, onHoverStart, onHoverEnd }) => {

  return (
    <motion.div
      className="pricing-card"
      style={{ backgroundColor: card.color, zIndex: isHovered ? 10 : 1 }}
      whileHover={{ scale: 1.03, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' }}
    >
      <div className="pricing-card-icon">{card.icon}</div>
      <h3 className="pricing-card-title">{card.title}</h3>
      <div className="pricing-card-price">{card.price}</div>
      <p className="pricing-card-description">{card.description}</p>
      
      <div className="details-container" onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}>
        <button className="pricing-card-button">تفاصيل</button>
        {isHovered && (
          <motion.div
            className="pricing-hover-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="hover-text">{card.hoverDetails.text}</div>
            <div className="hover-target">{card.hoverDetails.target}</div>
            <div className="hover-chart">
              <ResponsiveContainer width="100%" height={100}>
                {card.hoverDetails.chart.type === 'pie' ? (
                  <PieChart>
                    <Pie data={card.hoverDetails.chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} fill="#8884d8">
                      {card.hoverDetails.chart.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : (
                  <BarChart data={card.hoverDetails.chart.data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="مستهدف" stackId="a" fill={COLORS[0]} />
                    <Bar dataKey="غير مستهدف" stackId="a" fill={COLORS[1]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="pricing-container">
      {pricingData.map((card, index) => (
        <PricingCard 
          key={index} 
          card={card} 
          isHovered={hoveredIndex === index}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
};

export default Pricing;
