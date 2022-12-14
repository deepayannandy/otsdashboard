import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';

import {  contextMenuItems, userGrid } from '../data/dummy';
import { Header } from '../componets';
import axios from 'axios';
import { search } from '@syncfusion/ej2/filemanager';



const Employees = () => {
  const[employeedata,setData]=useState("")
  const getdata= ()=>
  {
    axios.get("https://dnyindia.in/api/user/dashboardUserState/getall",).then((response)=>{
      setData(response.data);
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const toolbarOptions = ['Search','ExcelExport','PdfExport','Add'];
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
      axios.post('https://dnyindia.in/api/user/register/dashboard/', args.data, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then((data) => console.log(data))
    }
  }

  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
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
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {userGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Employees;