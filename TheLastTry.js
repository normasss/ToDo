$( document ).ready(function() {



  let arrOfItems = [];
  let currentTab = 'all';
  const enterCode = 13;
  let currentList = [];

   $('#add-btn').on('click', function () {
     if ($('#text-field').val().trim()) {
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
       console.log(1)
     }
     })




   $('#text-field').on('keydown',function(event) {
    if( Number(event.keyCode) === Number(enterCode) && $('#text-field').val().trim()) {
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

  const activeTab = function(str) {
    currentTab = str;
    render();
  };
  const competeTodo = function() {
    activeTab('completed');
  };
  const activeTodo = function() {
    activeTab('active');
  };
  const allTodo = function() {
    activeTab('all');
  };

  $('#tab-all').on('click', () => {
    allTodo();
  });
  $('#tab-active').on('click', () => {
    activeTodo();
  });
  $('#tab-completed').on('click', () => {
    competeTodo();
  });


  const todoTab = () => {


    switch (currentTab) {
      case 'active':
        currentList = arrOfItems.filter(item => item.copmleted === false);

        break;
      case 'completed':
        currentList = arrOfItems.filter(item => item.copmleted === true);

        break;
      default:
        currentList = arrOfItems;

        break;
    }

    return currentList;
  };


  let render = () => {
    let currentList = todoTab();
    pagesFunction()
    let textString = '';
    currentList.forEach(item => {
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
    pagesFunction()
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

    let uncheckedItemsCount = () => arrOfItems.filter(item => item.copmleted == false).length
    let сheckedItemsCount = () => arrOfItems.filter(item => item.copmleted == true).length
    let allItemsCount = () => arrOfItems.length

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



  let limitPerPage = 5;
  let pagesFunction = () => {

    let numberOfItems = currentList.length;
    let totalPages = Math.ceil(numberOfItems / limitPerPage);

    $("#pages").html('');
    for (let i = 1; i < totalPages + 1; i++) {
      $('#pages li').removeClass('activate')
      let el = `<li class='current-page activate'><a href='#'> ${i} </a></li>`
      $("#pages").append(el).addClass('active')
      if ($('#pages').hasClass('active')) {
        let numOfPage = $(el).text()
        $("#listToDo li").hide()
        let firstElementIndex = numOfPage === 1 ? numOfPage * (limitPerPage - 1) - (limitPerPage - 1) : numOfPage * limitPerPage - limitPerPage;
        for (let i = firstElementIndex; i <= (numOfPage * limitPerPage - 1); i++) {
          $('#listToDo li:eq(' + i + ')').show()
        }
      }
    }
  };



    $(document).on('click', '.current-page', function () {
      $('#pages li').removeClass('active').removeClass('activate')
      $(this).addClass('active').addClass('activate')

      if ($(this).hasClass('active')){
        let numOfPage = $(this).text()
        $("#listToDo li").hide()
        let firstElementIndex = numOfPage === 1 ? numOfPage * (limitPerPage - 1) - (limitPerPage - 1) : numOfPage * limitPerPage  - limitPerPage;
        for (let i = firstElementIndex; i <= (numOfPage * limitPerPage - 1); i++ ) {
          $('#listToDo li:eq(' + i + ')').show()
        }
      }

    })



















  }); // refers to document.ready
