import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import {GoPrimitiveDot} from 'react-icons/go';
import { MdOutlineSupervisorAccount } from 'react-icons/md';

import {Stacked,Pie, Button,  SparkLine} from "../componets";
import { earningData, SparklineAreaData,stackedChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import axios, { Axios } from 'axios';


const Dashboard = () => {
  console.log("hi");
  
  // const fetchAPIData=async(url)=>{
  //   try{
  //     const res= await fetch(url)
  //     const data= await res.json();
  //     console.log(data);
  //   }catch(error){
  //     console.log(error);
      
  //   }
  // }

  
  const[data,setData]=useState("")
  const getdata= ()=>
  {
    axios.get("/api/user/dashboardUserState/get",).then((response)=>{
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
          <div className='justify-between flex items-center m-4'>
            <div>
              <p className='font-bold text-gray-400'>Total number of users</p>
              <p className='font-bold text-green-800 text-2xl'>{data.totaluser}</p>
            </div>
          </div>
        </div>

        

        <div className='flex m-3 flex-wrap  justify-center gap-5 '>
          <div key={"Pasadena, TX 77506"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "rgb(83, 3, 156)", backgroundColor: "rgb(210, 161, 255)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch1}</span>
                
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Pasadena, TX 77506"}</p>
            </div>

            <div key={"Snyder, TX 79549"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "rgb(83, 3, 156)", backgroundColor: "rgb(210, 161, 255)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch3}</span>
                
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Snyder, TX 79549"}</p>
            </div>

            <div key={"Nederland, TX 77627"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "rgb(83, 3, 156)", backgroundColor: "rgb(210, 161, 255)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch2}</span>
                
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Nederland, TX 77627"}</p>
            </div>

            <div key={"Angleton, TX 77515"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "rgb(83, 3, 156)", backgroundColor: "rgb(210, 161, 255)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch4}</span>
                
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Angleton, TX 77515"}</p>
            </div>

            <div key={"Port Lavaca, TX 77979"}
              className="bg-white w-60 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: "rgb(83, 3, 156)", backgroundColor: "rgb(210, 161, 255)"}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount/>
              </button>
              <p className="mt-3">
              <span className="text-gray-400 font-semibold mr-1">No of Employee:</span>
                <span className="text-2xl font-semibold">{data.branch5}</span>
                
              </p>
              <p className="text-sm text-gray-400  mt-1">{"Port Lavaca, TX 77979"}</p>
            </div>
        
        </div>

        
      
            <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">OnBoarding Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Registered</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Approved</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">{data.active}</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    {(data.active/data.totaluser)*100}%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Approved users</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">{data.totaluser}</p>

                <p className="text-gray-500 mt-1">Registered users</p>
              </div>

              <div className="mt-5">
                <SparkLine currentColor="green" id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color="green" />
              </div>
              <div className="mt-10">
                {/* <Button
                  color="white"
                  bgColor="green"
                  text="Download Report"
                  borderRadius="10px"
                /> */}
              </div>
            </div>
            <div>
              <Stacked currentMode='Light' width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: "green" }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">$63,448.78</p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine currentColor="green" id="column-sparkLine" height="100px" type="Column" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>

            </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard