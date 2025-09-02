import React from 'react';
import { formatCurrency } from '../utils/helpers'; // Assuming a helper for currency formatting
import AnimatedNumber from './AnimatedNumber'; // Import AnimatedNumber

const DetailsTable = ({ data, title }) => {
  return (
    <div className="details-table-container">
      <h3 className="table-title">{title}</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>البند</th>
            <th>المبلغ</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td><AnimatedNumber value={item.value} format={formatCurrency} /></td>
            </tr>
          ))}
          <tr className="total-row">
            <td>الإجمالي</td>
            <td><AnimatedNumber value={data.total} format={formatCurrency} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailsTable;
