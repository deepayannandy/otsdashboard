import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';

import {  contextMenuItems, customerGrid } from '../data/dummy';
import { Header } from '../componets';
import axios from 'axios';
import { search } from '@syncfusion/ej2/filemanager';


const Customers = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const[employeedata,setData]=useState("")
  const getdata= ()=>
  {
    axios.get("https://54.160.215.70:3443/api/customer/dashboardCustomers/getall",).then((response)=>{
      console.log(response);
      setData(response.data);
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const toolbarOptions = ['Search'];
  
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="All Customers" />
      <GridComponent
        id="gridcomp"
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