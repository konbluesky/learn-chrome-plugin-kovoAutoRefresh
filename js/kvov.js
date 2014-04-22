$(function () {
	var HANDLERS={
		KVOV_REFRESH_SUCCESS:"kvov-refresh-success",
		KVOV_REFRESH_FAIL:"kvov-refresh-fail",
		KVOV_REFRESH:"kvov-refresh",
		KVOV_ONESUBMIT:"kvov-onesubmit"
	}
	//Register callback event
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.handlerid === HANDLERS.KVOV_REFRESH){
				kvov_refresh();
            }else if (request.handlerid === HANDLERS.KVOV_ONESUBMIT){
				kvov_onesubmit();
			}
    });

	function kvov_refresh(){
		var msg="";
		var btns=$("a[href^='javascript:cf3']");
		var btnsize=$("a[href^='javascript:cf3']").size();
		var rex=/javascript:cf3\(\'(.*)\'\)/;
		var id="";
		for(var index = 0 ;index<btns.length;index++){
			var href=btns[index].href;
			id= href.match(rex)[1];
			if(window.location.href.indexOf("http://login.kvov.com/")!=-1 && id){
				$.ajax({
					type : "get",
					url  : "http://login.kvov.com/cf.php?d="+id,
					async:false,
					success : function (data, textStatus) {
						msg+=","+id;
					}
				});
			}
		}
		var result={};
		if(msg&&msg.substring(1)){
			result={handlerid: "kvov-refresh-success",msg:"消息:"+msg.substring(1)+"重发成功!"};
			chrome.extension.sendMessage(result, function(response) {});
		}else{
			result={handlerid: "kvov-refresh-fail",msg:"没有可以重发的消息!"};
			chrome.extension.sendMessage(result, function(response) {});
		}
		location.reload();
	}
	function kvov_onesubmit(){
		var postUrl="http://www.kvov.com/fadrok.php";
		var data={
			t1:3604000,
			tx:"创业/代理/招商",
			c1:600,
			cx:"杭州",
			zt:"我能不告诉你这是汉字么我能不告诉你这是汉字么",
			nr:"我能不告诉你这是汉字么我能不告诉你这是汉字么我能不告诉你这是汉字么我能不告诉你这是汉字么我能不告诉你这是汉字么我能不告诉你这是汉字么我能不告诉你这是汉字么稍等我能不告诉你这是汉字么我能不告诉你这是汉字么我能不告诉你这是汉字么我能不告诉你这是汉字么",
			ms:"描述",
			sj:30
		};

		$.post(postUrl,data,function(data){
			console.log("data:"+data);
		});
	}
});