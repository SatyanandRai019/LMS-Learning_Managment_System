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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function RevenueChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      {
        label: "Revenue",

        data: [10000, 18000, 25000, 32000, 28000, 45000],

        borderColor: "rgb(59,130,246)",

        tension: 0.4,
      },
    ],
  };

  return (
    <div className="mt-8 rounded-xl bg-slate-800 p-6">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Revenue Overview
      </h2>

      <Line data={data} />
    </div>
  );
}

export default RevenueChart;