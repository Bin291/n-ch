
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

interface DataBarChartProps {
  data: number[];
  highlightIndices?: number[];
  highlightColors?: {
    comparing?: string;
    swapping?: string;
  };
}

const DataBarChart: React.FC<DataBarChartProps> = ({ 
  data, 
  highlightIndices = [], 
  highlightColors = { comparing: "#9b87f5", swapping: "#ea384c" } 
}) => {
  // Transform data into the format expected by recharts
  const chartData = data.map((value, index) => {
    const isComparing = highlightIndices && highlightIndices.includes(index);
    
    return {
      index: index,
      value: value,
      highlight: isComparing,
      fillColor: isComparing ? highlightColors.swapping : highlightColors.comparing
    };
  });

  const maxValue = Math.max(...data, 1) * 1.2; // Adding 20% to ensure bars fit

  const config = {
    regular: { color: highlightColors.comparing },
    highlight: { color: highlightColors.swapping },
  };

  return (
    <div className="w-full h-48">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis 
              dataKey="value" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#333', fontSize: 12 }}
              dy={10}
            />
            <YAxis hide domain={[0, maxValue]} />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Bar 
              dataKey="value" 
              radius={[5, 5, 0, 0]} 
              fill={highlightColors.comparing}
              fillOpacity={0.85} 
              strokeWidth={0}
              name="Value"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default DataBarChart;
