 // select the user input field
 var idSelect = d3.select("#selDataset");

 // select the demographic info div's ul list group
 var demographicInfo = d3.select("#sample-metadata");

 // select the bar chart div
 var barChart = d3.select("#bar");

 // select the bubble chart div
 var bubbleChart = d3.select("#bubble");

 //select the gauge chart
 var gaugeChart = d3.select('#gauge');

 // create a function to initially populate dropdown menu with IDs and draw charts by default (using the first ID)
 function init() {

     // reset any previous data
     displayReset();

     // read in samples from JSON file
     d3.json("data/samples.json").then((data => {


         // ********** Dropdown Menu ************// 

         //  Iterate over each name in the names array to populate dropdowns with IDs
         data.names.forEach((name => {
             var option = idSelect.append("option");
             option.text(name);
         })); //end of forEach loop

         // get the first ID from the list as a default value for chart
         var initId = idSelect.property("value")

         // plot charts with initial ID
         displayCharts(initId);

     }));
 };

 // create a function to reset divs to prepare for new data
 function displayReset() {


     //********** Reset the data **********//


     demographicInfo.html("");
     barChart.html("");
     bubbleChart.html("");
     gaugeChart.html("");

 };

 function displayCharts(id) {
     d3.json("data/samples.json").then((data) => {
         console.log(data)


         //********** Demographics Info **********//


         // filter the metadata for the user selected ID 
         var metaData = data.metadata.filter(participant => participant.id == id)[0];

         // get the wash frequency for gauge chart 
         var wfreq = metaData.wfreq;
         //
         var newList = demographicInfo.append("ul");
         newList.attr("class", "list-group list-group-flush");

         // Iterate through each key and value in the metadata
         Object.entries(metaData).forEach(([key, value]) => {

             // append a li item to the unordered list tag
             var listItem = newList.append("li");

             // change the class attributes of the list item for styling
             listItem.attr("class", "list-group-item ");

             // add the key value pair from the metadata to the demographics list
             listItem.text(`${key}: ${value}`);

         }); // end of forEach loop

         var wfreqValues = data.metadata.map(d => d.wfreq)
         console.log(`Washing Freq: ${wfreqValues}`)

         //********** BarChart **********//

         var samples = data.samples.filter(sample => sample.id == id)[0];

         console.log(samples);

         // Slice only the top 10 sample values and do reverse for plotly. 
         var sampleValues = samples.sample_values.slice(0, 10).reverse();

         // Slice only the top 10 otu ids and do reverse for plotly
         var idValues = (samples.otu_ids.slice(0, 10)).reverse();

         // map the otu id's to the desired form for the y axis
         var idOtu = idValues.map(d => "OTU " + d)

         console.log(`OTU IDS: ${idOtu}`)

         //Slice only the top 10 labels for the plot  and do reverse for plotly
         var labels = (samples.otu_labels.slice(0, 10)).reverse();

         console.log(`Sample Values: ${sampleValues}`)
         console.log(`Id Values: ${idValues}`)
         console.log(`Lables: ${labels}`)


         // Trace variable for the Horizantal Bar Chart
         var trace = {
             x: sampleValues,
             y: idOtu,
             text: labels,
             type: "bar",
             orientation: "h",
         };

         // data variable
         var data = [trace];

         // layout variable to set plots layout
         var layout = {
             title: "Top 10 OTU",
             yaxis: {
                 tickmode: "linear",
             },
             margin: {
                 l: 100,
                 r: 100,
                 t: 30,
                 b: 20
             }
         };

         // Bar Chart
         Plotly.newPlot("bar", data, layout);

         //*********** Bubble Chart **********//

         // Trace variable for the bubble chart
         var trace1 = {
             x: samples.otu_ids,
             y: samples.sample_values,
             mode: "markers",
             marker: {
                 size: samples.sample_values,
                 color: samples.otu_ids
             },
             text: samples.otu_labels

         };

         // Layout for the bubble plot
         var layout = {
             title: "Bacteria cultures per sample",
             xaxis: { title: "OTU ID" },
             height: 600,
             width: 1200
         };

         // data variable 
         var data1 = [trace1];

         // bubble chart
         Plotly.newPlot("bubble", data1, layout);

         //************* Gauge Chart ***********/

         // if wfreq has a null value, make it zero for calculating pointer later
         if (wfreq == null) {
             wfreq = 0;
         }
         //// Trace variable for the Gauge Chart  
         var trace2 = {
             domain: { x: [0, 1], y: [0, 1] },
             type: "indicator",
             mode: "gauge+number",
             value: wfreq,
             title: {
                 text: "Belly Button Washing Frequency",
                 font: { size: 24 },
             },
             gauge: {
                 axis: {
                     range: [0, 9],
                     tickmode: 'linear',
                     tickcolor: "darkblue"
                 },
                 bar: { color: "darkblue" },
                 bgcolor: "white",
                 borderwidth: 1,
                 bordercolor: "gray",
                 steps: [
                     { range: [0, 1], color: "CCFFFF" },
                     { range: [1, 2], color: "99FFFF" },
                     { range: [2, 3], color: "66FFFF" },
                     { range: [3, 4], color: "33EEEE" },
                     { range: [4, 5], color: "11FFFF" },
                     { range: [5, 6], color: "00CCCC" },
                     { range: [6, 7], color: "009999" },
                     { range: [7, 8], color: "006666" },
                     { range: [8, 9], color: "003333" },

                 ],
             }
         }
         var data2 = [trace2];

         var layout = {
             width: 500,
             height: 400,
             margin: { t: 25, r: 25, l: 25, b: 25 },
             paper_bgcolor: "lavender",
             font: { color: "darkblue", family: "Arial" }
         };
         Plotly.newPlot('gauge', data2, layout);
     });

 };

 function optionChanged(id) {

     // reset the data
     displayReset();

     // plot the charts for "this" id
     displayCharts(id);


 } // End of optionChanged function

 // call the init() function for default display
 init();