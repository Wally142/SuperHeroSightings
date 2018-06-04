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

                var option = $(`<div class="loc" value=${id}></div>`);
                option.append(name)
                option.append(desc)
                option.append(location)

                $('#organization').append(option);
            });
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








