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
                var image = 'https://i.annihil.us/u/prod/marvel/i/mg/6/60/538cd3628a05e.jpg'
                var id = item.id;
                console.log(name);

               
                var indicator = `<li data-target="#demo" data-slide-to=${id}></li>`
                var heroSlide = `<div class="carousel-item"><img src=${image} alt=${name}></div>`
                
                // append(name)
                // append(city)
                // append(country)
                // append(sighted)

                $('#indicator').append(indicator);
                $('#heroSlide').append(heroSlide);
            });
        }
    })
}