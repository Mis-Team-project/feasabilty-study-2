import React from 'react';
import { School, Home, Banknote, BarChart, MapPin } from 'lucide-react';
import './FieldStudies.css';

const nurseriesData = [
    { name: 'الملقا', count: '12-15', density: 'high', competition: 'مرتفعة', type: 'أهلي/عالمي' },
    { name: 'حطين', count: '8-10', density: 'medium', competition: 'متوسطة', type: 'أهلي' },
    { name: 'القيروان', count: '7-9', density: 'medium', competition: 'متوسطة', type: 'أهلي/حكومي' },
    { name: 'الياسمين', count: '10-12', density: 'high', competition: 'مرتفعة', type: 'أهلي/عالمي' },
    { name: 'العارض', count: '6-8', density: 'low', competition: 'منخفضة', type: 'أهلي/حكومي' },
    { name: 'الصحافة', count: '9-11', density: 'medium', competition: 'متوسطة إلى مرتفعة', type: 'أهلي' },
    { name: 'الربيع', count: '7-9', density: 'medium', competition: 'متوسطة', type: 'أهلي' },
    { name: 'الفلاح', count: '5-7', density: 'low', competition: 'منخفضة', type: 'أهلي/حكومي' },
    { name: 'الندى', count: '6-8', density: 'low', competition: 'منخفضة', type: 'أهلي' },
    { name: 'النرجس', count: '10-12', density: 'high', competition: 'مرتفعة', type: 'أهلي/عالمي' },
];

const purchasingPowerData = [
    { name: 'الملقا', rent: '34,000 - 53,000', income: '22,000 - 28,000', level: 'high' },
    { name: 'حطين', rent: '32,000 - 55,000', income: '21,000 - 27,000', level: 'high' },
    { name: 'القيروان', rent: '33,000', income: '20,000 - 25,000', level: 'medium-high' },
    { name: 'الياسمين', rent: '32,000', income: '20,000 - 24,000', level: 'medium-high' },
    { name: 'العارض', rent: '25,000', income: '16,000 - 20,000', level: 'medium' },
    { name: 'الصحافة', rent: '28,000', income: '18,000 - 22,000', level: 'medium' },
    { name: 'الربيع', rent: '33,000', income: '20,000 - 25,000', level: 'medium-high' },
    { name: 'الفلاح', rent: '22,000', income: '14,000 - 18,000', level: 'medium-low' },
    { name: 'الندى', rent: '26,000', income: '16,000 - 20,000', level: 'medium' },
    { name: 'النرجس', rent: '30,000', income: '18,000 - 22,000', level: 'medium-high' },
];

const getDensityColor = (density) => {
  switch (density) {
    case 'high': return 'density-high';
    case 'medium': return 'density-medium';
    case 'low': return 'density-low';
    default: return '';
  }
};

const getPowerColor = (level) => {
  switch (level) {
    case 'high': return 'power-high';
    case 'medium-high': return 'power-medium-high';
    case 'medium': return 'power-medium';
    case 'medium-low': return 'power-medium-low';
    default: return '';
  }
};

const NeighborhoodCard = ({ data, type }) => {
  const isNurseries = type === 'nurseries';
  const colorClass = isNurseries ? getDensityColor(data.density) : getPowerColor(data.level);

  return (
    <div className={`neighborhood-card ${colorClass}`}>
      <div className="card-header">
        <h4 className="neighborhood-name">{data.name}</h4>
        <a href={`https://www.google.com/maps/search/?api=1&query=${data.name},+Riyadh`} target="_blank" rel="noopener noreferrer" className="map-link">
          <MapPin size={16} />
          <span>خريطة</span>
        </a>
      </div>
      
      {isNurseries ? (
        <div className="card-content">
          <div className="stat-item">
            <School size={20} className="stat-icon" />
            <span className="stat-label">العدد التقديري:</span>
            <span className="stat-value count-badge">{data.count}</span>
          </div>
          <div className="hover-details">
            <p><strong>نوعية الروضات:</strong> {data.type}</p>
            <p><strong>المنافسة:</strong> {data.competition}</p>
          </div>
        </div>
      ) : (
        <div className="card-content">
          <div className="stat-item">
            <Home size={18} className="stat-icon" />
            <span className="stat-label">الإيجار السنوي:</span>
            <span className="stat-value">{data.rent} SAR</span>
          </div>
          <div className="stat-item">
            <Banknote size={18} className="stat-icon" />
            <span className="stat-label">الدخل الشهري للأسرة:</span>
            <span className="stat-value">{data.income} SAR</span>
          </div>
          <div className="stat-item power-level-item">
            <BarChart size={18} className="stat-icon" />
            <span className="stat-label">القدرة الشرائية:</span>
            <span className={`stat-value power-level-badge`}>{data.level.replace('-', ' ')}</span>
          </div>
        </div>
      )}

      <div className="card-footer">
        <p>تحليل تقديري للبيانات</p>
      </div>
    </div>
  );
};

const FieldStudies = () => {
  return (
    <div className="field-studies-section">
      <div className="main-header-container">
        <h2 className="main-title">الدراسات الميدانية: أحياء شمال الرياض</h2>
        <p className="main-subtitle">تحليل مقارن لكثافة المراكز التعليمية والقدرة الشرائية في الأحياء المستهدفة.</p>
      </div>

      <div className="subsection-container">
        <h3 className="subsection-title">كثافة الحضانات ورياض الأطفال</h3>
        <div className="neighborhood-grid">
          {nurseriesData.map((data, index) => (
            <NeighborhoodCard key={index} data={data} type="nurseries" />
          ))}
        </div>
      </div>

      <div className="subsection-container">
        <h3 className="subsection-title">تحليل القدرة الشرائية</h3>
        <div className="neighborhood-grid">
          {purchasingPowerData.map((data, index) => (
            <NeighborhoodCard key={index} data={data} type="purchasingPower" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldStudies;
