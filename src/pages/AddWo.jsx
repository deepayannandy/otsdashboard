import React, {useRef, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header,Input, InputSelect, InputSelectFilter} from '../componets'
import axios from 'axios'
import Select from 'react-select';

const AddWO = () => {
    const navigate = useNavigate();
    const potype=["T&M", "Lumpsum", "MSA", "DailyTimesheet", "Callout", "Others"]
    const costcenters=[ "Pasadena, TX 77506","Nederland, TX 77627","Snyder, TX 79549","Angleton, TX 77515","Port Lavaca, TX 77979"]
    const [errormessage,setErrormessage]=useState("");
    const equipmentname = useRef(null);
    const equan = useRef(null);
    const cquan =useRef(null);
    const rentalname = useRef(null);
    const rquan =useRef(null);
    const consumablename=useRef(null);
    const [poList,setpoList]=useState([]);
    const [workerList,setworkerList]=useState([]);
    const [workerids,setworkerids]=useState([]);
    const [scostcenter,setscostcenter]=useState("Pasadena, TX 77506");
    const [equipements,setequipements]=useState([]);
    const [getconsumeable,setgetconsumeable]=useState([]);
    const [selectedequip,setselectedequip]=useState([]);
    const [selectconid,setselectconid]=useState([]);
    const [selectrental,setselectrental]=useState([]);
    const getclientList= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/po/").then((response)=>{
        let cllist=[]
        for (let client in response.data){
            cllist.push({value:response.data[client]._id,label:response.data[client].poNumber})
        }
        console.log(cllist)
        setpoList(cllist);
    })
  }
  useEffect(()=>{
    getclientList()
  },[])

    
  const getworkerList= ()=>
  {
    console.log(scostcenter);
    axios.get("https://tilapi.pocsofclients.com/api/user/dashboardUserState/getall").then((response)=>{
        let freeworker=[]
        for (let client in response.data){
            if (response.data[client].desig=="Employee" && response.data[client].projid=="" && response.data[client].empBranch==scostcenter){
                freeworker.push({ value: response.data[client]._id, label: response.data[client].fullname },)
            }
        }
        console.log(freeworker)
        setworkerList(freeworker);
    })
  }
  useEffect(()=>{
    getworkerList()
  },[])
  const getEquipementList= ()=>
  {
    console.log(scostcenter);
    axios.get("https://tilapi.pocsofclients.com/api/equipements/dashboardEquipment/getall/").then((response)=>{
        let equipements=[]
        for (let client in response.data){
            if (response.data[client].branchID==scostcenter){
                equipements.push({ value: response.data[client]._id, label: response.data[client].name },)
            }
        }
        console.log(equipements)
        setequipements(equipements);
    })
  }
  useEffect(()=>{
    getEquipementList()
  },[])
  const getConsumableList= ()=>
  {
    console.log(scostcenter);
    axios.get("https://tilapi.pocsofclients.com/api/consumeables/dashboardConsumable/getall").then((response)=>{
        let consumeables=[]
        for (let client in response.data){
            if (response.data[client].branchID==scostcenter){
                consumeables.push({ value: response.data[client]._id, label: response.data[client].name },)
            }
        }
        console.log(consumeables)
        setgetconsumeable(consumeables);
    })
  }
  useEffect(()=>{
    getConsumableList()
  },[])
    
    
    const handleSubmit=async (e)=>{
        console.log(e);
        e.preventDefault();
        const data= new FormData(e.target)
        let recievedData=Object.fromEntries(data.entries());
        recievedData.workers=workerids;
        recievedData.consumeables=selectconid;
        recievedData.equipements=selectedequip;
        recievedData.rentedEquipements=selectrental;
        recievedData.managerId="Admin";
        const file= recievedData.fileinput;
        console.log(recievedData);
        axios.post('https://tilapi.pocsofclients.com/api/wo/', recievedData, {
        headers: { 'Content-type': 'application/json; charset=UTF-8','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlhNDRmNjFmN2Y0MjMyMGIwOWY1MjQiLCJkZXNpZyI6Ik1hbmFnZXIiLCJpYXQiOjE2NzEwNTQ2NDJ9.wftzYTqVIB_ACxuj0WEiVOJozJoQAx8ek3AjlG_TY5I" }
        }).then((data) => {
            navigate('/pocsof/clients/tier1integrity/WO');
        }).catch((error)=>{
            if(error.response){
                // console.log(error.response.data);
                // console.log(error.response.status);
                setErrormessage(error.response.data);
                // console.log(error.response.data["message"]);
                if(error.response.data["message"]!=undefined){
                setErrormessage(error.response.data["message"]);
                }
        }})

    }
    const navigatetonewcustomer=()=>{
        navigate('/pocsof/clients/tier1integrity/addnewcustomer');
    }
    const addworkerinlist =(e)=>{
    let ids=[]
        for (let userid in e){
            ids.push(e[userid].value)
        }
        console.log(ids);
        setworkerids(ids);
    }
    const setCostCenter =(e)=>{
        console.log(e.target.value);
        setscostcenter(e.target.value);
        axios.get("https://tilapi.pocsofclients.com/api/user/dashboardUserState/getall").then((response)=>{
        let freeworker=[]
        for (let client in response.data){
            if (response.data[client].desig=="Employee" && response.data[client].projid=="" && response.data[client].empBranch==e.target.value){
                freeworker.push({ value: response.data[client]._id, label: response.data[client].fullname },)
            }
        }
        setworkerList(freeworker);
        })
        axios.get("https://tilapi.pocsofclients.com/api/equipements/dashboardEquipment/getall/").then((response)=>{
            let equipements=[]
            for (let client in response.data){
                if (response.data[client].branchID==scostcenter){
                    equipements.push({ value: response.data[client]._id, label: response.data[client].name },)
                }
            }
            console.log("new Equipements")
            setequipements(equipements);
        })
    }
    const addequipments=()=>{
        const item_id=equipmentname.current.value
        const item_name=equipements[equipmentname.current.selectedIndex].label
        const quantity = equan.current.value
        if (quantity!=0){
        setselectedequip([...selectedequip,[item_id,quantity,item_name]]);
        console.log(selectedequip);
        }
    }
    const addconsumeable=()=>{
        const item_id=consumablename.current.value
        const item_name=getconsumeable[consumablename.current.selectedIndex].label
        const quantity = cquan.current.value
        if (quantity!=0){
        setselectconid([...selectconid,[item_id,quantity,item_name]]);
        }

    }  
    const addrental=()=>{
        const item_id=rentalname.current.value
        const quantity = rquan.current.value
        console.log(item_id,quantity);
        if (quantity!=0 && item_id!=""){
        setselectrental([...selectrental,[item_id,quantity]]);
        }

    }  
return (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-10 bg-hero-water">
        <Header category="Page" title="Crearte a new #WO" />
        <button class="bg-green-500 mt-2 mb-1 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={navigatetonewcustomer}>Add New #PO</button>
        <br/>
        <span className='text-gray-500 text-xs mb-10'>
            * In case of a new PO# ploease register the PO first. 
        </span>
        <div className='bg-white shadow rounded mt-5 px-8 pt-6 pb-8 mb-4'>
            <form onSubmit={handleSubmit} className=" mt-10">
            {/* <InputSelect name="typeofpo" placeholder="Type of PO" options={potype}></InputSelect> */}
            <div>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Cost Center
                </label>
                <div class="relative">
                    <select name= "branchID" onChange={setCostCenter} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2" id="grid-state">
                    { costcenters.map((option)=>(
                                    <option >{option}</option>
                                ))
                            }
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <div>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                 PO#
                </label>
                <div class="relative">
                    <select name= "poID"  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2" id="grid-state">
                    { poList.map((option)=>(
                                    <option value={option.value} label={option.label}>{option.label}</option>
                                ))
                            }
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Add Employees</label>
            <Select isClearable isMulti name="workers" options={workerList} onChange={addworkerinlist} className="basic-multi-select" classNamePrefix="select"/>
            <div className='h-2'/>
            <label class="block text-gray-700 text-sm font-bold mb-2">Job Description</label>
            <textarea name="description" placeholder="Job Description" className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
            <div className='h-2'/>
            <div>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Add Equipements
                </label>
                <div class="flex">
                    <select  ref={equipmentname}  class="block appearance-none w-3/5 bg-gray-200 border border-white-200 text-gray-700  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2" id="grid-state">
                    { equipements.map((option)=>(
                                    <option value={option.value} label={option.label}>{option.label}</option>
                                ))
                            }
                    </select>
                    <div className='w-2'/>
                    <input type="Number" name="eqnt" ref={equan} defaultValue="0" placeholder="Quantity" class="block appearance-none w-1/5 bg-white-200 border border-gray-200 text-white-700 pl-3 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white mb-2"/>
                    <div className='w-2'/>
                    <button name='addequip' type="button" onClick={addequipments} className='bg-green-500 h-11 w-1/10 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'> Add item</button>
                </div>
            </div>
            <div className='h-2'/>
            <table className="border-collapse border border-slate-500 w-full">
                <thead>
                    <th class="border border-slate-600 ">Equipement ID</th>
                    <th class="border border-slate-600 ">Quantity</th>
                    <th class="border border-slate-600 ">Equipement Name</th>
                </thead>
                <tbody>
                { selectedequip.map((eq)=>(
                                    <tr>
                                        <td class="border border-slate-700 ...">{eq[0]}</td>
                                        <td class="border border-slate-700 ...">{eq[1]}</td>
                                        <td class="border border-slate-700 ...">{eq[2]}</td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
            <div className='h-2'/>
            <div>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Add Consumeable
                </label>
                <div class="flex">
                    <select name= "consumename" ref={consumablename} class="block appearance-none w-3/5 bg-gray-200 border border-white-200 text-gray-700  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2" id="grid-state">
                    { getconsumeable.map((option)=>(
                                    <option value={option.value} label={option.label} >{option.label}</option>
                                ))
                            }
                    </select>
                    <div className='w-2'/>
                    <input type="Number" name="cqnt" defaultValue="0"  ref={cquan} placeholder="Quantity" class="block appearance-none w-1/5 bg-white-200 border border-gray-200 text-white-700 pl-3 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white mb-2"/>
                    <div className='w-2'/>
                    <button name='addcon' type="button" onClick={addconsumeable} className='bg-green-500 h-11 w-1/10 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'> Add item</button>
                </div>
            </div>
            <div className='h-2'/>
            <table className="border-collapse border border-slate-500 w-full">
                <thead>
                    <th class="border border-slate-600 ">Consumable ID</th>
                    <th class="border border-slate-600 ">Quantity</th>
                    <th class="border border-slate-600 ">Consumable Name</th>
                </thead>
                <tbody>
                { selectconid.map((eq)=>(
                                    <tr>
                                        <td class="border border-slate-700 ...">{eq[0]}</td>
                                        <td class="border border-slate-700 ...">{eq[1]}</td>
                                        <td class="border border-slate-700 ...">{eq[2]}</td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
            <div className='h-2'/>
            <div>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Add Rental Equipement
                </label>
                <div class="flex">
                    <input name= "consumename" ref={rentalname} class="block appearance-none w-3/5 bg-gray-200 border border-white-200 text-gray-700  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2" id="grid-state">
                    </input>
                    <div className='w-2'/>
                    <input type="Number" name="rqnt" defaultValue="0"  ref={rquan} placeholder="Quantity" class="block appearance-none w-1/5 bg-white-200 border border-gray-200 text-white-700 pl-3 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white mb-2"/>
                    <div className='w-2'/>
                    <button name='addcon' type="button" onClick={addrental} className='bg-green-500 h-11 w-1/10 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'> Add item</button>
                </div>
            </div>
            <div className='h-2'/>
            <table className="border-collapse border border-slate-500 w-full">
                <thead>
                    <th class="border border-slate-600 ">Rental Equipment Name</th>
                    <th class="border border-slate-600 ">Quantity</th>
                </thead>
                <tbody>
                { selectrental.map((eq)=>(
                                    <tr>
                                        <td class="border border-slate-700 ...">{eq[0]}</td>
                                        <td class="border border-slate-700 ...">{eq[1]}</td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>

            {errormessage.length>1 ? <div role="alert">
                        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Something Went Wrong
                            </div>
                        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>{errormessage}</p>
                        </div>
                        </div>: <div/>}
            <button class="bg-green-500 mt-10 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
            </form>
        </div>
    </div>
  )
}

export default AddWO