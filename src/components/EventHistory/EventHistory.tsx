import React, { useEffect, useState } from 'react';
import './EventHistory.css';
import { GET_EVENT_HISTORY } from '../constants/apiConstants.ts';
import { getRemainingTime } from '../utils/utils.ts';
import { EventDataType } from '../types/types.ts';

const EventHistory = () => {
  const [eventData, setEventData] = useState<Array<EventDataType>>([]);
  const [viewLength, setViewLength] = useState(4);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(GET_EVENT_HISTORY);
        if (!response.ok) {
          throw new Error('Network is not responding');
        }
        const totalApps = await response.json();
        setEventData(totalApps);
      }
      catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  return (
    <div className='event-history'>
      <div className='event-header'>Event History</div>
      <div className='events-container'>
        <div className='events events-header'>
          <div className='events-item'>Event</div>
          <div className='events-item'>Version</div>
          <div className='events-item'>Status</div>
        </div>

        {eventData && eventData.slice(0, viewLength).map((event) => {
          return <div className='events'>
            <div className='events-item'>{event.event}
              <div className='time-elapsed'>{getRemainingTime(event.timestamp)}</div>
            </div>
            <div className='events-item'>{event.version}</div>
            <div className='events-item'><div className={`events-status ${event.status.includes("progress") ? 'progress-status' : event.status.includes("fail") ? 'failed-status' : ''}`}><span className={`deployed-circle ${event.status.includes("progress") ? 'progress-circle' : event.status.includes("fail") ? 'failed-circle' : ''}`}></span>{event.status.includes("progress") ? 'In Progress' : event.status.includes("fail") ? 'Failed' : 'Successful'}</div></div>
          </div>
        })}
        {viewLength === 4 && <div className='view' onClick={() => setViewLength(eventData.length)}>View more</div>}
      </div>
    </div>
  );
}

export default EventHistory;