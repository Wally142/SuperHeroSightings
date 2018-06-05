loadHeroes();
var myLatLng = {};
var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(36.100000, 115.120000),
        mapTypeId: 'terrain'
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/location/all',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = `${item.city} ${item.country}`
                var id = item.id
                var coordinateA = item.latitude;
                var coordinateB = item.longitude;

                myLatLng = { lat: coordinateA, lng: coordinateB };

                var contentString = `More Superhero Action Spotted In ${name}!!`

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map
                });

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

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

    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var city = $('#city').val();
    var country = $('#country').val();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/location/add',
        data: JSON.stringify({
            latitude: lat,
            longitude: lng,
            city: city,
            country: country

        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.log('Successfully posted in location table');
            var sight = $('#datetime').val();
            var heroId = $('#hero').val();
            var id = data.id;
            console.log(id);

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
                            window.location.replace("sighting.html");
                        },
                        error: function () {
                            console.log('Error in Bridge-Hero');
                        }
                    });
                }
            });
        },
        error: function () {
            console.log('Error in Site Add or Location Add');
        }
    });
});