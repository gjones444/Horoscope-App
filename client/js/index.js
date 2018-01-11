$(document).ready(function() {

  var newRow, nameTd, dobTd, zodiacTd, zodiacArr;


  $('#zodiac-form').on('submit', function(e) {
    e.preventDefault();

    var zodiacObj = {
      name: $('#name-input').val(),
      bday: $('#bday').val(),
      zodiac: $('#zodiac-input-drop').val()
    }

    $.ajax({
      method: 'POST',
      url: '/create-user',
      dataType: 'json',
      data: JSON.stringify(zodiacObj),
      contentType: 'application/json'
    }).then(function(res) {
      if (res === "null") {
        alert("Please Enter Date of Birth and Zodiac Sign")
      }
    });

    $.ajax({
      method: 'GET',
      url: '/get-horoscope/' + zodiacObj.zodiac
    }).then(function(posts) {
      // console.log(posts.Todays_horoscope)
      $('#zodiac_modal').modal('show');
      $('.modal-body').append(posts.Todays_horoscope)

    });
  });

  $.ajax({
    method: 'GET',
    url: '/get-users',
    dataType: 'json',
    contentType: 'application/json'
  }).then(function(results) {
    console.log(results)
    for (var i = 0; i < results.length; i++) {
      // console.log(results[i])
      newRow = $('<tr>')
      nameTd = $('<td>');
      dobTd = $('<td>');
      zodiacTd = $('<td>');
      nameTd.text(results[i].Name);
      dobTd.text(results[i].Birthdate);
      zodiacTd.text(results[i].Zodiac);
      newRow.append(nameTd).append(dobTd).append(zodiacTd);
      $('#tbody').prepend(newRow)
    }
  })

});
