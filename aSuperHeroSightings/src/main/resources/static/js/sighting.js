loadLocations();
loadHeroes();

// var map;
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });
}

function loadLocations() {
    $('#location').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/location/all',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = `${item.city} ${item.country}`
                var id = item.id
                var lat = item.latitude;
                var lng = item.longitude;
                var option = $(`<option class="loc" value=${id} >${name}</option>`);
                $('#location').append(option);

                


            });
        }
    })
}

function loadHeroes() {
    $('#hero').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/all',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var id = item.id

                var option = $(`<option class="heroes" value=${id} >${name}</option>`);

                $('#hero').append(option);

                
            });
        }
    })
}

$('#sight').click(function () {

    var id = $('#location').val();
    var sight = $('#datetime').val();
    var heroId = $('#hero').val();
    console.log(id);
    console.log(sight);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/sighting/add',
        data: JSON.stringify({
            locationId: id,
            sighted: sight

        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.log('Successfully posted in sighted table');
            var sightId = data.id;
            console.log(data)
            $.ajax({

                type: 'GET',
                url: 'http://localhost:8080/api/bridge/hero/' + heroId + '/' + sightId,
                success: function (data) {
                    console.log('Successfully posted in hero_sighted table');
                    console.log(heroId);
                    console.log(sightId);

                },
                error: function () {
                    console.log('try again :(');
                }
            });

        },
        error: function () {
            console.log('try again :(');
        }

    });
});






// // Create a <script> tag and set the USGS URL as the source.
// var script = document.createElement('script');
// // This example uses a local copy of the GeoJSON stored at
// http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
// script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
// document.getElementsByTagName('head')[0].appendChild(script);

// Loop through the results array and place a marker for each
// set of coordinates.
// window.eqfeed_callback = function (results) {
//     for (var i = 0; i < results.features.length; i++) {
//         var coords = results.features[i].geometry.coordinates;
//         var latLng = new google.maps.LatLng(coords[1], coords[0]);
//         var marker = new google.maps.Marker({
//             position: latLng,
//             map: map
//         });
//     }
// }


