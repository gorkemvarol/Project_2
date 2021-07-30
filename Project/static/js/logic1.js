var map = L.map("map", {
        center: [40.73, -100.0059],
        zoom: 5,
        // layers: [streetMap, universities]
    });
    // Create the tile layer that will be the background of our map
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(map);


    d3.csv("static/js/form_inputs.csv").then(function(data) {
        
        
        var formMarkers = L.featureGroup();

        // Loop through the stations array
        for (var index = 0; index < data.length; index++) {

            // var formLocation = data[index].location
            // console.log(formLocation)

            // For each station, create a marker and bind a popup with the station's name
            
                // .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
            console.log(universityMarker)
            // Add the marker to the universityMarkers array

            
        }
        var universityMarker = L.marker([45,100]).addTo(formMarkers)
        map.addLayer(formMarkers)
    })



//Perform an API call to the Citi Bike API to get station information.Call createMarkers when complete



// d3.csv('../static/data/form_inputs.csv').then(d => {
//     console.log(d);
//     console.log(d[0].location)
//     console.log(d.length)