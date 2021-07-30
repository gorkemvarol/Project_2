var map = L.map("map", {
    center: [40, -100.95],
    zoom: 5
});


//add tiel layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(map);


d3.csv("static/js/form_inputs.csv").then(function(data) {
    console.log(data)
    var groupType

    var formMarkers = L.featureGroup();

    // Loop through the form inputs 
    for (var index = 0; index < data.length; index++) {

        var groupType = data[index].group_type
        var level = data[index].course_level
        var subject = data[index].subject
        var time = data[index].time
        var skool = data[index].school
       var loca = (data[index].location).split(',')


       var lat = parseFloat(loca[0].substr(1))
       var lng = parseFloat(loca[1].substr(1))
       

        var marker = L.marker([lat,lng]).addTo(formMarkers)
        var tooltip = marker.bindTooltip(level+' level ' +subject+ ' study ' +groupType + ' on ' +time + " " + skool);
    }
    
    map.addLayer(formMarkers)
})
