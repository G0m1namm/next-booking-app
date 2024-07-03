'use client';

import React from 'react';
import { Serie, ResponsiveLine } from '@nivo/line';
import { formatPrice } from '@/lib/utils';

type ChartDataProp = {
  data: Readonly<Serie[]>;
};

const LineChart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ChartDataProp
>(({ data, ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 20, bottom: 70, left: 70 }}
        yFormat={(value) => `${formatPrice(value as number)}`}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          legend: 'Last 6 months',
          legendPosition: 'middle',
          legendOffset: 50,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
          legend: 'USD ($)',
          legendPosition: 'middle',
          legendOffset: -60,
        }}
        colors={['#2563eb', '#e11d48']}
        pointSize={6}
        useMesh={true}
        enableArea={true}
        defs={[
          {
            colors: [
              {
                color: 'inherit',
                offset: 0,
              },
              {
                color: 'inherit',
                offset: 100,
                opacity: 0,
              },
            ],
            id: 'gradientA',
            type: 'linearGradient',
          },
        ]}
        enableGridX={false}
        enableGridY={false}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        legends={[
          {
            anchor: 'top-left',
            direction: 'row',
            justify: false,
            translateX: -5,
            translateY: -38,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 78,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 13,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        motionConfig="molasses"
        role="application"
      />
    </div>
  );
});

LineChart.displayName = 'LineChart';

export default LineChart;
