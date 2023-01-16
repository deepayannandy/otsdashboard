import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit,Search,Toolbar } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom'
import {  contextMenuItems, woGrid } from '../data/dummy';
import { Header } from '../componets';
import { ScheduleComponent, Day, Week, WorkWeek, Month,  ResourcesDirective, ResourceDirective,Inject,ViewDirective,ViewsDirective } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import { closest } from '@syncfusion/ej2-base';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { QRCode } from 'react-qrcode-logo';

const WO = () => {
  const [oldview, setoldview] = React.useState(true);
  const [schdata,setschdata]= React.useState(true);
  const [open, setOpen] = React.useState(false);
  const[selectedWOedata,setselectedWOedata]=useState({})
  const[POedata,setData]=useState("")

  const navigate = useNavigate();
  useEffect(()=>{
    if (!localStorage.getItem('userinfo')){
      navigate('/Login');
    }
    })
  const getdata= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/wo/",).then((response)=>{
      setData(response.data);
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const getschdata= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/wo/sghedulaing/get",).then((response)=>{
      setschdata(response.data);
      console.log(response.data);
    })
  }
  useEffect(()=>{
    getschdata()
  },[])
  const toolbarOptions = ['Search','ExcelExport','PdfExport'];
  const editing = { allowDeleting: false, allowEditing: false , allowAdding: false,mode: 'Dialog'};
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
    navigate('/addnewwo');
  }
  const switchview=()=>{
    setoldview(!oldview);
  }
  const recordClick = (args) => {
    if (args.target.classList.contains('showqr')) {
        let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
        setselectedWOedata(rowObj.data);
        setOpen(true);
        console.log(rowObj.data);
    }
  }
  const handleToClose = () => {
    setOpen(false);
  };
  const ownerData = [
    { OwnerText: 'Open', Id: 1, OwnerColor: '#ffaa00' },
    { OwnerText: 'Closed', Id: 2, OwnerColor: '#f8a398' },
];

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
      recordClick={recordClick}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {woGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>
      <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
    </GridComponent>

      :
      <ScheduleComponent
      rowAutoHeight={true}
      width= '100%'  height='550px' 
      eventSettings={{ dataSource: schdata }}
      >
      <ViewsDirective>
      {/* <ViewDirective option='WorkWeek' startHour= '7:00' endHour= '24:00' />
      <ViewDirective  option= 'Week' startHour= '07:00' endHour= '24:00' /> */}
      <ViewDirective option='Month' showWeekend={true} />
      </ViewsDirective>
      <ResourcesDirective>
      <ResourceDirective dataSource={schdata} colorField='colorField'>
      </ResourceDirective>
    </ResourcesDirective>
      <Inject services={[Month]} />
      </ScheduleComponent>}


      <Dialog open={open}  onClose={handleToClose}>
        <DialogTitle>{"Details of: "+selectedWOedata.woNumber}</DialogTitle>
        <DialogContent className='w-full'>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
        <QRCode
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"https://tier1integrity.pocsofclients.com/WoProfile?id="+selectedWOedata._id}
            viewBox={`0 0 256 256`}
            logoWidth={180 * 0.2}
            logoImage="https://firebasestorage.googleapis.com/v0/b/ots-pocket.appspot.com/o/projectFiles%2Fclientavatar.png?alt=media&token=662f9c22-edd5-4387-aa66-093ce4cfa184"
            
            />
        </div>
        <div className='h-3'>
        </div>
          <DialogContentText className='center'>
            {"WO#: "+selectedWOedata.woNumber}
            <br/>
            {"PO#: "+selectedWOedata.poName}
            <br/>
            {"Job Title: "+selectedWOedata.JT}
            <br/>
            {"Cost Center: "+selectedWOedata.branchID}
            <br/>
            {"Start Date: "+selectedWOedata.startDate}
            <br/>
            {"End Date: "+selectedWOedata.endDate}
            <br/>
            {"Created By: "+selectedWOedata.managerId}
            <br/>
          </DialogContentText>
          {
            selectedWOedata.workers!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Assigned Employees</th>
            </thead>
            <tbody>
            { selectedWOedata.workers.map((eq)=>(
                                <tr>
                                    <td class="border border-slate-700 ...">{eq[1]}</td>
                                </tr>
                            ))
                }
            </tbody>
           </table>:<div/>
          }
          <div className='h-4'/>
        {
            selectedWOedata.equipements!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Equipment Name</th>
                <th class="border border-slate-600 ">Quantity</th>
            </thead>
            <tbody>
            { selectedWOedata.equipements.map((eq)=>(
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
            selectedWOedata.consumeables!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Consumable Name</th>
                <th class="border border-slate-600 ">Quantity</th>
            </thead>
            <tbody>
            { selectedWOedata.consumeables.map((eq)=>(
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
            selectedWOedata.rentedEquipements!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Rental Equipment Name</th>
                <th class="border border-slate-600 ">Quantity</th>
            </thead>
            <tbody>
            { selectedWOedata.rentedEquipements.map((eq)=>(
                                <tr>
                                    <td class="border text-green-700 border-slate-700 ...">{eq[0]}</td>
                                    <td class="border text-green-700 border-slate-700 ...">{eq[1]}</td>
                                </tr>
                            ))
                }
            </tbody>
           </table>:<div/>
          }
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default WO