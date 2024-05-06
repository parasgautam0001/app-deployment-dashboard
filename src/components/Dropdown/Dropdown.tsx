import React, { useState } from 'react';
import DropOpen from '../../assets/DropOpen.svg';
import './Dropdown.css';
import { DropdownProps } from '../types/types';

const Dropdown: React.FC<DropdownProps> = ({ defaultName, options, setApp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (index) => {
    setApp && setApp(index);
    setIsOpen(false);
  }

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <div>{defaultName}</div>
        <img src={DropOpen} alt='' className={`${isOpen ? 'open-icon' : ''}`} />
      </div>
      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((option, index) => {
          return <div onClick={() => handleOptionClick(index)} className='option-name'>{option.name}</div>
        })}
      </div>
    </div>
  );
};

export default Dropdown;
