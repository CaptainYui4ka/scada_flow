import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
      },
    },
};
const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [-5,20,5,35,5,5,10,20,15,45],
      borderColor: 'blue',
      backgroundColor: '#6BA7FF'
    },
    {
      label: 'Dataset 2',
      data: [-20,-15,-10,-5,0,0,10,5,25,10],
      borderColor: 'red',
      backgroundColor: '#FF6B6B'
    },
  ],  
};


const LineChart = () => {
    return (
        <div style={{width: 700}}>
            <Line options={options} data={data}/>
            
        </div>
    )
}

export default LineChart;