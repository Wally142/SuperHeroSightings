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
                var image = item.hero.image
                var id = item.hero.id;
                var index = index;
                console.log(index)


                $('#indicator').append(`<li data-target="#demo" data-slide-to=${id}></li>`);
                $('#heroSlide').append(`<div id=${index} class="carousel-item"><img class="movepic" src=${image} alt=${name}></div>`);
                $(`#${index}`).append(`<div id=${index} class="carousel-caption"></div>`)
                $(`#${index}`).append(`<h3>${name} Sighting!</h3><p class="ptop">Near ${city}  ${country}</p>`)
            });
        }
    })
}

