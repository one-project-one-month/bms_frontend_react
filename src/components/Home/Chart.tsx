import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Total Transaction',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Transactions',
      data: labels.map(() => Math.floor(Math.random() * 20000) + 1),
      borderColor: '#FAFAFA',
      backgroundColor: 'rgb(75, 192, 192)',
      fill: true
    }
  ],
};

const Chart = () => {

  return (
    <div className="border-2 mr-2 rounded-lg p-2">
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
