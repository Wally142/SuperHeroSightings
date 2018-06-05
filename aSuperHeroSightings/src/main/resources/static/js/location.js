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

                var div = $('<div></div>');
                var link = $(`<a class="showOne" data-id=${id} href="#">${name}<a>`)
                div.append(link)

                $('#location').append(div);

                $(link).on("click", function () {
                    var dat = $(this).data('id');
                    getLocation(dat);
                    console.log(dat);
                })
            });
        }
    })
}

function getLocation(dat) {
    $('#location').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/location/' + dat,
        success: function (data, status) {

            console.log(data)

            var id = data.id
            var lat = data.latitude
            var lng = data.longitude
            var city = data.city
            var country = data.country

            var div = $('<div></div>');
            div.append(city)
            div.append(country)

            $('#location').append(div);
            $('#location').append(`<a class="btn btn-primary" href="location.html">Back to Locations</a>`)
            $('#location').append(`<a id="editLocation" class="btn btn-primary" href="#">Edit Location</a>`)
            $('#location').append(`<a id="deleteLocation" class="btn btn-primary" href="#">Delete Location</a>`)
            $('#location-form').empty();
            $('#editLocation').on('click', function () {
                edit(data)
            })
            $('#deleteLocation').on('click', function () {
                deleteLocation(id)
            })

        }
    })
};

function deleteLocation(id) {
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/api/location/" + id,
        success: function (status) {
            loadLocations();
            window.location.replace("location.html");
        }
    });
}

function edit(data) {
    
    $('#location-form').append('<input type="text" id="lat" placeholder="Latitude"><br>')
    $('#location-form').append('<input type="text" id="lng" placeholder="Longitude"><br>')
    $('#location-form').append('<input type="text" id="city" placeholder="City"><br>')
    $('#location-form').append('<input type="text" id="country" placeholder="Country"><br>')
    $('#location-form').append(`<a id="edit" class="btn btn-primary" href="#">Edit Location</a>`)
    $('#location-form').append(`<a id="home" class="btn btn-danger" href="location.html">Cancel</a>`)
    
    $('#lat').val(data.latitude)
    $('#lng').val(data.longitude)
    $('#city').val(data.city)
    $('#country').val(data.country)
    var id = data.id;
    
    $('#edit').on("click", function () {
        editLocation(id);
    })
}

function editLocation(id) {

    console.log(id)
    var lat = $('#lat').val()
    var lng = $('#lng').val()
    var city = $('#city').val()
    var country = $('#country').val()

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/location/' + id,
        data: JSON.stringify({
            id: id,
            latitude: lat,
            longitude: lng,
            city: city,
            country: country
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'
    }).always(function (xhr) {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('successful update!');
            // $('#location').empty();
            loadLocations();
            
        } else {
            console.log('failed Edit Attempt')
        }

    })
}


$('#addLocation').click(function () {

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
            loadLocations();

        },
        error: function () {
            console.log('try again :(');
        }

    });
});