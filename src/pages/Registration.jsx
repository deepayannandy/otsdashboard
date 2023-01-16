import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header,Input, InputSelect} from '../componets'
import axios from 'axios'
const Registration = () => {
    const navigate = useNavigate();
    const costcenters=[ "Pasadena, TX 77506","Nederland, TX 77627","Snyder, TX 79549","Angleton, TX 77515","Port Lavaca, TX 77979"]
    const [errormessage,setErrormessage]=useState("");
    const inputs=[
        {
            id:1,
            name:"email",
            type:"text",
            placeholder:"Full Name",
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
            name:"mobile",
            type:"tel",
            pattern:"[0-9]{3}[0-9]{3}[0-9]{4}",
            placeholder:"Contact Number",
        },
        {
            id:4,
            name:"ssn",
            type:"text",
            placeholder:"SSN",
            pattern:"[0-9]{9}"
        },
        {
            id:5,
            name:"password",
            type:"password",
            placeholder:"Password",
        },
    ]
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data= new FormData(e.target)
        let recievedData=Object.fromEntries(data.entries());
        recievedData.desig="Employee";
        recievedData.projid="NA";
        axios.post('https://tilapi.pocsofclients.com/api/user/register/dashboard/', recievedData, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then((data) => {
            navigate('/Users');
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
        <Header category="Page" title="Employees Registration" />
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <form onSubmit={handleSubmit} className=" mt-10">
            <InputSelect name="empBranch" placeholder="Cost Center" options={costcenters}></InputSelect>
                {
                    inputs.map((oneinput)=>(
                        <Input key={oneinput.id} {...oneinput}></Input>
                    ))
                }
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

export default Registration