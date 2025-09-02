import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Users, Baby, School, Activity, Map as MapIcon, X } from 'lucide-react';
import './MarketStudy.css';

// Updated Data based on user request
const newTotalPopulation = 25000 + 20000 + 30000 + 28000 + 18000 + 15000 + 12000 + 22000;
const newTotalChildren = 16900;

const chartData = {
  population: [
    { name: 'الأطفال (شهرين–6)', value: newTotalChildren, color: '#3b82f6' },
    { name: 'الفئات الأخرى', value: newTotalPopulation - newTotalChildren, color: '#a5b4fc' },
  ],
  children: [
    { name: 'أطفال', 'العدد التقديري': newTotalChildren },
  ],
  facilities: [
    { name: 'العرض الحالي', 'عدد المنشآت': 120 },
    { name: 'الطلب المتوقع', 'عدد المنشآت': 180 },
  ],
  gap: [
    { name: 'الفجوة', 'العدد المطلوب': 60 },
  ],
};

const demographicData = [
    { district: 'الملقا', population: '25,000', childRatio: '12%', childCount: '3,000' },
    { district: 'حطين', population: '20,000', childRatio: '11%', childCount: '2,200' },
    { district: 'الصحافة', population: '30,000', childRatio: '8%', childCount: '2,400' },
    { district: 'الياسمين', population: '28,000', childRatio: '10%', childCount: '2,800' },
    { district: 'العارض', population: '18,000', childRatio: '12%', childCount: '2,160' },
    { district: 'الندى', population: '15,000', childRatio: '10%', childCount: '1,500' },
    { district: 'الفلاح', population: '12,000', childRatio: '9%', childCount: '1,080' },
    { district: 'الربيع', population: '22,000', childRatio: '8%', childCount: '1,760' },
    { district: 'المجموع', population: '—', childRatio: '—', childCount: '16,900 طفل تقريبًا' },
];

const cards = [
  {
    id: 'population',
    icon: <Users size={40} className="card-main-icon" />,
    title: 'سكان شمال الرياض',
    value: `~${new Intl.NumberFormat('ar-SA').format(newTotalPopulation)}`,
    subtitle: 'نسمة في الأحياء المستهدفة',
    gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
  },
  {
    id: 'children',
    icon: <Baby size={40} className="card-main-icon" />,
    title: 'شريحة الأطفال',
    value: `~${new Intl.NumberFormat('ar-SA').format(newTotalChildren)}`,
    subtitle: 'طفل في الفئة العمرية (شهرين-6 سنوات)',
    gradient: 'linear-gradient(135deg, #4ade80, #22c55e)',
  },
  {
    id: 'facilities',
    icon: <School size={40} className="card-main-icon" />,
    title: 'العرض الحالي',
    value: '~120',
    subtitle: 'مركز وحضانة مرخصة حاليًا',
    gradient: 'linear-gradient(135deg, #facc15, #eab308)',
  },
  {
    id: 'gap',
    icon: <Activity size={40} className="card-main-icon" />,
    title: 'الفجوة السوقية',
    value: '+60',
    subtitle: 'منشأة إضافية لتلبية الطلب',
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
  },
  {
    id: 'demographics',
    icon: <MapIcon size={40} className="card-main-icon" />,
    title: 'التحليل الديموغرافي',
    value: '8 أحياء',
    subtitle: 'تفاصيل السكان والأطفال بالمنطقة',
    gradient: 'linear-gradient(135deg, #c084fc, #9333ea)',
  },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={16} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartPopup = ({ cardId, onClose }) => {
  let chart, title;

  switch (cardId) {
    case 'population':
      title = 'توزيع السكان';
      chart = (
        <PieChart width={200} height={150}>
          <Pie data={chartData.population} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label={renderCustomizedLabel} labelLine={false}>
            {chartData.population.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
          </Pie>
          <Tooltip formatter={(value) => new Intl.NumberFormat('ar-SA').format(value)} />
          <Legend iconSize={10} />
        </PieChart>
      );
      break;
    case 'children':
        title = 'عدد الأطفال المستهدفين';
        chart = (
            <BarChart width={200} height={150} data={chartData.children} layout="vertical">
                <XAxis type="number" domain={[0, 20000]} tickFormatter={(val) => `${val/1000}k`} />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip formatter={(value) => new Intl.NumberFormat('ar-SA').format(value)} />
                <Bar dataKey="العدد التقديري" fill="#22c55e" barSize={30}>
                    <LabelList dataKey="العدد التقديري" position="right" formatter={(value) => new Intl.NumberFormat('ar-SA').format(value)} style={{ fill: '#166534' }} />
                </Bar>
            </BarChart>
        );
        break;
    case 'facilities':
        title = 'العرض مقابل الطلب';
        chart = (
            <BarChart width={200} height={150} data={chartData.facilities}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 200]}/>
                <Tooltip />
                <Bar dataKey="عدد المنشآت" fill="#eab308" name="العرض الحالي" />
                <Bar dataKey="الطلب المتوقع" fill="#fde047" name="الطلب المتوقع" />
            </BarChart>
        );
        break;
    case 'gap':
        title = 'حجم الفجوة السوقية';
        chart = (
            <BarChart width={200} height={150} data={chartData.gap}>
                 <XAxis dataKey="name" hide />
                 <YAxis domain={[0, 80]}/>
                 <Tooltip />
                 <Bar dataKey="العدد المطلوب" fill="#ea580c" name="العدد المطلوب لتغطية الفجوة">
                    <LabelList dataKey="العدد المطلوب" position="top" style={{ fill: '#7c2d12' }}/>
                 </Bar>
            </BarChart>
        );
        break;
    default: chart = null;
  }

  return (
    <motion.div
      className="chart-popup-container"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="close-chart-btn">×</button>
      <h4 className="chart-popup-title">{title}</h4>
      <div className="chart-popup-content">
        <ResponsiveContainer width="100%" height="100%">
            {chart}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const DemographicModal = ({ onClose }) => (
    <motion.div className="demographic-modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="demographic-modal-content" onClick={(e) => e.stopPropagation()} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
            <div className="demographic-modal-header">
                <h3>التحليل الديموغرافي للأحياء المستهدفة</h3>
                <button onClick={onClose} className="close-modal-btn"><X size={20} /></button>
            </div>
            <div className="demographic-table-container">
                <table className="demographic-table">
                    <thead>
                        <tr>
                            <th>الحي</th>
                            <th>عدد السكان التقديري</th>
                            <th>نسبة الأطفال (شهرين–6 سنوات)</th>
                            <th>عدد الأطفال المتوقع</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demographicData.map((row, index) => (
                            <tr key={index} className={row.district === 'المجموع' ? 'total-row' : ''}>
                                <td>{row.district}</td>
                                <td>{row.population}</td>
                                <td>{row.childRatio}</td>
                                <td>{row.childCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    </motion.div>
);

const MarketStudyCard = ({ card, onClick }) => (
  <motion.div
    className="market-study-card"
    style={{ background: card.gradient }}
    onClick={() => onClick(card.id)}
    layoutId={`card-container-${card.id}`}
    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
    transition={{ type: 'spring', damping: 10, stiffness: 300 }}
  >
    {card.icon}
    <h3 className="market-card-title">{card.title}</h3>
    <p className="market-card-value">{card.value}</p>
    <p className="market-card-subtitle">{card.subtitle}</p>
  </motion.div>
);

const MarketStudy = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isDemographicModalOpen, setDemographicModalOpen] = useState(false);

  const handleCardClick = (id) => {
      if (id === 'demographics') {
          setDemographicModalOpen(true);
      } else {
          setSelectedId(id);
      }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="market-study-section">
      <div className="market-study-header">
        <h2>دراسة السوق – شمال الرياض</h2>
        <p>تحليل لأبرز مؤشرات السوق في منطقة شمال الرياض، يوضح حجم الفرصة الاستثمارية.</p>
      </div>
      <motion.div className="market-study-grid" variants={containerVariants} initial="hidden" animate="visible">
        {cards.map((card) => (
            <motion.div variants={cardVariants} key={card.id}>
                <MarketStudyCard card={card} onClick={handleCardClick} />
            </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div className="popup-backdrop" onClick={() => setSelectedId(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ChartPopup cardId={selectedId} onClose={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
          {isDemographicModalOpen && <DemographicModal onClose={() => setDemographicModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default MarketStudy;
