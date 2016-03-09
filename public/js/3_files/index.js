function initGet() {
	pagelist();
}

function pagelist() {
	jQuery.ajax({
		type : "POST",
		async : true, // 异步
		url : window.url,
		data : {
			method : "pagelist"
		},
		timeout : 9000,
		error : function() {
			init(0);
			tband = 0;
			isUse = 1;
		},
		success : function(data) {
			var strval = data.split(",");
			if(strval[4]==0){
				local = 0;
			}
			initView(strval[0], strval[1], strval[2],strval[3],strval[5],strval[6],strval[7]);
			tband = 0;
			isUse = 1;
		}
	});
}

// 跳转到装移维登录界面
function gotoRI() {
	if (tband == 999) {
		alert("正在获取宽带信息，请稍后...");
	} else {
		window.location.href = "u.shtml";
	}
}

function showSubmitDialog() {
	showDialog_tsk(
			"中国电信宽带测速",
			"当前测速人数过多，请稍后再试！<div id='spaceused1'></div><br>估计剩余时间：<span id='lesttime'></span>秒",
			"", "","", 1, 0);
	$("#spaceused1").progressBar({
		increment : 1,
		speed : 30,
		showText : false,
		boxImage : '../../../images/progressbar.gif',
		barImage : '../../../images/progressbg_green.gif',
		width : '120',
		height : '12'
	});
	$('#spaceused1').progressBar(0);
}
function showSubmitDialog2() {
	showDialog_tsk(
			"中国电信宽带测速",
			"没有可分配的下载点使用，请稍后再试！<div id='spaceused1'></div><br>估计剩余时间：<span id='lesttime'></span>秒",
			"", "","", 1, 0);
	$("#spaceused1").progressBar({
		increment : 1,
		speed : 30,
		showText : false,
		boxImage : '../../../images/progressbar.gif',
		barImage : '../../../images/progressbg_green.gif',
		width : '120',
		height : '12'
	});
	$('#spaceused1').progressBar(0);
}

var djs = 0;
var to;
function showprogressbar() {
	djs++;
	to = setTimeout(showprogressbar, 1000);
	$('#spaceused1').progressBar(djs / 15 * 100);
	document.getElementById("lesttime").innerHTML = "<font color='red'>"
			+ (15 - djs) + "<font>";
	if (djs == 15) {
		// 结束计时
		djs = 0;
		clearTimeout(to);
		closetishikuang();
		location.reload();
	}
}

/*
 * 显示提示框 title:标题,content:内容,flag:标识是哪个提示框, n1:提示框第一个按钮名称,n2:提示框第二个按钮名称
 * isShowCloseButton:是否显示关闭按钮,1显示,0不显示 如果一个按钮那么可以n1传按钮名,n2传"". 如果没有按钮,n1,n2都传"".
 */
function showDialog_tsk(title, content, n1, n3,n2, flag, isShowCloseButton) {
	document.getElementById("do_sure_button").value = n1;
	document.getElementById("do_cancel_button").value = n2;
	document.getElementById("do_next_button").value = n3;
	document.getElementById("tsk_title").innerHTML = title;
	document.getElementById("tsk_content").innerHTML = content;
	document.getElementById("tsk_flg").value = flag;
	document.getElementById("tishikuang").style.display = "";
	document.getElementById("cover").style.display = "";
	if (flag == 1) {
		document.getElementById("do_sure_button").style.display = "none";
		document.getElementById("img_blank1").style.display = "none";
		document.getElementById("img_blank2").style.display = "none";
		document.getElementById("do_cancel_button").style.display = "none";
		document.getElementById("do_next_button").style.display = "none";
	} else if(flag == 2 || flag == 3 )  {
		document.getElementById("do_sure_button").style.display = "";
		document.getElementById("img_blank1").style.display = "";
		document.getElementById("img_blank2").style.display = "";
		document.getElementById("do_cancel_button").style.display = "";
		document.getElementById("do_next_button").style.display = "";
	}
	if (isShowCloseButton == 0) {
		document.getElementById("closeButton").style.display = "none";
	} else {
		document.getElementById("closeButton").style.display = "";
	}
	
}

function closetishikuang() {
	document.getElementById("tishikuang").style.display = "none";
	document.getElementById("cover").style.display = "none";
}

// 判断页面是否可以跳转
function changeToTest(type,verifyCode) {
	if (isUse == 1) {
		if (type == 1) {
			if (cue == "1") {
				gotoSpeedPage();
			} else {
				if (checkPlugin(verifyCode)) {
					gotoSpeedPage();
				}
			}
		} else if (type == 2) {
			window.location = "web.shtml";
		}
	} else {
		return false;
	}
}

function gotoSpeedPage() {
	window.location = "download.shtml";
}

function checkPlugin(verifyCode) {
	if (navigator.userAgent.indexOf("MSIE") <= 0) {
		return true;
	}
	try {
		if (document.all.qoeinfo.object == null) {
			notifyInstallPlugin();
			return false;
		} else {
			qoeinfo.strCpuName = verifyCode;
			qoeinfo.GetVersion();
			var Version = qoeinfo.strVersion; // 插件版本号
			if (Version >= 31) {
				return true;
			} else {
				genxinPlugin();
				return false;
			}
		}
	} catch (exception) {
		notifyInstallPlugin();
		return false;
	}
}

function notifyInstallPlugin() {
	showDialog_tsk("中国电信宽带测速", "为了获取更准确的测速结果，建议您先安装插件。",  "现在安装", "继续测速",
			"不再提示",2,0);
}
function genxinPlugin() {
	showDialog_tsk("中国电信宽带测速", "您的QoePlug插件版本过低，请重新安装。",  "现在安装", "继续测速",
			"不再提示",3,0);
}

function do_sure() {
	var flg = document.getElementById("tsk_flg").value;
	if (flg == 2) {
		document.getElementById("tishikuang").style.display = "none";
		document.getElementById("cover").style.display = "none";
		alert("插件下载安装完成后，请重新刷新页面。");
		location.href = "../plugin/QoePlug.exe";
	} else if (flg == 3) {
		document.getElementById("tishikuang").style.display = "none";
		document.getElementById("cover").style.display = "none";
		// alert("插件下载前，请先关闭所有浏览器。");
		location.href = "../plugin/QoePlug.exe";
	}
}

function do_cancel() {
	var flg = document.getElementById("tsk_flg").value;
	if (flg == 2) {
		document.getElementById("tishikuang").style.display = "none";
		document.getElementById("cover").style.display = "none";
		notishi();
		gotoSpeedPage();
	} else if (flg == 3) {
		document.getElementById("tishikuang").style.display = "none";
		document.getElementById("cover").style.display = "none";
		notishi();
		gotoSpeedPage();
	}
}

function do_next() {
	var flg = document.getElementById("tsk_flg").value;
	if (flg == 2) {
		document.getElementById("tishikuang").style.display = "none";
		document.getElementById("cover").style.display = "none";
		gotoSpeedPage();
	} else if (flg == 3) {
		document.getElementById("tishikuang").style.display = "none";
		document.getElementById("cover").style.display = "none";
		gotoSpeedPage();
	}
}

function notishi() {
	var tsurl = "index.shtml?method=Notishi";
	var params = {
		cue : 1
	};
	jQuery.getJSON(tsurl, params, function(data) {
		if (data.succ == false) {
		}
	});

}