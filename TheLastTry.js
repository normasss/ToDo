$( document ).ready(function() {

var text;

  $('#addBtn').on('click', function () {
  text = $('#textField').val().trim()
    console.log(text)
  })

  $('#textField').on('keypress',function(e) {
    if(e.which == 13) {
      text = $('#textField').val().trim()
      console.log(text)
    }
  })


























}); // refers to document.ready
