
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface DataBarChartProps {
  data: number[];
  highlightIndices?: number[];
  barColor?: string;
}

const DataBarChart: React.FC<DataBarChartProps> = ({ 
  data, 
  highlightIndices = [], 
  barColor = "#9b87f5" 
}) => {
  const chartData = data.map((value, index) => ({
    name: index,
    value,
    isHighlighted: highlightIndices.includes(index)
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart 
        data={chartData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f3f3" />
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <Bar 
          dataKey="value" 
          fill={barColor}
          radius={[4, 4, 0, 0]}
          animationDuration={300}
          shape={(props: any) => {
            const { x, y, width, height, isHighlighted } = props;
            const fill = isHighlighted ? "#3b82f6" : barColor;
            return (
              <rect 
                x={x} 
                y={y} 
                width={width} 
                height={height} 
                fill={fill}
                rx={4}
                ry={4}
              />
            );
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DataBarChart;
