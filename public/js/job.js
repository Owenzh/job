function changeBanner(event,target){
    var changeIcon = target || event.target;
    var selectId = changeIcon.id;
    var banner = document.getElementById("bannerImg");
    //object.style.backgroundImage="url(stars.gif)"
    switch(selectId){
        case "xx1":
            changeIcon.style.backgroundImage="url(../img/x2.png)";
            xx2.style.backgroundImage="url(../img/x1.png)";
            xx3.style.backgroundImage="url(../img/x1.png)";

            banner.src="img/banner/banner_1.jpg";
            break;
        case "xx2":
            changeIcon.style.backgroundImage="url(../img/x2.png)";
            xx1.style.backgroundImage="url(../img/x1.png)";
            xx3.style.backgroundImage="url(../img/x1.png)";

            banner.src="img/banner/banner_2.jpg";
            break;
        case "xx3":
            changeIcon.style.backgroundImage="url(../img/x2.png)";
            xx1.style.backgroundImage="url(../img/x1.png)";
            xx2.style.backgroundImage="url(../img/x1.png)";

            banner.src="img/banner/banner_3.jpg";
            break;
    }
}

function changeMenu(event){
    var menu = event.target;
    var m = menu.id;
    switch(m){
        case "rz_menu":
            menu.className = "amenu";
            ss_m.className = "bmenu";
            tj_m.className = "bmenu";
            lc_m.className = "bmenu";
            wh_m.className = "bmenu";
            dl_m.className = "bmenu";
            break;
        case "ss_menu":
            menu.className = "amenu";
            rz_m.className = "bmenu";
            tj_m.className = "bmenu";
            lc_m.className = "bmenu";
            wh_m.className = "bmenu";
            dl_m.className = "bmenu";
            break;
        case "tj_menu":
            menu.className = "amenu";
            rz_m.className = "bmenu";
            ss_m.className = "bmenu";
            lc_m.className = "bmenu";
            wh_m.className = "bmenu";
            dl_m.className = "bmenu";
            break;
        case "lc_menu":
            menu.className = "amenu";
            rz_m.className = "bmenu";
            ss_m.className = "bmenu";
            tj_m.className = "bmenu";
            wh_m.className = "bmenu";
            dl_m.className = "bmenu";
            break;
        case "wh_menu":
            menu.className = "amenu";
            rz_m.className = "bmenu";
            ss_m.className = "bmenu";
            tj_m.className = "bmenu";
            lc_m.className = "bmenu";
            dl_m.className = "bmenu";
            break;
        case "dl_menu":
            menu.className = "amenu";
            rz_m.className = "bmenu";
            ss_m.className = "bmenu";
            tj_m.className = "bmenu";
            lc_m.className = "bmenu";
            wh_m.className = "bmenu";
            break;
    }
}
function initPage(){
    //给xx注册事件
    xx1 = document.getElementById("xx1");
    xx2 = document.getElementById("xx2");
    xx3 = document.getElementById("xx3");

    xx1.addEventListener("mouseover",changeBanner,false);
    xx2.addEventListener("mouseover",changeBanner,false);
    xx3.addEventListener("mouseover",changeBanner,false);

    rz_m = document.getElementById("rz_menu");
    ss_m = document.getElementById("ss_menu");
    tj_m = document.getElementById("tj_menu");
    lc_m = document.getElementById("lc_menu");
    wh_m = document.getElementById("wh_menu");
    dl_m = document.getElementById("dl_menu");

    rz_m.addEventListener("click",changeMenu,false);
    ss_m.addEventListener("click",changeMenu,false);
    tj_m.addEventListener("click",changeMenu,false);
    lc_m.addEventListener("click",changeMenu,false);
    wh_m.addEventListener("click",changeMenu,false);
    dl_m.addEventListener("click",changeMenu,false);

}
var idx = 1;
window.setInterval(function(){
    var tgt = null;
    var _idx = idx%3;
    if(_idx==1){
        tgt=xx1;
    }else if(_idx ==2){
        tgt=xx2;
    }else{
        tgt=xx3;
    }
    changeBanner(null,tgt);
    idx++;
},2000);
window.onload = initPage;