import React from 'react'
import { BarChart } from '@/components/charts/BarChart'
import LineChart from '@/components/charts/LineChart'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import {  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectInfoData } from '@/redux/slices/infoSlice';
import { PowerInfo } from '@/types/PowerInfo';

Chart.register(CategoryScale);

const ChartPower = () => {
  const navigate=  useNavigate ();
  const { infoPower } = useSelector(selectInfoData);
  console.log(infoPower);
  
  const [chartData, setChartData] = React.useState({
    labels: infoPower.map((data:any) => data.time),
    datasets: [
      {
        label: "Users Gained ",
        data: infoPower.map((data:any) => data.power),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  })


  return (
    <div className='ChartPower'>
      <LineChart chartData={chartData} className="LineChart"/>
      <BarChart chartData={chartData} />
      <button id="back-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faBackwardStep} /> Вернуться назад</button>
    </div>
  )
}

export default ChartPower