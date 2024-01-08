const bellyButtonData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let dataValues;
let slicedLabels;
d3.json(bellyButtonData).then(function(data) {

console.log(`wash freq ${data.metadata[0].wfreq}`)

let maxX = (Math.max(...data.samples[0].otu_ids))+500;
let maxY = (Math.max(...data.samples[0].sample_values))+50;

var dialRotation;  

if (data.metadata[0].wfreq <=1) {
  dialRotation =10;
} 
else if(data.metadata[0].wfreq <=2) {
  dialRotation = 30
} else if(data.metadata[0].wfreq <=3) {
  dialRotation = 50
} else if(data.metadata[0].wfreq <=4) {
  dialRotation =70
}else if(data.metadata[0].wfreq <=5) {
  dialRotation =90
}else if(data.metadata[0].wfreq <=6) {
  dialRotation =110
}else if(data.metadata[0].wfreq <=7) {
  dialRotation =130
}else if(data.metadata[0].wfreq <=8) {
  dialRotation =150
}else if(data.metadata[0].wfreq <=9 || data.metadata[0].wfreq > 9) {
  dialRotation =170
} else {
  dialRotation =0;
}
    
//https://d3-graph-gallery.com/graph/bubble_color.html
//https://d3-graph-gallery.com/graph/bubble_basic.html
    var margin = {top: 10, right: 20, bottom: 30, left: 50},
width = 500 - margin.left - margin.right,
height = 420 - margin.top - margin.bottom;


var svg = d3.select("#bubble")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

//Read the data

// Add X axis
var x = d3.scaleLinear()
.domain([0, maxX])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([0, maxY])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + margin.top + 20)
    .text("OTU ID");

// Add a scale for bubble size
var z = d3.scaleLinear()
.domain([0, 1000])
.range([ 1, 500]);

// Add dots
let sampleData = data.samples[0];

// Bind the data to the circles

var myColor =d3.scaleOrdinal()
    .domain([0,1000])
    .range(d3.schemeSet2);
//https://gist.github.com/tjaensch/1274e03d23c9b6b02d436e35a20f868f
svg.append('g')
  .selectAll("dot")
  .data(sampleData.sample_values.map((value, index) => ({
    otu_id: sampleData.otu_ids[index],
    sample_values: value
  })))
  .enter()
  .append("circle")
    .attr("cx", function (d) { return x(d.otu_id); } )
    .attr("cy", function (d) { return y(d.sample_values); } )
    .attr("r",  function (d) { return z(d.sample_values); })
    .style("fill", function(d) {return myColor(d.sample_values)})
    
    .style("opacity", "0.7")
    

  
    //
    
    dataValues = data;

    document.getElementById('id').textContent = `id: ${dataValues.metadata[0].id}`;
    document.getElementById('ethnicity').textContent = `ethnicity: ${dataValues.metadata[0].ethnicity}`;
    document.getElementById('gender').textContent = `gender: ${dataValues.metadata[0].gender}`;
    document.getElementById('age').textContent = `age: ${dataValues.metadata[0].age}`;
    document.getElementById('location').textContent = `location: ${dataValues.metadata[0].location}`;
    document.getElementById('bbtype').textContent = `bbtype: ${dataValues.metadata[0].bbtype}`;
    document.getElementById('wfreq').textContent = `wfreq: ${dataValues.metadata[0].wfreq}`;

    let slicedData = data.samples[0].sample_values.slice(0,10);
    let slicedLabels = data.samples[0].otu_ids.slice(0,10);
    slicedData.reverse();
    slicedLabels.reverse();
    
    slicedLabels = slicedLabels.map(String);
    //https://stackoverflow.com/questions/20498409/adding-text-to-beginning-of-each-array-element
    slicedLabels = slicedLabels.map(i => 'OTU ' + i)


    let trace = {
        x: slicedData,
        y: slicedLabels,
        name: "Bacteria",
        type: "bar",
        orientation: "h"
    };
    let data1 = [trace];
    

// Apply a title to the layout
let layout = {
  
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", data1, layout);
//https://stackoverflow.com/questions/53211506/calculating-adjusting-the-needle-in-gauge-chart-plotly-js

var level = dialRotation;

// Trig to calc meter point
var degrees = 180 - level,
	 radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
	 pathX = String(x),
	 space = ' ',
	 pathY = String(y),
	 pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var gaugeData = [{ type: 'scatter',
   x: [0], y:[0],
	marker: {size: 28, color:'860000'},
	showlegend: false,
	name: 'speed',
	text: level,
	hoverinfo: 'text+name'},
  { values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
  rotation: 90,
  text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
  direction: 'clockwise',
  textinfo: 'text',
  textposition:'inside',	  
  marker: {colors:['#f7f2ec','#f3f0e5','#e9e7c9','#e5e9b0','#d5e595','#b7cd8b','#87c080','#85bc8b','#80b586','white']},
  labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var gaugeLayout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
  height: 500,
  width: 500,
  xaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', gaugeData, gaugeLayout, {showSendToCloud:true});
   



});




function optionChanged() {
    
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
  
    
    //https://www.w3schools.com/jsref/prop_node_textcontent.asp
    //https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    for(let j = 0; j < dataValues.samples.length; j++) {
        if(dataValues.metadata[j].id == dataset){
            
            document.getElementById('id').textContent = `id: ${dataValues.metadata[j].id}`;
            document.getElementById('ethnicity').textContent = `ethnicity: ${dataValues.metadata[j].ethnicity}`;
            document.getElementById('gender').textContent = `gender: ${dataValues.metadata[j].gender}`;
            document.getElementById('age').textContent = `age: ${dataValues.metadata[j].age}`;
            document.getElementById('location').textContent = `location: ${dataValues.metadata[j].location}`;
            document.getElementById('bbtype').textContent = `bbtype: ${dataValues.metadata[j].bbtype}`;
            document.getElementById('wfreq').textContent = `wfreq: ${dataValues.metadata[j].wfreq}`;

        }
    }
    for(let k = 0; k < 153; k++) {
        if(dataValues.samples[k].id == dataset) {
            
        


    let slicedData = dataValues.samples[k].sample_values.slice(0,10);
    let slicedLabels = dataValues.samples[k].otu_ids.slice(0,10);
    slicedData.reverse();
    slicedLabels.reverse();
    slicedLabels = slicedLabels.map(String);
    //https://stackoverflow.com/questions/20498409/adding-text-to-beginning-of-each-array-element
    slicedLabels = slicedLabels.map(i => 'OTU ' + i)
    let trace = {
        x: slicedData,
        y: slicedLabels,
        name: "Bacteria",
        type: "bar",
        orientation: "h"
    };
    let data1 = [trace];

// Apply a title to the layout
let layout = {
  
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};
Plotly.newPlot("bar", data1, layout);

//bubble graph
//https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
document.getElementById("bubble").innerHTML = "";
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
let maxX = (Math.max(...dataValues.samples[k].otu_ids))+500;
let maxY = (Math.max(...dataValues.samples[k].sample_values))+50;


console.log(maxY);

var margin = {top: 10, right: 20, bottom: 30, left: 50},
width = 500 - margin.left - margin.right,
height = 420 - margin.top - margin.bottom;


var svg = d3.select("#bubble")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
.domain([0, maxX])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + margin.top + 20)
    .text("OTU ID");

// Add Y axis
var y = d3.scaleLinear()
.domain([0, maxY])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add a scale for bubble size
var z = d3.scaleLinear()
.domain([0, 1000])
.range([ 1, 250]);

// Add dots
let sampleData = dataValues.samples[k];

// Bind the data to the circles

var myColor =d3.scaleOrdinal()
    .domain([0,1000])
    .range(d3.schemeSet2);
//https://gist.github.com/tjaensch/1274e03d23c9b6b02d436e35a20f868f
svg.append('g')
  .selectAll("dot")
  .data(sampleData.sample_values.map((value, index) => ({
    otu_id: sampleData.otu_ids[index],
    sample_values: value
  })))
  .enter()
  .append("circle")
    .attr("cx", function (d) { return x(d.otu_id); } )
    .attr("cy", function (d) { return y(d.sample_values); } )
    .attr("r",  function (d) { return z(d.sample_values); })
    .style("fill", function(d) {return myColor(d.sample_values)})
    
    .style("opacity", "0.7")

//gauge

var dialRotation;  

if (dataValues.metadata[k].wfreq <=1) {
  dialRotation =10;
} 
else if(dataValues.metadata[k].wfreq <=2) {
  dialRotation = 30
} else if(dataValues.metadata[k].wfreq <=3) {
  dialRotation = 50
} else if(dataValues.metadata[k].wfreq <=4) {
  dialRotation =70
}else if(dataValues.metadata[k].wfreq <=5) {
  dialRotation =90
}else if(dataValues.metadata[k].wfreq <=6) {
  dialRotation =110
}else if(dataValues.metadata[k].wfreq <=7) {
  dialRotation =130
}else if(dataValues.metadata[k].wfreq <=8) {
  dialRotation =150
}else if(dataValues.metadata[k].wfreq <=9 || dataValues.metadata[k].wfreq > 9) {
  dialRotation =170
} else {
  dialRotation =0;
}



var level = dialRotation;

// Trig to calc meter point
var degrees = 180 - level,
	 radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
	 pathX = String(x),
	 space = ' ',
	 pathY = String(y),
	 pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var gaugeData = [{ type: 'scatter',
   x: [0], y:[0],
	marker: {size: 28, color:'860000'},
	showlegend: false,
	name: 'speed',
	text: level,
	hoverinfo: 'text+name'},
  { values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
  rotation: 90,
  text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
  direction: 'clockwise',
  textinfo: 'text',
  textposition:'inside',	  
  marker: {colors:['#f7f2ec','#f3f0e5','#e9e7c9','#e5e9b0','#d5e595','#b7cd8b','#87c080','#85bc8b','#80b586','white']},
  labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var gaugeLayout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
  height: 500,
  width: 500,
  xaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', gaugeData, gaugeLayout, {showSendToCloud:true});
        }
        
    }


}


