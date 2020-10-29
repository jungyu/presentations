/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */
am4core.ready(function() {

  // Create chart instance
  var chart = am4core.create("chartdiv", am4charts.XYChart);

  // Set up data source
  chart.dataSource.url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-033?Authorization=CWB-AAE535A9-78B4-4EC7-854E-B5A3776201BF&locationName=%E5%85%A7%E5%9F%94%E9%84%89&elementName=AT,T";
  
  chart.dataSource.adapter.add("parsedData", function(data) {
    //體感溫度
    data1 = data.records.locations[0].location[0].weatherElement[0].time;
    var newData1 = [];
    data1.forEach(function(dataItem) {
      var newDataItem = {};
      Object.keys(dataItem).forEach(function(key) {
        if (Array.isArray(dataItem[key])) {
          newDataItem["value_at"] = dataItem[key][0]["value"];
        } else {
          newDataItem[key] = dataItem[key];
        }
      });
      newDataItem['dataTime'] = newDataItem['dataTime'].replace(" ", "T");
      newDataItem['date'] = Date.parse(newDataItem['dataTime']);
      newData1.push(newDataItem);
    });
    //溫度
    data2 = data.records.locations[0].location[0].weatherElement[1].time;
    var newData2 = [];
    data2.forEach(function(dataItem) {
      var newDataItem = {};
      Object.keys(dataItem).forEach(function(key) {
        if (Array.isArray(dataItem[key])) {
          newDataItem["value_t"] = dataItem[key][0]["value"];
        } else {
          newDataItem[key] = dataItem[key];
        }
      });
      newDataItem['dataTime'] = newDataItem['dataTime'].replace(" ", "T");
      newDataItem['date'] = Date.parse(newDataItem['dataTime']);
      newData2.push(newDataItem);
    });
    
    //合併陣列
    let unionArray = newData1.map((item, i) => Object.assign({}, item, newData2[i]));
    console.log(unionArray);
    
    data = unionArray;
    return data;
  });
  
  
  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  var series1 = chart.series.push(new am4charts.LineSeries());
  series1.dataFields.valueY = "value_at";
  series1.dataFields.dateX = "date";
  series1.name = "體感溫度";
  series1.bullets.push(new am4charts.CircleBullet());
  
  var series2 = chart.series.push(new am4charts.LineSeries());
  series2.dataFields.valueY = "value_t";
  series2.dataFields.dateX = "date";
  series2.name = "溫度";
  series2.bullets.push(new am4charts.CircleBullet());

  // Add legend
  chart.legend = new am4charts.Legend();

}); // end am4core.ready()
