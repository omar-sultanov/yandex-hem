import React from 'react';
import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }:any) => {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Электроэнергия, используемая в течение дня"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};