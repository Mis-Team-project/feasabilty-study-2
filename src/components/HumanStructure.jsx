import React from 'react';
import { motion } from 'framer-motion';
import { UserSquare, Briefcase, UserCog, School, Baby, HeartPulse, Laptop, Trash2, Car } from 'lucide-react';
import './HumanStructure.css';

const structureData = [
  {
    level: 1,
    roles: [
      { title: 'مدير عام', count: 1, nature: 'إدارة عامة وإشراف', icon: UserSquare, color: '#8e44ad' },
    ],
  },
  {
    level: 2,
    roles: [
      { title: 'محاسب', count: 1, nature: 'إدارة مالية', icon: Briefcase, color: '#2980b9' },
      { title: 'منسقة شؤون موظفين', count: 1, nature: 'إدارة الموارد البشرية', icon: UserCog, color: '#27ae60' },
    ],
  },
  {
    level: 3,
    roles: [
      { title: 'معلمات', count: 6, nature: 'تعليم الأطفال وتطوير المهارات', icon: School, color: '#f39c12' },
      { title: 'مربيات وحاضنات', count: 4, nature: 'رعاية يومية مباشرة للأطفال', icon: Baby, color: '#c0392b' },
      { title: 'موظفة صحة وسلامة', count: 1, nature: 'ضمان بيئة آمنة وصحية', icon: HeartPulse, color: '#d35400' },
    ],
  },
  {
    level: 4,
    roles: [
      { title: 'دعم فني', count: 1, nature: 'صيانة الأنظمة التقنية والتطبيق', icon: Laptop, color: '#34495e' },
      { title: 'نظافة وصيانة', count: 2, nature: 'الحفاظ على نظافة وصيانة المرافق', icon: Trash2, color: '#7f8c8d' },
      { title: 'سائقين', count: 2, nature: 'توفير خدمة النقل بأمان', icon: Car, color: '#95a5a6' },
    ],
  },
];

const RoleGroup = ({ role }) => {
  const { title, count, nature, icon: Icon, color } = role;

  return (
    <motion.div className="role-group-wrapper">
      <div className="role-group" style={{ '--role-color': color }}>
        <div className="role-identity">
          <Icon className="role-main-icon" />
          <h4 className="role-title-text">{title}</h4>
        </div>
        <div className="employee-icon-container">
          {Array.from({ length: count }).map((_, i) => (
            <Icon key={i} className="employee-icon" />
          ))}
        </div>
      </div>
      <div className="role-tooltip">
        <p><strong>{title}</strong></p>
        <p>العدد: {count}</p>
        <p>طبيعة العمل: {nature}</p>
      </div>
    </motion.div>
  );
};


const HumanStructure = () => {
  return (
    <div className="human-structure-container">
      {structureData.map((levelData) => (
        <div className="level" key={levelData.level}>
          <div className="level-line"></div>
          <div className="roles-container">
            {levelData.roles.map(role => (
              <RoleGroup key={role.title} role={role} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HumanStructure;
