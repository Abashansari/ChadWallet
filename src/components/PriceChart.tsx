import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Rect, Line, Text as SvgText } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PriceChartProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export default function PriceChart({
  data,
  color = '#00D68F',
  width = SCREEN_WIDTH - 32,
  height = 200,
}: PriceChartProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const paddingX = 8;
  const paddingY = 16;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const points = data
    .map((value, index) => {
      const x = paddingX + (index / (data.length - 1)) * chartWidth;
      const y = paddingY + (1 - (value - min) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  // Create fill polygon (line + bottom)
  const firstPoint = `${paddingX},${paddingY + (1 - (data[0] - min) / range) * chartHeight}`;
  const lastX = paddingX + chartWidth;
  const fillPoints = `${points} ${lastX},${height} ${paddingX},${height}`;

  // Grid lines
  const gridLines = [0.25, 0.5, 0.75];

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.2" />
            <Stop offset="0.8" stopColor={color} stopOpacity="0.02" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={color} stopOpacity="0.5" />
            <Stop offset="0.5" stopColor={color} stopOpacity="1" />
            <Stop offset="1" stopColor={color} stopOpacity="0.8" />
          </LinearGradient>
        </Defs>

        {/* Grid lines */}
        {gridLines.map((pct, i) => (
          <Line
            key={i}
            x1={paddingX}
            y1={paddingY + pct * chartHeight}
            x2={width - paddingX}
            y2={paddingY + pct * chartHeight}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
        ))}

        {/* Fill area */}
        <Polyline
          points={fillPoints}
          fill="url(#chartFill)"
          stroke="none"
        />

        {/* Main line */}
        <Polyline
          points={points}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}
