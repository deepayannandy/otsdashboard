import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';

import {  contextMenuItems, consumableGrid } from '../data/dummy';
import { useNavigate } from 'react-router-dom'
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

const Consumables = () => {
  const editing = { allowDeleting: false, allowEditing: true, allowAdding: true,mode: 'Dialog' };
  const[equipmentdata,setData]=useState("")
  const [open, setOpen] = React.useState(false);
  const [cond, setcond] = React.useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    if (!localStorage.getItem('userinfo')){
      navigate('/Login');
    }
    })
  const getdata= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/consumeables/dashboardConsumable/getall",).then((response)=>{
      setData(response.data);
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const toolbarOptions = ['Search','ExcelExport','PdfExport','Add', 'Edit'];
  let grid;
  const toolbarClick = (args) => {
    if (grid) {
      if (args.item.id.includes('pdfexport')) {
        const exportProperties = {
          pageOrientation: 'Landscape',
          pageSize: 'A4',
          fileName: 'Equipments.pdf'
      };
        grid.pdfExport(exportProperties);
      }
      if (args.item.id.includes('excelexport')) {
        const exportProperties = {
          pageOrientation: 'Landscape',
          pageSize: 'A4',
          fileName: 'Equipments.xlsx'
      };
        grid.excelExport(exportProperties);
      }
    }
  }

const queryCellInfo=(args)=>{
    if (args.column.field === 'branchID'){
      if (args.data['branchID'] ==="Pasadena, TX 77506") { 
        args.cell.style.backgroundColor ="rgb(225, 145, 77)";  
    }
    if (args.data['branchID'] ==="Nederland, TX 77627") { 
      args.cell.style.backgroundColor ="rgb(103, 73, 162)";  
  }
  if (args.data['branchID'] ==="Snyder, TX 79549") { 
    args.cell.style.backgroundColor ="rgb(148, 116, 67)";  
}
if (args.data['branchID'] ==="Angleton, TX 77515") { 
  args.cell.style.backgroundColor ="rgb(109, 150, 173)";  
}
if (args.data['branchID'] ==="Port Lavaca, TX 77979") { 
  args.cell.style.backgroundColor ="rgb(151, 42, 40)";  
}
    }
  }

  const actionComplete=(args)=>{
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      const dialog = args.dialog;
      dialog.showCloseIcon = true;
      // change the header of the dialog
      dialog.header = args.requestType === 'beginEdit' ? 'Edit' : 'New';
  }
    console.log(args);
    if(args.requestType=="save" && args.action=="add"){
      console.log("Saved new data");
      console.log(args.data);
      axios.post('https://tilapi.pocsofclients.com/api/consumeables/dashboard/', args.data, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then((data) => console.log(data))
    }
    if(args.requestType=="save" && args.action=="edit"){
      console.log("Saved edited data");
      console.log(args.data);
      axios.patch('https://tilapi.pocsofclients.com/api/consumeables/dashboard/'+args.data._id, args.data, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then((data) => console.log(data))
    }
  }
  const recordClick = (args) => {
    if (args.target.classList.contains('showqr')) {
        let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
        setcond(rowObj.data);
        setOpen(true);
        console.log(rowObj.data._id);
    }
  }
  const handleToClose = () => {
    setOpen(false);
  };
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-hero-water rounded-3xl">
      <Header category="Page" title="Consumables" />
      <GridComponent
        id="gridcomp"
        ref={g => grid = g}
        toolbarClick={toolbarClick}
        actionComplete={actionComplete}
        dataSource={equipmentdata}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        queryCellInfo={queryCellInfo}
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
        recordClick={recordClick}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {consumableGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
      </GridComponent>

      <Dialog open={open}  onClose={handleToClose}>
        <DialogTitle>{"Details of: "+cond.name}</DialogTitle>
        <DialogContent className='w-full'>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
        <QRCode
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"https://tier1integrity.pocsofclients.com/ConsProfile?id="+cond._id}
            viewBox={`0 0 256 256`}
            logoWidth={180 * 0.2}
            logoImage="https://firebasestorage.googleapis.com/v0/b/ots-pocket.appspot.com/o/projectFiles%2Fclientavatar.png?alt=media&token=662f9c22-edd5-4387-aa66-093ce4cfa184"
            
            />
        </div>
        <div className='h-3'>
        </div>
          <DialogContentText className='center'>
            {"Name: "+cond.name}
            <br/>
            {"Available: "+cond.stockQnt}
            <br/>
            {"Cost Center: "+cond.branchID}
            
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
export default Consumables;