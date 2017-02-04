var socket = io();


// var fd = function(evt){
//
//   console.log(event);
//   console.log(event.srcElement);
//   clickedElement = event.srcElement;
//   var file = event.srcElement.files[0].name;
//
//   var extension = file.substring(file.lastIndexOf('.'));
//   console.log(extension);
//   acceptable = event.srcElement.accept.split(',')
//   var acc = false;
//   acceptable.forEach((ex)=>{
//     console.log('ext: ',ex);
//     if(ex === extension) acc = true;
//   });
//   if(!acc)return alert('File must be an image (".png", ".jpg")');
//   // console.log('THIS.VAL(): ', $(this).val());
//   alert(clickedElement.value);
//   // clickedElement.on('change', function(){
//   //   var files = $(this).get(0).files;
//   //   console.log(files);
//   // });
//
//   var length = event.srcElement.files.length;
//   for(i = 0; i <=(length-2)/2; i++){
//     console.log('\n\n\n\n\nADD ROWS');
//     $('#add-row').click();
//   }
//   var index = 1;
//   for(x = 0; x < length; x++){
//     var i = event.srcElement.files[x];
//     console.log(i);
//     i = URL.createObjectURL(i);
//     var img = new Image();
//     // img.src = "data:image/png;base64," + event.srcElement.files[x].toString('Base64');
//     // img.src = "data:image/png;base64," + i.toString('base64');
//
//     img.src = i;
//     var canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     canvas.getContext('2d').drawImage(img, 0,0);
//     dataURI = canvas.toDataURL();
//     console.log(dataURI);
//
//
//     var h;
//     var w;
//     $('#box'+index).html('<img src="' + i + '"/>');
//     index++;
//   }
// }
var w = 1;
var t=1;

socket.on('connect', function(){
  console.log(socket.id);


  var delivery = new Delivery(socket);

  delivery.on('delivery.connect', function(delivery){
    $('#fd').on('click', function(){
      $('#fd').on('change', function(evt){
        var files = evt.currentTarget.files;
        var length = event.currentTarget.files.length;
        for(i = 0; i <=(length-2)/2; i++){
          console.log('\n\n\n\n\nADD ROWS');
          $('#add-row').click();
        }

        // var extraParams = {box: length};
        // delivery.send(evt.currentTarget.files, extraParams);

        var index = 1;
        for(x = 0; x < length; x++){
          var i = event.currentTarget.files[x];
          // console.log(i);
          i = URL.createObjectURL(i);
          var img = new Image();
          // img.src = "data:image/png;base64," + event.srcElement.files[x].toString('Base64');
          // img.src = "data:image/png;base64," + i.toString('base64');

          var extraParams = {box: '#box'+index};
          index++;

          delivery.send(evt.currentTarget.files[x], extraParams);
          // delivery.on('send.success', function(fileUID){
          //   console.log('FILEUID: ', fileUID);
          //   console.log('File was successfully sent!');
          //   // var path = "/../" + fileUID.name;
          //   // $('#box2-image').attr("src", fileUID.name);
          // });
          var h;
          var w;
          $('#box'+index).html('<img src="' + i + '"/>');
        }
      });
    });
  });




  socket.on('image', function(info){
    console.log('\n\n\nINFO: ', info);
    var box = info.params.box;
    var ctx =$(box)[0].firstElementChild;
    console.log(ctx);
    // ctx = ctx.getContext('2d');
    if(info.image){
      var img = new Image();
      img.src = 'data:image/jpeg;base64,'+info.buffer;
      console.log("IMAGE received from server for box#: ", box);

      $(box).html('<img src="data:image/png;base64,' + info.buffer + '" />')
    }
  });

  $('#add-row').on('click', function(i){
    w+=2;
    console.log('ADD a new Row!!', w);
    var n = document.getElementById('au'); //returns a HTML DOM Object
    // console.log(n);
    var dupNode = n.cloneNode(true);
    console.log(dupNode);
    console.log(dupNode.children[0].children);
    var b1 = dupNode.children[0].children[0];
    var b2 = dupNode.children[0].children[2];
    var sp1 = dupNode.children[0].children[1];
    var br1 = dupNode.children[1];
    console.log('BREAK???: ', br1);
    console.log('SPACE??? ', sp1);

    sp1.id = sp1.id + w;
    br1.id = br1.id +w;
    dupNode.id = dupNode.id + w;

    b1.id = "box"+ w;
    // $('#'+b1.id).css("margin-left", "20px");
    // $('#'+b1.id).css("float", "left");
    // $('#'+b1.id +' img').css("width", "90% !important");
    //
    //
    // console.log('BOX1: ', b1);
    //
    b2.id = "box"+ (w+1);
    // $('#'+b2.id).css("margin-right", "20px");
    // $('#'+b2.id).css("float", "right");
    // $('#'+b2.id).css("width", "300px");
    // $('#'+b2.id).css("border", "2px black solid");
    // console.log('BOX2: ', b2);

    // dupNode.attr("box1","box"+w);
    var doc = document.getElementById("page-container");
    doc.appendChild(dupNode);
    console.log(dupNode);

    // document.append(dupNode);
  });

  // $('#au').on('click', function() {
  //   console.log('\n\n\nBUTTON CLICKED');
  //    var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
  //    alert('you clicked on button #' + clickedBtnID);
  // });

});

// var boxClick = function(doc){
//   console.log('\n\n\nBUTTON CLICKED', doc);
//    var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
//    alert('you clicked on button #' + clickedBtnID);
// }

// document.onclick = clickListener;


// var clickListener = function(e) {
//     var clickedElement;
//     if(e == null) {
//         clickedElement = event.srcElement;
//     } else {
//         clickedElement = e.target;
//     }
//     arrayWithElements.push(clickedElement)
//     alert(arrayWithElements);
// }
