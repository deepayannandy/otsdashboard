import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header,Input, InputSelect, InputSelectFilter} from '../componets'
import axios from 'axios'

const AddPO = () => {
    const navigate = useNavigate();
    const potype=["T&M", "Lumpsum", "MSA", "DailyTimesheet", "Callout", "Others"]
    const costcenters=[ "Pasadena, TX 77506","Nederland, TX 77627","Snyder, TX 79549","Angleton, TX 77515","Port Lavaca, TX 77979"]
    const [errormessage,setErrormessage]=useState("");
    const [s3url,sets3url]=useState("");
    const [clientList,setclientList]=useState([]);
    const getclientList= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/customer/dashboardCustomers/getall/").then((response)=>{
        let cllist=[]
        for (let client in response.data){
            cllist.push(response.data[client].Customer)
            
        }
        console.log(cllist)
        setclientList(cllist);
    })
  }
  useEffect(()=>{
    getclientList()
  },[])
    const inputs=[
        {
            id:1,
            name:"poNumber",
            type:"text",
            placeholder:"PO# ",
        },
        {
            id:2,
            name:"email",
            type:"email",
            pattern:"+@.com",
            placeholder:"Email",
        },
        {
            id:3,
            name:"contact",
            type:"tel",
            pattern:"[0-9]{3}[0-9]{3}[0-9]{4}",
            placeholder:"Contact Number",
        },
        {
            id:6,
            name:"mobile",
            type:"tel",
            pattern:"[0-9]{3}[0-9]{3}[0-9]{4}",
            placeholder:"Mobile Number", 
        },
        {
            id:7,
            name:"fax",
            type:"tel",
            pattern:"[0-9]{3}[0-9]{3}[0-9]{4}",
            placeholder:"Fax Number",
        },
        {
            id:5,
            name:"fileinput",
            type:"file",
            placeholder:"Upload Documents",
        },

    ]
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const data= new FormData(e.target)
        let recievedData=Object.fromEntries(data.entries());
        const file= recievedData.fileinput;
        await axios.get("http://localhost:6622/s3url/"+file.name,).then((data)=>{
            sets3url(data.data.uploadUrl);
            //console.log(data.data.uploadUrl);
            
        }).catch((error)=>{
            console.log(error);
        })
        //console.log("s3url: "+s3url)
        await fetch(s3url,{
            method:'PUT',
            headers:{"Content-Type":  "multipart/form-data",
            body:file
        }
        }).catch((error)=>{console.log(error)})
        recievedData.managerId="Admin"
        console.log(recievedData)
        axios.post('https://tilapi.pocsofclients.com/api/po/', recievedData, {
        headers: { 'Content-type': 'application/json; charset=UTF-8','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlhNDRmNjFmN2Y0MjMyMGIwOWY1MjQiLCJkZXNpZyI6Ik1hbmFnZXIiLCJpYXQiOjE2NzEwNTQ2NDJ9.wftzYTqVIB_ACxuj0WEiVOJozJoQAx8ek3AjlG_TY5I" }
        }).then((data) => {
            navigate('pocsof/clients/tier1integrity/PO');
        }).catch((error)=>{
            if(error.response){
                // console.log(error.response.data);
                // console.log(error.response.status);
                setErrormessage(error.response.data);
                // console.log(error.response.data["message"]);
                if(error.response.data["message"]!=undefined){
                setErrormessage(error.response.data["message"]);
                }
            }
        })

    }
    const navigatetonewcustomer=()=>{
        navigate('/pocsof/clients/tier1integrity/addnewcustomer');
    }
  return (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-10 bg-hero-water">
        <Header category="Page" title="Crearte a new #PO" />
        <button class="bg-green-500 mt-2 mb-1 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={navigatetonewcustomer}>Add New Customer</button>
        <br/>
        <span className='text-gray-500 text-xs mb-10'>
            * In case of a new customer ploease register the customer first. 
        </span>
        <div className='bg-white shadow rounded mt-5 px-8 pt-6 pb-8 mb-4'>
            <form onSubmit={handleSubmit} className=" mt-10">
            <InputSelect name="typeofpo" placeholder="Type of PO" options={potype}></InputSelect>
            <InputSelect name="branchID" placeholder="Cost Center" options={costcenters}></InputSelect>
            <InputSelectFilter name="CustomerID" placeholder="Client"  options={clientList}></InputSelectFilter>
                {
                    inputs.map((oneinput)=>(
                        <Input key={oneinput.id} {...oneinput}></Input>
                    ))
                }
            <label class="block text-gray-700 text-sm font-bold mb-2">Job Description</label>
            <textarea name="JD" placeholder="Job Description" className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>

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

export default AddPO