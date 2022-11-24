import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {SiShopware} from 'react-icons/si';
import {MdOutlineCancel} from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';

import {links} from '../data/dummy';
const Sidebar = () => {
    const {activeMenu,setActiveMenu}=useStateContext();
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-green-900  text-md m-2 hover:bg-green-200';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-green-200 dark:hover:text-white-900 hover:bg-green-200 m-2';

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 '>{
        activeMenu && (<>
        <div className='flex justify-between items-center'>  
            <Link to="/" onClick={()=>setActiveMenu(false)} className="items-center gap-3 ml-3 mt-4 flex text-xl tracking-tighter font-extrabold text-slate-900">
                <SiShopware className='text-3xl text-green-900'/><span className='text-green-900'>PocSof</span>
            </Link>
            <TooltipComponent content="Menu" position='BottomCenter'>
                <button type="button" onClick={()=>setActiveMenu(false)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block ">
                    <MdOutlineCancel/>
                </button>
            </TooltipComponent>
        </div>
        <div className='mt-10 '>
            {links.map((item)=>(
                <div key={item.title}>
                    <p className='text-gray-400 m-3 mt-4 uppercase'>{item.title}</p>
                    {item.links.map((link)=>(
                        <NavLink
                        to={`/${link.name}`}
                        key={link.name}
                        onClick={()=>{}}
                        className={({isActive})=>isActive? activeLink : normalLink}
                        >
                        {link.icon} <span className='capitalize'>
                        {link.name}
                        </span>
                        </NavLink>
                    ))}
                </div>
            ))}
        </div>
        </>)
    }</div>
  ) 
}

export default Sidebar