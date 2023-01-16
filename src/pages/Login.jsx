import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header,Input, InputSelect} from '../componets'
import axios from 'axios'
import avatar from '../data/clientlogo.png';
import { useStateContext } from '../contexts/ContextProvider';
const Login = () => {
    const {setisLogin}=useStateContext();
    const navigate = useNavigate();
    const costcenters=[ "Pasadena, TX 77506","Nederland, TX 77627","Snyder, TX 79549","Angleton, TX 77515","Port Lavaca, TX 77979"]
    const [errormessage,setErrormessage]=useState("");

    const inputs=[
        {
            id:1,
            name:"email",
            type:"text",
            placeholder:"Username",
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Password",
        },
    ]
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
    <div className="m-2 md:m-10 mt-4 p-2 md:p-10 h-screen bg-hero-texus">
        <Header category="Page" title="" />
        <div className='justify-center items-center bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4 lg:mr-80 lg:ml-80 lg:mt-20'>
        <img
              className=" w-100 h-40"
              src={avatar}
              alt="user-profile"
            />
            <form onSubmit={handleSubmit} className=" mt-10">
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
            <button class="bg-green-500 mt-10 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">LogIn</button>
            </form>
        </div>
    </div>
  )
}

export default Login