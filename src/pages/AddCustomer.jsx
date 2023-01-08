import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header,Input, InputSelect} from '../componets'
import axios from 'axios'
const AddCustomer = () => {
    const navigate = useNavigate();
    const costcenters=[ "Pasadena, TX 77506","Nederland, TX 77627","Snyder, TX 79549","Angleton, TX 77515","Port Lavaca, TX 77979"]
    const [errormessage,setErrormessage]=useState("");
    const inputs=[
        {
            id:1,
            name:"Customer",
            type:"text",
            placeholder:"Customer Name",
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
            id:4,
            name:"contactperson",
            type:"text",
            placeholder:"Contact Person",
        },
        // {
        //     id:5,
        //     name:"address",
        //     type:"text",
        //     placeholder:"Address",
        // },
    ]
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data= new FormData(e.target)
        let recievedData=Object.fromEntries(data.entries());
        console.log(recievedData);
        axios.post('https://tilapi.pocsofclients.com/api/customer/', recievedData, {
        headers: { 'Content-type': 'application/json; charset=UTF-8','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlhNDRmNjFmN2Y0MjMyMGIwOWY1MjQiLCJkZXNpZyI6Ik1hbmFnZXIiLCJpYXQiOjE2NzEwNTQ2NDJ9.wftzYTqVIB_ACxuj0WEiVOJozJoQAx8ek3AjlG_TY5I" }
        }).then((data) => {
            navigate('/pocsof/clients/tier1integrity/customers');
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data);
                console.log(error.response.status);
                setErrormessage(error.response.data);
                console.log(error.response.data["message"]);
                if(error.response.data["message"]!=undefined){
                setErrormessage(error.response.data["message"]);
                }
            }
        })

    }
  return (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-10 bg-hero-water">
        <Header category="Page" title="Add New Customer" />
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <form onSubmit={handleSubmit} className=" mt-10">
            <InputSelect name="branchID" placeholder="Cost Center" options={costcenters}></InputSelect>
                {
                    inputs.map((oneinput)=>(
                        <Input key={oneinput.id} {...oneinput}></Input>
                    ))
                }
            <label class="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <textarea name="address" placeholder="Address" className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>

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

export default AddCustomer