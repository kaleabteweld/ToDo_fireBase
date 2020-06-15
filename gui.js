$(function(){


  var adder = $(".main .fouces .view #new");
  var add = $(".main .fouces .view #add_todo");
  var cancel = $(".main .fouces .view #new .Nav #cancel");


  $(add).click(function (e) { 


    $(adder).animate({
        top: "-=75vh"
      }, 600);
    
  });

  $(cancel).click(function (e) { 

    $(".main .fouces .view #new #us_text").val(" ");
    $(adder).animate({
        top: "+=75vh"
      }, 600);
    
  });




})