$(function (){



    
    var email = $(".main #form .form-group #email");
    var email_error = email.siblings("#error_email");

    var password = $(".main #form .form-group #pass");
    var password_error = password.siblings("#error_pass");

    let  post =  $(".main #form  #post");

    $(post).click(function (e) { 

        e.preventDefault();

        email.removeClass("is-invalid");
        email.addClass("is-valid");
        password.removeClass("is-invalid");
        password.addClass("is-valid");

        let email_ = email.val();
        let password_ = password.val();

        fireAuth.signInWithEmailAndPassword(email_, password_)
            .then(function (response) {
        
                console.log(response);

                console.log("log in");

                $(email).val("");
                $(password).val("");

                email.removeClass("is-invalid");
                email.addClass("is-valid");
                password.removeClass("is-invalid");
                password.addClass("is-valid");

                //import { user_id } from './fire_base_auto.js'
                window.user_id = response.user.uid;
                localStorage.setItem("user_id",response.user.uid)
                //console.log(user_id);

                location.href="../public/main.html";
                console.log("erre");
                

            })
            .catch(function (error) {

                console.log(error.message);
                console.log(error);

                if(error.code == "auth/invalid-email"){

                    email.addClass("is-invalid");
                    email.removeClass("is-valid");
                    $(email_error).text(error.message);

                }else if(error.code == "auth/wrong-password"){

                    password.addClass("is-invalid");
                    password.removeClass("is-valid");
                    $(password_error).text(error.message);
                }else{
                    email.addClass("is-invalid");
                    email.removeClass("is-valid");
                    $(email_error).text(error.message);
                }

            });
        
    });


})