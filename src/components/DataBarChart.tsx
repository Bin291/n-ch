
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

interface DataBarChartProps {
  data: number[];
  highlightIndex?: number;
}

const DataBarChart: React.FC<DataBarChartProps> = ({ data, highlightIndex }) => {
  // Transform data into the format expected by recharts
  const chartData = data.map((value, index) => ({
    index: index,
    value: value,
    highlight: index === highlightIndex
  }));

  const maxValue = Math.max(...data, 1) * 1.2; // Adding 20% to ensure bars fit

  const config = {
    regular: { color: "#9b87f5" },
    highlight: { color: "#ea384c" },
  };

  return (
    <div className="w-full h-64 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="index" hide />
            <YAxis domain={[0, maxValue]} hide />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Bar 
              dataKey="value" 
              radius={[5, 5, 0, 0]} 
              fill="#9b87f5"
              fillOpacity={0.85} 
              strokeWidth={0}
              name="Value"
            />
            {highlightIndex !== undefined && (
              <ReferenceLine 
                x={highlightIndex} 
                stroke="#ea384c"
                strokeWidth={2}
              >
                <svg x="-6" y="0" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 0L11.1962 12H0.803848L6 0Z" fill="#ea384c" />
                </svg>
              </ReferenceLine>
            )}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default DataBarChart;
