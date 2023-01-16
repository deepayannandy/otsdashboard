import React, { useState, useEffect } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom'
import { Header,Input, InputSelect} from '../componets'
import axios from 'axios'
import avatar from '../data/clientlogo.png';
import { useStateContext } from '../contexts/ContextProvider';
import { QRCode } from 'react-qrcode-logo';
const WoProfile = () => {
    const [queryParameters] = useSearchParams()
    console.log(queryParameters.get("id"))
    const {setisLogin}=useStateContext();
    const navigate = useNavigate();
    const [errormessage,setErrormessage]=useState("");
    const [wodata,setwodata]=useState("");

    const gettodaysdata= ()=>
    {
        axios.get("https://tilapi.pocsofclients.com/api/wo/byname/"+queryParameters.get("id")).then((response)=>{
            setwodata(response.data);
        })
    }
    useEffect(()=>{
        gettodaysdata()
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data= new FormData(e.target)
        let recievedData=Object.fromEntries(data.entries());
        if(recievedData.email=="admin" && recievedData.password=="Password"){
            setisLogin(true)
            localStorage.setItem('userinfo',recievedData.email)
            navigate('/dashboard');
        }

    }
  return (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-10 bg-hero-water">
        <Header category="Page" title="" />
        <div className='justify-center items-center bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4 lg:mr-80 lg:ml-80 lg:mt-20'>
        {errormessage.length>1 ? <div role="alert">
                        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Something Went Wrong
                            </div>
                        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>{errormessage}</p>
                        </div>
                        </div>: <div/>}
        <QRCode
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"https://tier1integrity.pocsofclients.com/WoProfile?id="+wodata._id}
            viewBox={`0 0 256 256`}
            logoWidth={180 * 0.2}
            logoImage="https://firebasestorage.googleapis.com/v0/b/ots-pocket.appspot.com/o/projectFiles%2Fclientavatar.png?alt=media&token=662f9c22-edd5-4387-aa66-093ce4cfa184"
            />
        <div className="">
            <p className="text-lg text-slate-700">WO#</p>
            <p className="text-2xl font-extrabold tracking-tight text-green-700">
            {wodata.woNumber}
            </p>
            <p className="text-xs font-extrabold tracking-tight text-green-700">
            {wodata._id}
            </p>
        </div>
        
        
        <div className='grid gap-2 grid-cols-2 grid-rows-2' >
        <div className="">
            <p className="text-lg text-slate-700">Job Title</p>
            <p className="text-1xl font-extrabold tracking-tight text-green-700">
            {wodata.JT}
            </p>
        </div>
        <div className="">
            <p className="text-lg text-slate-700">PO#</p>
            <p className="text-1xl font-extrabold tracking-tight text-green-700">
            <a href={'https://tier1integrity.pocsofclients.com/PoProfile?id='+wodata.poID}>{wodata.poName}</a>
            </p>
        </div>
        <div className="">
            <p className="text-lg text-slate-700">Start Date</p>
            <p className="text-1xl font-extrabold tracking-tight text-green-700">
            {wodata.startDate}
            </p>
        </div>
        <div className="">
            <p className="text-lg text-slate-700">End Date</p>
            <p className="text-1xl font-extrabold tracking-tight text-green-700">
            {wodata.endDate}
            </p>
        </div>
        <div className="">
            <p className="text-lg text-slate-700">Cost Center</p>
            <p className="text-1xl font-extrabold tracking-tight text-green-700">
            {wodata.branchID}
            </p>
        </div>
        <div className="">
            <p className="text-lg text-slate-700">Created By</p>
            <p className="text-1xl font-extrabold tracking-tight text-green-700">
            {wodata.managerId}
            </p>
        </div>
        </div>
        <div className='h-4'/>
        {
            wodata.workers!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Assigned Employees</th>
            </thead>
            <tbody>
            { wodata.workers.map((eq)=>(
                                <tr>
                                    <td class="border text-green-700 border-slate-700 ..."><a href={'https://tier1integrity.pocsofclients.com/UserProfile?id='+eq[0]}>{eq[1]}</a></td>
                                </tr>
                            ))
                }
            </tbody>
           </table>:<div/>
          }

        <div className='h-4'/>
        {
            wodata.equipements!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Equipment Name</th>
                <th class="border border-slate-600 ">Quantity</th>
            </thead>
            <tbody>
            { wodata.equipements.map((eq)=>(
                                <tr>
                                    <td class="border text-green-700 border-slate-700 ..."><a href={'https://tier1integrity.pocsofclients.com/EquipProfile?id='+eq[0]}>{eq[2]}</a></td>
                                    <td class="border text-green-700 border-slate-700 ...">{eq[1]}</td>
                                </tr>
                            ))
                }
            </tbody>
           </table>:<div/>
          }
           <div className='h-4'/>
        {
            wodata.consumeables!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Consumable Name</th>
                <th class="border border-slate-600 ">Quantity</th>
            </thead>
            <tbody>
            { wodata.consumeables.map((eq)=>(
                                <tr>
                                    <td class="border text-green-700 border-slate-700 ..."><a href={'https://tier1integrity.pocsofclients.com/ConsProfile?id='+eq[0]}>{eq[2]}</a></td>
                                    <td class="border text-green-700 border-slate-700 ...">{eq[1]}</td>
                                </tr>
                            ))
                }
            </tbody>
           </table>:<div/>
          }
           <div className='h-4'/>
        {
            wodata.rentedEquipements!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Rental Equipment Name</th>
                <th class="border border-slate-600 ">Quantity</th>
            </thead>
            <tbody>
            { wodata.rentedEquipements.map((eq)=>(
                                <tr>
                                    <td class="border text-green-700 border-slate-700 ...">{eq[0]}</td>
                                    <td class="border text-green-700 border-slate-700 ...">{eq[1]}</td>
                                </tr>
                            ))
                }
            </tbody>
           </table>:<div/>
          }
          
        </div>
        
    </div>
  )
}

export default WoProfile