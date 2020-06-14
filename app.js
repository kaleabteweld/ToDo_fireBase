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
  $(todo).append(templet);


  var edit = $(".main .fouces .view .todo .back #edit");
  var del = $(".main .fouces .view .todo .back #remove");

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
      var contener = $("<div class=\"edi\"></div>");

      $(contener).append(save);
      $(contener).append(cancel);
      $(contener).css("display","flex");
      $(this).css("display","none");
      var Temp = $(this);
      //$(this).parent()
      $(contener).insertBefore(del);
      //$(this).replaceWith(contener);
      

      save = $(contener).find("#save");
      cancel = $(contener).find("#cancel")

      $(save).click(function (e) { 
        e.preventDefault();
        console.log("updata: "+doc_id);

        fireDB.collection("ToDo").doc(doc_id)
        .update({

          ToDo:$(input).val()
        })
        
        let p = $(`<p id=\"TODO\">${val}</p>`);
        $(input).replaceWith(p);

        //let edit = $("<img id=\"edit\" src=\"https://img.icons8.com/fluent/50/000000/edit.png\"/>");
        $(contener).css("display","none");
        console.log($(this));
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
    
    fireDB.collection("ToDo").doc(doc_id).delete();

    
  });

}
function init_firebase(){

    console.log("start");
  
      fireDB.collection("ToDo").where("user","==",user_id).orderBy("time").onSnapshot(sanp =>{
  
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

            }
          
  
          })
  
  
      });
}

init_firebase();


$(function() {



  var add = $(".main .fouces .view #add_todo");
  $(add).click(function (e) { 
    e.preventDefault();


    
  });

})
  
