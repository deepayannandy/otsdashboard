import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom'
import {  contextMenuItems, userGrid } from '../data/dummy';
import { Header } from '../componets';
import axios from 'axios';
import { closest } from '@syncfusion/ej2-base';
import { search } from '@syncfusion/ej2/filemanager';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import QRCode from "react-qr-code";


const Employees = () => {
  const[employeedata,setData]=useState("")
  const [open, setOpen] = React.useState(false);
  const [empdata, setempdata] = React.useState([]);
  const navigate = useNavigate();
  const getdata= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/user/dashboardUserState/getall",).then((response)=>{
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
          pageOrientation: 'Landscape',
          pageSize: 'A4',
          fileName: 'UserData.pdf'
      };
        grid.pdfExport(exportProperties);
      }
      if (args.item.id.includes('excelexport')) {
        const exportProperties = {
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


  const actionComplete=(args)=>{
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      const cols = grid.columns;
            for (const col of cols) {
                if (col.field === "status") {
                    col.visible = false;
                }
                if (col.field === "ssn") {
                  col.visible = true;
              }
              if (col.field === "password") {
                col.visible = true;
            }
        
            }
      const dialog = args.dialog;
      dialog.showCloseIcon = true;
      // change the header of the dialog
      dialog.header = args.requestType === 'beginEdit' ? 'Edit Record of ' + args.rowData['CustomerID'] : 'New Employee';
  }
    if(args.requestType=="save"){
      console.log("Save data");
      console.log(args.data);
      axios.post('https://tilapi.pocsofclients.com/api/user/register/dashboard/', args.data, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then((data) => console.log(data))
    }
  }
  const navigatetoRgistration=()=>{
    navigate('/pocsof/clients/tier1integrity/addnewemployee');
  }
  const recordClick = (args) => {
    if (args.target.classList.contains('showqr')) {
        let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
        setempdata(rowObj.data);
        setOpen(true);
        console.log(rowObj.data._id);
    }
  }
  const handleToClose = () => {
    setOpen(false);
  };
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-hero-water rounded-3xl">
      <Header category="Page" title="Employees" />
      <button class="bg-green-500 mt-2 mb-5 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={navigatetoRgistration}>Add New Employee</button>
      <GridComponent
        ref={g => grid = g}
        actionComplete={actionComplete}
        id="gridcomp"
        dataSource={employeedata}
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
          {userGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
      </GridComponent>

      <Dialog open={open}  onClose={handleToClose}>
        <DialogTitle>{"Details of: "+empdata.fullname}</DialogTitle>
        <DialogContent className='w-full'>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
            <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={empdata._id}
            viewBox={`0 0 256 256`}
            />
        </div>
        <div className='h-3'>
        </div>
          <DialogContentText className='center'>
            {"Name: "+empdata.fullname}
            <br/>
            {"Contact: "+empdata.mobile}
            <br/>
            {"Email: "+empdata.email}
            <br/>
            {"Designation: "+empdata.desig}
            <br/>
            {"Current Project: "+empdata.projid}
            <br/>
            {"Cost Center: "+empdata.empBranch}
            <br/>
            {"Date of Registration: "+empdata.onBoardingDate}
          </DialogContentText>
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
};
export default Employees;