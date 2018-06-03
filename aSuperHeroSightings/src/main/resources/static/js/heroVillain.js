loadHeroes();
loadVillains();

function loadHeroes() {
    $('#heroes').empty();
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
}// load  all heroes function end

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
};// end get Hero

$('#addHeroPage').on("click", heroInput);

function heroInput() {

    $('#heroes').empty();
    $('#heroes').append('<input type="text" id="name" placeholder="Hero Name"><br>')
    $('#heroes').append('<input type="text" id="desc" placeholder="Description"><br>')
    $('#heroes').append('<input type="text" id="city" placeholder="City/Home"><br>')
    $('#heroes').append('<input type="text" id="powers" placeholder="Powers and Abilities"><br>')
    $('#heroes').append('<input type="text" id="org" placeholder="Hero Organizations"><br>')
    $('#heroes').append('<button id="add" class="btn btn-primary">Submit</button>')
    $('#heroes').append('<a class="btn btn-danger" href="/heroes.html">Back</button>')
    $('#addHeroPage').hide();
    $('#add').on("click", addHero);
}

function addHero() {

    var name = $('#name').val()
    var desc = $('#desc').val()
    var city = $('#city').val()
    var powers = $('#powers').val()

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/hero/',
        data: JSON.stringify({
            name: name,
            description: desc,
            city: city
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.log('Successfully posted in hero table');
            $('#heroes').empty();
            loadHeroes();
            $('#addHeroPage').show();
        },
        error: function () {
            console.log('try again :(');
        }
    }); // end first ajax call

    // $.ajax({
    //     type: 'POST',
    //     url: 'http://localhost:8080/api/hero/powers/',
    //     data: JSON.stringify({
    //         powers: powers
    //     }),
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         console.log('Successfully posted in powers table');

    //     },
    //     error: function () {
    //         console.log('try again :(');
    //     }
    // });
}
//========================END OF HERO FUNCTIONS=========================//



//========================START OF VILLAIN FUNCTIONS=========================//

function loadVillains() {
    $('#villains').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/villains',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var id = item.id
                var desc = item.description
                var city = item.city


                var div = $('<div class="col-6"</div>');
                var link = $(`<a class="showOne" data-id=${id} href="#">${name}<a>`)
                div.append(link);

                $('#villains').append(div);

                $(link).on("click", function () {
                    var dat = $(this).data('id');
                    getVillain(dat);
                })
            });
        }
    })
}// load  all Villians function end

function getVillain(dat) {
    $('#villains').empty();
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
            $('#villains').append(heroDiv);
            $('#villains').append(`<a class="btn btn-primary" href="villain.html">Back to Villains</a>`)
        }
    })
};//get Villain

$('#addVillainPage').on("click", villianInput);

function villianInput() {

    $('#villains').empty();
    $('#villains').append('<input type="text" id="name" placeholder="Villain Name"><br>')
    $('#villains').append('<input type="text" id="desc" placeholder="Description"><br>')
    $('#villains').append('<input type="text" id="city" placeholder="City/Home"><br>')
    $('#villains').append('<input type="text" id="powers" placeholder="Powers and Abilities"><br>')
    $('#villains').append('<input type="text" id="org" placeholder="Villain Organizations"><br>')
    $('#villains').append('<button id="add" class="btn btn-primary">Submit</button>')
    $('#villains').append('<a class="btn btn-danger" href="/villain.html">Back</button>')
    $('#addVillainPage').hide();
    $('#add').on("click", addVillain);
}

function addVillain() {

    var name = $('#name').val()
    var desc = $('#desc').val()
    var city = $('#city').val()
    var powers = $('#powers').val()
    var villain = true;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/hero/',
        data: JSON.stringify({
            name: name,
            description: desc,
            city: city,
            villain: true
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.log('Successfully posted in hero table');
            $('#villains').empty();
            loadVillains();
            $('#addVillainPage').show();

        },
        error: function () {
            console.log('try again :(');
        }
    });
}