$( document ).ready(function() {



  let arrOfItems = [];
  let currentTab = 'all';
  const enterCode = 13;

   $('#add-btn').on('click', function () {
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
  })

$('#show-all').on('click', function () {
  $('#all').append(arrOfItems.length)
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
      //pageAddFunction()
      //renderPages()
      pagesFunction()
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
    let currentList = [];


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
  // const maxElementsOnPage = 5;
  // let currentPage = 1;
  // let pagination = (currentList) => {
  // let lastPage = Math.ceil(currentList.length / maxElementsOnPage)
  //   if (currentPage > maxElementsOnPage) {
  //
  //     lastPage = currentPage
  //
  //   }
  //   $('#pages').html('')
  //   currentPage = currentPage === 0 ? 1 : currentPage
  //   for(i=0; i<lastPage+1; i++) {
  //     const el = $(`<button>${i}</button>`)
  //     $('#pages').append(el)
  //   }
  // }


  let render = () => {
    let currentList = todoTab();
    //pagination(currentList)
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

  // let firstPage = 1;
  // let secondPage = 2;
  // let arrOfPages = [];
  // let arrOfObjectOfPages = [];
  // let pageAddFunction = () => {
  //   let lengthOfArrOfItems = Number(arrOfItems.length);
  //   let multiplicity = 10;
  //   startSizeOfArrOfPages = []
  //   let result =  Number(lengthOfArrOfItems) % Number(multiplicity);
  //   if (lengthOfArrOfItems == 11) {
  //     let newPage = {
  //       numberOfPage: lengthOfArrOfItems / multiplicity,
  //       id: Math.random()
  //     }
  //     arrOfPages.push(newPage.numberOfPage = firstPage)
  //     arrOfObjectOfPages.push(newPage)
  //     //renderPages()
  //     //arrOfPages.push(newPage.numberOfPage = 2)
  //     //arrOfObjectOfPages.push(newPage)
  //     console.log(arrOfObjectOfPages)
  //     let var1 = ''
  //     arrOfPages.forEach(item => {
  //       var1 =`<button id="${item.id}">${Math.floor(lengthOfArrOfItems / multiplicity)}</button>`
  //     })
  //     $('#pages').append(var1)
  //     //renderPages()
  //
  //
  //   } else if (result == 1 && lengthOfArrOfItems > 11){
  //     let newPage = {
  //       numberOfPage: Math.floor(lengthOfArrOfItems / multiplicity),
  //       id: Math.random()
  //     }
  //     //let numOfPage = Math.floor(15.5)//(Number(lengthOfArrOfItems) / Number(multiplicity))
  //     lengthOfArrOfItems += 9
  //     //arrOfPages.push(numOfPage)
  //     lengthOfArrOfItems -= 9
  //     arrOfObjectOfPages.push(newPage)
  //     //$('#pages').append($(`<button >${Math.floor(lengthOfArrOfItems / multiplicity)}</button>`))
  //     arrOfPages.push(newPage.numberOfPage)
  //     console.log(arrOfObjectOfPages)
  //     console.log('arrOfPages', arrOfPages)
  //     let var1 = ''
  //     arrOfPages.forEach(item => {
  //       var1 =`<button id="${item.id}">${Math.floor(lengthOfArrOfItems / multiplicity)}</button>`
  //     })
  //     $('#pages').append(var1)
  //
  //   } else if (arrOfPages.length == startSizeOfArrOfPages.length ) {
  //
  //     //renderPages()
  //
  //   }
  //   }

  // $(document).on('click', '.current-page', function () {
  //   console.log(1)
  //   $('#pages li').removeClass('active')
  //   $(this).addClass('active')
  // })

  let pagesFunction = () => {
    let numberOfItems = arrOfItems.length;
    let limitPerPage = 6;
    let totalPages = Math.round(numberOfItems / limitPerPage)
    let delitel = numberOfItems % limitPerPage
    if (numberOfItems == limitPerPage ) {
      $("#pages").append("<li class='current-page '><a href='#'>" + 1 + "</a></li>")
    }

    else if (delitel === 0) {
      for (let i=totalPages; i <= totalPages; i++){
        $("#pages").append("<li class='current-page'><a href='#'>" + i + "</a></li>");
      }
    }

    $(document).on('click', '.current-page', function () {
      $('#pages li').removeClass('active')
      $(this).addClass('active')

      if ($(this).hasClass('active')){
        let numOfPage = $(this).text()
        $("#listToDo li").hide()
        let firstElementIndex = numOfPage * (limitPerPage - 1) - (limitPerPage - 1)
        for (let i = firstElementIndex; i < (numOfPage * (limitPerPage - 1)); i++ ) {
          $('#listToDo li:eq(' + i + ')').show()
        }
      }

    })



  }



  // let one = $("#listToDo").find(`li`).show(arrOfItems.splice(limitPerPage - 1))
  // $("#pages").append("<li class='current-page active'><a href='javascript:void(0)'>" + 1 + "</a></li>");
  //
  //
  // for (let i = 2; i <= totalPages; i++) {
  //   $("#pages").append("<li class='current-page'><a href='javascript:void(0)'>" + i + "</a></li>");
  // }







    // let renderPages = () => {
    // // let var1 = ''
    // // let appendedValue = arrOfPages.forEach(item => var1 += $(`<button id="${item.id}">${item.numberOfPage}</button>`))
    // //   $('#pages').append(appendedValue)
    //   let var1 = ''
    //   arrOfPages.forEach(item => {
    //     var1 +=`<button id="${item.id}">${Math.floor(lengthOfArrOfItems / multiplicity)}</button>`
    //   })
    //   $('#pages').append(var1)
    //   //$('#pages').append($(`<button >${Math.floor(lengthOfArrOfItems / multiplicity)}</button>`))
//}

  //arrOfItems.slice(item.idOfItem)
}); // refers to document.ready
