import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Book, Target, FileText, Network, BarChart3, Tags, ShieldCheck, Wrench,
  Users, Calculator, MonitorSmartphone, AlertTriangle,
  ClipboardList, TrendingUp, Table, FileBarChart, Map, Menu, X,
  CheckCircle2, Rss, Route
} from 'lucide-react';
import OrgChart from './components/OrgChart';
import MarketStudy from './components/MarketStudy';
import Pricing from './components/Pricing';
import LegalStudy from './components/LegalStudy';
import TechnicalStudy from './components/TechnicalStudy';
import HumanStructure from './components/HumanStructure';
import FinancialStudy from './components/FinancialStudy';
import WebAppSection from './components/WebAppSection';
import RisksAndSolutions from './components/RisksAndSolutions';
import MonthlyResults from './components/MonthlyResults';
import AnnualSummary from './components/AnnualSummary';
import ActionPlan from './components/ActionPlan';
import FieldStudy from './components/FieldStudy';
import FieldStudies from './components/FieldStudies';
import ModelSummary from './components/ModelSummary';
import KeyMetrics from './components/KeyMetrics';
import Footer from './components/Footer';
import AnimatedTitle from './components/AnimatedTitle';
import './App.css';

const sections = [
  { id: 'cover', title: 'الغلاف', icon: Book },
  { id: 'intro', title: 'الحديث عن المشروع وأهميته وفق رؤية 2030', icon: Target },
  { id: 'summary', title: 'الملخص التنفيذي', icon: FileText },
  { id: 'structure', title: 'الهيكل الإداري والتنظيمي', icon: Network },
  { id: 'market-study', title: 'دراسة السوق – شمال الرياض', icon: BarChart3 },
  { id: 'pricing', title: 'التسعير المرجعي', icon: Tags },
  { id: 'legal', title: 'الدراسة القانونية والتنظيمية', icon: ShieldCheck },
  { id: 'technical', title: 'الدراسة الفنية والتشغيلية', icon: Wrench },
  { id: 'hr', title: 'الهيكل البشري', icon: Users },
  { id: 'financials', title: 'الدراسة الاقتصادية والمالية (تقديرية)', icon: Calculator },
  { id: 'app', title: 'إنشاء موقع وتطبيق', icon: MonitorSmartphone },
  { id: 'risks', title: 'المخاطر والحلول', icon: AlertTriangle },
  { id: 'monthly-results', title: 'النتائج الشهرية (سنة أولى – مختصر)', icon: Table },
  { id: 'annual-summary', title: 'الملخص السنوي (3 سنوات)', icon: FileBarChart },
  { id: 'model-summary', title: 'ملخص النموذج', icon: ClipboardList },
  { id: 'indicators', title: 'أهم المؤشرات', icon: TrendingUp },
  { id: 'divider-1', type: 'divider' },
  { id: 'field-studies-main', title: 'الدراسات الميدانية', icon: Map },
  { id: 'divider-2', type: 'divider' },
  { id: 'action-plan', title: 'خطة العمل التشغيلية', icon: Rss },
  { id: 'field-study-locations', title: 'ترشيح المواقع الأنسب', icon: Route },
];

const SectionContent = ({ id }) => {
  if (id === 'intro') {
    const points = [
      'توفير بيئة تعليمية آمنة ومتطورة للأطفال من عمر سنتين حتى ست سنوات.',
      'تمكين المرأة بزيادة فرص مشاركتها في سوق العمل عبر توفير رعاية موثوقة لأطفالها.',
      'تعزيز الابتكار في التعليم المبكر باستخدام التقنية والتحول الرقمي.'
    ];
    return (
      <div className="custom-content-container">
        <div className="highlight-box">
          <p>يدعم هذا المشروع محور تنمية رأس المال البشري في رؤية المملكة 2030 من خلال:</p>
        </div>
        <ul className="bullet-points-list">
          {points.map((point, index) => (
            <li key={index} className="bullet-point-item">
              <CheckCircle2 className="bullet-icon" size={22} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (id === 'summary') {
    const summaryData = [
      { label: 'الأثر التنموي', content: 'يساهم المشروع في رفع جودة التعليم المبكر، وتقليل الفجوة التعليمية بين المراحل العمرية، ودعم مشاركة المرأة في الاقتصاد.' },
      { label: 'نموذج المشروع', content: 'حضانة + روضة في مبنى مستأجر بمساحة 650–800 م²، تجهيزات تعليمية حديثة، برنامج يومي متكامل.' },
      { label: 'الميزة التنافسية', content: '- منصة إلكترونية وتطبيق للأهالي.<br>- كادر مؤهل ومعتمد.<br>- برنامج صحي وسلامة شامل.<br>- دعم لوجستي داخلي.' },
      { label: 'هدف السنة الأولى', content: 'الوصول لـ 150–170 طفل بنسبة إشغال 75% وتحقيق نقطة التعادل بنهاية العام.' },
    ];

    return (
      <div className="table-container">
        <table className="summary-table">
          <tbody>
            {summaryData.map((row, index) => (
              <tr key={index}>
                <td>{row.label}</td>
                <td dangerouslySetInnerHTML={{ __html: row.content }}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Render correct components based on ID
  if (id === 'structure') { return <OrgChart />; }
  if (id === 'market-study') { return <MarketStudy />; }
  if (id === 'pricing') { return <Pricing />; }
  if (id === 'legal') { return <LegalStudy />; }
  if (id === 'technical') { return <TechnicalStudy />; }
  if (id === 'hr') { return <HumanStructure />; } 
  if (id === 'financials') { return <FinancialStudy />; }
  if (id === 'app') { return <WebAppSection />; }
  if (id === 'risks') { return <RisksAndSolutions />; } 
  if (id === 'monthly-results') { return <MonthlyResults />; }
  if (id === 'annual-summary') { return <AnnualSummary />; }
  if (id === 'action-plan') { return <ActionPlan />; }
  if (id === 'field-study-locations') { return <FieldStudy />; }
  if (id === 'field-studies-main') { return <FieldStudies />; }
  if (id === 'model-summary') { return <ModelSummary />; }
  if (id === 'indicators') { return <KeyMetrics />; } 


  // Default content
  return <div><p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.</p></div>;
};

const AnimatedSection = ({ children, id, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section id={id} ref={ref} className={className} initial="hidden" animate={controls}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      {children}
    </motion.section>
  );
};

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNavVisible, setNavVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('cover');
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) setNavVisible(false);
    else setNavVisible(true);
    lastScrollY.current = currentScrollY;

    const scrollPosition = currentScrollY + window.innerHeight / 2.5;
    for (const section of sections) {
        if(section.type === 'divider') continue;
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
            setActiveSection(section.id);
            break;
        }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(false);
  };

  const contentVariants = { visible: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="App">
      <motion.nav className="navbar" animate={{ top: isNavVisible ? 0 : -80 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
        <div className="menu-icon" onClick={toggleSidebar}><Menu size={28} /></div>
      </motion.nav>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header"><button onClick={toggleSidebar} className="close-btn"><X size={24} /></button></div>
        <ul className="sidebar-links">
          {sections.map(({ id, title, icon: Icon, type }) => {
            if (type === 'divider') {
              return <li key={id} className="sidebar-divider"></li>;
            }
            return (
              <li key={id} onClick={() => scrollToSection(id)} className={activeSection === id ? 'active-link' : ''}>
                <Icon className="link-icon" size={20} />
                <span>{title}</span>
              </li>
            );
          })}
        </ul>
      </aside>
      
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <main className="main-content">
        {sections.map(({ id, title, icon: Icon, type }) => {
          if(type === 'divider') return null;
          if(id === 'cover') return (
              <section key={id} id={id} className="page-card cover-section">
                  {/* Cover content doesn't need a title */}
              </section>
          )

          const cardClassName = `page-card`;

          return (
            <AnimatedSection key={id} id={id} className={cardClassName}>
              <motion.div variants={contentVariants}>
                <AnimatedTitle title={title} icon={Icon} />
                <motion.div className="section-content">
                  <SectionContent id={id} />
                </motion.div>
              </motion.div>
            </AnimatedSection>
          )
        })}
      </main>
      <Footer />
    </div>
  );
}

export default App;
