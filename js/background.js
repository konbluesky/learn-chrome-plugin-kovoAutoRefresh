var HANDLERS={
	KVOV_REFRESH_SUCCESS:"kvov-refresh-success",
	KVOV_REFRESH_FAIL:"kvov-refresh-fail",
	KVOV_REFRESH:"kvov-refresh",
	KVOV_ONESUBMIT:"kvov-onesubmit"
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    //console.log("Request comes from content script " + sender.tab.url);
    //if (request.handlerid === HANDLER.KVOV_REFRESH_SUCCESS){
        //showWinMsg("MessageBox",request.msg)
    //}else if(request.handlerid === HANDLER.KVOV_REFRESH_FAIL){
    showWinMsg("MessageBox",request.msg)
    //}
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id,{
        greeting: "hello to content script!"
    }, function(response) {
        console.log(response.farewell);
    });
});

function showWinMsg(title,msg) {
  var notification = window.webkitNotifications.createNotification(
    'icon.png',title,msg    
  );
  notification.show();
}

