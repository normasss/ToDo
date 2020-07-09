$( document ).ready(function() {

  let arrOfItems = []
  const enterCode = 13

  $('#add-btn').on('click', function () {
    let itemList = {
      textOfItem: $('#text-field').val().trim() ,
      idOfItem: Math.random(),
      copmleted: false
    }
    arrOfItems.push(itemList)
    $('#text-field').val('')
    render()
  })


  $('#text-field').on('keypress',function(e) {
    if(e.which == enterCode) {
      render()
    }
  })


  let render = () => {
    let textString = '';
    arrOfItems.forEach(item => {
      textString += `<li id="${item.idOfItem}" >
        <input type="checkbox" class="toDoDone" ${ item.copmleted ? 'checked' : ''}>
        <span class='${ item.copmleted ? 'completed' : ''}' >${item.textOfItem}</span>
    </li>`
    })
    $('#listToDo').html(textString)
    checkBoxFunction()
  }

  $(document).on('change','.toDoDone', function() {
    let newId = $(this).parent().attr('id')
    arrOfItems.forEach(item => {
      if (Number(item.idOfItem) === Number(newId)) {
        item.copmleted = !item.copmleted
      }
    })
    render()
  })

  $("#select-all").on('change', function(){
  arrOfItems.forEach(item => {
    if($('#select-all').prop("checked") == true){
      item.copmleted = true
    }
    else if($('#select-all').prop("checked") == false){
      item.copmleted = false
    }
  })
    render()
  });

  let checkBoxFunction = () => {
    if (arrOfItems.length != 0 && arrOfItems.every(item => item.copmleted)) {
      $('#select-all').prop('checked', true)
      return
    }
    else { $('#select-all').prop('checked', false)
    }
  }





















}); // refers to document.ready
