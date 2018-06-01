loadHeroes();

function loadHeroes() {
    $('#hero').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/heroes',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var id = item.id
                var desc = item.description
                var city = item.city


                var div = $('<div class="col-6"</div>');
                var link = $(`<a class="showOne" data-id=${id} href="#">${name}<a>`)
                div.append(link);

                $('#heroes').append(div);

                $(link).on("click", function () {
                    var dat = $(this).data('id');
                    getHero(dat);
                })
            });
        }
    })
}// load  all heroees function end

function getHero(dat) {
    $('#heroes').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/hero/' + dat,
        success: function (data, status) {

            console.log(data)
            // console.log(item)
            var heroName = data.name
            var id = data.id
            var heroDesc = data.description
            var heroCity = data.city

            var heroDiv = $('<div class="col-6"</div>');
            heroDiv.append(heroName)
            heroDiv.append(heroDesc)
            heroDiv.append(heroCity)
            $('#heroes').append(heroDiv);
            $('#heroes').append(`<a class="btn btn-primary" href="heroes.html">Back to Heroes</a>`)
        }
    })
};

