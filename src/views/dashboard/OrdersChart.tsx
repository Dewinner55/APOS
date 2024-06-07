import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrdersChart = () => {
  const data = [
    { name: 'January', orders: 5 },
    { name: 'February', orders: 10 },
    { name: 'March', orders: 15 },
    { name: 'April', orders: 20 },
    { name: 'May', orders: 25 },
    { name: 'June', orders: 30 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrdersChart;
