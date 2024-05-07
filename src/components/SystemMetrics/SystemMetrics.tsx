import React, { useEffect, useState } from 'react';
import SystemChart from '../SystemChart/SystemChart.tsx';
import './SystemMetrics.css';
import { GET_CPU_UTILIZATION, GET_MEMORY_UTILIZATION } from '../constants/apiConstants.ts';
import { SystemMetricsProps } from '../types/types.ts';
import { CPU, MEMORY, SYSTEM_METRICS } from '../constants/stringConstants.ts';

const SystemMetrics: React.FC<SystemMetricsProps> = ({ applicationNames }) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("CPU");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setShowLoader(true);
        const response = await fetch(selectedOption === "CPU" ? GET_CPU_UTILIZATION : GET_MEMORY_UTILIZATION);
        if (!response.ok) {
          throw new Error('Network is not responding');
        }
        const report = await response.json();
        if (report) setShowLoader(false);
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
          {CPU}
          <div className={`horizontal-line ${selectedOption === "CPU" ? 'focused-line' : ''}`}></div>
        </div>
        <div className='toggle-item' onClick={() => setSelectedOption('Memory')}>
          {MEMORY}
          <div className={`horizontal-line ${selectedOption === "Memory" ? 'focused-line' : ''}`}></div>
        </div>
      </div>
      {showLoader ? <div className='loader-container'><div className="loader"></div></div> : <SystemChart data={data} applicationNames={applicationNames} title={selectedOption === "CPU" ? "CPU" : "Memory"} />}
    </div>
  );
}

export default SystemMetrics;