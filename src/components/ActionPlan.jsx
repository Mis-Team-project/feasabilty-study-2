import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  ClipboardList,
  Building,
  Paintbrush,
  Landmark,
  Users,
  Megaphone,
  HardHat,
  PartyPopper
} from 'lucide-react';
import './ActionPlan.css';

const timelineData = [
  {
    phase: 'التحضير والتخطيط',
    icon: <ClipboardList />,
    duration: 'أسبوعان',
    color: '#3498db',
    activities: [
      'اعتماد دراسة الجدوى النهائية',
      'تحديد الحي المستهدف والموقع المبدئي',
      'وضع خطة تمويل وجدولة التدفقات النقدية',
    ],
  },
  {
    phase: 'اختيار الموقع والتعاقد',
    icon: <Building />,
    duration: '3 أسابيع',
    color: '#e67e22',
    activities: [
      'جولات ميدانية لمعاينة العقارات',
      'التفاوض على الإيجار وتوقيع العقد',
      'الحصول على المخططات الهندسية',
    ],
  },
  {
    phase: 'التصميم والتجهيز',
    icon: <Paintbrush />,
    duration: '8 أسابيع',
    color: '#9b59b6',
    activities: [
      'تصميم داخلي وخارجي وفق معايير وزارة التعليم والدفاع المدني',
      'شراء الأثاث والتجهيزات التعليمية',
      'تركيب أنظمة السلامة والمراقبة',
    ],
  },
  {
    phase: 'التراخيص والموافقات',
    icon: <Landmark />,
    duration: '4 أسابيع',
    note: '(بالتوازي مع التجهيز)',
    color: '#e74c3c',
    activities: [
      'التقديم لوزارة التعليم، البلدية، الدفاع المدني، وزارة الصحة',
      'دفع الرسوم واستكمال الفحوصات',
    ],
  },
  {
    phase: 'التوظيف والتدريب',
    icon: <Users />,
    duration: '3 أسابيع',
    color: '#16a085',
    activities: [
      'استقطاب الكادر التعليمي والإداري',
      'تدريب على المنهج، الصحة والسلامة، واستخدام المنصة التقنية',
    ],
  },
  {
    phase: 'التسويق المسبق',
    icon: <Megaphone />,
    duration: '4 أسابيع',
    note: '(متداخل مع التوظيف)',
    color: '#f1c40f',
    activities: [
      'إطلاق حملة تعريفية في الحي المستهدف',
      'عروض تسجيل مبكر',
      'تفعيل الموقع الإلكتروني والتطبيق',
    ],
  },
  {
    phase: 'التشغيل التجريبي',
    icon: <HardHat />,
    duration: 'أسبوع',
    color: '#2980b9',
    activities: [
      'استقبال عدد محدود من الأطفال',
      'اختبار الأنظمة التشغيلية والتقنية',
    ],
  },
  {
    phase: 'الافتتاح الرسمي',
    icon: <PartyPopper />,
    duration: 'يوم الافتتاح',
    color: '#2ecc71',
    activities: [
      'فعالية افتتاحية ودعوة الأهالي ووسائل الإعلام المحلية',
    ],
  },
];

const ActionPlan = () => {
  return (
    <div className="action-plan-container">
      <div className="action-plan-header">
        <h2>خطة العمل التشغيلية</h2>
        <p>جدول زمني أفقي يوضح المراحل الرئيسية لإطلاق المشروع من الفكرة إلى الافتتاح.</p>
      </div>
      <div className="horizontal-timeline">
        <div className="timeline-line"></div>
        {timelineData.map((item, index) => (
          <motion.div 
            className="timeline-item"
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className="timeline-content" style={{borderColor: item.color}}>
              <div className="timeline-header">
                  <div className="timeline-icon" style={{ backgroundColor: item.color }}>
                      {item.icon}
                  </div>
                  <div className="timeline-duration">
                      <span>{item.duration}</span>
                      {item.note && <small>{item.note}</small>}
                  </div>
              </div>
              <h3 className="timeline-phase">{item.phase}</h3>
              <ul className="timeline-activities">
                {item.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>
            <div className="timeline-dot" style={{ backgroundColor: item.color }}></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActionPlan;
