import React, { useEffect, useState } from 'react';
import SystemChart from '../SystemChart/SystemChart.tsx';
import './SystemMetrics.css';
import { GET_CPU_UTILIZATION, GET_MEMORY_UTILIZATION } from '../constants/apiConstants.ts';
import { SystemMetricsProps } from '../types/types.ts';
import { SYSTEM_METRICS } from '../constants/stringConstants.ts';

const SystemMetrics: React.FC<SystemMetricsProps> = ({ applicationNames }) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("CPU");

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(selectedOption === "CPU" ? GET_CPU_UTILIZATION : GET_MEMORY_UTILIZATION);
        if (!response.ok) {
          throw new Error('Network is not responding');
        }
        const report = await response.json();
        setData(report);
      }
      catch (error) {
        throw new Error(error);
      }
    })();
  }, [selectedOption]);

  return (
    <div className='system-metrics'>
      <div className='metrics-header'>{SYSTEM_METRICS}</div>
      <div className='toggle-container'>
        <div className='toggle-item' onClick={() => setSelectedOption('CPU')}>
          CPU
          <div className={`horizontal-line ${selectedOption === "CPU" ? 'focused-line' : ''}`}></div>
        </div>
        <div className='toggle-item' onClick={() => setSelectedOption('Memory')}>
          Memory
          <div className={`horizontal-line ${selectedOption === "Memory" ? 'focused-line' : ''}`}></div>
        </div>
      </div>
      <SystemChart data={data} applicationNames={applicationNames} title={selectedOption === "CPU" ? "CPU" : "Memory"} />
    </div>
  );
}

export default SystemMetrics;