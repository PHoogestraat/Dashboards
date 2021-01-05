// Taken from Activity 2 exercise 3
//const url = "samples.json"
var samples = 940
//function buildPlot() {
    // Fetch the JSON data and console log it
    d3.json("samples.json").then(function(data) {
        console.log(data);
        data.names.forEach(i => 
          d3.select("select").append("option").text(i )
          );
          var selectiud = d3.select("#selDataset").property("value");
          
          d3.select("#selDataset").on("change", buildPlot(selectiud));
        
        // Grab values from the data json object to build the plots
      
      });
function buildPlot(samples){ 
        d3.select ("#bar").html("") 
        d3.json("samples.json").then(function(data) {
        var sampleValues = data.samples.filter (i => i.id == samples)[0];
        //var otuIDS = data.samples.map(i => [i.otuIDS]);
        // bacteria name----hovering text
        //var outLabels = samples.otu_labels;
        console.log(sampleValues);
        
        //
    var otuIDS = sampleValues.otu_ids.slice(0, 10).reverse();
    var sample_X = sampleValues.sample_values.slice(0, 10).reverse();
    console.log(otuIDS);
        // Trace1 for the Greek Data
    var trace1 = {
      x: sample_X,
      y: otuIDS.map(i=> `otu ${i}`),
      text: sampleValues.otu_labels.slice(0,10).reverse(),
      name: "Top 10 OTUs",
      type: "bar",
      orientation: "h"
    };

    // data
    var data = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
      title: "Top 10 OTUs",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data, layout);

        })
  };
        
