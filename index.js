import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import io from 'socket.io-client';

let socket;

export default function Dashboard() {
  const [prices, setPrices] = useState([]);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    socket = io('http://localhost:4000', {
      auth: { token },
    });
    socket.on('priceUpdate', (data) => {
      setPrices((prev) => [...prev.slice(-99), data.price]);
    });
  }, []);

  useEffect(() => {
    if (prices.length && !chart) {
      const ctx = document.getElementById('priceChart').getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: prices.map((_, i) => i),
          datasets: [{ label: 'Portfolio Value', data: prices }],
        },
      });
      setChart(newChart);
    } else if (chart) {
      chart.data.labels = prices.map((_, i) => i);
      chart.data.datasets[0].data = prices;
      chart.update();
    }
  }, [prices]);

  return (
    <div>
      <h1>Dashboard</h1>
      <canvas id="priceChart"></canvas>
    </div>
  );
}
