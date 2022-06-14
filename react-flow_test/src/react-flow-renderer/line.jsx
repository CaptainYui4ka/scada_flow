import  { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
    const dateline = JSON.parse(message);
    //console.log(dateline);
    showMessage(event.data);
  }

  function showMessage(message) {
    var messageSignal = document.createElement('div');
    messageSignal.appendChild(document.createTextNode(message));
    setLine(JSON.parse(message));
  }
  console.log(linedate);
  let lineone = linedate.arraysone;
  let linetwo = linedate.arraystwo;

  //Линейный график
  const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  const data = {
    labels ,
    datasets: [
      {
        label: 'Сигнал 1',
        data: lineone,
        borderColor: 'blue',
        backgroundColor: '#6BA7FF'
      },
      {
        label: 'Сигнал 2',
        data: linetwo,
        borderColor: 'red',
        backgroundColor: '#FF6B6B'
      },
    ],
  };

  return (
    <div style={{ width: 1250 }}>
      <Line options={options} data={data}/>
    </div>
  )
}

export default LineChart;