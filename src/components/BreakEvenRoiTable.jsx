import React from 'react';
import AnimatedNumber from './AnimatedNumber';
import { formatCurrency } from '../utils/helpers';
import './FinancialTables.css'; // We will create this CSS file

const BreakEvenRoiTable = ({ data, title }) => {
  return (
    <div className="modern-table-container">
      <h3 className="table-title">{title}</h3>
      <div className="table-scroll-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>المؤشر</th>
              <th>القيمة</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.metric}</td>
                <td>
                  {row.isCurrency ? (
                    <AnimatedNumber value={row.value} format={formatCurrency} />
                  ) : (
                    <AnimatedNumber value={row.value} format={(val) => val.toLocaleString()} />
                  )}
                  {row.unit && <span className="table-unit"> {row.unit}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BreakEvenRoiTable;
