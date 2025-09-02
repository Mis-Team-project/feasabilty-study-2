import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, Wrench, Sparkles, Truck, Calculator, Wallet,
    Clipboard, Book, Heart, Shield, ChevronDown 
} from 'lucide-react';
import './OrgChart.css';

const orgData = {
  topLevel: {
    name: 'مدير عام',
    count: 1,
    icon: Briefcase,
    tasks: 'الإشراف العام وتحديد التوجه الاستراتيجي للمركز.',
  },
  departments: [
    {
      title: 'الإدارة المساندة',
      color: '#8D99AE',
      icon: Wrench,
      roles: [
        { name: 'دعم فني', count: 1, icon: Wrench, tasks: 'صيانة الأنظمة التقنية والتجهيزات.' },
        { name: 'نظافة', count: 2, icon: Sparkles, tasks: 'الحفاظ على نظافة وصيانة مرافق المركز.' },
        { name: 'سائقين للخدمات اللوجستية', count: 2, icon: Truck, tasks: 'توفير النقل الآمن والخدمات اللوجستية.' },
      ],
    },
    {
      title: 'الإدارة المالية',
      color: '#3498db',
      icon: Calculator,
      roles: [
        { name: 'محاسب', count: 1, icon: Calculator, tasks: 'إدارة الشؤون المالية، المحاسبة، والميزانيات.' },
        { name: 'أمين صندوق', count: 1, icon: Wallet, tasks: 'مسؤول عن حفظ وإدارة النقدية والصندوق.' },
      ],
    },
    {
      title: 'إدارة الحضانة والروضة',
      color: '#2ecc71',
      icon: Heart,
      roles: [
        { name: 'منسقة', count: 1, icon: Clipboard, tasks: 'تنسيق العمليات اليومية والبرامج التعليمية.' },
        { name: 'معلمات', count: 6, icon: Book, tasks: 'تطبيق المناهج التعليمية وتطوير قدرات الأطفال.' },
        { name: 'مربيات', count: 4, icon: Heart, tasks: 'توفير الرعاية اليومية والأمان للأطفال.' },
        { name: 'موظفة صحة وسلامة', count: 1, icon: Shield, tasks: 'ضمان بيئة صحية وآمنة وتطبيق معايير السلامة.' },
      ],
    },
  ]
};

const RoleCard = ({ role }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div 
            className="role-card" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // The `layout` prop was removed here to prevent text scaling issues.
        >
            <role.icon className="role-icon" size={24} />
            <span className="role-name">{role.name} ({role.count})</span>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="role-tooltip"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <p>{role.tasks}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Department = ({ dept }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <motion.div className="department-node" layout>
            <motion.div 
                className="department-header"
                onClick={() => setIsOpen(!isOpen)} 
                style={{ '--dept-color': dept.color }}
                layout
            >
                <dept.icon size={22} />
                <h3 className="department-title">{dept.title}</h3>
                <motion.div animate={{ rotate: isOpen ? 0 : -90 }}>
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
            <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="department-roles"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    // The `layout` prop was removed here as well.
                >
                    {dept.roles.map(role => <RoleCard key={role.name} role={role} />)}
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    )
}

const OrgChart = () => {
  const { topLevel, departments } = orgData;

  return (
    <div className="org-chart-container">
      <motion.div className="top-level-node" layout>
          <div className="top-level-card">
            <topLevel.icon className="role-icon" size={28} />
            <span className="role-name">{topLevel.name} ({topLevel.count})</span>
          </div>
      </motion.div>

      <div className="departments-container">
        {departments.map(dept => (
            <Department key={dept.title} dept={dept} />
        ))}
      </div>
    </div>
  );
};

export default OrgChart;
