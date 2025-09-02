import React from 'react';
import AnimatedNumber from './AnimatedNumber';
import { formatCurrency } from '../utils/helpers';
import './FinancialTables.css'; // We will create this CSS file

const FinancialSummaryTable = ({ data, title }) => {
  return (
    <div className="modern-table-container">
      <h3 className="table-title">{title}</h3>
      <div className="table-scroll-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>السنة</th>
              <th>الإيرادات السنوية</th>
              <th>التكاليف السنوية</th>
              <th>صافي الربح السنوي</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.year}</td>
                <td>
                  <AnimatedNumber value={row.annualRevenue} format={formatCurrency} />
                </td>
                <td>
                  <AnimatedNumber value={row.annualCosts} format={formatCurrency} />
                </td>
                <td>
                  <AnimatedNumber value={row.annualProfit} format={formatCurrency} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialSummaryTable;
