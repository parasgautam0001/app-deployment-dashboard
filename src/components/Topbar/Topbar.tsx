import React from 'react';
import '../Topbar/Topbar.css';
import Dropdown from '../Dropdown/Dropdown.tsx';
import { TopbarProps } from '../types/types.ts';

const Topbar: React.FC<TopbarProps> = ({ application, appNames, setApp }) => {

  return (
    <div className='topbar-content'>
      <div className='apps'>
        <div className='applications'>Applications</div>
        <Dropdown defaultName={application.name} options={appNames} setApp={(val) => setApp(val)} />
      </div>
      <div className='topbar-content'>
        <div className='name-symbol'>PG</div>
        <Dropdown defaultName="Paras Gautam" options={[{ id: 0, name: "Profile" }, { id: 1, name: "Logout" }]} />
      </div>
    </div>
  );
}

export default Topbar;
