import React from 'react';
import './ServiceInfo.css';
import Tick from '../../assets/Tick.svg';
import DropOpen from '../../assets/DropOpen.svg';
import { getRemainingTime } from '../utils/utils.ts';
import { ServiceInfoProps } from '../types/types.ts';
import { CURRENT_VERSION, DEPLOY, DESIRED_VERSION, IN_SYNC, LAST_UPDATED, SERVICE_INFO } from '../constants/stringConstants.ts';

const ServiceInfo: React.FC<ServiceInfoProps> = ({ application }) => {

    return (
        <div className='service-info'>
            <div className='heading'>
                <div className='service-header'>{SERVICE_INFO}</div>
                <img className='rotate' src={DropOpen} alt='' />
            </div>

            <div className='box-container'>
                <div className='box'>
                    <div className='versions'>{CURRENT_VERSION}</div>
                    <div className='sync-status'><img src={Tick} alt='' />{IN_SYNC}</div>
                </div>
                <div className='box'>
                    <div className='versions'>{DESIRED_VERSION}</div>
                    <div>{application.desiredVersion}</div>
                </div>
            </div>

            <div className='deploy-heading'>
                <button className='deploy'>{DEPLOY}</button>
                <div className='last-updated'>{LAST_UPDATED} {getRemainingTime(application.updatedAt)}</div>
            </div>
        </div>
    );
}

export default ServiceInfo;