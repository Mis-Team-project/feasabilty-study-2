import React from 'react';
import Chart from 'react-apexcharts';

const CustomBarChart = ({ data, title }) => {
  // Assuming data for bar chart will be in a format like:
  // [{ name: 'Scenario 1', revenue: 100000, costs: 50000, profit: 50000 }, ...]
  // Or for line chart: [{ month: 'يناير', revenue: 10000, costs: 8000 }, ...]

  // For simplicity, let's create a basic stacked bar chart with placeholder data structure
  // This will be adjusted based on actual data structure for revenue/cost projection

  const categories = data.map(item => item.name || item.month); // Use name or month for categories
  const series = [
    {
      name: 'الإيرادات',
      data: data.map(item => item.revenue),
    },
    {
      name: 'التكاليف',
      data: data.map(item => item.costs),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontFamily: 'IBM Plex Sans Arabic, sans-serif',
        },
      },
    },
    yaxis: {
      title: {
        text: 'المبلغ (ريال)',
        style: {
          fontFamily: 'IBM Plex Sans Arabic, sans-serif',
        },
      },
      labels: {
        formatter: function (val) {
          return val + " ريال";
        },
        style: {
          fontFamily: 'IBM Plex Sans Arabic, sans-serif',
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " ريال";
        },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: 'IBM Plex Sans Arabic, sans-serif',
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: title,
      align: 'center',
      margin: 20,
      offsetY: 0,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#263238',
        fontFamily: 'IBM Plex Sans Arabic, sans-serif'
      },
    },
    theme: {
        palette: 'palette3' // Another palette for distinction
    }
  };

  return (
    <div className="chart-container-apex">
      <Chart options={options} series={series} type="bar" width="100%" height="350" />
    </div>
  );
};

export default CustomBarChart;
