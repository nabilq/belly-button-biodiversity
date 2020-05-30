
d3.json('./static/js/samples.json').then(function(data) {
    console.log(data);
  });


//   const dataPromise = d3.json('samples.json');
// console.log("Data Promise: ", dataPromise);

 function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
//  d3.select('#selDataset').on("change", optionChanged)//will have to append option values with d3, run loop with length of IDs. Maybe map or for each?

// function optionChanged()




 function init() {
    var dropdownMenu = d3.select("#selDataset");
    //Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    var demo=d3.select(".panel-body")
    
   d3.json('samples.json').then(function(data) {


    
    
       //collect names array which contains ids
      var name= data.names
    //check 'name' variable to see if it captured info
      console.log(name)

    //fill into dropdown menu
      for (var i = 0; i < name.length ; i++) {
        dropdownMenu.append("option").text(name[i]);
        console.log(name[i])
    }

    //insert metadata
    Object.entries(data.metadata[0]).forEach(([key, value]) => demo.insert('p').text(`${key} : ${value}`))


  



      //H-BAR chart values
      // collect top 10 otu_ids - Y Values
      var tenOTU= data.samples[0].otu_ids
      console.log(tenOTU)

      var tenOTU2=tenOTU.slice(0,10)

      reversedOTU=tenOTU2.reverse()

      console.log(reversedOTU)
      //convert to string srray
      var numberOTU=reversedOTU.map(String)
      console.log(numberOTU)
      
     //add 'OTU' in front to make it work with graph
        var finalOTU = numberOTU.map(function(item) {
            return `OTU ${item}`;
          });
          console.log(finalOTU)

      // collect top 10 sample values by slicing first 10- X values
      var tenSample=data.samples[0].sample_values
      console.log(tenSample)

      var tenSample2=tenSample.slice(0,10)
      console.log(tenSample2)

      reversedtenSample2=tenSample2.reverse()

      console.log(reversedtenSample2)

      

      //collect top 10 OTU Labels by slicing first 10- Hovertext labels
      var tenLabels= data.samples[0].otu_labels
      console.log(tenLabels)

      var tenLabels2= tenLabels.slice(0,10)
      console.log(tenLabels2)

      reversedtenLabels2= tenLabels2.reverse()
      console.log(reversedtenLabels2)

      var trace1 = {
        x: reversedtenSample2,
        y: finalOTU,
        text: reversedtenLabels2,
        type: "bar",
        orientation: "h"
      };

      // data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  
  margin: {
    l: 100,
    r: 200,
    t: 5,
    b: 100
  }
};

// Render the plot to the div tag with id "bar"
Plotly.newPlot("bar", data, layout);

//bubble chart
var trace2 = {
    x: tenOTU,
    y: tenSample,
    text: tenLabels,
    mode: 'markers',
    marker: {
      color: tenOTU,
      size: tenSample
    }
  };
  
  var data2 = [trace2];
  
  var layout2 = {
    title: 'Bubble Chart',
    showlegend: false,
    height: 600,
    width: 1200
  };

  // Render the plot to the div tag with id "bubble"
  Plotly.newPlot('bubble', data2, layout2);
      
     


    }

)


 }

 
 init();


 d3.selectAll("#selDataset").on("change", updatePlotly);

 function updatePlotly() {

     // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset2 = dropdownMenu.node().value;
  //check if capturing value in menu
  console.log(dataset2)
//select item for metadata
  var demo2=d3.select(".panel-body")

  d3.json('./static/js/samples.json').then(function(data) {

    

    var name= data.names
    //check 'name' variable to see if it captured info
      console.log(name)

     // Initialize x  y newText arrays
  var newX = [];
  var newY = [];
  var newText=[];

  for (var i = 0; i < name.length ; i++){
   if (dataset2 == data.samples[i].id) {

    //clear existing metadata
    var table = d3.selectAll(".panel-body");
    table.html("");

    
    //insert metadata
    Object.entries(data.metadata[i]).forEach(([key, value]) => demo2.insert('p').text(`${key} : ${value}`))

    //for x values, push to new array
       newX=data.samples[i].sample_values
       console.log(newX)
       var tenSample2=newX.slice(0,10)
      console.log(tenSample2)

      reversedtenSample2=tenSample2.reverse()

      console.log(reversedtenSample2)

      //for y values, push to new array
      newY=data.samples[i].otu_ids
      var tenOTU2=newY.slice(0,10)

      reversedOTU=tenOTU2.reverse()

      console.log(reversedOTU)
      //convert to string srray
      var numberOTU=reversedOTU.map(String)
      console.log(numberOTU)
      
     //add 'OTU' in front to make it work with graph
        var finalOTU = numberOTU.map(function(item) {
            return `OTU ${item}`;
          });
          console.log(finalOTU)

          //Hovertext labels- collect top 10 OTU Labels by slicing first 10

          newText= data.samples[i].otu_labels
          console.log(newText)
    
          var tenLabels2= newText.slice(0,10)
          console.log(tenLabels2)
    
          reversedtenLabels2= tenLabels2.reverse()
          console.log(reversedtenLabels2)

 
  
       
    
}}
//restyle h-bar
Plotly.restyle("bar", "x", [reversedtenSample2]);
Plotly.restyle("bar", "y", [finalOTU]);
Plotly.restyle("bar", "text", [reversedtenLabels2]);

//restyle bubble
Plotly.restyle("bubble", "x", [newY]);
Plotly.restyle("bubble", "y", [newX]);
Plotly.restyle("bubble", "text", [newText]);
Plotly.restyle("bubble", "marker:{color}", [newY]);
Plotly.restyle("bubble", "marker:{size}", [newX]);

    })
}

 

