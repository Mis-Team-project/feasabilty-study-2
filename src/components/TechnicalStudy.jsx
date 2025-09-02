import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, School, ShieldCheck, Building, Tv, ToyBrick, Video, Smartphone, LayoutGrid, X, Lightbulb, PieChart, BarChart2, LineChart, Book, Users, TrendingUp } from 'lucide-react';
import { Pie, Bar, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, Line } from 'recharts';
import './TechnicalStudy.css';

// Data for existing sections
const categories = {
  location: {
    label: 'الموقع والبنية التحتية',
    icon: <MapPin size={40} />,
    description: 'أسس اختيار الموقع وتوزيع المساحات لبيئة مثالية.',
    bgColor: '#bfdbfe', // blue-200
    iconColor: '#2563eb',
    items: [
      { icon: <Building />, title: 'مبنى مستقل', description: 'مساحة لا تقل عن 700م² مع فناء خارجي آمن.' },
      { icon: <LayoutGrid />, title: 'توزيع المساحات', description: 'فصول (40%)، لعب (30%)، إدارة وخدمات (30%).' },
      { icon: <MapPin />, title: 'شمال الرياض', description: 'استهداف أحياء الملقا، الياسمين، والصحافة.' },
    ]
  },
  equipment: {
    label: 'التجهيزات والمرافق',
    icon: <School size={40} />,
    description: 'تجهيزات تعليمية وترفيهية حديثة لتعزيز نمو الأطفال.',
    bgColor: '#dcfce7', // green-200
    iconColor: '#16a34a',
    items: [
      { icon: <ToyBrick />, title: 'وسائل تعليمية وترفيهية', description: 'ألعاب تنمية المهارات، مكتبة أطفال، وسائل حديثة.' },
      { icon: <Tv />, title: 'تجهيزات الفصول', description: 'سبورات تفاعلية، مقاعد مريحة، إضاءة وتهوية جيدة.' },
      { icon: <School />, title: 'المرافق العامة', description: 'عيادة طبية مجهزة، مطبخ مركزي، دورات مياه ملائمة.' },
    ]
  },
  systems: {
    label: 'الأنظمة التقنية والأمنية',
    icon: <ShieldCheck size={40} />,
    description: 'بنية تقنية متكاملة لضمان الأمان والتواصل الفعال.',
    bgColor: '#fee2e2', // red-200
    iconColor: '#dc2626',
    items: [
      { icon: <Video />, title: 'نظام مراقبة شامل', description: 'كاميرات HD تغطي جميع المرافق الداخلية والخارجية.' },
      { icon: <Smartphone />, title: 'منصة تواصل متكاملة', description: 'تطبيق لأولياء الأمور للمتابعة والتواصل المباشر.' },
      { icon: <ShieldCheck />, title: 'نظام أمني للدخول والخروج', description: 'بوابات ذكية وبطاقات تعريفية لزيادة الأمان.' },
    ]
  },
};
const suggestionData = [
    { option: 'فيلا/مجمع فيلل مُحوّل (تجاري)', area: '800–1,200 م²', rent: '250,000–450,000 ريال', pros: 'كلفة إيجار أقل، قرب سكن العائلات', cons: 'أعمال تحويل وسلامة أعلى، مواقف محدودة' },
    { option: 'مبنى تجاري/تعليمي مستقل', area: '1,000–1,500 م²', rent: '500,000–900,000 ريال', pros: 'مساحات أوسع، مواقف أفضل، مسارات حركة أسلم', cons: 'إيجار أعلى، مواصفات اشتراطية صارمة' },
];

// NEW Data for Operational Indicators
const operationalData = [
    {
        id: 'ageGroups',
        title: 'الفئات العمرية',
        content: 'حضانة (0-3 سنوات) + تمهيدي/روضة (3-6 سنوات)',
        icon: <Book size={32} />,
        buttonText: 'عرض الرسم البياني',
        gradient: 'linear-gradient(135deg, #a8d0e6, #f76e79)',
        chartType: 'pie',
        chartData: [
            { name: 'حضانة (0-3)', value: 40, color: '#a8d0e6' },
            { name: 'روضة (3-6)', value: 60, color: '#f76e79' },
        ],
    },
    {
        id: 'capacity',
        title: 'الطاقة الاستيعابية',
        content: '150 طفل (60 حضانة + 90 روضة)',
        icon: <Users size={32} />,
        buttonText: 'عرض الرسم البياني',
        gradient: 'linear-gradient(135deg, #f5d020, #f53803)',
        chartType: 'bar',
        chartData: [
            { name: 'حضانة', value: 60 },
            { name: 'روضة', value: 90 },
        ],
    },
    {
        id: 'occupancy',
        title: 'نسب الإشغال المتوقعة',
        content: 'العام الأول: 60% | العام الثاني: 80% | العام الثالث: 90%',
        icon: <TrendingUp size={32} />,
        buttonText: 'عرض الرسم البياني',
        gradient: 'linear-gradient(135deg, #42e695, #3bb2b8)',
        chartType: 'line',
        chartData: [
            { name: 'العام 1', value: 60 },
            { name: 'العام 2', value: 80 },
            { name: 'العام 3', value: 90 },
        ],
    },
];

const SuggestionModal = ({ onClose }) => (
    <motion.div className="suggestion-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="suggestion-modal-content" onClick={(e) => e.stopPropagation()} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
            <div className="suggestion-modal-header">
                <h3>مقترحات خيارات الموقع</h3>
                <motion.button onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }}><X /></motion.button>
            </div>
            <div className="suggestion-table-container">
                <table className="suggestion-table">
                    <thead><tr><th>الخيار</th><th>المساحة</th><th>الإيجار</th><th>المزايا</th><th>التحديات</th></tr></thead>
                    <tbody>
                        {suggestionData.map((row, index) => (
                            <tr key={index}><td>{row.option}</td><td>{row.area}</td><td>{row.rent}</td><td className="pros-cell">{row.pros}</td><td className="cons-cell">{row.cons}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    </motion.div>
);

const CategoryCard = ({ categoryId, onClick, isSelected }) => {
    const category = categories[categoryId];
    return (
        <motion.div layoutId={`category-card-${categoryId}`} className="category-card" onClick={() => onClick(categoryId)} style={{ backgroundColor: category.bgColor }} variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
            <div className="category-card-icon" style={{ color: category.iconColor }}>{category.icon}</div>
            <h3 className="category-card-label">{category.label}</h3>
            <p className="category-card-description">{category.description}</p>
            {!isSelected && <motion.div className="category-card-prompt">عرض التفاصيل</motion.div>}
        </motion.div>
    );
};

const DetailView = ({ categoryId, onClose, onOpenSuggestionModal }) => {
    const category = categories[categoryId];
    const detailVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
      };
    return (
        <motion.div className="detail-view-container" layoutId={`category-card-${categoryId}`}>
            <motion.div className="detail-view-header" style={{ backgroundColor: category.bgColor }}>
                 <div className="category-card-icon" style={{ color: category.iconColor }}>{category.icon}</div>
                <h3 className="category-card-label">{category.label}</h3>
                 {categoryId === 'location' && (<motion.button className="suggestion-button" onClick={onOpenSuggestionModal} whileHover={{ scale: 1.05 }}><Lightbulb size={18} /><span>عرض الاقتراحات</span></motion.button>)}
                <p className="category-card-description">{category.description}</p>
                <motion.button className="detail-close-button" onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }}><X /></motion.button>
            </motion.div>
            <div className="detail-items-grid">
                {category.items.map((item, index) => (
                    <motion.div key={index} className="detail-item-card" custom={index} variants={detailVariants} initial="hidden" animate="visible">
                         <div className="detail-item-icon" style={{ backgroundColor: category.bgColor, color: category.iconColor }}>{item.icon}</div>
                        <h4 className="detail-item-title">{item.title}</h4>
                        <p className="detail-item-description">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

// NEW Chart Modal Component
const ChartModal = ({ data, onClose }) => {
    const renderChart = () => {
        switch (data.chartType) {
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={data.chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {data.chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip formatter={(value, name) => [value + '%', name]} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 'bar':
                 return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="السعة" fill="#f5d020" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={data.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis unit="%" />
                            <Tooltip formatter={(value) => value + '%'} />
                            <Legend />
                            <Line type="monotone" dataKey="value" name="نسبة الإشغال" stroke="#42e695" strokeWidth={3} />
                        </ComposedChart>
                    </ResponsiveContainer>
                );
            default: return null;
        }
    };
    return (
        <motion.div className="suggestion-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="chart-modal-content" onClick={(e) => e.stopPropagation()} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
                <div className="chart-modal-header">
                    <h3>{data.title}</h3>
                    <motion.button onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }}><X /></motion.button>
                </div>
                <div className="chart-container">
                    {renderChart()}
                </div>
            </motion.div>
        </motion.div>
    );
};


const TechnicalStudy = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSuggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [activeChart, setActiveChart] = useState(null); // NEW state for chart modal

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  
  const cardVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: (i) => ({ 
          opacity: 1, 
          y: 0, 
          transition: { delay: i * 0.2, duration: 0.5 } 
      })
  };

  return (
    <div className="technical-study-section">
      <div className="technical-study-header">
        <h2>الدراسة الفنية والتشغيلية</h2>
        <p>نظرة متعمقة على المواصفات الفنية والبنية التحتية اللازمة لتأسيس مركز رعاية أطفال نموذجي وآمن.</p>
      </div>

      <motion.div className="categories-container" variants={containerVariants} initial="hidden" animate="visible">
        {Object.keys(categories).map((catId) => (
            <CategoryCard key={catId} categoryId={catId} onClick={setSelectedCategory} isSelected={selectedCategory === catId}/>
        ))}
      </motion.div>
      
      {/* NEW Operational Indicators Section */}
      <div className="operational-indicators-section">
          <div className="technical-study-header">
              <h3>أبرز المؤشرات التشغيلية</h3>
              <p>تحليل لأهم الأرقام التي تشكل أساس الخطة التشغيلية للمركز.</p>
          </div>
          <div className="operational-cards-container">
              {operationalData.map((card, i) => (
                  <motion.div 
                    key={card.id} 
                    className="op-card" 
                    style={{ background: card.gradient }}
                    variants={cardVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -10, boxShadow: '0 20px 30px rgba(0,0,0,0.15)' }}
                  >
                      <div className="op-card-icon">{card.icon}</div>
                      <h4 className="op-card-title">{card.title}</h4>
                      <p className="op-card-content">{card.content}</p>
                      <motion.button 
                        className="op-card-button" 
                        onClick={() => setActiveChart(card)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                          {card.buttonText}
                      </motion.button>
                  </motion.div>
              ))}
          </div>
      </div>

      <AnimatePresence>
        {selectedCategory && (
            <motion.div className="detail-view-backdrop" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={() => setSelectedCategory(null)}>
                 <DetailView categoryId={selectedCategory} onClose={() => setSelectedCategory(null)} onOpenSuggestionModal={() => setSuggestionModalOpen(true)} />
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSuggestionModalOpen && <SuggestionModal onClose={() => setSuggestionModalOpen(false)} />}
      </AnimatePresence>
      
      <AnimatePresence>
          {activeChart && <ChartModal data={activeChart} onClose={() => setActiveChart(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default TechnicalStudy;
