
let a = Math.ceil(0)
console.log(a)

//
//
//
//
//
//
// // $( document ).ready(function() {
// //   $('#1').on('click', () => {
// //     alert($('#2').val())
// //   })
// //
// // });
//
// // let name = {
// //   name: 'anantoly',
// //   surname: 'vasserman',
// //   zalupa: 'big',
// //   penis: 'small',
// //   brain: 'veryBig',
// // }
// // Object.keys(name).forEach((item)=>{
// //   console.log(item)
// //   console.log(name[item])
// // })
// // $( document ).ready(function() {
// //
// //
// //
// //
// //
// //
// //
// //   let arr = []
// //
// //
// //   $( '#1').on( "click", function() {
// //     let a = $('#2').val()
// //     //console.log(a)
// //     if (a.valueOf().charAt(0) == ' ' || a.valueOf().charAt(0) == '')
// //     {
// //       a = ''
// //       console.log('empty')
// //     }
// //     else
// //     {
// //       console.log('not empty')
// //
// //       //$('#2').val()
// //       $('<ul><li></li></ul>').text(a).appendTo(document.ul)
// //       checkBox = $('<input type="checkbox"></input>')
// //         .appendTo(document.body)
// //       let deleteButton = $('<input type="button" value="Delete"></input>')
// //         .appendTo(document.body)
// //       let x = $(document.createElement("input"))
// //
// //       //console.log(a)
// //       arr.push(a)
// //       console.log(arr)
// //       $('#2').val(' ')
// //     }
// //   });
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// // });
//
//
// $( document ).ready(function() {
//
//   let arr = []
//
//
//
//   $('#addButton').on( 'click', function () {
//     let a = $('#inputField').val().trim();
//     if(a !== '') {
//       createObject(a);
//     } else {
//       console.log('empty')
//     }
//   } )
//
//
//   function createObject(a) {
//     let taskObject = {
//       text: a,
//       id: Math.random(),
//       checked: false
//     }
//     arr.push(taskObject)
//     renderTask();
//   }
//
//
//   function renderTask() {
//     let forRender = ''
//     arr.forEach((item) => {
//       forRender += `
//       <li id= '${item.id}'>
//       <input type="checkbox" class="checked" ${item.checked ? 'checked' : ''}>
//       <span class="${item.checked ? 'activate' : ''}" >${item.text}</span>
//       <input type="button" value="delete" class="zalupa">
//       </li>
//       `
//     })
//     $('#list').html(forRender);
//     $('#inputField').val('');
//   }
//
// $(document).on('click', '.zalupa', function () {
//   const parentId = $(this).parent().attr('id')
//   arr.forEach((item, index) => {
//     if (Number(item.id) == Number(parentId)){
//       arr.splice(index, 1)
//     }
//   })
//   renderTask();
//
//
// })
//
//
//   $(document).on('change','.checked', function(){
//     const parentId = $(this).parent().attr('id')
//     arr.forEach((item) => {
//      if (Number(item.id) == Number(parentId) ){
//        item.checked = !item.checked;
//      }
//     })
//     renderTask()
//     console.log(arr)
//   })
//
//
//   $(document).on('keypress', function(event) {
//     if(event.which === 13) {
//       let a = $('#inputField').val().trim();
//       if(a !== '') {
//         createObject(a);
//       } else {
//         console.log('empty')
//       }
//     }
//   });
//
//
//   $('#selectAll').on('change', function(){
//     arr.forEach((item) => {
//       if (Number(item.id)){
//         item.checked = !item.checked;
//       }
//     })
//     renderTask()
//   })
//
//
//   $('#deleteButton').on('click', function () {
//     let vladislav = arr.filter( item => item.checked === false)
//     arr = vladislav
//     console.log(arr)
//     renderTask();
//   })
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// });
