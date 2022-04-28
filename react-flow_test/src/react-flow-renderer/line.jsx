import  { useState } from 'react'
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

const socket = new WebSocket('ws://localhost:5000/', "protocolOne");

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
      text: 'График активности',
    },
  },
};


const LineChart = () => {
  
  const [ linedate, setLine ] = useState('');

  socket.onmessage = function(event) {
    var message = event.data;
    console.log('есть сообщение')
    const lineSignal = JSON.parse(message);
    console.log(lineSignal);
    showMessage(lineSignal);
  }
  
  function showMessage(message) {
    var messageSignal = document.createElement('div');
    messageSignal.appendChild(document.createTextNode(message));
    setLine(message);
  }
  console.log(linedate);
  let endLinedate = linedate.length;
  console.log(endLinedate);

  //Линейный график
  const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Сигнал 1',
        data: linedate,
        borderColor: 'blue',
        backgroundColor: '#6BA7FF'
      },
      {
        label: 'Сигнал 2',
        data: [-20, -15, -10, -5, 0, 0, 10, 5, 25, 10],
        borderColor: 'red',
        backgroundColor: '#FF6B6B'
      },
    ],
  };

  return (
    <div style={{ width: 700 }}>
      <Line options={options} data={data}/>
    </div>
  )
}

export default LineChart;