'use client';

import React from 'react';
import { MayHaveLabel, ResponsivePie } from '@nivo/pie';

type ChartDataProp = {
  data: Readonly<MayHaveLabel[]>;
};

const PieChart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ChartDataProp
>(({ data, ...props }, ref) => {
  if (!data || data.length === 0) {
    return (
      <span className="grid size-full justify-center items-center text-center m-5 aspect-video text-lg font-medium text-muted-foreground">
        No bookings found
      </span>
    );
  }

  return (
    <div {...props} ref={ref}>
      <ResponsivePie
        data={data}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 70, left: 10 }}
        innerRadius={0.5}
        cornerRadius={6}
        activeOuterRadiusOffset={8}
        padAngle={0.5}
        borderWidth={1}
        borderColor={'#ffffff'}
        enableArcLinkLabels={false}
        colors={['#2563eb', '#5EFC8D', '#8EF9F3', '#93BEDF']}
        theme={{
          labels: {
            text: {
              fontSize: '15px',
            },
          },
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
          legends: {
            text: {
              fontSize: '15px',
            },
          },
        }}
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 46,
            itemsSpacing: 0,
            itemWidth: 300,
            itemHeight: 18,
            itemTextColor: '#555',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'square',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
        role="application"
      />
    </div>
  );
});

PieChart.displayName = 'PieChart';

export default PieChart;
