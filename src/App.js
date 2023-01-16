import React, {useEffect} from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {  TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar,Footer,ThemeSettings, Sidebar, } from './componets';
import { Employees, Consumables, Dashboard, Equipments, PO,WO, Customers, Registration, AddPO,AddWO, AddCustomer, Timecard,Login,UserProfile,Page404,EquipProfile,ConsProfile,PoProfile,WoProfile,CustomerProfile} from './pages';
import "./App.css";
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { activeMenu, isLogin , setisLogin}=useStateContext();
  useEffect(()=>{
  if (localStorage.getItem('userinfo')){
    setisLogin(true);
  }
  }
)
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
            { isLogin ?<div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
             <Navbar/>
            </div>: <div/>}

      <div>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/Users' element={<Employees/>}/>
              <Route path='/PO' element={<PO/>}/>
              <Route path='/WO' element={<WO/>}/>
              <Route path='/Daily Time Sheet' element={<Timecard/>}/>
              <Route path='/customers' element={<Customers/>}/>
              <Route path='/consumables' element={<Consumables/>}/>
              <Route path='/equipments' element={<Equipments/>}/>
              <Route path='/addnewemployee' element={<Registration/>}/>
              <Route path='/addnewpo' element={<AddPO/>}/>
              <Route path='/addnewwo' element={<AddWO/>}/>
              <Route path='/addnewcustomer' element={<AddCustomer/>}/>
              <Route path='/Login' element={<Login/>}/>
              <Route path='/UserProfile' element={<UserProfile/>}/>
              <Route path='/EquipProfile' element={<EquipProfile/>}/>
              <Route path='/ConsProfile' element={<ConsProfile/>}/>
              <Route path='/PoProfile' element={<PoProfile/>}/>
              <Route path='/WoProfile' element={<WoProfile/>}/>
              <Route path='/CustomerProfile' element={<CustomerProfile/>}/>
              <Route path='*' element={<Page404/>}/>
            </Routes>
      </div>
          <Footer/>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App