import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';

import {  contextMenuItems, customerGrid } from '../data/dummy';
import { Header } from '../componets';
import axios from 'axios';
import { search } from '@syncfusion/ej2/filemanager';


const Customers = () => {
  const editing = { allowDeleting: true, allowEditing: true , mode: 'Dialog'};
  const[employeedata,setData]=useState("")
  const getdata= ()=>
  {
    axios.get("https://dnyindia.in/api/customer/dashboardCustomers/getall",).then((response)=>{
      setData(response.data);
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const toolbarOptions = ['Search','ExcelExport','PdfExport',  'Edit','add'];
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
  const actionComplete=(args)=>{
    if(args.requestType=="save"){
      console.log("Save data");
      console.log(args.data);
      axios.patch('https://dnyindia.in/api/customer/'+args.data._id, args.data, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then((data) => console.log(data))
    }
  }
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="All Customers" />
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
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customerGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Search,Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Customers;