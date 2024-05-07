import React, { useState } from 'react';
import Connections from '../../../src/assets/Link.svg';
import Logo from './../../assets/Logo.svg';
import AppIcon from './../../assets/Apps_icon.svg';
import Money from './../../assets/Money.svg';
import Shield from './../../assets/Shield.svg';
import User from './../../assets/User.svg';
import Docs from './../../assets/Docs.svg';
import { MenuItemProps } from '../types/types';
import { APPLICATION, KAPSTAN } from '../constants/stringConstants.ts';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  const MenuItem: React.FC<MenuItemProps> = ({ icon, name, isOpen }) => {
    return (
      <div onClick={()=>setIsOpen(true)} className="menu-item">
        <img src={icon} alt='' className='icon' />
        {isOpen && <span className="name">{name}</span>}
      </div>
    );
  }
  
  return (
    <nav className="navbar">
      <div className="menu-item" onClick={toggleSidebar}>
        <img src={Logo} alt='' className={isOpen ? 'icon visible' : 'icon'} />
        {isOpen && <span className="name kaps">{KAPSTAN}</span>}
      </div>
      <div className="menu-items">
      <div onClick={()=>setIsOpen(true)} className="menu-item application">
        <img src={AppIcon} alt='' className='icon' />
        {isOpen && <span className="name">{APPLICATION}</span>}
      </div>
        <MenuItem icon={Connections} name="Connections" isOpen={isOpen} />
        <MenuItem icon={Money} name="Cost" isOpen={isOpen} />
        <MenuItem icon={Shield} name="Security" isOpen={isOpen} />
      </div>
      <div className="menu-items bottom">
        <MenuItem icon={User} name="Admin" isOpen={isOpen} />
        <MenuItem icon={Docs} name="Docs" isOpen={isOpen} />
      </div>
    </nav>
  );
}

export default Navbar;
