import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function RevenueChart({ revenueTrend = [] }) {
  const hasData = revenueTrend.length > 0;

  const data = {
    labels: hasData ? revenueTrend.map((e) => e.label) : [],
    datasets: [
      {
        label: "Revenue (₹)",
        data: hasData ? revenueTrend.map((e) => e.revenue) : [],
        borderColor: "#d4af37",
        backgroundColor: "rgba(212,175,55,0.15)",
        pointBackgroundColor: "#d4af37",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { labels: { color: "#e2e8f0" } } },
    scales: {
      x: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  return (
    <div className="rounded-2xl bg-[#0a1f44] p-6 shadow-lg shadow-slate-200/30">
      <h2 className="mb-6 text-xl font-semibold text-white">Revenue Overview (Last 6 Months)</h2>
      {hasData ? <Line data={data} options={options} /> : <p className="text-sm text-slate-400">No revenue data yet.</p>}
    </div>
  );
}

export default RevenueChart;