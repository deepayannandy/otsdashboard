import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom'
import {  contextMenuItems, timecardGrid } from '../data/dummy';
import { Header } from '../componets';
import axios from 'axios';
import { search } from '@syncfusion/ej2/filemanager';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { QRCode } from 'react-qrcode-logo';
import { closest } from '@syncfusion/ej2-base';

const Timecard = () => {
  const [open, setOpen] = React.useState(false);
  const[customerdata,setcustomerdata]=useState("")
  const navigate = useNavigate();
  useEffect(()=>{
    if (!localStorage.getItem('userinfo')){
      navigate('/Login');
    }
    })
  const editing = { allowDeleting: false, allowEditing: false , mode: 'Dialog'};
  const[employeedata,setData]=useState("")
  const getdata= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/timecard/",{
      headers: { 'Content-type': 'application/json; charset=UTF-8','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlhNDRmNjFmN2Y0MjMyMGIwOWY1MjQiLCJkZXNpZyI6Ik1hbmFnZXIiLCJpYXQiOjE2NzEwNTQ2NDJ9.wftzYTqVIB_ACxuj0WEiVOJozJoQAx8ek3AjlG_TY5I"}
  }).then((response)=>{
      setData(response.data);
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const toolbarOptions = ['Search','ExcelExport','PdfExport',];
  let grid;
  const toolbarClick = (args) => {
    if (grid) {
      if (args.item.id.includes('pdfexport')) {
        const exportProperties = {
          pageOrientation: 'Landscape',
          pageSize: 'A3',
          fileName: 'Customers.pdf'
      };
        grid.pdfExport(exportProperties);
      }
      if (args.item.id.includes('excelexport')) {
        const exportProperties = {
          pageOrientation: 'Landscape',
          pageSize: 'A4',
          fileName: 'Customers.xlsx'
      };
        grid.excelExport(exportProperties);
      }
    }
  }
  const actionComplete=(args)=>{
    if(args.requestType=="save"){
      console.log("Save data");
      console.log(args.data);
      axios.patch('https://tilapi.pocsofclients.com/api/timecard/'+args.data._id, args.data, {
        headers: { 'Content-type': 'application/json; charset=UTF-8','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlhNDRmNjFmN2Y0MjMyMGIwOWY1MjQiLCJkZXNpZyI6Ik1hbmFnZXIiLCJpYXQiOjE2NzEwNTQ2NDJ9.wftzYTqVIB_ACxuj0WEiVOJozJoQAx8ek3AjlG_TY5I"}
    }).then((data) => console.log(data))
    }
    // const dialog = args.dialog;
    // dialog.showCloseIcon = true;
    // dialog.header = args.requestType === 'beginEdit' ? 'Edit': 'New';
  }
  const navigatetonewcustomer=()=>{
    navigate('/addnewcustomer');
}
const recordClick = (args) => {
  if (args.target.classList.contains('Active')){
    console.log("Active pressed")
  }
  if (args.target.classList.contains('showqr')) {
      let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
      setcustomerdata(rowObj.data);
      setOpen(true);
      console.log(rowObj.data._id);
  }
}
const handleToClose = () => {
  setOpen(false);
};
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-hero-water rounded-3xl">
      <Header category="Page" title="Time Cards" />
      {/* <button class="bg-green-500 mt-2 mb-5 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={navigatetonewcustomer}>Add New Customer</button> */}

      <GridComponent
        id="gridcomp"
        ref={g => grid = g}
        toolbarClick={toolbarClick}
        actionComplete={actionComplete}
        dataSource={employeedata}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
        recordClick={recordClick}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {timecardGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
      </GridComponent>

      <Dialog open={open}  onClose={handleToClose}>
        <DialogTitle>{"Details of: "+customerdata.Customer}</DialogTitle>
        <DialogContent className='w-full'>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
            <QRCode
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={customerdata._id}
            viewBox={`0 0 256 256`}
            logoWidth={180 * 0.2}
            logoImage="https://firebasestorage.googleapis.com/v0/b/ots-pocket.appspot.com/o/projectFiles%2Fclientavatar.png?alt=media&token=662f9c22-edd5-4387-aa66-093ce4cfa184"
            
            />
        </div>
        <div className='h-3'>
        </div>
          <DialogContentText className='center'>
            {"Name: "+customerdata.Customer}
            <br/>
            {"Contact Person: "+customerdata.contactperson}
            <br/>
            {"Email: "+customerdata.email}
            <br/>
            {"Contact Number: "+customerdata.contact}
            <br/>
            {"Address: "+customerdata.address}
            <br/>
            {"Cost Center: "+customerdata.branchID}
            
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
export default Timecard;