import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Calculator, Users, Book, Heart, ShieldCheck, 
    Wrench, Trash2, Truck, UserPlus, DollarSign
} from 'lucide-react';
import './HumanStructure.css';

const structure = [
    {
      level: 'المستوى الأول: الإدارة العليا',
      roles: [
        { 
          name: 'مدير عام', 
          count: 1, 
          icon: User, 
          color: '#2980b9', 
          description: 'الإشراف العام وتحديد التوجه الاستراتيجي للمركز.',
          salary: 'بدون راتب محدد'
        }
      ]
    },
    {
      level: 'المستوى الثاني: الإدارة المالية والتنسيق',
      roles: [
        { 
          name: 'محاسب', 
          count: 1, 
          icon: Calculator, 
          color: '#27ae60', 
          description: 'إدارة الشؤون المالية، المحاسبة، والميزانيات.',
          salary: '5,000 ريال'
        },
        { 
          name: 'منسق إداري', 
          count: 1, 
          icon: Users, 
          color: '#f39c12', 
          description: 'متابعة شؤون الموظفين الإدارية والتوظيف.',
          salary: '3,500 ريال'
        }
      ]
    },
    {
      level: 'المستوى الثالث: الفريق التعليمي والطبي',
      roles: [
        { 
          name: 'معلمات متخصصات', 
          count: 6, 
          icon: Book, 
          color: '#8e44ad', 
          description: 'تطبيق المناهج التعليمية وتطوير قدرات الأطفال.',
          salary: 'من 4,000 ريال'
        },
        { 
          name: 'مربيات وحاضنات', 
          count: 4, 
          icon: Heart, 
          color: '#c0392b', 
          description: 'توفير الرعاية اليومية والأمان للأطفال.',
          salary: '1,500 - 2,000 ريال'
        },
        { 
          name: 'موظفة صحة وسلامة', 
          count: 1, 
          icon: ShieldCheck, 
          color: '#16a085', 
          description: 'ضمان بيئة صحية وآمنة وتطبيق معايير السلامة.',
          salary: '5,500 ريال'
        },
        { 
          name: 'مساعدات ثانويات', 
          count: 3, 
          icon: UserPlus, 
          color: '#d35400', 
          description: 'دعم ومساندة الفريق التعليمي في المهام اليومية.',
          salary: 'من 3,000 ريال'
        }
      ]
    },
    {
      level: 'المستوى الرابع: الدعم الفني واللوجستي',
      roles: [
        { 
          name: 'دعم فني', 
          count: 1, 
          icon: Wrench, 
          color: '#2c3e50', 
          description: 'صيانة الأنظمة التقنية والتجهيزات.',
          salary: '3,000 ريال'
        },
        { 
          name: 'عمال نظافة', 
          count: 2, 
          icon: Trash2, 
          color: '#7f8c8d', 
          description: 'الحفاظ على نظافة وصيانة مرافق المركز.',
          salary: '1,200 ريال'
        },
        { 
          name: 'سائقين', 
          count: 2, 
          icon: Truck, 
          color: '#d35400', 
          description: 'توفير النقل الآمن والخدمات اللوجستية.',
          salary: '2,500 ريال'
        }
      ]
    }
  ];

const Tooltip = ({ data, position }) => {
  if (!data) return null;

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: 'translate(-50%, -110%)',
  };

  return (
    <motion.div
      className="fixed-tooltip"
      style={style}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <p><strong>العدد:</strong> {data.count}</p>
      <p><strong>طبيعة المهام:</strong> {data.description}</p>
    </motion.div>
  );
};

const HumanStructure = () => {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showSalaries, setShowSalaries] = useState(false);

  const handleMouseEnter = (role, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipData(role);
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <div className="human-structure-container">
      <div className="human-structure-header">
        <h2>الهيكل البشري</h2>
        <p>توزيع الكوادر البشرية المقترحة للمشروع.</p>
      </div>
      <Tooltip data={tooltipData} position={tooltipPos} />

      {structure.map((level, index) => (
        <motion.div 
          key={index} 
          className="level"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <h2 className="level-title">{level.level}</h2>
          <div className="level-roles">
            {level.roles.map(role => (
              <div 
                key={role.name} 
                className="role-group-wrapper"
                onMouseEnter={(e) => handleMouseEnter(role, e)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div 
                  className="role-group"
                  style={{ '--role-color': role.color }}
                  whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="role-title">{role.name}</h3>
                  <div className="employee-icons">
                    {Array.from({ length: role.count }).map((_, i) => (
                      <motion.div key={i} className="employee-icon" whileHover={{ scale: 1.15 }}>
                        <role.icon size={24} />
                      </motion.div>
                    ))}
                  </div>
                  <AnimatePresence>
                    {showSalaries && (
                      <motion.div 
                        className="role-salary-info"
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0, marginTop: 10, paddingTop: 10 }}
                        exit={{ opacity: 0, height: 0, y: -10, marginTop: 0, paddingTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <span>الراتب: <strong>{role.salary}</strong></span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="salary-button-container">
        <motion.button 
            className="salary-button" 
            onClick={() => setShowSalaries(!showSalaries)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <DollarSign size={20} />
            {showSalaries ? 'إخفاء الرواتب' : 'عرض الرواتب'}
        </motion.button>
      </div>
        
      <div className="ajir-note-bottom">
          <p><strong>ملاحظة:</strong> يمكن توظيف العمالة الأجنبية في بعض التخصصات عبر منصة "أجير" بتكاليف قد تكون أقل.</p>
      </div>
    </div>
  );
};

export default HumanStructure;
