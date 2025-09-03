import React from 'react';
import Chart from 'react-apexcharts';

const CustomPieChart = ({ data, title }) => {
  const series = data.map(item => item.amount);
  const labels = data.map(item => item.name);

  const options = {
    chart: {
      type: 'donut',
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " ريال";
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.labels[opts.seriesIndex] + ": " + val.toFixed(1) + '%';
      },
      style: {
        fontSize: '12px',
        fontFamily: 'IBM Plex Sans Arabic, sans-serif',
        fontWeight: 'bold',
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.5
      }
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
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: 'الإجمالي',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => { return a + b }, 0) + ' ريال';
              }
            }
          }
        }
      }
    },
    theme: {
        palette: 'palette4' // You can choose from palette1 to palette10
    }
  };

  return (
    <div className="chart-container-apex">
      <Chart options={options} series={series} type="donut" width="100%" height="350" />
    </div>
  );
};

export default CustomPieChart;
