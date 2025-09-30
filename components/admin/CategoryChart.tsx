"use client";

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

export function CategoryChart({ data }: CategoryChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          'rgba(217, 119, 6, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(252, 211, 77, 0.8)',
          'rgba(253, 224, 71, 0.8)',
          'rgba(254, 240, 138, 0.8)',
        ],
        borderColor: [
          'rgb(217, 119, 6)',
          'rgb(245, 158, 11)',
          'rgb(251, 191, 36)',
          'rgb(252, 211, 77)',
          'rgb(253, 224, 71)',
          'rgb(254, 240, 138)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Pie data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
