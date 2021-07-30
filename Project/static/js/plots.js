//read in samples from JSON file
var value = [];
var label = [];
var valuePie = [];
var labelPie = [];

var fullData = [];
d3.json("../static/data/form_inputs_test.json").then((data) => {
    console.log("data :", data)
    var school;
    var group;
    //  Iterate over each name in the names array to populate dropdowns with IDs
    data.forEach((eachData => {
        // add if cond to what user selected
        var userSelection = document.getElementById('user-selection').innerHTML
        var subject = eachData.subject

        console.log("user-Selection", userSelection.trim().length)
        console.log("subject:", subject.length)

        if (subject === userSelection.trim()) {
            school = eachData.school
            group = eachData.group_type
            fullData.push(group)
            if (label.indexOf(school) == -1) { // push to arr only if not present already
                label.push(school)
                value.push(eachData.course_level)
            }
            if (labelPie.indexOf(group) == -1) { // push to arr only if not present already
                labelPie.push(group)
                    // value.push(eachData.course_level)
            }

        }

    })); //end of forEach loop

    var frequencyOfData = fullData.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
    // this returns map of occurance of the unique elements e.g { partner=>5, group=>2 }
    valuePie = [...frequencyOfData.values()];

    console.log("value ", value)
    console.log("label ", label)

    // Pie Chart
    var trace1 = {
        labels: labelPie,
        values: valuePie,
        type: 'pie'
    };

    var data1 = [trace1];

    var layout = {
        title: "'Group' Pie Chart",
    };

    Plotly.newPlot("pie-plot", data1, layout);

    //Bar Chart
    var trace2 = {
        x: label,
        y: value,
        type: "bar"
    };

    var data2 = [trace2];

    var layout = {
        title: "'Study Group' Bar Chart"
    };

    Plotly.newPlot("bar-plot", data2, layout);
});