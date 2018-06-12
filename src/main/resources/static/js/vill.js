loadVillains();

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
                var link = $(`<a class="showHeroes" data-id=${id} href="#">${name}<a>`)
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
    var teamDiv = $('<div id="teams"></div')
    var powerDiv = $('<div id="abil"></div')

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/hero/' + dat,
        success: function (data, status) {

            var villName = data.name
            var id = data.id
            var villDesc = data.description
            var villCity = data.city
            var image = data.image;

            $('#addVillainPage').hide();
            $('#villainPic').hide();
            $('#villainTitle').hide();
            $('#villains').append(`<img class="heroImg" src=${image}>`);
            $('#currentVillainTitle').append(villName)
            var villDiv = $('<div></div>');

            villDiv.append(`<h5>Territory: <span>${villCity}</span></h5>`)
            villDiv.append(`<h5>Bio: <span>${villDesc}</span></h5>`)
            $('#villbtn').append(`<a class="space btn btn-primary" href="villain.html">Back to Villains</a>`)
            $('#villbtn').append(`<a id="deleteVillain" class="space btn btn-danger" href="#">Delete Villain</a>`)
            $('#villbtn').append(`<a id="editVillain" class="space btn btn-primary" href="#">Edit Villain</a>`)

            $('#villains').append(villDiv)

            $('#editVillain').on('click', function () {
                $('#villbtn').hide()
                editVil(data)
            })
            $('#deleteVillain').on('click', function () {
                $('#villbtn').hide()
                deleteVillain(id)
            })

            $('#villains').append(teamDiv)
            $('#villains').append(powerDiv)
            getPowers(dat);
            getOrgs(dat);
        }
    })
};// End Get Villain

function getPowers(dat) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/powers/' + dat,
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.power.name
                var id = item.id

                var div = $('<div></div>');
                var link = $(`<h5 class="powers" data-id=${id} href="#">Ability : <span>${name}</span></h5>`)
                div.append(link);
                $('#abil').append(div);
            });
        }
    })
};

function getOrgs(dat) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/bridge/organization/' + dat,
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.org.name
                var id = item.id

                var div = $('<div></div>');
                var link = $(`<h5 class="powers" data-id=${id} href="#">Organizations : <span>${name}</span></h5>`)
                div.append(link);
                $('#teams').append(div);

            });
        }
    })
};

$('#addVillainPage').on("click", villianInput);

function villianInput() {

    $('#villains').empty();
    $('#villains').append('<input class="form-control" type="text" id="name" placeholder="Villain Name"><br>')
    $('#villains').append('<input class="form-control" type="text" id="desc" placeholder="Description"><br>')
    $('#villains').append('<input class="form-control" type="text" id="city" placeholder="City/Home"><br>')
    $('#villains').append('<input class="form-control" type="text" id="pic"  placeholder="URL Image"><br>')

    $('#villains').append('<div id="vilHead" class="row"></div><br>')
    $('#vilHead').append('<h2 class="col-md-6>Powers and Abilities</h2>')
    $('#vilHead').append('<h2 class="col-md-6>Teams and Organizations</h2>')
    
    $('#villains').append('<div id="vil" class="row"></div>')
    $('#vil').append('<form class=col-md-6 id="powers"></form>')
    $('#vil').append('<form class=col-md-6 id="orgs"></form><br>')

    $('#villains').append('<a class="one btn btn-danger" href="/villain.html">Back</button>')
    $('#villains').append('<button id="add" class="one btn btn-primary">Submit</button>')

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
    var image = $('#pic').val()
    var villain = true;
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
            image: image,
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

                type: 'POST',
                url: 'http://localhost:8080/api/bridge/power/' + villainId,
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
                url: 'http://localhost:8080/api/bridge/org/' + villainId,
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

function deleteVillain(id) {
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/api/hero/" + id,
        success: function (status) {
            loadVillains();
            window.location.replace("villain.html");
        }
    });
}

function editVil(data) {
    $('#villains').empty();
    $('#villains').append('<input class="form-control" type="text" id="name" placeholder="Villain Name"><br>')
    $('#villains').append('<input class="form-control" type="text" id="desc" placeholder="Description"><br>')
    $('#villains').append('<input class="form-control" type="text" id="city" placeholder="City/Home"><br>')
    $('#villains').append('<input class="form-control" type="text" id="pic"  placeholder="URL Image"><br>')

    $('#villains').append('<div id="vilHead" class="row"></div><br><br>')
    $('#vilHead').append('<h2 class="col-md-6>Powers and Abilities</h2>')
    $('#vilHead').append('<h2 class="col-md-6>Teams and Organizations</h2>')

    $('#villains').append('<div id="vil" class="row"></div>')
    $('#vil').append('<form class=col-md-6 id="powers"></form>')
    $('#vil').append('<form class=col-md-6 id="orgs"></form><br>')

    $('#villains').append('<a class="one btn btn-danger" href="/villain.html">Back</button>')
    $('#villains').append(`<a id="edit" class="one btn btn-primary" href="#">Edit Villain</a>`)
    $('#villains').append(`<img src="images/villain2.png">`)

    loadPowers();
    loadOrgs();

    var name = $('#name').val(data.name)
    var desc = $('#desc').val(data.description)
    var city = $('#city').val(data.city)
    var image = $('#pic').val(data.image)
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
    var image = $('#pic').val()

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
            image: image,
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
            window.location.replace("villain.html");

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

//========================END OF Villain FUNCTIONS=========================//

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