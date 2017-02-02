var socket = io();

var fd = function(evt){
  // var thefile = document.getElementById('thefile');
  // alert(thefile.value);
  console.log(event);
  console.log(event.srcElement);
  clickedElement = event.srcElement;
  var file = event.srcElement.files[0].name;

  var extension = file.substring(file.lastIndexOf('.'));
  console.log(extension);
  acceptable = event.srcElement.accept.split(',')
  var acc = false;
  acceptable.forEach((ex)=>{
    console.log('ext: ',ex);
    if(ex === extension) acc = true;
  });
  if(!acc)return alert('File must be an image (".png", ".jpg")');
  // console.log('THIS.VAL(): ', $(this).val());
  alert(clickedElement.value);
  // clickedElement.on('change', function(){
  //   var files = $(this).get(0).files;
  //   console.log(files);
  // });
  var i = event.srcElement.files[0].File;
  // console.log(event.srcElement.files[0]);
  var img = new Image();
  console.log(i);
  img.src = 'data:image/jpeg;base64,'+ i.buffer.toString('base64');
  // console.log("IMAGE received from server", img);
  // $('#box3').html('<img src="data:image/png;base64,' + i.buffer.toString('base64') + '" />')
  $('#box3').html('img')
}
var w = 1;
var t=1;

socket.on('connect', function(){
  console.log(socket.id);


  var delivery = new Delivery(socket);

  delivery.on('delivery.connect', function(delivery){

    $('#fileDialog').on('click', function(param){
      console.log('\n\n\nPARAMS', param);
      $('#fileDialog').change(function(evt) {
        // console.log(evt.currentTarget.accept);
        console.log(evt);
        var boxid = evt.currentTarget;

        console.log('\n\n\n\n Current Target:', boxid);
        var files = evt.currentTarget.files;
        var length = files.length;
        console.log('\n\n\n\nLENGTHHH', length);

        for(i = 0; i <=length-2/2; i++){
          console.log('\n\n\n\n\nADD ROWS');
          $('#add-row').click();
        }

        for(i = 0; i <= length; i++){
          var file = evt.currentTarget.files[0].name;

          var extension = file.substring(file.lastIndexOf('.'));
          console.log(extension);
          acceptable = evt.currentTarget.accept.split(',')
          var acc = false;
          acceptable.forEach((ex)=>{
            console.log('ext: ',ex);
            if(ex === extension) acc = true;
          });
          if(!acc)return alert('File must be an image (".png", ".jpg")');
          console.log('THIS.VAL(): ', $(this).val());

          var extraParams = {sender: socket.id};
          delivery.send(evt.currentTarget.files[0], extraParams);
          console.log('FILEEEEE', evt.currentTarget.files[0]);

          //find the source of the click (which box?)
            //add th image in that box
            console.log(file);

            socket.on('image', function(info){
              var ctx =$('#box2')[0].firstElementChild;
              console.log('socket on image', ctx);
              // ctx = ctx.getContext('2d');
              console.log(info);
              if(info.image){
                var img = new Image();
                img.src = 'data:image/jpeg;base64,'+ info.buffer;
                // console.log("IMAGE received from server", img);
                $('#box3').html('<img src="data:image/png;base64,' + info.buffer + '" />')
                // callback('<img src="data:image/png;base64,' + info.buffer + '" />');
                $('#box'+t).html('<img src="data:image/png;base64,' + info.buffer + '" />');
                t+=1;
              }
            });
        }
      });
    });

    // $('#fileDialog').on('click', function(param){
    //   console.log('\n\n\nPARAMS', param);
    //   $('#fileDialog').change(function(evt) {
    //     // console.log(evt.currentTarget.accept);
    //     console.log(evt);
    //     var boxid = evt.currentTarget;
    //
    //     console.log('\n\n\n\n Current Target:', boxid);
    //     var file = evt.currentTarget.files[0].name;
    //
    //     var extension = file.substring(file.lastIndexOf('.'));
    //     console.log(extension);
    //     acceptable = evt.currentTarget.accept.split(',')
    //     var acc = false;
    //     acceptable.forEach((ex)=>{
    //       console.log('ext: ',ex);
    //       if(ex === extension) acc = true;
    //     });
    //     if(!acc)return alert('File must be an image (".png", ".jpg")');
    //     console.log($(this).val());
    //
    //     var extraParams = {sender: socket.id};
    //     delivery.send(evt.currentTarget.files[0], extraParams);
    //     console.log(evt.currentTarget.files[0]);
    //     // $('#box2-image').attr("src", evt.currentTarget.files[0].name);
    //
    //     //find the source of the click (which box?)
    //       //add th image in that box
    //       console.log(file);
    //       // var path = "../" + file.toString();
    //       // var path = "../photo2.jpg"
    //       // console.log(path);
    //       socket.on('image', function(info){
    //         var ctx =$('#box2')[0].firstElementChild;
    //         console.log(ctx);
    //         // ctx = ctx.getContext('2d');
    //         console.log(info);
    //         if(info.image){
    //           var img = new Image();
    //           img.src = 'data:image/jpeg;base64,'+info.buffer;
    //           // console.log("IMAGE received from server", img);
    //           $('#box2').html('<img src="data:image/png;base64,' + info.buffer + '" />')
    //
    //         }
    //       });
    //   });
    // });

    delivery.on('send.success', function(fileUID){
      // console.log(fileUID);
      console.log('File was successfully sent!');
      // var path = "/../" + fileUID.name;
      // $('#box2-image').attr("src", fileUID.name);
    });
    // delivery.on('receive.start', function(fileUID){
    //   console.log(`Client recieving a file ${fileUID.name}`);
    // });
    //
    // delivery.on('receive.success', function(file){
    //   var params = file.params;
    //   if(file.isImage()){
    //     $('#box2-image').attr("src", file.dataURL());
    //   }
    // });
  });

// socket.on('image', function(info){
//   var ctx =$('#box2')[0].firstElementChild;
//   console.log(ctx);
//   // ctx = ctx.getContext('2d');
//   console.log(info);
//   if(info.image){
//     var img = new Image();
//     img.src = 'data:image/jpeg;base64,'+info.buffer;
//     console.log("IMAGE received from server", img);
//     $('#box2').html('<img src="data:image/png;base64,' + info.buffer + '" />')
//
//   }
// });

  $('#add-row').on('click', function(i){
    w+=1;
    console.log('ADD a new Row!!', w);
    var n = document.getElementById('au'); //returns a HTML DOM Object
    // console.log(n);
    var dupNode = n.cloneNode(true);
    console.log(dupNode);
    console.log(dupNode.children[0].children);
    var b1 = dupNode.children[0].children[0];
    var b2 = dupNode.children[0].children[2];
    b1.id = "box"+ w;
    console.log(b1);
    // dupNode.attr("box1","box"+w);
    var doc = document.getElementById("page-container");
    doc.appendChild(dupNode);

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
