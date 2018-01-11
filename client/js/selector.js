$(document).ready(function() {


  $('#zodiac-dropdown').on('submit', function(e) {
    e.preventDefault();

    var selector = {
      zodiac: $('#zodiac-sel-drop').val()
    };

    $.ajax({
      method: 'GET',
      url: '/zodiac-by-users/'+selector.zodiac,
    }).then(function(results) {
      // console.log(results)
      for (var i = 0; i < results.length; i++) {
        $('#tbody').empty()
        newRow = $('<tr class="zodiac-row">')
        nameTd = $('<td>');
        dobTd = $('<td>');
        zodiacTd = $('<td>');
        nameTd.text(results[i].Name);
        dobTd.text(results[i].Birthdate);
        zodiacTd.text(results[i].Zodiac);
        newRow.append(nameTd).append(dobTd).append(zodiacTd);
        $('#tbody').prepend(newRow)
      }

      // }
    })
  })
})
