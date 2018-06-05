loadOrganizations();

function loadOrganizations() {
    $('#organization').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/org/all',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var desc = item.description
                var location = item.location
                var id = item.id
                console.log(name);

                var div = $('<div></div>');
                var link = $(`<a class="showOne" data-id=${id} href="#">${name}<a>`)
                div.append(link);

                $('#organization').append(div);

                $(link).on("click", function () {
                    var dat = $(this).data('id');
                    getHero(dat);
                })
            });
        }
    })
}

function getHero(dat) {
    $('#organization').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/org/' + dat,
        success: function (data, status) {

            console.log(data)

            var name = data.name
            var id = data.id
            var desc = data.description
            var location = data.location

            var orgDiv = $('<div></div>');
            orgDiv.append(name)
            orgDiv.append(desc)
            orgDiv.append(location)
            $('#organization').append(orgDiv);
            $('#organization').append(`<a class="btn btn-primary" href="organization.html">Back to Organizations</a>`)
            $('#organization').append(`<a id="edit" class="btn btn-primary" href="#">Edit Organization</a>`)
            $('#organization').append(`<a id="deleteOrg" class="btn btn-primary" href="#">Delete Organization</a>`)
            $('#addOrg').hide();
            $('#edit').on('click', function () {
                edit(data)
            })
            $('#deleteOrg').on('click', function () {
                deleteOrg(id)
            })

        }
    })
};// end get Org

function deleteOrg(id) {
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/api/org/" + id,
        success: function (status) {
            loadOrganizations();
            $('#addOrg').show();
        }
    });
}

function edit(data) {
    $('#organization').empty();
    $('#organization').append('<input type="text" id="name" placeholder="Organization Name"><br>')
    $('#organization').append('<input type="text" id="desc" placeholder="Description"><br>')
    $('#organization').append('<input type="text" id="head" placeholder="Headquarters"><br>')
    $('#organization').append(`<a id="editOrg" class="btn btn-primary" href="#">Edit Organization</a>`)
   
    $('#name').val(data.name);
    $('#desc').val(data.description);
    $('#head').val(data.location);
    var id = data.id;
    $('#editOrg').on("click", function () {
        editOrganization(id);
    })
}

function editOrganization(id) {

    console.log(id)
    var name = $('#name').val()
    var desc = $('#desc').val()
    var location = $('#head').val()

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/org/' + id,
        data: JSON.stringify({
            id: id,
            name: name,
            description: desc,
            location: location
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'
    }).always(function (xhr) {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('successful update!');
            $('#organization').empty();
            loadOrganizations();
            $('#addOrg').show();
        } else {
            console.log('failed Edit Attempt')
        }
    })
}

$('#addOrg').on("click", orgInput);

function orgInput() {

    $('#organization').empty();
    $('#organization').append('<div class="form-group"><input type="text" id="name" class="form-control" placeholder="Name"></div>')
    $('#organization').append('<div class="form-group"><input type="text" id="desc" class="form-control" placeholder="Description"></div>')
    $('#organization').append('<div class="form-group"><input type="text" id="head" class="form-control" placeholder="HeadQuarters"></div>')

    $('#organization').append('<button id="add" class="btn btn-primary">Submit</button>')
    $('#organization').append('<a class="btn btn-danger" href="/organization.html">Back</button>')
    $('#addOrg').hide();
    $('#add').on("click", addOrg);
}

function addOrg() {

    var name = $('#name').val()
    var desc = $('#desc').val()
    var location = $('#head').val()

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/org/add',
        data: JSON.stringify({
            name: name,
            description: desc,
            location: location
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.log(data)
            console.log('Successfully posted in Organization table');
            $('#organization').empty();
            loadOrganizations();
            $('#addOrg').show();
        },
        error: function () {
            console.log('try again :(');
        }
    });

}








