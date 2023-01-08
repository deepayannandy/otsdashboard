import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom'
import {  contextMenuItems, poGrid } from '../data/dummy';
import { Header } from '../componets';
import axios from 'axios';
import { closest } from '@syncfusion/ej2-base';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import QRCode from "react-qr-code";
const PO = () => {
  const[POedata,setData]=useState("")
  const[selectedPOedata,setselectedPOedata]=useState({})
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const getdata= ()=>
  {
    axios.get("https://tilapi.pocsofclients.com/api/po/",).then((response)=>{
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
    navigate('/pocsof/clients/tier1integrity/addnewpo');
  }
  const recordClick = (args) => {
    if (args.target.classList.contains('showqr')) {
        let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
        setselectedPOedata(rowObj.data);
        setOpen(true);
        console.log(rowObj.data);
    }
  }
  const handleToClose = () => {
    setOpen(false);
  };
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-hero-water rounded-3xl">
      <Header category="Page" title="PO#" />
      <button class="bg-green-500 mt-2 mb-5 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={navigatetoRgistration}>Add New PO</button>
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
          {poGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
      </GridComponent>

      <Dialog open={open}  onClose={handleToClose}>
        <DialogTitle>{"Details of: "+selectedPOedata.poNumber}</DialogTitle>
        <DialogContent className='w-full'>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
            <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={selectedPOedata._id}
            viewBox={`0 0 256 256`}
            />
        </div>
        <div className='h-3'>
        </div>
          <DialogContentText className='center'>
            {"PO#: "+selectedPOedata.poNumber}
            <br/>
            {"PO# Type: "+selectedPOedata.typeofpo}
            <br/>
            {"Customer Name: "+selectedPOedata.CustomerID}
            <br/>
            {"Created Date: "+selectedPOedata.timestamp}
            <br/>
            {"Cost Center: "+selectedPOedata.branchID}
            <br/>
            {"Contact Email: "+selectedPOedata.email}
            <br/>
            {"Created By: "+selectedPOedata.managerId}
          </DialogContentText>
          {
            selectedPOedata.wos!=undefined?<table className="border-collapse border border-slate-500 w-full">
            <thead>
                <th class="border border-slate-600 ">Attached WO#</th>
            </thead>
            <tbody>
            { selectedPOedata.wos.map((eq)=>(
                                <tr>
                                    <td class="border border-slate-700 ...">{eq}</td>
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

export default PO