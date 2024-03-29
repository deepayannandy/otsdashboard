import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/clientavatar.png';

import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);


const Navbar = () => {
  const { activeMenu, setActiveMenu} = useStateContext();

  return (
    <div className='flex justify-between p-2 md:mx-6 relative '> 
    <NavButton title="Menu" customFunc={()=>setActiveMenu((prevActiveState)=>!prevActiveState)} color="green" icon={<AiOutlineMenu/>}/>
    <div className='flex'>
    {/* <NavButton title="Menu" customFunc={()=>{}} color="green" icon={<BsSearch/>}/> */}
    <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => {}}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-900 text-14">Hi,</span>{' '}
              <span className="text-gray-900 font-bold ml-1 text-14">
                Admin
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-700 text-14" />
          </div>
        </TooltipComponent>
    </div>
    </div>
  )
}

export default Navbar