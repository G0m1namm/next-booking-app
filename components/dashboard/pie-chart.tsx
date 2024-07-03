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
  return (
    <div {...props} ref={ref}>
      <ResponsivePie
        data={data}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        padAngle={0}
        borderWidth={1}
        borderColor={'#ffffff'}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={'#ffffff'}
        arcLabelsRadiusOffset={0.65}
        colors={['#2563eb', '#5EFC8D', '#8EF9F3', '#93BEDF']}
        theme={{
          labels: {
            text: {
              fontSize: '18px',
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
        }}
        role="application"
      />
    </div>
  );
});

PieChart.displayName = 'PieChart';

export default PieChart;
