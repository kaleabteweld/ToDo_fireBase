user_id = localStorage.getItem("user_id");

function render(doc){


  var temp = doc.data();
  var doc_id = doc['id'];

  var todo = $('.main .fouces .view');
  var templet = `               
  <div class="todo" data='${doc_id}'>
    <input type="checkbox" name="done" id="done">
    <p id="TODO">${temp['ToDo']}</p>
      <div class="back">
        <img id="edit"  src="https://img.icons8.com/fluent/50/000000/edit.png"/>
        <div id=\"edi\"  style=\"display: none;\">
          <img id=\"save\" src=\"https://img.icons8.com/nolan/50/save.png\"/>
          <img id=\"cancel\" src=\"https://img.icons8.com/nolan/64/cancel.png\"/>
        </div>
        <img id="remove" src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"/>
      </div>
  </div>`;

  templet = $(templet);

    // done_percentage
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

      fireDB.collection("user_interction").doc(user_id).collection("ToDo").doc(doc_id)
      .update({
  
        done_percentage:"100"
      })
  }
  else if($(this).is(":not(:checked)")){

    fireDB.collection("user_interction").doc(user_id).collection("ToDo").doc(doc_id)
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
      
      console.log($(this));
      console.log($(this).siblings("#edi"));
      var contener = $(this).siblings("#edi");

      $($(this).siblings("#edi")).css("display","flex");
      $(this).css("display","none");
      var Temp = $(this);
      

      save = $(contener).find("#save");
      cancel = $(contener).find("#cancel")

      $(save).click(function (e) { 
        e.preventDefault();
        console.log("updata: "+doc_id);

        fireDB.collection("user_interction").doc(user_id).collection("ToDo").doc(doc_id)
        .update({

          ToDo:$(input).val()
        })
        
        let p = $(`<p id=\"TODO\">${val}</p>`);
        $(input).replaceWith(p);

        $(Temp).css("display","flex");
        $(contener).css("display","none");

       // $(contener).replaceWith(Temp);

      });
      $(cancel).click(function (e) { 
        e.preventDefault();

        let p = $(`<p id=\"TODO\">${val}</p>`);
        $(input).replaceWith(p);

        //let edit = $("<img id=\"edit\" src=\"https://img.icons8.com/fluent/50/000000/edit.png\"/>");
        //$(contener).replaceWith(Temp);
        $(Temp).css("display","flex");
        $(contener).css("display","none");

      });


    }


    

  });

  $(del).click(function (e) { 

    e.preventDefault();
    console.log(doc_id);
    
    let id = $(this).parent().parent().attr("data");
    fireDB.collection("user_interction").doc(user_id).collection("ToDo").doc(id).delete();

    
  });


}


function init_firebase(){

    console.log("start");
  
      fireDB.collection("user_interction").doc(user_id).collection("ToDo").orderBy("time").onSnapshot(sanp =>{
  
        let Changes = sanp.docChanges();
        Changes.forEach(chage=>{
  
            console.log(chage.doc.data());
            console.log(chage.type);
            console.log(chage.doc.id);
            
            $(".main .fouces .view .loader-wrapper").fadeOut("slow");
            if(chage.type == "added"){
              
                render(chage.doc);

            }else if(chage.type == "removed"){

              //
              $(`.main .fouces .view > .todo[data='${chage.doc.id}']`).fadeOut(500,function (){

                  $(`.main .fouces .view > .todo[data='${chage.doc.id}']`).remove();
              });
              

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

      
      fireDB.collection("user_interction").doc(user_id).collection("ToDo").add(
        {
          ToDo:data,
          time:temp,
          done_percentage:"0",
        }).then(function (response) {
              
              $(".main .fouces .view #new").animate({
                top: "+=75vh"
              }, 600);

            })
            .catch(function (error) {
                console.log(error);
            });

            $(".main .fouces .view #new #us_text").val(" ")
      
    });

    var log_out = $(".main .top .user .dropleft .dropdown-menu #log_out");
    $(log_out).click(function (e) { 
      e.preventDefault();
      fireAuth.signOut()
          .then(function () {
              // Sign-out successful.
              console.log("Sign-out successful.");
              localStorage.setItem("user_id"," ");

              window.location.replace("index.html");

              
              // console.log("erre");

          }).catch(function (error) {
              // An error happened.
          });
    });


})