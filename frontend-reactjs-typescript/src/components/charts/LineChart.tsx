import React from "react";
import { Line } from "react-chartjs-2";
function LineChart( {chartData}:any ) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Энергопотребление</h2>
      <Line
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
}
export default LineChart;