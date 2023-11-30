import React from 'react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const TotalPieCharts = (props) => {
  const { shipment, payment, release } = props.data.startYear.total;

  const data = [
    { name: 'Отгрузка', value: shipment },
    { name: 'Оплата  ', value: payment },
    { name: 'Выпуск', value: release },
  ];

  const COLORS = ['#3F888F', '#543964', '#8e9bc8'];

  const total = data.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

  const renderTooltipContent = (props) => {
    const { payload } = props;

    if (payload && payload.length > 0) {
      const selectedData = payload[0];
      return (
        <div className="custom-tooltip">
          <p style={{ color: 'black' }}>{`Факт ${selectedData.name}: составляет ${((selectedData.value / total) * 100).toFixed(2)}% от ${total}`}</p>
        </div>
      );
    }

    return null;
  };

  const [outerRadius, setOuterRadius] = useState(80);

  const handleResize = () => {
    
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      setOuterRadius(50); 
    } else {
      setOuterRadius(80);
    }
  };

  useEffect(() => {
    handleResize(); 

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);


  return (
    <div className="chart-container" style={{ margin: '0 auto', minWidth:"auto", maxWidth: '100%', overflowX: 'auto' }}>
    <ResponsiveContainer width="100%" height={300} style={{overflowX: 'auto' }}>
        <PieChart style={{overflowX: 'auto' }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="45%"
            cy="45%"
            outerRadius={outerRadius}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={renderTooltipContent} />
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalPieCharts;
