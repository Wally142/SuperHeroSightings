loadHeroes();

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

                var div = $('<div></div>');
                var link = $(`<a class="showHeroes" data-id=${id} href="#">${name}<a>`)
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
    var teamDiv = $('<div id="team"></div')
    var powerDiv = $('<div id="ability"></div')

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/hero/' + dat,
        success: function (data, status) {

            var heroName = data.name
            var id = data.id
            var heroDesc = data.description
            var heroCity = data.city
            var image = data.image;

            $('#addHeroPage').hide();
            $('#heroPic').hide();
            $('#heroes').append(`<img class="heroImg" src=${image}>`);
            var heroDiv = $('<div></div>');
            heroDiv.append(`<h3>${heroName}</h3>`)
            heroDiv.append(`<h5>${heroCity}</h5>`)
            heroDiv.append(`<h5>${heroDesc}</h5>`)
            $('#herobtn').append(`<a class="space btn btn-primary" href="heroes.html">Back to Heroes</a>`)
            $('#herobtn').append(`<a id="deleteHero" class="space btn btn-danger" href="#">Delete Hero</a>`)
            $('#herobtn').append(`<a id="editHero" class="space btn btn-primary" href="#">Edit Hero</a>`)
            var teamDiv = $('<div id="team"></div')
            $('#heroes').append(heroDiv)
            $('#heroes').append(heroDiv)

            $('#editHero').on('click', function () {
                $('#herobtn').hide()
                edit(data)
            })
            $('#deleteHero').on('click', function () {
                $('#herobtn').hide()
                deleteHero(id)
            })
            $('#heroes').append(teamDiv)
            $('#heroes').append(powerDiv)
            getPowers(dat);
            getOrgs(dat);
        }
    })
};// end get Hero

function getPowers(dat) {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/powers/' + dat,
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.power.name
                var id = item.id

                var div = $(`<div id=${name}></div>`);
                var link = $(`<h5 class="powers" data-id=${id} href="#">${name}</h5>`)
                div.append(link);
                $('#ability').append(div);

            });
        }
    })
}

function getOrgs(dat) {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/organization/' + dat,
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.org.name
                var id = item.id

                var div = $(`<div id=${name}></div>`);
                var link = $(`<h5 class="powers" data-id=${id} href="#">${name}</h5>`)
                div.append(link);
                $('#team').append(div);

            });
        }
    })
}

$('#addHeroPage').on("click", heroInput);

function heroInput() {

    $('#heroes').empty();
    $('#heroes').append('<input type="text" id="name" class="form-control" placeholder="Hero Name"><br>')
    $('#heroes').append('<input type="text" id="desc" class="form-control" placeholder="Description"><br>')
    $('#heroes').append('<input type="text" id="city" class="form-control" placeholder="City/Home"><br>')
    $('#heroes').append('<input type="text" id="pic"  class="form-control" placeholder="URL Image"><br>')

    $('#heroes').append('<a class="one btn btn-danger" href="/heroes.html">Back</button>')
    $('#heroes').append('<button id="add" class="one btn btn-primary">Submit</button>')
    $('#heroes').append('<form id="powers"></form>')
    $('#heroes').append('<form id="orgs"></form><br>')
    $('#addHeroPage').hide();
    $('#add').on("click", addHero);
    loadPowers();
    loadOrgs();
}

function addHero() {

    var name = $('#name').val();
    var desc = $('#desc').val();
    var city = $('#city').val();
    var image = $('#pic').val();
    var powerIds = [];
    var orgIds = [];

    $(".chk:checked").each(function () {
        powerIds.push($(this).val());
    });

    var selected;
    selected = powerIds.join(',')
    console.log(powerIds);

    $(".chck:checked").each(function () {
        orgIds.push($(this).val());
    });

    var selected;
    selected = powerIds.join(',')
    console.log(orgIds);

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

            var heroId = data.id;
            $('#heroes').empty();
            loadHeroes();
            $('#addHeroPage').show();

            $.ajax({

                type: 'POST',
                url: 'http://localhost:8080/api/bridge/power/' + heroId,
                data: JSON.stringify({
                    powerIds: powerIds
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
            }).always(function (xhr) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log('successfully added Powers!');
                } else {
                    console.log('failed Power Attempt')
                }
            });

            $.ajax({

                type: 'POST',
                url: 'http://localhost:8080/api/bridge/org/' + heroId,
                data: JSON.stringify({
                    orgIds: orgIds
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
            }).always(function (xhr) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log('successfully added Organizations!');
                } else {
                    console.log('failed Organization Attempt')
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
    $('#heroes').append('<input type="text" id="name" class="form-control" placeholder="Hero Name"><br>')
    $('#heroes').append('<input type="text" id="desc" class="form-control" placeholder="Description"><br>')
    $('#heroes').append('<input type="text" id="city" class="form-control" placeholder="City/Home"><br>')
    $('#heroes').append('<input type="text" id="pic" class="form-control" placeholder="URL Image"><br>')

    $('#heroes').append('<form id="powers"></form>')
    $('#heroes').append('<form id="orgs"></form><br>')

    $('#heroes').append('<a class="one btn btn-danger" href="/heroes.html">Back</button>')
    $('#heroes').append(`<a id="edit" class="one btn btn-primary" href="#">Edit Hero</a>`)
    $('#heroes').append(`<img src="images/edithero.png">`)

    loadPowers();
    loadOrgs();
    var name = $('#name').val(data.name)
    var desc = $('#desc').val(data.description)
    var city = $('#city').val(data.city)
    var image = $("#pic").val(data.image)
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
    var image = $("#pic").val()

    var powerIds = [];
    var orgIds = [];

    $(".chk:checked").each(function () {
        powerIds.push($(this).val());
    });

    var selected;
    selected = powerIds.join(',')
    console.log(powerIds);

    $(".chck:checked").each(function () {
        orgIds.push($(this).val());
    });

    var selected;
    selected = powerIds.join(',')
    console.log(orgIds);

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/hero/' + id,
        data: JSON.stringify({
            id: id,
            name: name,
            description: desc,
            city: city,
            image: image
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

            $.ajax({

                type: 'PUT',
                url: 'http://localhost:8080/api/bridge/power/edit/' + id,
                data: JSON.stringify({
                    powerIds: powerIds
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
            }).always(function (xhr) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log('successfully added Powers!');
                } else {
                    console.log('failed Power Attempt')
                }
            });

            $.ajax({

                type: 'PUT',
                url: 'http://localhost:8080/api/bridge/org/edit/' + id,
                data: JSON.stringify({
                    orgIds: orgIds
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
            }).always(function (xhr) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log('successfully added Organizations!');
                } else {
                    console.log('failed Organization Attempt')
                }
            });

        } else {
            console.log('failed Edit Attempt')
        }
    })
}
//========================END OF HERO FUNCTIONS=========================//

//=========================POWERS/Orgs=================================//

function loadPowers() {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/powers',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var id = item.id

                var option = $(`<div><input class="chk" id=${name} type="checkbox" value=${id}>${name}</div>`);
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

                var option = $(`<div><input class="chck" id=${name} type="checkbox" value=${id}>${name}</div>`);
                $('#orgs').append(option);
            });
        }
    })
}