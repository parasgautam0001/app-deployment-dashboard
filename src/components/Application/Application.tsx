import React, { useEffect, useState } from "react";
import { ALERT, ALERTS, ALERTS_COMING_SOON, ENVIRONMENT, ENVIRONMENT_VARIABLES, EVENTS_COMING_SOON, EVENT_HISTORY, HISTORY, OVERVIEW, OVERVIEW_SMALL } from "../constants/stringConstants.ts";
import ServiceInfo from "../ServiceInfo/ServiceInfo.tsx";
import SystemMetrics from "../SystemMetrics/SystemMetrics.tsx";
import EventHistory from "../EventHistory/EventHistory.tsx";
import Environment from "../Environment/Environment.tsx";
import { GET_APPLICATIONS } from "../constants/apiConstants.ts";
import Topbar from "../Topbar/Topbar.tsx";
import Monitor from '../../assets/Monitor.svg';
import Settings from '../../assets/Settings.svg';
import Alert from '../../assets/Triangle.svg';
import HistoryIcon from '../../assets/History.svg';

const Application = () => {
    const [appNames, setAppNames] = useState([]);
    const [application, setApplication] = useState({
        id: 0,
        name: "",
        status: "",
        version: "",
        updatedAt: "",
        desiredVersion: ""
    });
    const [selectedoption, setSelectedOption] = useState(OVERVIEW);

    const getSelectedOption = () => {
        switch (selectedoption) {
            case 'overview':
                return <><ServiceInfo application={application} />
                    <div className='charts-data'>
                        <SystemMetrics applicationNames={appNames} />
                        <EventHistory />
                    </div>
                </>;
            case 'environment':
                return <Environment />;
            case 'alert':
                return <div className='coming-soon'>{ALERTS_COMING_SOON}</div>;
            case 'history':
                return <div className='coming-soon'>{EVENTS_COMING_SOON}</div>;
            default:
                break;
        }
    }

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(GET_APPLICATIONS);
                if (!response.ok) {
                    throw new Error('Network is not responding');
                }
                const totalApps = await response.json();
                setAppNames(totalApps);
                setApplication(totalApps[0]);
            }
            catch (error) {
                throw new Error(error);
            }
        })();
    }, []);

    return (
        <div className="content">
            <Topbar application={application} appNames={appNames} setApp={(val) => setApplication(appNames[val])} />

            <div className='heading'>
                <h2>{application?.name || ''}</h2>
                <div className='options'>
                    <div className='deployed'><span className='circle'></span>Deployed</div>
                    <div>&#8942;</div>
                </div>
            </div>

            <div className='options'>
                <div className={`option-item ${selectedoption === OVERVIEW_SMALL ? 'bold' : ''}`} onClick={() => setSelectedOption("overview")} >
                    <img src={Monitor} alt='' />Overview
                </div>
                <div className={`option-item ${selectedoption === ENVIRONMENT ? 'bold' : ''}`} onClick={() => setSelectedOption("environment")}>
                    <img src={Settings} alt='' />{ENVIRONMENT_VARIABLES}
                </div>
                <div className={`option-item ${selectedoption === ALERT ? 'bold' : ''}`} onClick={() => setSelectedOption("alert")}>
                    <img src={Alert} alt='' />{ALERTS}
                </div>
                <div className={`option-item ${selectedoption === HISTORY ? 'bold' : ''}`} onClick={() => setSelectedOption("history")}>
                    <img src={HistoryIcon} alt='' />{EVENT_HISTORY}
                </div>
            </div>
            {getSelectedOption()}
        </div>
    )
};

export default Application;