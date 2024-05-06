import React from 'react';
import Connections from '../../assets/Individual.png';

interface MenuItemProps {
  icon: any;
  name: string;
  isOpen: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, name, isOpen }) => {
  return (
    <div className="menu-item">
      <img src={icon} className='icon' />
      {isOpen && <span className="name">{name}</span>}
    </div>
  );
}

interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isOpen }) => {
  return (
    <nav className="navbar">
      <div className="menu-item">
        <img src={Connections} className={isOpen ? 'icon visible' : 'icon'} onClick={toggleSidebar} />
        {isOpen && <span className="name">Kapstan</span>}
      </div>
      <div className="menu-items">
        <MenuItem icon={Connections} name="Applications" isOpen={isOpen} />
        <MenuItem icon={Connections} name="Connections" isOpen={isOpen} />
        <MenuItem icon={Connections} name="Cost" isOpen={isOpen} />
        <MenuItem icon={Connections} name="Security" isOpen={isOpen} />
      </div>
      <div className="menu-items bottom">
        <MenuItem icon={Connections} name="Admin" isOpen={isOpen} />
        <MenuItem icon={Connections} name="Docs" isOpen={isOpen} />
      </div>
    </nav>
  );
}

export default Navbar;
