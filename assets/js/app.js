function optionChanged() {

  //imports the data
  d3.json("assets/data/CombinedDataTrafficWeatherJSONVX2.json").then((importedData) => {
   console.log(importedData);
  
 //assigns the sample data and the metadata
 var data = importedData

 console.log(data)

 var test = data.NM_REGION

 console.log(test)

 //selects the drop down
 var dropdownMenu = d3.select("#selDataset");
 
 //assigns the value of the dropdown menu option to a variable
 var dataset = dropdownMenu.property("value");
 
 console.log(dataset);
 
 //filters the sample data by this variable
 var filteredData = data.filter(a => a.NM_REGION === dataset);

 console.log(filteredData)
 
 //filters the metadata by this variable
 //var filteredMetadata = mdata.filter(a => a.id === parseInt(dataset));

 var rainfall = filteredData.map(object => object.Rainfall)

 console.log(rainfall)


 var amPeak = filteredData.map(object => object.AM_PEAK_VOLUME)

 console.log(amPeak)

 var pmPeak = filteredData.map(object => object.PM_PEAK_VOLUME)

 var dates = filteredData.map(object => object.Date)

 var lat = filteredData.map(object => object.Lat)

 console.log(lat[0])

 var long = filteredData.map(object => object.Long)

 console.log(long[0])

 var region = filteredData.map(object => object.Region)

 
 var trace1 = {
  x: amPeak,
  y: rainfall,
  mode: 'markers',
  name: 'AM Peak Average',
  type: 'scatter',
  text: dates,
  marker: { size: 12}
};
   
   var data = [trace1];

   var layout = {
    xaxis: {
      title: "AM Peak Average"
    },
    yaxis: {
      title: "Rainfall (mm)"
    },

    title:'Peak of traffic during morning rush hour vs Rainfall July 2016'
  };
   
   Plotly.newPlot('bar', data, layout);

   var trace2 = {
    x: pmPeak,
    y: rainfall,
    mode: 'markers',
    name: 'PM Peak Average',
    type: 'scatter',
    text: dates,
    marker: { size: 12}
  };
     
     var data = [trace2];
  
     var layout2 = {
      xaxis: {
        title: "PM Peak Average"
      },
      yaxis: {
        title: "Rainfall (mm)"
      },
  
      title:'Peak of traffic during morning rush hour vs Rainfall July 2016'
    };
     
     Plotly.newPlot('bar2', data, layout2);

     var dataMap = [
      {
        type: "scattermapbox",
        fill: "toself",
        text: region[0],
        lon: long[0],
        lat: lat[0],
        marker: { size: 100, color: "orange" }
      }
    ];
    
    var layoutMap = {
      mapbox: {
        style: "stamen-terrain",
        center: { lat: lat[0], lon: long[0] },
        zoom: 12
      },
      showlegend: false,
      height: 800,
      width: 1200
    };
    
    Plotly.newPlot("bubble", dataMap, layoutMap);
 
  });
}

// var myMap = L.map("map", {
//   center: [-37.8136, 144.9631],
//   zoom: 8
// });

// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
// attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
// tileSize: 512,
// maxZoom: 18,
// zoomOffset: -1,
// id: "mapbox/streets-v11",
// accessToken: API_KEY
// }).addTo(myMap);