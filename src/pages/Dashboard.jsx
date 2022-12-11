import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import {GoPrimitiveDot} from 'react-icons/go';
import { MdOutlineSupervisorAccount } from 'react-icons/md';

import {Stacked,Pie, Button,  SparkLine, Footer, Chart} from "../componets";
import { earningData, SparklineAreaData,stackedChartData,ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import axios, { Axios } from 'axios';
import moment from "moment";


const today=moment().format("YYYY-MM-DD")
const Dashboard = () => {
  console.log("hi");
  
  const[todaysdata,settodaysData]=useState("")
  const gettodaysdata= ()=>
  {
    axios.get("https://dnyindia.in/api/user/dashboardUserState/get/"+today).then((response)=>{
      console.log(response);
      settodaysData(response.data);
    })
  }
  useEffect(()=>{
    gettodaysdata()
  },[])

  const[data,setData]=useState("")
  const getdata= ()=>
  {
    axios.get("https://dnyindia.in/api/user/dashboardUserState/get",
    ).then((response)=>{
      console.log(response);
      setData(response.data);
    })
  }
useEffect(()=>{
  getdata()
},[])
  return (
    <div className='mt-5'>
      <div className='flex flex-wrap  justify-center'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-screen p-8 pt-9 m-3  bg-no-repeat bg-cover bg-center bg-hero-pattern'>
          <div className='flex items-center m-4'>
            <div>
              <p className='font-bold text-gray-400'>Today, date_create: {moment().format("MM-DD-YYYY")}</p>
              <p className='font-bold text-gray-400'>Total Employee Count</p>
              <p className='font-bold text-green-800 text-3xl'>{data.totaluser}</p>
            </div>
            
          </div>
        </div>

        

        <div className='flex m-3 flex-wrap  justify-center gap-5 '>
          <div key={"Pasadena, TX 77506"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "white", backgroundColor: "rgb(225, 145, 77)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch1}</span>
                
              </p>
              <p className="">
              <span className="text-gray-400 font-semibold mr-1">Approved: <span className='text-green-900 text-2xl'>{data.branch1_active}</span> Pending: <span className='text-red-900 text-2xl'>{(data.branch1-data.branch1_active)}</span></span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Pasadena, TX 77506"}</p>
            </div>

            <div key={"Snyder, TX 79549"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "white", backgroundColor: "rgb(148, 116, 67)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch3}</span>
                
              </p>
              <p className="">
              <span className="text-gray-400 font-semibold mr-1">Approved: <span className='text-green-900 text-2xl'>{data.branch3_active}</span> Pending: <span className='text-red-900 text-2xl'>{(data.branch3-data.branch3_active)}</span></span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Snyder, TX 79549"}</p>
            </div>

            <div key={"Nederland, TX 77627"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "white", backgroundColor: "rgb(103, 73, 162)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch2}</span>
                
              </p>
              <p className="">
              <span className="text-gray-400 font-semibold mr-1">Approved: <span className='text-green-900 text-2xl'>{data.branch2_active}</span> Pending: <span className='text-red-900 text-2xl'>{(data.branch2-data.branch2_active)}</span></span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Nederland, TX 77627"}</p>
            </div>

            <div key={"Angleton, TX 77515"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "white", backgroundColor: "rgb(109, 150, 173)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch4}</span>
                
              </p>
              <p className="">
              <span className="text-gray-400 font-semibold mr-1">Approved: <span className='text-green-900 text-2xl'>{data.branch4_active}</span> Pending: <span className='text-red-900 text-2xl'>{(data.branch4-data.branch4_active)}</span></span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Angleton, TX 77515"}</p>
            </div>

            <div key={"Port Lavaca, TX 77979"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "white", backgroundColor: "rgb(151, 42, 40)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch5}</span>
                
              </p>
              <p className="">
              <span className="text-gray-400 font-semibold mr-1">Approved: <span className='text-green-900 text-2xl'>{data.branch5_active}</span> Pending: <span className='text-red-900 text-2xl'>{(data.branch5-data.branch5_active)}</span></span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Port Lavaca, TX 77979"}</p>
            </div>
        
        </div>  


        
              
       
        
        <div>
          <div
            className=" rounded-2xl md:w-400 p-10 m-3"
            style={{ backgroundColor: "green" }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Daily Onbording Status</p>

            <div>
              <p className="text-2xl text-white font-semibold mt-8">{moment().format("MM/DD/YYYY")}</p>
              
            </div>
            </div>

            <div className="mt-4">
              <Chart currentColor="green" id="column-sparkLine" height="200px" type="Column" data={todaysdata} width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>

            </div>
            
        </div>
      </div>
    
  )
}

export default Dashboard