loadSightings();

function loadSightings() {
    $('#sightings').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/sighting',
        success: function (data, status) {
            console.log(data)
            $.each(data, function (index, item) {
                var name = item.hero.name
                var city = item.location.city
                var country = item.location.country
                var sighted = item.sight.sighted
                var id = item.id;
                console.log(name);

                var div = $(`<div class="loc" value=${id}></div>`);
                div.append(name)
                div.append(city)
                div.append(country)
                div.append(sighted)

                $('#sightings').append(div);
            });
        }
    })
}