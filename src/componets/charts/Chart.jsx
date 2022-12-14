import { AxisModel, Category, ChartComponent, Inject,Tooltip, LineSeries, SeriesCollectionDirective, SeriesDirective,SparklineComponent, ColumnSeries} from'@syncfusion/ej2-react-charts';
import React,{ useEffect, useState }  from 'react';




class Chart extends React.PureComponent {
    
    render() {
      const { id, height, width,currentColor ,data} = this.props;
  
      return (
        <ChartComponent 
        background={currentColor}
        primaryYAxis={{majorGridLines:{width:0},majorTickLines:{width:0},labelStyle:{color:'#fff'}, titleStyle:{color:'#fff'},}}
        primaryXAxis={{valueType:"Category",title:"Cost Centers", majorGridLines:{width:0},majorTickLines:{width:0}, labelStyle:{color:'#fff'}, titleStyle:{color:'#fff'}}} 
        tooltip={{enable:true}}
        id={id}
        border={{ color: currentColor, width: 2 }}
        height={height}
        width={width}
        lineWidth='10'>
            <Inject services={[ColumnSeries,Category,Tooltip]}></Inject>
            <SeriesCollectionDirective>
                <SeriesDirective type='Column' dataSource={data}
                xName="month"
                yName='sales'
                pointColorMapping='color'
                cornerRadius={{topLeft: 10, topRight: 10}}></SeriesDirective>
            </SeriesCollectionDirective>
        </ChartComponent> 
    );
  }
}
  
export default Chart;