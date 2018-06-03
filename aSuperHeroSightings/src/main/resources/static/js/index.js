loadSightings();

function loadSightings() {
    $('#sighting').empty();
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