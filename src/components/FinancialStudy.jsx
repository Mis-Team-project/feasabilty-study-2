import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Landmark, TrendingUp, Wallet, Zap, BarChart2 } from 'lucide-react';
import DetailsTable from './DetailsTable'; // Import the new component
import { formatCurrency } from '../utils/helpers'; // Import from helpers
import './FinancialStudy.css';

// --- Data ---

const data = {
  capital: {
    name: 'تكاليف التأسيس',
    items: [
      { name: 'تجهيزات المبنى والأثاث', value: 400000, color: '#3b82f6' },
      { name: 'تجهيزات تقنية ومنصة إلكترونية', value: 200000, color: '#8b5cf6' },
      { name: 'رخص ورسوم', value: 50000, color: '#ec4899' },
      { name: 'احتياطي تشغيل', value: 100000, color: '#f97316' },
      { name: 'أثاث ولوازم تعليمية', value: 200000, color: '#10b981' },
      { name: 'تسويق وإطلاق', value: 200000, color: '#ef4444' },
    ],
    total: 1150000,
  },
  monthlyOp: {
    name: 'التشغيل الشهري',
    items: [
      { name: 'رواتب', value: 150000, color: '#3b82f6' },
      { name: 'إيجار', value: 30000, color: '#8b5cf6' },
      { name: 'مصاريف تشغيلية', value: 20000, color: '#ec4899' },
      { name: 'تسويق وإعلانات', value: 10000, color: '#f97316' },
    ],
    total: 210000,
  },
  revenue: {
    name: 'الإيرادات المتوقعة',
    averageChildRevenue: 1700,
    breakEvenChildren: 150,
    scenarios: [
      { children: 100, price: 1700, name: 'سيناريو 1 (100 طفل)' },
      { children: 150, price: 1700, name: 'سيناريو 2 (نقطة التعادل)' },
      { children: 200, price: 1700, name: 'سيناريو 3 (200 طفل)' },
      { children: 150, price: 2000, name: 'سيناريو 4 (150 طفل بسعر 2000)' },
    ]
  }
};

const getRevenue = (children, price) => children * price;
const getMonthlyCosts = () => data.monthlyOp.total;
const getAnnualCosts = (monthlyCosts) => monthlyCosts * 12;

// Break-even data generation
const generateBreakEvenData = (maxChildren = 300) => {
  const breakEvenData = [];
  const monthlyCosts = getMonthlyCosts();
  const annualCosts = getAnnualCosts(monthlyCosts);

  for (let i = 0; i <= maxChildren; i += 10) {
    const annualRevenue = getRevenue(i, data.revenue.averageChildRevenue) * 12;
    breakEvenData.push({
      children: i,
      revenue: annualRevenue,
      costs: annualCosts,
    });
  }
  return breakEvenData;
};

const breakEvenChartData = generateBreakEvenData();

// Comparative data generation
const generateComparativeData = () => {
  const comparativeData = [];
  const annualCosts = getAnnualCosts(getMonthlyCosts());

  data.revenue.scenarios.forEach(scenario => {
    const annualRevenue = getRevenue(scenario.children, scenario.price) * 12;
    const annualProfit = annualRevenue - annualCosts;
    comparativeData.push({
      name: scenario.name,
      revenue: annualRevenue,
      costs: annualCosts,
      profit: annualProfit,
      children: scenario.children,
      price: scenario.price,
    });
  });
  return comparativeData;
};

const comparativeChartData = generateComparativeData();

// --- Components ---

const StatCard = ({ icon, title, value, color, onClick, isActive }) => (
  <div
    className={`stat-card ${isActive ? 'active' : ''}`}
    style={{ borderBottom: `4px solid ${color}` }}
    onClick={onClick}
  >
    <div className="stat-card-header">
      {icon}
      <span className="stat-card-title">{title}</span>
    </div>
    <p className="stat-card-value">{value}</p>
    <button className="view-chart-button">عرض الرسم البياني</button>
  </div>
);

const PieDoughnutChart = ({ chartData, title }) => {
  const series = chartData.items.map(item => item.value);
  const labels = chartData.items.map(item => item.name);
  const colors = chartData.items.map(item => item.color);

  const options = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      locales: [{
        "name": "ar",
        "options": {
          "months": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
          "shortMonths": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
          "days": ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
          "shortDays": ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
          "toolbar": {
            "exportToSVG": "تصدير SVG",
            "exportToPNG": "تصدير PNG",
            "exportToCSV": "تصدير CSV",
            "menu": "قائمة",
            "selection": "تحديد",
            "selectionZoom": "تكبير التحديد",
            "zoomIn": "تكبير",
            "zoomOut": "تصغير",
            "pan": "تحريك",
            "reset": "إعادة تعيين التكبير"
          }
        }
      }],
      defaultLocale: 'ar',
    },
    labels: labels,
    colors: colors,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend: {
      position: 'bottom',
      fontFamily: 'inherit',
      labels: {
        colors: '#475569',
      }
    },
    dataLabels: {
      formatter: function (val, opts) {
        return opts.w.config.labels[opts.seriesIndex] + ": " + formatCurrency(opts.w.config.series[opts.seriesIndex]);
      },
      style: {
        fontFamily: 'inherit',
        colors: ['#fff'],
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return formatCurrency(value);
        }
      },
      style: {
        fontFamily: 'inherit',
      },
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1e293b',
        fontFamily: 'inherit',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'الإجمالي',
              formatter: function (w) {
                return formatCurrency(w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0));
              },
              style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e293b',
                fontFamily: 'inherit',
              },
            }
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="donut" height={350} />
    </div>
  );
};

const StackedBarComparisonChart = ({ title }) => {
  const series = [{
    name: 'تكاليف التأسيس',
    data: [data.capital.total]
  }, {
    name: 'التشغيل الشهري',
    data: [data.monthlyOp.total]
  }, {
    name: 'الإيرادات المتوقعة (شهريًا)',
    data: [getRevenue(data.revenue.breakEvenChildren, data.revenue.averageChildRevenue)]
  }];

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      fontFamily: 'inherit',
      locales: [{
        "name": "ar",
        "options": {
          "months": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
          "shortMonths": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
          "days": ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
          "shortDays": ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
          "toolbar": {
            "exportToSVG": "تصدير SVG",
            "exportToPNG": "تصدير PNG",
            "exportToCSV": "تصدير CSV",
            "menu": "قائمة",
            "selection": "تحديد",
            "selectionZoom": "تكبير التحديد",
            "zoomIn": "تكبير",
            "zoomOut": "تصغير",
            "pan": "تحريك",
            "reset": "إعادة تعيين التكبير"
          }
        }
      }],
      defaultLocale: 'ar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900,
              fontFamily: 'inherit',
            },
            formatter: function (value) {
              return formatCurrency(value);
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: ['المقارنة الرئيسية'],
      labels: {
        formatter: function (value) {
          return formatCurrency(value);
        },
        style: {
          fontFamily: 'inherit',
          colors: '#475569',
        },
      }
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: 'inherit',
          colors: '#475569',
        },
      },
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
      fontFamily: 'inherit',
      labels: {
        colors: '#475569',
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return formatCurrency(value);
        }
      },
      style: {
        fontFamily: 'inherit',
      },
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1e293b',
        fontFamily: 'inherit',
      },
    },
  };

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

const BreakEvenLineChart = ({ title }) => {
  const series = [{
    name: 'الإيرادات',
    data: breakEvenChartData.map(d => d.revenue)
  }, {
    name: 'التكاليف',
    data: breakEvenChartData.map(d => d.costs)
  }];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      fontFamily: 'inherit',
      locales: [{
        "name": "ar",
        "options": {
          "months": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
          "shortMonths": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
          "days": ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
          "shortDays": ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
          "toolbar": {
            "exportToSVG": "تصدير SVG",
            "exportToPNG": "تصدير PNG",
            "exportToCSV": "تصدير CSV",
            "menu": "قائمة",
            "selection": "تحديد",
            "selectionZoom": "تكبير التحديد",
            "zoomIn": "تكبير",
            "zoomOut": "تصغير",
            "pan": "تحريك",
            "reset": "إعادة تعيين التكبير"
          }
        }
      }],
      defaultLocale: 'ar',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1e293b',
        fontFamily: 'inherit',
      },
    },
    grid: {
      row: {
        colors: ['#f3f4f6', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: breakEvenChartData.map(d => d.children),
      title: {
        text: 'عدد الأطفال',
        style: {
          fontFamily: 'inherit',
          color: '#475569',
        },
      },
      labels: {
        style: {
          fontFamily: 'inherit',
          colors: '#475569',
        },
      },
    },
    yaxis: {
      title: {
        text: 'المبلغ السنوي',
        style: {
          fontFamily: 'inherit',
          color: '#475569',
        },
      },
      labels: {
        formatter: function (value) {
          return formatCurrency(value);
        },
        style: {
          fontFamily: 'inherit',
          colors: '#475569',
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return formatCurrency(value);
        }
      },
      x: {
        formatter: function (value) {
          const dataPoint = breakEvenChartData[value];
          return `عدد الأطفال: ${dataPoint.children}`;
        }
      },
      style: {
        fontFamily: 'inherit',
      },
    },
    markers: {
      size: 5,
      colors: ['#fff'],
      strokeColors: ['#3b82f6', '#ef4444'],
      strokeWidth: 2,
      hover: {
        size: 7,
      }
    },
    annotations: {
      points: [{
        x: data.revenue.breakEvenChildren,
        y: getRevenue(data.revenue.breakEvenChildren, data.revenue.averageChildRevenue) * 12,
        marker: {
          size: 8,
          fillColor: '#fff',
          strokeColor: '#00e396',
          radius: 2,
          cssClass: 'apexcharts-custom-annotation-marker'
        },
        label: {
          borderColor: '#00e396',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#00e396',
            fontFamily: 'inherit',
          },
          text: `نقطة التعادل (${data.revenue.breakEvenChildren} طفل)`
        }
      }]
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'inherit',
      labels: {
        colors: '#475569',
      }
    },
  };

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

const ComparativeScenarioChart = ({ title }) => {
  const categories = comparativeChartData.map(d => d.name);
  const series = [{
    name: 'الإيرادات',
    data: comparativeChartData.map(d => d.revenue)
  }, {
    name: 'التكاليف',
    data: comparativeChartData.map(d => d.costs)
  }, {
    name: 'الربح',
    data: comparativeChartData.map(d => d.profit)
  }];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      fontFamily: 'inherit',
      locales: [{
        "name": "ar",
        "options": {
          "months": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
          "shortMonths": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
          "days": ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
          "shortDays": ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
          "toolbar": {
            "exportToSVG": "تصدير SVG",
            "exportToPNG": "تصدير PNG",
            "exportToCSV": "تصدير CSV",
            "menu": "قائمة",
            "selection": "تحديد",
            "selectionZoom": "تكبير التحديد",
            "zoomIn": "تكبير",
            "zoomOut": "تصغير",
            "pan": "تحريك",
            "reset": "إعادة تعيين التكبير"
          }
        }
      }],
      defaultLocale: 'ar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'السيناريو',
        style: {
          fontFamily: 'inherit',
          color: '#475569',
        },
      },
      labels: {
        style: {
          fontFamily: 'inherit',
          colors: '#475569',
        },
      },
    },
    yaxis: {
      title: {
        text: 'المبلغ السنوي',
        style: {
          fontFamily: 'inherit',
          color: '#475569',
        },
      },
      labels: {
        formatter: function (value) {
          return formatCurrency(value);
        },
        style: {
          fontFamily: 'inherit',
          colors: '#475569',
        },
      },
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return formatCurrency(val);
        }
      },
      style: {
        fontFamily: 'inherit',
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const scenario = comparativeChartData[dataPointIndex];
        return `<div class="apexcharts-tooltip-custom">
                  <div><b>${scenario.name}</b></div>
                  <div>عدد الأطفال: <b>${scenario.children}</b></div>
                  <div>السعر: <b>${formatCurrency(scenario.price)}</b></div>
                  <div>الإيرادات: <b>${formatCurrency(scenario.revenue)}</b></div>
                  <div>التكاليف: <b>${formatCurrency(scenario.costs)}</b></div>
                  <div>الربح: <b>${formatCurrency(scenario.profit)}</b></div>
                </div>`;
      }
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1e293b',
        fontFamily: 'inherit',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'inherit',
      labels: {
        colors: '#475569',
      }
    },
  };

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};


const FinancialStudy = () => {
  const [activeCard, setActiveCard] = useState('capital'); // 'capital', 'monthlyOp', 'revenue'

  const renderChart = () => {
    switch (activeCard) {
      case 'capital':
        return (
          <>
            <DetailsTable data={data.capital} title="تفاصيل تكاليف التأسيس" />
            <PieDoughnutChart chartData={data.capital} title="توزيع تكاليف التأسيس" />
          </>
        );
      case 'monthlyOp':
        return (
          <>
            <DetailsTable data={data.monthlyOp} title="تفاصيل مصاريف التشغيل الشهري" />
            <PieDoughnutChart chartData={data.monthlyOp} title="توزيع مصاريف التشغيل الشهري" />
          </>
        );
      case 'revenue':
        return (
          <>
            <BreakEvenLineChart title="نقطة التعادل (الإيرادات مقابل التكاليف السنوية)" />
            <ComparativeScenarioChart title="مقارنة السيناريوهات" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="financial-study-section">
      <p className="financial-intro">تحليل لأهم المؤشرات المالية للمشروع، بما في ذلك رأس المال المطلوب، والإيرادات والتكاليف السنوية المتوقعة.</p>

      <div className="summary-cards-container">
        <StatCard
          icon={<Wallet size={32} />}
          title="تكاليف التأسيس"
          value={formatCurrency(data.capital.total)}
          color="#3b82f6"
          onClick={() => setActiveCard('capital')}
          isActive={activeCard === 'capital'}
        />
        <StatCard
          icon={<Zap size={32} />}
          title="التشغيل الشهري"
          value={formatCurrency(data.monthlyOp.total)}
          color="#f97316"
          onClick={() => setActiveCard('monthlyOp')}
          isActive={activeCard === 'monthlyOp'}
        />
        <StatCard
          icon={<TrendingUp size={32} />}
          title="الإيرادات المتوقعة"
          value={`${formatCurrency(getRevenue(data.revenue.breakEvenChildren, data.revenue.averageChildRevenue))} شهريًا عند ${data.revenue.breakEvenChildren} طفل`}
          color="#22c55e"
          onClick={() => setActiveCard('revenue')}
          isActive={activeCard === 'revenue'}
        />
      </div>

      <div className="interactive-charts-area">
        {renderChart()}
      </div>

    </div>
  );
};

export default FinancialStudy;
