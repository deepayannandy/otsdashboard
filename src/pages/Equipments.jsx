import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';

import {  contextMenuItems, equipmentGrid } from '../data/dummy';
import { Header } from '../componets';
import axios from 'axios';
import { search } from '@syncfusion/ej2/filemanager';


const Equipments = () => {
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true,mode: 'Dialog' };
  const[equipmentdata,setData]=useState("")
  const getdata= ()=>
  {
    axios.get("https://dnyindia.in/api/equipements/dashboardEquipment/getall",).then((response)=>{
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
          exportType: 'CurrentPage',
          pageOrientation: 'Landscape',
          pageSize: 'A4',
          fileName: 'Equipments.pdf'
      };
        grid.pdfExport(exportProperties);
      }
      if (args.item.id.includes('excelexport')) {
        const exportProperties = {
          exportType: 'CurrentPage',
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
      dialog.header = args.requestType === 'beginEdit' ? 'Edit Record of ' + args.rowData['CustomerID'] : 'New Employee';
  }
    console.log(args);
    if(args.requestType=="save" && args.action=="add"){
      console.log("Saved new data");
      console.log(args.data);
      axios.post('https://dnyindia.in/api/equipements/dashboard/', args.data, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then((data) => console.log(data))
    }
    if(args.requestType=="save" && args.action=="edit"){
      console.log("Saved edited data");
      console.log(args.data);
      axios.patch('https://dnyindia.in/api/equipements/dashboard/'+args.data._id, args.data, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then((data) => console.log(data))
    }
  }
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-hero-water rounded-3xl">
      <Header category="Page" title="All Equipments" />
      <GridComponent
        ref={g => grid = g}
        toolbarClick={toolbarClick}
        actionComplete={actionComplete}
        id="gridcomp"
        dataSource={equipmentdata}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        queryCellInfo={queryCellInfo}
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {equipmentGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Equipments;