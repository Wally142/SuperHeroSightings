loadHeroes();
loadVillains();

function loadHeroes() {
    $('#heroes').empty();
    $('#editHero').hide();
    $('#deleteHero').hide();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/heroes',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var id = item.id
                var desc = item.description
                var city = item.city

                var div = $('<div></div>');
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

            var heroName = data.name
            var id = data.id
            var heroDesc = data.description
            var heroCity = data.city
            var image = data.image;

            console.log(image)

            var heroDiv = $('<div></div>');
            heroDiv.append(`<img class="heroImg" src=${image}>`)
            heroDiv.append(heroName)
            heroDiv.append(heroDesc)
            heroDiv.append(heroCity)
            $('#heroes').append(heroDiv);
            $('#heroes').append(`<a class="btn btn-primary" href="heroes.html">Back to Heroes</a>`)
            $('#heroes').append(`<a id="editHero" class="btn btn-primary" href="#">Edit Hero</a>`)
            $('#heroes').append(`<a id="deleteHero" class="btn btn-primary" href="#">Delete Hero</a>`)
            $('#addHeroPage').hide();
            $('#editHero').on('click', function () {
                edit(data)
            })
            $('#deleteHero').on('click', function () {
                deleteHero(id)
            })
        }
    })

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/powers/' + dat,
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.power.name
                var id = item.id

                var div = $('<div></div>');
                var link = $(`<p class="powers" data-id=${id} href="#">${name}<p>`)
                div.append(link);
                $('#heroes').append(div);

            });
        }
    })// end hero powers ajax

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/organization/' + dat,
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.org.name
                var id = item.id

                var div = $('<div></div>');
                var link = $(`<p class="powers" data-id=${id} href="#">${name}<p>`)
                div.append(link);
                $('#heroes').append(div);

            });
        }
    })// end hero organization ajax
};// end get Hero

$('#addHeroPage').on("click", heroInput);

function heroInput() {

    $('#heroes').empty();
    $('#heroes').append('<input type="text" id="name" placeholder="Hero Name"><br>')
    $('#heroes').append('<input type="text" id="desc" placeholder="Description"><br>')
    $('#heroes').append('<input type="text" id="city" placeholder="City/Home"><br>')
    $('#heroes').append('<input type="text" value="https://www." id="pic" placeholder="URL Image"><br>')
    $('#heroes').append('<select id="powers"><br>')
    $('#heroes').append('<select id="orgs"><br>')
    $('#heroes').append('<button id="add" class="btn btn-primary">Submit</button>')
    $('#heroes').append('<a class="btn btn-danger" href="/heroes.html">Back</button>')
    $('#addHeroPage').hide();
    $('#add').on("click", addHero);
    loadPowers();
    loadOrgs();
}

function addHero() {

    var name = $('#name').val()
    var desc = $('#desc').val()
    var city = $('#city').val()
    var image = $('#pic').val()

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/hero/',
        data: JSON.stringify({
            name: name,
            description: desc,
            city: city,
            image: image
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.log('Successfully posted in hero table');
            var powersId = $('#powers').val();
            var orgId = $('#orgs').val();
            var heroId = data.id;
            $('#heroes').empty();
            loadHeroes();
            $('#addHeroPage').show();

            $.ajax({

                type: 'GET',
                url: 'http://localhost:8080/api/bridge/power/' + heroId + '/' + powersId,
                success: function (data) {
                    console.log('Successfully posted in hero_power table');
                    console.log(heroId);
                    console.log(powersId);

                },
                error: function () {
                    console.log('try again :(');
                }
            });

            $.ajax({

                type: 'GET',
                url: 'http://localhost:8080/api/bridge/org/' + heroId + '/' + orgId,
                success: function (data) {
                    console.log('Successfully posted in hero_ORG table');
                    console.log(heroId);
                    console.log(orgId);

                },
                error: function () {
                    console.log('try again :(');
                }
            });
        }
    });
}

function deleteHero(id) {
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/api/hero/" + id,
        success: function (status) {
            loadHeroes();
            $('#addHeroPage').show();
        }
    });
}

function edit(data) {
    $('#heroes').empty();
    $('#heroes').append('<input type="text" id="name" placeholder="Hero Name"><br>')
    $('#heroes').append('<input type="text" id="desc" placeholder="Description"><br>')
    $('#heroes').append('<input type="text" id="city" placeholder="City/Home"><br>')
    $('#heroes').append('<select id="powers"><br>')
    $('#heroes').append('<select id="orgs"><br>')
    $('#heroes').append(`<a id="edit" class="btn btn-primary" href="#">Edit Hero</a>`)
    loadPowers();
    loadOrgs();
    var name = $('#name').val(data.name)
    var desc = $('#desc').val(data.description)
    var city = $('#city').val(data.city)
    var id = data.id;
    $('#edit').on("click", function () {
        editHero(id);
    })
}

function editHero(id) {

    console.log(id)
    var name = $('#name').val()
    var desc = $('#desc').val()
    var city = $('#city').val()

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/hero/' + id,
        data: JSON.stringify({
            id: id,
            name: name,
            description: desc,
            city: city
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'
    }).always(function (xhr) {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('successful update!');
            $('#heroes').empty();
            loadHeroes();
            $('#addHeroPage').show();
        } else {
            console.log('failed Edit Attempt')
        }

    })
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


                var div = $('<div></div>');
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
            $('#villains').append(`<a id="editVillain" class="btn btn-primary" href="#">Edit Villain</a>`)
            $('#villains').append(`<a id="deleteVillain" class="btn btn-primary" href="#">Delete Villain</a>`)
            $('#addVillainPage').hide();
            $('#editVillain').on('click', function () {
                editVil(data)
            })
            $('#deleteVillain').on('click', function () {
                deleteVillain(id)
            })
        }
    })

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/powers/' + dat,
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.power.name
                var id = item.id

                var div = $('<div></div>');
                var link = $(`<p class="powers" data-id=${id} href="#">${name}<p>`)
                div.append(link);
                $('#villains').append(div);

            });
        }
    })// end villain powers ajax

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/organization/' + dat,
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.org.name
                var id = item.id

                var div = $('<div></div>');
                var link = $(`<p class="powers" data-id=${id} href="#">${name}<p>`)
                div.append(link);
                $('#villains').append(div);

            });
        }
    })// end villain organization ajax
};//get Villain

$('#addVillainPage').on("click", villianInput);

function villianInput() {

    $('#villains').empty();
    $('#villains').append('<input type="text" id="name" placeholder="Villain Name"><br>')
    $('#villains').append('<input type="text" id="desc" placeholder="Description"><br>')
    $('#villains').append('<input type="text" id="city" placeholder="City/Home"><br>')
    $('#villains').append('<select id="powers"><<br>')
    $('#villains').append('<select id="orgs"><br>')
    $('#villains').append('<button id="add" class="btn btn-primary">Submit</button>')
    $('#villains').append('<a class="btn btn-danger" href="/villain.html">Back</button>')
    $('#addVillainPage').hide();
    $('#add').on("click", addVillain);
    loadPowers();
    loadOrgs();
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
            var powersId = $('#powers').val();
            var orgId = $('#orgs').val();
            console.log(powersId);

            $('#villains').empty();
            loadVillains();
            $('#addVillainPage').show();
            var villainId = data.id;

            $.ajax({

                type: 'GET',
                url: 'http://localhost:8080/api/bridge/power/' + villainId + '/' + powersId,
                success: function (data) {
                    console.log('Successfully posted in hero_power table');
                    console.log(villainId);
                    console.log(powersId);

                },
                error: function () {
                    console.log('try again :(');
                }
            });

            $.ajax({

                type: 'GET',
                url: 'http://localhost:8080/api/bridge/org/' + villainId + '/' + orgId,
                success: function (data) {
                    console.log('Successfully posted in hero_ORG table');
                    console.log(villainId);
                    console.log(orgId);

                },
                error: function () {
                    console.log('try again :(');
                }
            });

        },
        error: function () {
            console.log('try again :(');
        }

    });
}

function deleteVillain(id) {
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/api/hero/" + id,
        success: function (status) {
            loadVillains();
            $('#addVillainPage').show();
        }
    });
}

function editVil(data) {
    $('#villains').empty();
    $('#villains').append('<input type="text" id="name" placeholder="Villain Name"><br>')
    $('#villains').append('<input type="text" id="desc" placeholder="Description"><br>')
    $('#villains').append('<input type="text" id="city" placeholder="City/Home"><br>')
    $('#villains').append('<select id="powers"><br>')
    $('#villains').append('<select id="orgs"><br>')
    $('#villains').append(`<a id="edit" class="btn btn-primary" href="#">Edit Villain</a>`)
    loadPowers();
    loadOrgs();
    var name = $('#name').val(data.name)
    var desc = $('#desc').val(data.description)
    var city = $('#city').val(data.city)
    var id = data.id;
    $('#edit').on("click", function () {
        editVillain(id);
    })
}

function editVillain(id) {

    console.log(id)
    var name = $('#name').val()
    var desc = $('#desc').val()
    var city = $('#city').val()

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/hero/' + id,
        data: JSON.stringify({
            id: id,
            name: name,
            description: desc,
            city: city,
            villain: true
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'
    }).always(function (xhr) {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('successful update!');
            $('#villains').empty();
            loadVillains();
            $('#addVillainPage').show();
        } else {
            console.log('failed Edit Attempt')
        }

    })
}

//==================END VILLAIN=====================//

//==================POWERS/Orgs========================//

function loadPowers() {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/powers',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var id = item.id

                var option = $(`<option class="pow" value=${id} >${name}</option>`);

                $('#powers').append(option);
            });
        }
    })
}

function loadOrgs() {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/org/all',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var id = item.id

                var option = $(`<option class="org" value=${id} >${name}</option>`);

                $('#orgs').append(option);
            });
        }
    })
}