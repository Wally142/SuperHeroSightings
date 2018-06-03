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

                var option = $(`<div class="loc" value=${id} >${name}</div>`);

                $('#location').append(option);
            });
        }
    })
}

$('#addLocation').click(function () {

   var city = $('#city').val();
    var country = $('#country').val();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/location/add',
        data: JSON.stringify({
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
            loadLocations();

        },
        error: function () {
            console.log('try again :(');
        }

    });

    $('#city').empty();
    $('#country').empty();

});