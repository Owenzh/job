//初始化页面   download_now.html、download.html、newindex.html、upload_now.html、web.html、client_index.html
function init(userBand,upspeedband) {
	var viewInfoGet = document.getElementById("viewInfoGet");
	var viewInfoOK = document.getElementById("viewInfoOK");
//	var viewInfoOK2 = document.getElementById("viewInfoOK2");
	var viewInfoError = document.getElementById("viewInfoError");
	viewInfoGet.style.display = "none";
	viewInfoOK.style.display = "none";
//	viewInfoOK2.style.display = "none";
	viewInfoError.style.display = "none";
	if (userBand == null || userBand == 0) {
		viewInfoError.style.display = "";
	} else {
		viewInfoOK.style.display = "";
//		viewInfoOK2.style.display = "";
		if(upspeedband>0){
			
		}else{
		}
	}
}
// 获取首页用户信息 client_index.html、newindex.html
function initView(userBand, areaName, provinceName,isOutMax,userno,upspeedband,usertype) {
	var viewInfoGet = document.getElementById("viewInfoGet");
	var viewInfoOK = document.getElementById("viewInfoOK");
//	var viewInfoOK2 = document.getElementById("viewInfoOK2");
	var viewInfoError = document.getElementById("viewInfoError");
	var vuserBand = document.getElementById("vuserBand");
	var vareaName = document.getElementById("vareaName");
	var vuserno = document.getElementById("userno");
	var vuserno1 = document.getElementById("userno1");
	var upspeed = document.getElementById("upspeed");
	var basic = document.getElementById("basic");
	var total = document.getElementById("total");
	viewInfoGet.style.display = "none";
	viewInfoError.style.display = "none";
	viewInfoOK.style.display = "none";
//	viewInfoOK2.style.display = "none";
	if (userBand == null || userBand == 0) {
		viewInfoError.style.display = "";
	} else {
		viewInfoOK.style.display = "";
		 if(usertype==2||usertype==5){
		    if (userBand >= 1024) {
			   vuserBand.innerHTML = "下行"+parseInt(userBand / 1024) + " M";
		    } else {
			   vuserBand.innerHTML = "下行"+userBand + " K";
		    }
			if (areaName == null||areaName=="null") {
				vareaName.innerHTML = provinceName;
			} else {
				vareaName.innerHTML = provinceName + " " + areaName;
			}
			if(userno == null||userno == "null"){
				vuserno.innerHTML = "";
			} else {
				if(userno.length>6){
					   for(var i=0;i<userno.length-5;i++){
					     reCat = reCat +"*"
					   }
					   vuserno.innerHTML = userno.substr(0, 2)+reCat+userno.substr(userno.length-3, 3);
					}else if(userno.length>2&&userno.length<7){
						for(var i=0;i<userno.length-2;i++){
						     reCat = reCat +"*"
						}
						vuserno.innerHTML = userno.charAt(0)+reCat+userno.charAt(userno.length - 1);
					}else if(userno.length==2){
						vuserno.innerHTML = userno.charAt(0)+"*";
					}else if(userno.length==1){
						vuserno.innerHTML = "*";
					}else{
						vuserno.innerHTML = "";
					}
			}
	}else{
		if(userno == null||userno == "null"){
			vuserno.innerHTML = "";
		} else {
			if(userno.length>6){
				   for(var i=0;i<userno.length-5;i++){
				     reCat = reCat +"*"
				   }
				   vuserno1.innerHTML = userno.substr(0, 2)+reCat+userno.substr(userno.length-3, 3);
				}else if(userno.length>2&&userno.length<7){
					for(var i=0;i<userno.length-2;i++){
					     reCat = reCat +"*"
					}
					vuserno1.innerHTML = userno.charAt(0)+reCat+userno.charAt(userno.length - 1);
				}else if(userno.length==2){
					vuserno1.innerHTML = userno.charAt(0)+"*";
				}else if(userno.length==1){
					vuserno1.innerHTML = "*";
				}else{
					vuserno1.innerHTML = "";
				}
		}
	  if(upspeedband>0){
			
//			viewInfoOK2.style.display = "";
			if(upspeedband>=1024){
			   upspeed.innerHTML= " "+parseInt(upspeedband / 1024) + " M）";
			}else{
			   upspeed.innerHTML= " "+upspeedband+" K）"
			}
			if((userBand-upspeedband)>=1024){
				basic.innerHTML =  parseInt((userBand-upspeedband) / 1024) + " M";
			}else{
				basic.innerHTML =  (userBand-upspeedband)  + " K";
			}
			if(userBand>=1024){
				total.innerHTML =  parseInt(userBand / 1024) + " M（";
			}else{
				total.innerHTML =  userBand  + " K（";
			}
			
		}else{
			document.getElementById("upspeedband").style.display = "none"
			document.getElementById("basicband").style.display = "none"
			if (userBand >= 1024) {
				total.innerHTML =  parseInt(userBand / 1024) + " M";
		    } else {
				total.innerHTML =  userBand  + " K";
		    }
		}
	}
		
		
		
//		vuserBand.innerHTML = "下行100M";
//		vareaName.innerHTML = "四川" + " " + "攀枝花市市辖区";
//		vuserno.innerHTML ="AAAAAAAAAAAAAAAAAAAAAAAaaaaaaa";
	}
	if(isOutMax==1){
		isUse = -1;
		showSubmitDialog();
		showprogressbar();
	}else if(local==0){
		isUse = -1;
		showSubmitDialog2();
		showprogressbar();
	}
}

// 保存网站测试结果 web.html、client_web.html
function saveTestHttpResult(url, websitename, isuser_input, type, dnstime,
		urltime, tcptime, http_status, timespace) {
	var addValueUrl = url + "?method=saveTestHttpResult&rand=" + Math.random();
	var params = {
		websitename : websitename,
		isuser_input : isuser_input,
		type : type,
		dnstime : dnstime,
		urltime : urltime,
		tcptime : tcptime,
		http_status : http_status,
		timespace : timespace * 1000
	};
	jQuery.getJSON(addValueUrl, params, function(data) {
		if (data.succ == false) {

		}
	});
}

//判断session是否为空,1不为空，0为空  网页版
function getSessionStutsForWeb(){
	var status = 1;
	jQuery.ajax({
		type: "POST",
		async: false,  // 同步
		url: "index.shtml",
		data:{method:"getSessionStatus"},
		timeout:5000,
		error: function(){
         	status = 1;
     	},
		success: function(data){
			status =  data;
		}
	});
	return status;
}

// 判断session是否为空,1不为空，0为空  客户端版
function getSessionStuts() {
	var status = 1;
	jQuery.ajax({
		type : "POST",
		async : false, // 同步
		url : "index.shtml",
		data : {
			method : "getSessionStatus"
		},
		timeout : 5000,
		error : function() {
			status = 1;
		},
		success : function(data) {
			status = data;
		}
	});
	return status;
}

// 用于显示客户端插件信息 client_download.html、client_web.html
function showQoeinfo(cpuusage, memoryusage) {
	if (cpuusage == "") {
		cpuusage = 0;
	}
	// 显示报告信息
	if (cpuusage < 80) {
		document.getElementById("getCpuUsage").style.color = "#4f6b72";
		document.getElementById("getCpuUsage").innerText = cpuusage + "%"
				+ "  正常";
		document.getElementById("cpuusagetext").innerHTML = "";
	} else {
		document.getElementById("getCpuUsage").style.color = "red";
		document.getElementById("getCpuUsage").innerText = cpuusage + "%"
				+ "  偏高";
		document.getElementById("cpuusagetext").innerHTML = "建议您关闭部分程序重新测试";
	}
	if (memoryusage < 80) {
		document.getElementById("strMemUseage").style.color = "#4f6b72";
		document.getElementById("strMemUseage").innerText = memoryusage + "%"
				+ "  正常";
		document.getElementById("memusagetext").innerHTML = "";
	} else {
		document.getElementById("strMemUseage").style.color = "red";
		document.getElementById("strMemUseage").innerText = memoryusage + "%"
				+ "  偏高";
		document.getElementById("memusagetext").innerHTML = "建议您关闭部分程序重新测试";
	}
}

var cpuusage = 0;
function getCpuUsage() { // 获取CPU利用率 显示客户端信息 client_download.html、client_web.html
	qoeinfo.GetCpuUsage();
	cpuusage = qoeinfo.strCpuUsage;
}
var memoryusage = 0;
function getMemoryUsage() { // 获取内存利用率  显示客户端信息 client_download.html、client_web.html
	qoeinfo.GetMemUsage();
	memoryusage = qoeinfo.strMemUsage;
}

function isRightURL(testpointvalue){  // 判断网址格式  client_web.html、web.html
	var ip=testpointvalue;
	if(testpointvalue.indexOf("http://")!=-1){
		testpointvalue=testpointvalue.substr(7,testpointvalue.length-1);
	}
	if(!isUnconformityIPAddress(testpointvalue)){// 代表不是
		if(ip.indexOf("http://")==-1&&testpointvalue.indexOf("www")==-1){
			return false;
		}
		if(/^[a-zA-Z0-9]+([a-zA-Z0-9\-\.]+)?\.(aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly| ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk| pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr| st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zr|zw|AERO|BIZ|COM|COOP|EDU|GOV|INFO|INT|MIL|MUSEUM|NAME|NET|ORG|AC)$/g.test(testpointvalue)){
		    return true;
		}else{
		    return false;
		}
	}else{
		return true;
	}
}

function isUnconformityIPAddress(ip){  // 判断是否是ip地址
    if(ip.match("\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}")){
    	var sip=ip.split(".");
    	if(sip[0]<255&&sip[0]>0){  
                if(sip[1]<255&&sip[1]>0){
                    if(sip[2]<255&&sip[2]>0){
                        if(sip[3]<255&&sip[3]>0){
                            return true;  
                          }
                      }
                 }
          }
    }
    return false;
}

//显示防蹭网 客户端
function showDialog_FCW(){
	document.getElementById("FCW").style.display = "";
	document.getElementById("cover").style.display = "";
	document.getElementById("showStatus").style.display="none";
	document.getElementById("showStatus").style.display="";
	setTimeout("showFCW()",1000);
}

function showFCW(){
	qoeinfo.GetNumComputer();
	document.getElementById("showStatus").style.display="none";
	var fcw=qoeinfo.strNumComputer;
	var fcwnumber=fcw.split("\n");
	document.getElementById("FCWnumber").innerHTML=fcwnumber[0];
	for(var i=1;i<fcwnumber.length-1;i++){
		var str = "";
		var list=fcwnumber[i].split("|");
		if(i==1){
		   	str+="<tr>";
		   	str+="<td width='40' align='right'><img src='images/computer_monitor.gif' /></td>";
		   	str+="<td align='left' width='55'>我的电脑</td>";
		   	str+="<td width='25'></td>";
		   	str+="<td align='left' width='190'>设备名称："+list[0]+"<br />网卡地址："+list[2]+"</td>";
		   	str+="<td width='40' align='left' valign='top'><img src='images/icon16.gif' width='12' style='margin-top:3px;' /></td>";
		   	str+="<td width='90' align='left'>"+list[1]+"</td>";
		   	str+="<td width='30'></td>";
		   	str+="<td align='left' style='padding-left:17px;'>本机</td>";
		   	str+="</tr>"
		   	$("#fcwtablelist").append(str);
		    $("#fcwtablelist")[0].scrollIntoView(true);
	    }else{
	    	str+="<tr>";
		   	str+="<td align='right'><img src='images/computer_monitor-.gif' /></td>";
		   	str+="<td align='left'>未知设备</td>";
		   	str+="<td></td>";
		   	str+="<td align='left'>设备名称："+list[0]+"<br />网卡地址："+list[2]+"</td>";
		   	str+="<td align='left' valign='top'><img src='images/icon16.gif' width='12' style='margin-top:3px;' /></td>";
		   	str+="<td align='left'>"+list[1]+"</td>";
		   	str+="<td align='right'><img src='images/icon17.gif' width='12' /></td>";
		   	str+="<td align='left' style='padding-left:17px;'>未知</td>";
		   	str+="</tr>"
		   	$("#fcwtablelist").append(str);
		    $("#fcwtablelist")[0].scrollIntoView(true);
	    }
	}
}

// 关闭防蹭网
function closeFCW(){
	document.getElementById("FCW").style.display = "none";
	document.getElementById("cover").style.display = "none";
	var testTable = document.getElementById("fcwtablelist");
		    var t = 0;
	    	while(testTable.hasChildNodes()){
		    	if(t==0){
		    		t++;
		    		continue;
			    }
		    	testTable.removeChild(testTable.lastChild);
			    t++;
			    if(t==testTable.rows.length-1){
			    	break;
				 }
	}
}
function resetFCW(){
	document.getElementById("FCW").style.display = "none";
	document.getElementById("cover").style.display = "none";
	var testTable = document.getElementById("fcwtablelist");
		    var t = 0;
	    	while(testTable.hasChildNodes()){
		    	if(t==0){
		    		t++;
		    		continue;
			    }
		    	testTable.removeChild(testTable.lastChild);
			    t++;
			    if(t==testTable.rows.length-1){
			    	break;
				 }
	}
	showDialog_FCW()
}

function getProxyServerinfo(){// 检查代理服务器是否存在  客户端
	document.getElementById("proxyserver").innerText = "正在检测信息......";
	qoeinfo.GetProxyServer();
	var proxyserver = qoeinfo.strProxyServer;
	document.getElementById("proxyserver").innerText = proxyserver == "" ? "无代理设置" : "有代理设置";
	document.getElementById("proxyservertext").innerHTML=proxyserver==""?"":"建议您关闭后重新测试";
}

//清空测试结果表格  client_web.html、web.html
function clearResultTable(){
	var testTable = document.getElementById("tsresultid");
    var t = 0;
	while(testTable.hasChildNodes()){
    	if(t==0){
    		t++;
    		continue;
	    }
    	testTable.removeChild(testTable.lastChild);
	    t++;
	    if(t==testTable.rows.length-1){
	    	break;
		}
	}
}

//显示对话框 titile:标题 content：对话框内容
//confirmMethod:点确认需要调用的方法名 cannelMethod：点取消需要调用的方法名
//最正宗的提示框方法，后期优化统一使用，客户端与网页版图片路径不一致问题需注意
/*function showDialog(titile,content,confirmMethod){
	var bgObj=document.createElement("div");
	bgObj.setAttribute('id','cover');
	document.body.appendChild(bgObj);
	bgObj.innerHTML = "<div class='tishikuang' id='tishiDialog' >"+
	  "<div class='header'>"+
	      "<p>"+titile+"</p>"+
	      "<div class='header_button'>"+
	        "<a href='#' class='button_cc' title='关闭'><img src='../images/btn_close.gif' onmouseover=\"this.src='../images/btn_closeon.gif'\" onmouseout=\"this.src='../images/btn_close.gif'\" /></a>"+
	        // "<a href='#' title='最小化'><img
			// src='../images/btn_minimization.gif'
			// onmouseover=\"this.src='../images/btn_minimization_on.gif'\"
			// onmouseout=\"this.src='../images/btn_minimization.gif'\" /></a>"+
	      "</div>"+
	  "</div>"+
	  "<div class='clear'></div>"+
	  "<div class='con'>"+
	    "<img src='../images/icon14.gif'/>"+
	    "<p>"+content+"</p>"+
	  "</div>"+
	  "<div class='clear'></div>"+
	  "<div class='footer'>"+
	    "<input type='button' class='button_aa' value='确定' onclick='confirmDialog("+confirmMethod+");' onmouseover=\"this.className='button_aahover'\" onmouseout=\"this.className='button_aa'\" />"+
	    "<img src='../images/blank.gif' width='30' height='3' />"+
	    "<input type='button' class='button_aa' value='取消' onclick='cannelDialog();' onmouseover=\"this.className='button_aahover'\" onmouseout=\"this.className='button_aa'\" />"+
	  "</div>"+
	"</div>"; 
}
// 对话框点击确定调用
function confirmDialog(confirmMethod){
	document.body.removeChild(document.getElementById("cover"));
	confirmMethod(1);
}

// 对话框点击取消和关闭调用
function cannelDialog(){
	document.body.removeChild(document.getElementById("cover"));
	// confirmMethod(0);
}
*/

