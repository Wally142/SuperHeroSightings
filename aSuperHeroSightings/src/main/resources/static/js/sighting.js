loadLocations();

function loadLocations() {
    $('#location').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/location/all',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = `${item.city} ${item.country}`
                var id = item.id
                console.log(name);

                var option = $(`<option class="loc" value=${id} >${name}</option>`);

                $('#location').append(option);
            });
        }
    })
}

$('#sight').click(function () {

    $('#hero').empty();
    $('#datetime').empty();
    var id = $('#location').val();
    var sight = $('#datetime').val();
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

        },
        error: function () {
            console.log('try again :(');
        }

    });

    // var sightId = $('#datetime').val();
    // var heroId = $('#hero').val();


    // $.ajax({
        
    //     type: 'GET',
    //     url: 'http://localhost:8080/api/bridge/' + heroId + '/' + sightId,
    //     data: JSON.stringify({
    //         locationId: id,
    //         sighted: sight

    //     }),
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         console.log('Successfully posted in sighted table');

    //     },
    //     error: function () {
    //         console.log('try again :(');
    //     }

    // });

});




