$(document).ready(function(){
    (function(){
        var a_div = {
            a_xz_yh:"div_add_user"
        };
        $("#a_xz_yh").on("click",function(event){
            var div = a_div[event.target.id];
            $("#"+div).show();
            $(this).parent().addClass("active");
        });
    })();

    $("#btn_add_user").on("click",function(){
        var user = new User($);
        user.save();
    });
});
