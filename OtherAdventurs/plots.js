

// Horizontal Bar Graph
// Taken from Activity 2 exercise 6

// Sort the data by Greek search results
var sortedSampleValue = samples.sort((a, b) => b.samples_values - a.samples_values);

// Slice the first 10 objects for plotting
slicedData = sortedSampleValue.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

console.log(reversedData);

// Trace1 for the Greek Data
var trace1 = {
  x: reversedData.map(object => object.sample_values),
  y: reversedData.map(object => object.otu_ids),
  text: reversedData.map(object => object.otu_labels),
  name: "Top 10 OTUs",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Greek gods search results",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);