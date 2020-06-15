  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAiDXTCgKAZeQpMQbCLf4CJMcR38MY4zgA",
    authDomain: "todo-ade05.firebaseapp.com",
    databaseURL: "https://todo-ade05.firebaseio.com",
    projectId: "todo-ade05",
    storageBucket: "todo-ade05.appspot.com",
    messagingSenderId: "806706913781",
    appId: "1:806706913781:web:3983edae6a1adc884540bc",
    measurementId: "G-L7BH727Q14"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const fireDB = firebase.firestore();
  const user_id = "clVm04G0SVl8swX3jXaP";



function render(doc){


  let temp = doc.data();

  var doc_id = doc['id'];

  var todo = $('.main .fouces .view');
  

  var templet = `               
  <div class="todo" data='${doc_id}'>
    <input type="checkbox" name="done" id="done">
    <p id="TODO">${temp['ToDo']}</p>
      <div class="back">
        <img id="edit"  src="https://img.icons8.com/fluent/50/000000/edit.png"/>
        <img id="remove" src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"/>
      </div>
  </div>`;

  templet = $(templet);

  if(temp["done_percentage"] == "100"){

    $(templet).addClass("done");
    $(templet).find("#done").prop("checked", true);
  }

  $(todo).append(templet);


  var edit = $(".main .fouces .view .todo .back #edit");
  var del = $(".main .fouces .view .todo .back #remove");


 
  $('.main .fouces .view .todo > input[type="checkbox"]').click(function(){

    let doc_id = $(this).parent().attr("data");

    if($(this).is(":checked")){

      fireDB.collection("TODO").doc(doc_id)
      .update({
  
        done_percentage:"100"
      })
  }
  else if($(this).is(":not(:checked)")){

    fireDB.collection("TODO").doc(doc_id)
    .update({

      done_percentage:"0"
    })
  }


});

  $(edit).click(function (e) { 

    e.preventDefault();
  
    var data = $(this).parent().parent().find("#TODO");

    if(data.is("p")){

      var val =  $(this).parent().parent().find("#TODO").text();
      var input = $("<input class=\"To_input\" type=\"text\" name=\"TODO\" id=\"TODO\">");
  
      $(input).val(val);
      $(data).replaceWith(input);
      $(".main .fouces .view .todo .To_input").css("height","auto");
      input.css("height","100%");

      let save = $("<img id=\"save\" src=\"https://img.icons8.com/nolan/50/save.png\"/>");
      let cancel = $("<img id=\"cancel\" src=\"https://img.icons8.com/nolan/64/cancel.png\"/>");
      var contener = $("<div id=\"edi\"  style=\"display: none;\"></div>");

      $(contener).append(save);
      $(contener).append(cancel);

      if(!($(contener).length)){

          $(contener).insertBefore(del);
      }
    
      
      console.log($(this));
      console.log($(this).siblings("#edi"));

      $($(this).siblings("#edi")).css("display","flex");
      $(this).css("display","none");
      var Temp = $(this);
      

      save = $(contener).find("#save");
      cancel = $(contener).find("#cancel")

      $(save).click(function (e) { 
        e.preventDefault();
        console.log("updata: "+doc_id);

        fireDB.collection("TODO").doc(doc_id)
        .update({

          ToDo:$(input).val()
        })
        
        let p = $(`<p id=\"TODO\">${val}</p>`);
        $(input).replaceWith(p);

        //let edit = $("<img id=\"edit\" src=\"https://img.icons8.com/fluent/50/000000/edit.png\"/>");

        //$(contener).css("display","none");
       // $(this).parent().find(".edi").css("display","none");
        //console.log($(this));
        $(Temp).css("display","flex");

       // $(contener).replaceWith(Temp);

      });
      $(cancel).click(function (e) { 
        e.preventDefault();

        let p = $(`<p id=\"TODO\">${val}</p>`);
        $(input).replaceWith(p);

        //let edit = $("<img id=\"edit\" src=\"https://img.icons8.com/fluent/50/000000/edit.png\"/>");
        //$(contener).replaceWith(Temp);
        $(contener).css("display","none");
        $(Temp).css("display","flex");

      });


    }


    

  });

  $(del).click(function (e) { 

    e.preventDefault();
    console.log(doc_id);
    
    let id = $(this).parent().parent().attr("data");
    fireDB.collection("TODO").doc(id).delete();

    
  });

  

}
function init_firebase(){

    console.log("start");
  
      fireDB.collection("TODO").where("user","==",user_id).orderBy("time").onSnapshot(sanp =>{
  
        let Changes = sanp.docChanges();
        Changes.forEach(chage=>{
  
            console.log(chage.doc.data());
            console.log(chage.type);
            console.log(chage.doc.id);
            
            if(chage.type == "added"){
              
                render(chage.doc);

            }else if(chage.type == "removed"){

              $(`.main .fouces .view > .todo[data='${chage.doc.id}']`).remove();
              

            }else if(chage.type == "modified"){

              console.log("chage");
              console.log(chage.doc.data()["ToDo"]);
              console.log($(`.main .fouces .view > .todo[data='${chage.doc.id}'] >#TODO`));
              $(`.main .fouces .view > .todo[data='${chage.doc.id}'] >#TODO`).text(chage.doc.data()["ToDo"]);

              if (chage.doc.data()["done_percentage"] == "100") {
                $(`.main .fouces .view > .todo[data='${chage.doc.id}']`).addClass("done");
                $(`.main .fouces .view > .todo[data='${chage.doc.id}']`).find("#done").prop("checked", true);
              }else if(chage.doc.data()["done_percentage"] == "0"){
                $(`.main .fouces .view > .todo[data='${chage.doc.id}']`).removeClass("done");
                $(`.main .fouces .view > .todo[data='${chage.doc.id}']`).find("#done").prop("checked", false);
              }

            }
          
  
          })
  
  
      });
}

init_firebase();

$(function(){


    var save = $(".main .fouces .view #new .Nav #Save");

    $(save).click(function (e) { 
      e.preventDefault();

      let data = $(".main .fouces .view #new #us_text").val();
      let temp = new Date();

      fireDB.collection("TODO").add(
        {
          ToDo:data,
          time:temp,
          done_percentage:"0",
          user:user_id
        }).then(function (response) {
              
              $(".main .fouces .view #new").animate({
                top: "+=75vh"
              }, 600);

            })
            .catch(function (error) {
                console.log(error);
            });
      
    });



})

  
