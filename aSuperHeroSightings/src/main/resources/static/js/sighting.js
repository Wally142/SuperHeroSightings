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

                var option = $(`<option id=${id} value=${id} box">${name}</option>`);

                $('#location').append(option);
            });
        }
    })
}

$('#sight').click(function () {

    $('#hero').empty();
    $('#time').empty();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/sighting/add',
        data: JSON.stringify({
            location_id: $('#id').val(),
            sighted: $('#time').val()

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

});




