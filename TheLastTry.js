$( document ).ready(function() {

  let arrOfItems = []
  const enterCode = 13

   $('#add-btn').on('click', function () {
    let itemList = {
      textOfItem: $('#text-field').val().trim() ,
      idOfItem: Math.random(),
      copmleted: false,
      onEdit: false,
      tab3: true,
      tab2: false,
      tab2: false
    }
    arrOfItems.forEach(item => item.onEdit = false)
    arrOfItems.push(itemList)
    $('#text-field').val('')
    render()
  })


  $('#text-field').on('keydown',function(event) {
    if( Number(event.keyCode) === Number(enterCode)) {
      let itemList = {
        textOfItem: $('#text-field').val().trim() ,
        idOfItem: Math.random(),
        copmleted: false,
        onEdit: false
      }
      arrOfItems.forEach(item => item.onEdit = false)
      arrOfItems.push(itemList)
      $('#text-field').val('')
      render()
    }
  })

  let render = () => {
    let textString = '';
    arrOfItems.forEach(item => {
      textString += `<li id="${item.idOfItem}" >
        <input type="checkbox" class="toDoDone" ${ item.copmleted ? 'checked' : ''}>
        <span class='${ item.copmleted ? 'completed' : ''}' >${ item.onEdit ? '<input type="text" class="new-value">' : item.textOfItem}</span>
        ${ item.onEdit ? '<input type="button" value="Сохранить изменения" class="save-changes">' : '<input type="button" class="edit-btn" value="Редактировать">'}
        <input type="button" class="delete-btn" value="Удалить">
    </li>`
    })
    $('#listToDo').html(textString)
    $('.all-checkboxes').html('Всего задач:' + allItemsCount())
    $('.all-checked-checkboxes').html('Выполненных задач:' + сheckedItemsCount())
    $('.all-unchecked-сheckboxes').html('Невыполненных задач:' + uncheckedItemsCount())
    checkBoxFunction()
  }

  $(document).on('click','.delete-btn', function() {
    let deleteItem = $(this).parent().attr('id')
    arrOfItems.forEach((item, index) => {
      if (Number(item.idOfItem) === Number(deleteItem)) {
        // удаляет все  let indexToDelete = arrOfItems.filter(item => item.idOfItem)
          arrOfItems.splice(index, 1)
      }
    })
    render()
  })

  $('.delete-all').on('click', function() {
        arrOfItems.length = 0;
      render()
    })

  $(document).on('change','.toDoDone', function() {
    let newId = $(this).parent().attr('id')
    arrOfItems.forEach(item => {
      if (Number(item.idOfItem) === Number(newId)) {
        item.copmleted = !item.copmleted
      }
    })
    odin()
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

  let sortedArr = [];
    $('.delete-checked').on('click', function() {
      let idOfCheckedItems = $(this).parent().attr('id')

      arrOfItems.forEach((item, index)=> {
        sortedArr = arrOfItems.filter(item => item.copmleted !== true)
      })
      arrOfItems = sortedArr
      render()
    })

    $(document).on('click', '.edit-btn' , function () {
      let editItem = $(this).parent().attr('id')
      arrOfItems.forEach(item => {
        if (Number(item.idOfItem) === Number(editItem)){
          item.onEdit = true
        } else {
          item.onEdit = false
        }
      })
      render()
    })

  let newTextOfItem = '';
  $(document).on('click', '.save-changes' , function () {
    let editItem = $(this).parent().attr('id')
    arrOfItems.forEach(item => {
      if (Number(item.idOfItem) === Number(editItem)){
        newTextOfItem = $('.new-value').val().trim()
        item.textOfItem = newTextOfItem ? newTextOfItem : item.textOfItem
        item.onEdit = false
      }
    })
    render()
  })

  let uncheckedItemsCount = () => arrOfItems.filter(item => item.copmleted == false).length
  let сheckedItemsCount = () => arrOfItems.filter(item => item.copmleted == true).length
  let allItemsCount = () => arrOfItems.length

  let arrOfCheckedTabs = [];
  $('a[href="#tab-1"]').on('click', function () {
    arrOfCheckedTabs = [];
    arrOfCheckedTabs = arrOfItems.filter(item => item.copmleted ==true)
      console.log(arrOfCheckedTabs)
    let textString = '';
    arrOfCheckedTabs.forEach(item => {
      textString += `<li id="${item.idOfItem}" >
        <input type="checkbox" class="toDoDone" ${ item.copmleted ? 'checked' : ''}>
        <span class='${ item.copmleted ? 'completed' : ''}' >${ item.onEdit ? '<input type="text" class="new-value">' : item.textOfItem}</span>
        ${ item.onEdit ? '<input type="button" value="Сохранить изменения" class="save-changes">' : '<input type="button" class="edit-btn" value="Редактировать">'}
        <input type="button" class="delete-btn" value="Удалить">
    </li>`})
    $('#listToDo').html(textString)
  })


  let arrOfUncheckedTabs = [];
  let odin = () => {$('a[href="#tab-2"]').on('click', function () {
    arrOfUncheckedTabs = [];
    arrOfUncheckedTabs = arrOfItems.filter(item => item.copmleted ==false)
      //$('.tab-2').append(arrOfTab2) // должно аппендить внутрь а не рядом
    console.log(arrOfUncheckedTabs)
    let textString = '';
    arrOfUncheckedTabs.forEach(item => {
      textString += `<li id="${item.idOfItem}" >
        <input type="checkbox" class="toDoDone" ${ item.copmleted ? 'checked' : ''}>
        <span class='${ item.copmleted ? 'completed' : ''}' >${ item.onEdit ? '<input type="text" class="new-value">' : item.textOfItem}</span>
        ${ item.onEdit ? '<input type="button" value="Сохранить изменения" class="save-changes">' : '<input type="button" class="edit-btn" value="Редактировать">'}
        <input type="button" class="delete-btn" value="Удалить">
    </li>`})
    $('#listToDo').html(textString)
    })}


  let arrOfAllTabs = [];
  $('a[href="#tab-3"]').on('click', function () {
    render()

  })

  // $('a[href="#tab-3"]').on('click', function (){
  //   $('#listToDo').hide()
  // })










  }); // refers to document.ready
