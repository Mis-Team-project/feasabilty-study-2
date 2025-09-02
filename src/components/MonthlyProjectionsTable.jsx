import React from 'react';
import AnimatedNumber from './AnimatedNumber';
import { formatCurrency } from '../utils/helpers';
import './FinancialTables.css'; // We will create this CSS file

const MonthlyProjectionsTable = ({ data, title }) => {
  return (
    <div className="modern-table-container">
      <h3 className="table-title">{title}</h3>
      <div className="table-scroll-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>الشهر</th>
              <th>الإيرادات</th>
              <th>التكاليف</th>
              <th>صافي الربح</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.month}</td>
                <td>
                  <AnimatedNumber value={row.revenue} format={formatCurrency} />
                </td>
                <td>
                  <AnimatedNumber value={row.costs} format={formatCurrency} />
                </td>
                <td>
                  <AnimatedNumber value={row.profit} format={formatCurrency} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyProjectionsTable;
