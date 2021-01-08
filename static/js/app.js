// 
//variable tests
var sample945 = 945
var dropdown = d3.select("#selDataset");
  console.log(`dropdown value: ${dropdown}`);





      //  function buildPlot() {
      // Fetch the JSON data and send to console log. This will contain entire data set
d3.json("samples.json").then(function(data) {
    console.log(`data default pull id:940 : ${data}`);
// appends name:id to html <select> and appeds each id number as an option
    data.names.forEach(i => 
      d3.select("select").append("option").text(i).property("value", i)
      );
      var selectID = dropdown.property("value");
      dropdown.on("change", plot(selectID)); 
      dropdown.on("change", getInfo(selectID));
      
      console.log(`id3: ${id}`);

});

//###############################################################
    // create the function to get the necessary data
function getInfo(id) {
  // read the json file to get data
  d3.json("data/samples.json").then((data)=> {
      
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
  });
}
//#########################################################################





// get metadata for id
function mData(metaID){

    
    // Grab values from the data json object to build the plots
    var id = data.metadata.metaID.id[0];
    //var ethnicity = mData.metadata.ethnicity;
    console.log(`id1: ${id}`);
    //var startDate = mData.metadata.gender;
    //var location = mData.metadata.location;
    //var bbtype = mData.metadata.bbtype;
    //var wfreq = mData.metadata.wfreq;
    // Associate data from above with key pair below
    d3.select("#sample-metadata").append("h6").text(id);
    //d3.select("#sample-metadata").append("panel-body").text(ethnicity);
    //d3.select("#sample-metadata").append("panel-body").text(startDate);
    //d3.select("#sample-metadata").append("panel-body").text(location);
    //d3.select("#sample-metadata").append("panel-body").text(bbtype);
    //d3.select("#sample-metadata").append("panel-body").text(wfreq);

    // ##### html target where data above must be placed
    console.log(`id2: ${id}`);
    //<div id="sample-metadata" class="panel-body"></div>    
  };
  
  // create the function to get the necessary data



// sets up bar plot
function plot(samples){ 
  d3.select ("#bar").html("") 
  d3.json("samples.json").then(function(data) {
    var sampleValues = data.samples.filter (i => i.id == samples)[0];

    console.log(sampleValues);
    console.log(`samples value: ${samples}`);

        //x any y plots for bar
    var otuIDS = sampleValues.otu_ids.slice(0, 10).reverse();
    var sample_X = sampleValues.sample_values.slice(0, 10).reverse();
    var prNames = sampleValues.otu_labels.slice(0,10).reverse();
    console.log(otuIDS);


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
  
  




};
        

  