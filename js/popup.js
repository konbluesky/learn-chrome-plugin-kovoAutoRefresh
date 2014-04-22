$(document).ready(function(){
	var HANDLERS = chrome.extension.getBackgroundPage().HANDLERS;
    $('#kvovRefresh').bind("click",function(){
        chrome.tabs.getSelected(null, function(tab) {
            //console.debug(tab);
			// 扩展向内容脚本发送消息
			chrome.tabs.sendMessage(tab.id,{
				handlerid: HANDLERS.KVOV_REFRESH
			}, function(response) {});
        });
    });
	$('#kvovOnepost').bind("click",function(){
        chrome.tabs.getSelected(null, function(tab) {
            //console.debug(tab);
			// 扩展向内容脚本发送消息
			chrome.tabs.sendMessage(tab.id,{
				handlerid: HANDLERS.KVOV_ONESUBMIT
			}, function(response) {});
        });
    });
	
});
