import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarCharts = (props) => {
  const { shipment, payment, release } = props.data.current;

  const barChartData = [
    { name: 'Отгрузка', 'План': shipment.plan, 'Факт': shipment.fact },
    { name: 'Оплата', 'План': payment.plan, 'Факт': payment.fact },
    { name: 'Выпуск продукции', 'План': release.plan, 'Факт': release.fact },
  ];

  return (
    <div style={{ width: '90%', height: 300, minWidth:"auto"}}>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={barChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="План" fill="#735184" />
          <Bar dataKey="Факт" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
