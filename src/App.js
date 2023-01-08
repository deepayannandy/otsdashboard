import React, {useEffect} from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {  TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar,Footer,ThemeSettings, Sidebar, } from './componets';
import { Employees, Consumables, Dashboard, Equipments, PO,WO, Customers, Registration, AddPO,AddWO, AddCustomer} from './pages';
import "./App.css";
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { activeMenu}=useStateContext();
  return (
    <BrowserRouter>
    <div className='flex relative dark:bg-main-dark-bg'>
      
      {/* <div className='fixed right-4 bottom-4' style={{zIndex:'1000'}}>
        <TooltipComponent content="settings" position='top'>
          <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-lisgt-grey text-white' style={{background: 'green', borderRadius:'50%'}}>
            <FiSettings/>
          </button>
        </TooltipComponent>
      </div> */}
      
        {activeMenu?(<div className='w-50 fixed sidebar dark:bg-secondery-dark-bg bg-white'>
          <Sidebar/>
        </div>):(<div className='w-0 dark:bg-secondery-dark-bg'>
         <Sidebar/>
          </div>)}
       
          <div className={ activeMenu
            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }>
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
             <Navbar/>
            </div>

      <div>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/pocsof/clients/tier1integrity' element={<Dashboard/>}/>
              <Route path='/pocsof/clients/tier1integrity/dashboard' element={<Dashboard/>}/>

              <Route path='pocsof/clients/tier1integrity/Users' element={<Employees/>}/>
              <Route path='pocsof/clients/tier1integrity/PO' element={<PO/>}/>
              <Route path='pocsof/clients/tier1integrity/WO' element={<WO/>}/>
              <Route path='pocsof/clients/tier1integrity/Daily Time Sheet' element={<Employees/>}/>
              <Route path='pocsof/clients/tier1integrity/customers' element={<Customers/>}/>
              <Route path='pocsof/clients/tier1integrity/consumables' element={<Consumables/>}/>
              <Route path='pocsof/clients/tier1integrity/equipments' element={<Equipments/>}/>
              <Route path='pocsof/clients/tier1integrity/addnewemployee' element={<Registration/>}/>
              <Route path='pocsof/clients/tier1integrity/addnewpo' element={<AddPO/>}/>
              <Route path='pocsof/clients/tier1integrity/addnewwo' element={<AddWO/>}/>
              <Route path='pocsof/clients/tier1integrity/addnewcustomer' element={<AddCustomer/>}/>
            </Routes>
      </div>
          <Footer/>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App