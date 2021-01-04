// Taken from Activity 2 exercise 3
const url = "samples.json"

function buildPlot() {
    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);
        // Grab values from the data json object to build the plots
        var sampleValues = data.samples.samples.samples_values;
        var otuIDS = samples.otu_id;
        //var outLabels = samples.otu_labels;
        console.log(sampleValues);

    });

        
        
  // Promise Pending
  //      const dataPromise = d3.json(url);
  //      console.log("Data Promise: ", dataPromise);

    console.log(sampleValues);
    console.log(otuIDS);


};

buildPlot() 