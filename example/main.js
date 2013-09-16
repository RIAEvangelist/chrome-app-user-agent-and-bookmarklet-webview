var app={};
var screenWidth = screen.availWidth,
    screenHeight = screen.availHeight,
    width=Math.round(screenWidth/2),
    height=Math.round(screenHeight/2),
    minWidth=850,
    minHeight=700;
chrome.runtime.requestUpdateCheck(updateCheck);

function updateCheck(status){
    if(status=="no_update")
        return;
    chrome.runtime.reload();
}

chrome.app.runtime.onLaunched.addListener(
    function() {
        chrome.app.window.create(
            'index.html', 
            {
                id:'your-app-name',
                bounds: {
                    width: Math.round(width),   //Math round is required for linux and Mac 
                    height: Math.round(height), //Apps will crash if you use a float for width or position
                    left: Math.round((screenWidth-width)/2),
                    top: Math.round((screenHeight-height)/2)
                },
                minWidth:minWidth,
                minHeight:minHeight,
                maxWidth:screenWidth,
                maxHeight:screenHeight
            },
            appOpened
        );
    }
);
    
function appOpened(e){
    e.contentWindow.onload=app.onload;
    app.window=e.contentWindow;
}

function runBookmarklet(code){
    app.webview.src='javascript:'+code;
}

function webviewCommitted(e){
    var manifest=chrome.runtime.getManifest();
    runBookmarklet(
        "var defaultUserAgent=navigator.userAgent;navigator.__defineGetter__('userAgent',function(){return ('Chrome'+defaultUserAgent.split('Chrome')[1].split(' Safari')[0])});navigator.__defineGetter__('appVersion',function(){return '"+
        manifest.version+
        "';});navigator.__defineGetter__('appName',function(){return '"+
        manifest.name+
        "';});navigator.__defineGetter__('appCodeName',function(){return 'Google Chrome App';});"    
    );
}

app.onload=function(e){
    app.webview=app.window.document.querySelector('webview');
    
    app.window.addEventListener(
        'loadstart',
        webviewCommitted
    );
}