import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { SystemChartProps } from '../types/types';

const SystemChart: React.FC<SystemChartProps> = ({ data, applicationNames, title }) => {
  if (!data || data.length === 0 || !applicationNames || applicationNames.length === 0) return null;

  // Extracting unique application IDs from the data
  const applicationIds = [...new Set(data.map(entry => entry.applicationId))];

  // Creating series data for each application
  const series = applicationIds.map(id => ({
    name: applicationNames.find(app => app.id === parseInt(id))?.name,
    data: data.filter(entry => entry.applicationId === id).map(entry => parseFloat(entry.memoryUtilization || entry.cpuUtilization))
  }));

  const timestamps = data.map(entry => {
    const date = new Date(parseInt(entry.timestamp) * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
  });

  const chartOptions = {
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false
      },
    },
    xaxis: {
      categories: timestamps,
      tickAmount: 10
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    title: {
      text: title
    }

  } as ApexOptions;

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default SystemChart;
