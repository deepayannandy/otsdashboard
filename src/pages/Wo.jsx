import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit,Search,Toolbar } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom'
import {  contextMenuItems, woGrid } from '../data/dummy';
import { Header } from '../componets';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,Inject,ViewDirective,ViewsDirective } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';

const WO = () => {
  const [oldview, setoldview] = React.useState(true);

  const data = [
    {
        Id: 2,
        Subject: 'T1LWO2022-3-J1216827',
        StartTime: new Date(2023, 0, 5),
        EndTime: new Date(),
        IsAllDay: true,
        Status: 'Completed',
        Priority: 'High'
    },
    {
      Id: 1,
      Subject: 'T1IWO2023-3-J161212',
      StartTime: new Date(2023, 0, 1),
      EndTime: new Date(2023, 0, 3),
      IsAllDay: true,
      Status: 'Completed',
      Priority: 'High'
  },
  {
    Id: 3,
    Subject: 'T1IWO2023-3-J162311',
    StartTime: new Date(2023, 0, 15),
    EndTime: new Date(2023,0,20),
    Status: 'Completed',
},
];

  const[POedata,setData]=useState("")
  const navigate = useNavigate();
  const getdata= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/wo/",).then((response)=>{
      setData(response.data);
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const toolbarOptions = ['Search','ExcelExport','PdfExport'];
  const editing = { allowDeleting: true, allowEditing: true , allowAdding: true,mode: 'Dialog'};
  let grid;
  const toolbarClick = (args) => {
    if (grid) {
      if (args.item.id.includes('pdfexport')) {
        const exportProperties = {
          exportType: 'CurrentPage',
          pageOrientation: 'Landscape',
          pageSize: 'A4',
          fileName: 'UserData.pdf'
      };
        grid.pdfExport(exportProperties);
      }
      if (args.item.id.includes('excelexport')) {
        const exportProperties = {
          exportType: 'CurrentPage',
          pageOrientation: 'Landscape',
          pageSize: 'A4',
          fileName: 'UserData.xlsx'
      };
        grid.excelExport(exportProperties);
      }
    }
  }
  const queryCellInfo=(args)=>{
    if (args.column.field === 'empBranch'){
      if (args.data['empBranch'] ==="Pasadena, TX 77506") { 
        args.cell.style.backgroundColor ="rgb(225, 145, 77)";  
    }
    if (args.data['empBranch'] ==="Nederland, TX 77627") { 
      args.cell.style.backgroundColor ="rgb(103, 73, 162)";  
    }
    if (args.data['empBranch'] ==="Snyder, TX 79549") { 
    args.cell.style.backgroundColor ="rgb(148, 116, 67)";  
    }
    if (args.data['empBranch'] ==="Angleton, TX 77515") { 
    args.cell.style.backgroundColor ="rgb(109, 150, 173)";  
    }
    if (args.data['empBranch'] ==="Port Lavaca, TX 77979") { 
    args.cell.style.backgroundColor ="rgb(151, 42, 40)";  
    }
    }
  }


  const navigatetoRgistration=()=>{
    navigate('/pocsof/clients/tier1integrity/addnewwo');
  }
  const switchview=()=>{
    setoldview(!oldview);
  }

  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-hero-water rounded-3xl">
      <Header category="Page" title="WO#" />
      <div className='flex'>
      <button class="bg-green-500 mt-2 mb-5 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={navigatetoRgistration}>Add New WO</button>
      <div className='w-2'/>
      <button class="bg-green-500 mt-2 mb-5 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={switchview}>{oldview?"Swich to Calander view":"Switch to Table view"}</button>
      </div>
      {oldview? 
      <GridComponent
      ref={g => grid = g}
      id="gridcomp"
      dataSource={POedata}
      contextMenuItems={contextMenuItems}
      editSettings={editing}
      allowExcelExport={true}
      allowPdfExport={true}
      toolbar={toolbarOptions}
      toolbarClick={toolbarClick}
      queryCellInfo={queryCellInfo}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {woGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>
      <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
    </GridComponent>

      :
      <ScheduleComponent
      width= '100%'  height='550px' 
      eventSettings={{ dataSource: data }}
      >
      <ViewsDirective>
      <ViewDirective option='WorkWeek' startHour= '7:00' endHour= '24:00' />
      <ViewDirective  option= 'Week' startHour= '07:00' endHour= '24:00' />
      <ViewDirective option='Month' showWeekend={true} />
      </ViewsDirective>
      <Inject services={[WorkWeek, Week, Month]} />
      </ScheduleComponent>}
    </div>
  );
}

export default WO