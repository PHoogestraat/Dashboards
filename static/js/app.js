// 
//variable tests
var sample945 = 945

// Setup Dropdown Variable
var dropdown = d3.select("#selDataset");
  console.log(`dropdown value: ${dropdown}`);





      
  // Fetch the JSON data and send to console log. This will contain entire data set
d3.json("samples.json").then(function(data) {
    console.log(`data default pull id:940 : ${data}`);
// appends name:id to html <select> and appeds each id number as an option
    data.names.forEach(i => 
      d3.select("select").append("option").text(i).property("value", i)
      );
      var selectID = dropdown.property("value");
      dropdown.on("change", crazyIdea(selectID)); 
      //dropdown.on("change", getInfo(selectID));
      //dropdown.on("change", metaData(selectID));
      // call the functions to display the data and the plots to the page

    
});
// input HTML data into plot and meta data function. 
function crazyIdea(selectID){
  plot(selectID); 
  metaData(selectID);


};


//            PLOTS: Bar and Bubble
//#######################################################
// sets up bar plot
function plot(samples){ 
  // 
  //d3.select ("#bar").html("") ######### Don't need. Target identified in plot
  // read the json file to get data: SampleData or "samples"
    d3.json("samples.json").then(function(data) {

        // filters data from samples by using arrow loop i function
        var sampleValues = data.samples.filter (i => i.id == samples)[0];

        console.log(sampleValues);
        console.log(`samples value: ${samples}`);

            //x any y plots for bar
        var otuIDS = sampleValues.otu_ids.slice(0, 10).reverse();
        var sample_X = sampleValues.sample_values.slice(0, 10).reverse();
        var prNames = sampleValues.otu_labels.slice(0,10).reverse();

        // for wash guage
        var wfreq = data.metadata.filter (d => d.wfreq == samples)[0];
        console.log(wfreq);
        console.log(`Washing Freq: ${wfreq}`)


            // Trace1 for bar graph
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
        title: "Top 10 OTUs for selected ID No",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };

      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", data, layout);

          // })

      // The bubble chart
      // x an y are not being picked up ********************
      var trace1 = {
        x: otuIDS,
        y: sample_X,
        mode: 'markers',
        marker: {
          size: sample_X,
          color: otuIDS
        },
        text: prNames

      };
      
      var data = [trace1];
      
      var layout = {
        xaxis:{title: "OTU ID"},
        yaxis:{title: "Sample Values"},
        title: 'Bacteria Quantities ',
        showlegend: false,
        height: 600,
        width: 600
      };

      Plotly.newPlot('bubble', data, layout);
    });               
    //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
    // The wash Guage
    var data = [
	          {
                    domain: { x: [0, 1], y: [0, 1] },
                    // this needs to be wash value
                    
                    //value: parseInt(wfreq),
                    value: 5,
                    title: { text: "Scrubs Per Week" },
                    type: "indicator",
                    mode: "gauge+number"
	          }
          ];

          var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data, layout);

};
        
// Test Subject ID NO
//###############################################################
    // create the function to get the necessary data
    function metaData(id) {
      // read the json file to get data and creartes an function data1 that filters data
      d3.json("data/samples.json").then(function(data1) {
          
            // Get the metadata info for the demographic panel
            var metadata = data1.metadata;
    
            //console.log(metadata);
            
            console.log(`id3: ${id}`);
            // filter meta data info by id Problem area
            var result = metadata.filter(meta => meta.id.toString() == id)[0];
            
            console.log(`meta3: ${result}`);
            
            // select demographic panel to put data
            var demographicInfo = d3.select("#sample-metadata");
            
            // empty the demographic info panel each time before getting new id info
            demographicInfo.html("");
    
            // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                    demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");    
          });
      });
    }
    //#########################################################################
  