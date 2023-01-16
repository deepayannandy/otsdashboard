import React, { useState, useEffect } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom'
import { Header,Input, InputSelect} from '../componets'
import axios from 'axios'
import avatar from '../data/clientlogo.png';
import { useStateContext } from '../contexts/ContextProvider';
import { QRCode } from 'react-qrcode-logo';
const ConsProfile = () => {
    const [queryParameters] = useSearchParams()
    console.log(queryParameters.get("id"))
    const {setisLogin}=useStateContext();
    const navigate = useNavigate();
    const [errormessage,setErrormessage]=useState("");
    const [consdata,setconsdata]=useState("");

    const gettodaysdata= ()=>
    {
        axios.get("https://tilapi.pocsofclients.com/api/consumeables/"+queryParameters.get("id")).then((response)=>{
            setconsdata(response.data);
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
            value={"https://tier1integrity.pocsofclients.com/ConsProfile?id="+consdata._id}
            viewBox={`0 0 256 256`}
            logoWidth={180 * 0.2}
            logoImage="https://firebasestorage.googleapis.com/v0/b/ots-pocket.appspot.com/o/projectFiles%2Fclientavatar.png?alt=media&token=662f9c22-edd5-4387-aa66-093ce4cfa184"
            />
        <div className="">
            <p className="text-lg text-slate-700">Consumable</p>
            <p className="text-2xl font-extrabold tracking-tight text-green-700">
            {consdata.name}
            </p>
            <p className="text-xs font-extrabold tracking-tight text-green-700">
            {consdata._id}
            </p>
        </div>
        <div className='grid gap-2 grid-cols-2 grid-rows-2' >
        {consdata.stockQnt<=15?<div className="">
            <p className="text-lg text-slate-700">Available</p>
            <p className= "text-1xl font-extrabold tracking-tight text-red-700">
            {consdata.stockQnt}
            </p>
        </div>: <div className="">
            <p className="text-lg text-slate-700">Available</p>
            <p className= "text-1xl font-extrabold tracking-tight text-green-700">
            {consdata.stockQnt}
            </p>
        </div>}
        <div className="">
            <p className="text-lg text-slate-700">Dispatched</p>
            <p className="text-1xl font-extrabold tracking-tight text-green-700">
            {consdata.dispatchQnt}
            </p>
        </div>
        <div className="">
            <p className="text-lg text-slate-700">Cost Center</p>
            <p className="text-1xl font-extrabold tracking-tight text-green-700">
            {consdata.branchID}
            </p>
        </div>
        
        </div>
        </div>
    </div>
  )
}

export default ConsProfile