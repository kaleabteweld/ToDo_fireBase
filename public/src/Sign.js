var ok = {

    name:false,
    us_name:false,
    email:false,
    phon:false,
    password:false,

};

var name_;
var us_name_;
var email_;
var phon_;
var password_;


function button_enable(){

    let  post =  $(".main #form_sig  #posts");

   

    var name = $(".main #form_sig .form-group #name");
    var us_name = $(".main #form_sig .form-group #us_name");
    var email = $(".main #form_sig .form-group #emaill");
    var phon = $(".main #form_sig .form-group #phon");
    var password = $(".main #form_sig .form-group #passs");

    if(ok.name && ok.us_name && ok.email && ok.phon && ok.password){

        post.removeAttr("disabled");



    }else{
        post.attr("disabled", "disabled");
    } 

}





$(function (){




    var name = $(".main #form_sig .form-group #name");
    var us_name = $(".main #form_sig .form-group #us_name");
    var email = $(".main #form_sig .form-group #emaill");
    var phon = $(".main #form_sig .form-group #phon");
    var password = $(".main #form_sig .form-group #passs");
    
    var post =  $(".main #form_sig #posts");
            

    post.attr("disabled", "disabled");

    $(post).click(function (e) { 

        e.preventDefault();

        fireAuth.createUserWithEmailAndPassword(email_, password_)
        .then(function (response) {
            console.log(response.user);

            var id = response.user.uid;
            fireDB.collection("user").doc(response.user.uid).set({
                    name:name_,
                    us_name:us_name_,
                    email:email_,
                    phon:phon_,

                }).then(function (response) {
                      
                    // done
                    
                    localStorage.setItem("user_id",id);

                    window.location.replace("Main.html");
                    console.log("erre");
        
                }).catch(function (error) {
                    console.log(error);
                    if(error.code == "auth/invalid-email"){

                        email.addClass("is-invalid");
                        email.removeClass("is-valid");
                        $(email.siblings("#error_email")).text(error.message);
    
                    }
                });
                
        })
        .catch(function (error) {
            console.log(error);
        });


    });

    
    
    name.keyup(function (e) { 
        
        name_ = name.val();
        
        if( (name_.length == 0) ){
            ok.name = false;
            button_enable();
            name.removeClass("is-valid");
            name.addClass("is-invalid");
        }else{
            

            ok.name = true;
            button_enable();
            name.removeClass("is-invalid");
            name.addClass("is-valid");

        }

        
    });

    us_name.keyup(function (e) { 
        
        us_name_ = us_name.val();
        
        if( (us_name_.length == 0) ){

            ok.us_name = false;
            button_enable();
            us_name.addClass("is-invalid");
            
        }else{
             ok.us_name = true;
            button_enable();
            us_name.removeClass("is-invalid");
            us_name.addClass("is-valid");

        }

        
    });

    email.keyup(function (e) { 
        
        email_ = email.val();


        if( (email_.length == 0) || ( !(email_.includes("@"))  || !(email_.includes(".")) )  ){
            ok.email = false;
            button_enable();
            email.addClass("is-invalid");
        }else{
    
            ok.email = true;
            button_enable();
            email.removeClass("is-invalid");
            email.addClass("is-valid");

        }

        
    });

    phon.keyup(function (e) { 
        
        phon_ = phon.val();

        
        if( (phon_.length == 0) || ( phon_.startsWith("251") ? phon_.length == 12 ?  false : true  :  phon_.length == 10 ? false : true) ){


            ok.phon = false;
            button_enable();
            phon.addClass("is-invalid");
        }else{
            
            if(phon_.startsWith("251")){
                phon_ = "+"+phon_;
            }
            else{
                phon_ = phon_.slice(1,phon_.length);
                phon_ = "+251"+phon_;
            }

            ok.phon = true;
            button_enable();
            phon.removeClass("is-invalid");
            phon.addClass("is-valid");

        }

        
    });

    password.keyup(function (e) { 
        
        password_ = password.val();
        if(password_.length == 0 || password_.length < 8){
            ok.password = false;
            button_enable();
            password.addClass("is-invalid");
        }else{
            
            ok.password = true;
            button_enable();
            password.removeClass("is-invalid");
            password.addClass("is-valid");
        }

        
    });



})