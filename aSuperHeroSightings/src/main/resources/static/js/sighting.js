loadLocations();
loadHeroes();

function loadLocations() {
    $('#location').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/location/all',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = `${item.city} ${item.country}`
                var id = item.id

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

// var apiKey = AIzaSyByHrNDRIleQRvJZ_6JUMn - NwNehXwbF84



