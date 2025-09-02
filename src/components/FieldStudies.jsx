import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Users, TrendingUp, Shield, Handshake } from 'lucide-react';
import './FieldStudies.css';

const studies = [
  {
    icon: <ClipboardCheck />,
    title: 'دراسة استبيانية لأولياء الأمور',
    description: 'تصميم وتوزيع استبيانات على عينة من أولياء الأمور في شمال الرياض لقياس مدى اهتمامهم بجودة التعليم المبكر، وما هي أهم الخدمات التي يبحثون عنها في مراكز الرعاية.',
    color: '#3498db'
  },
  {
    icon: <Users />,
    title: 'مقابلات مع مديري المراكز الحالية',
    description: 'إجراء مقابلات معمقة مع مديري عدد من المراكز المنافسة لفهم نماذج عملهم، والتحديات التي تواجههم، وأبرز نقاط القوة والضعف في السوق الحالي.',
    color: '#e67e22'
  },
  {
    icon: <TrendingUp />,
    title: 'تحليل ديموغرافي واقتصادي للأحياء',
    description: 'دراسة التركيبة السكانية ومستوى الدخل في الأحياء المستهدفة (مثل الملقا، الياسمين، الصحافة) لتحديد مدى تطابقها مع الشريحة المستهدفة للمشروع.',
    color: '#2ecc71'
  },
  {
    icon: <Shield />,
    title: 'تقييم العقارات المتاحة',
    description: 'مسح ميداني للعقارات المعروضة للإيجار أو البيع والتي تتناسب مع متطلبات المشروع من حيث المساحة والموقع والتراخيص المحتملة.',
    color: '#9b59b6'
  },
    {
    icon: <Handshake />,
    title: 'دراسة الشراكات المحتملة',
    description: 'بحث إمكانية عقد شراكات مع جهات تكميلية مثل عيادات الأطفال، أو مراكز العلاج الطبيعي، أو الأندية الرياضية لتقديم خدمات ذات قيمة مضافة.',
    color: '#f1c40f'
  },
];

const FieldStudies = () => {
  return (
    <div className="field-studies-container">
      <div className="field-studies-header">
        <h2>الدراسات الميدانية المقترحة</h2>
        <p>مجموعة من الدراسات الميدانية الموصى بها للحصول على رؤية شاملة وعميقة للسوق قبل اتخاذ قرارات استثمارية نهائية.</p>
      </div>
      <div className="field-studies-grid">
        {studies.map((study, index) => (
          <motion.div
            key={index}
            className="study-card"
            style={{ borderTopColor: study.color }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="study-card-icon" style={{ backgroundColor: study.color }}>
              {study.icon}
            </div>
            <h3 className="study-card-title">{study.title}</h3>
            <p className="study-card-description">{study.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FieldStudies;
