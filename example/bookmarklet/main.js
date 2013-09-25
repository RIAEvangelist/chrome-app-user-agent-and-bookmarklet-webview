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

function runWebviewJS(el,code,isFile,data){
    if(!isFile){
        el.executeScript(
            {
                code:code,
                allFrames:true
            }    
        );
        return;
    }
    
    if(!data){
        el.executeScript(
            {
                file:code,
                allFrames:true
            }    
        );
        return;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', code, true);
    xhr.onload = function(e) {
        var script=this.response;
        for(var i in data){
            var vars=new RegExp('\\$\\{'+i+'\\}','g');
            script=script.replace(
                vars,
                data[i]
            )
        }
        el.executeScript(
            {
                code:script,
                allFrames:true
            }    
        );
        console.log(script)
    };
    
    xhr.send();
}

function webviewReady(e){
    var manifest=chrome.runtime.getManifest();
    runWebviewJS(
           app.webview,
           'modifyUserAgent.js',
           true,
           {
               'manifest.version'   : manifest.version,
               'manifest.name'      : manifest.name
           }
    );
}

app.onload=function(e){
    app.webview=app.window.document.querySelector('webview');
    
    app.window.addEventListener(
        'loadstop',
        webviewReady
    );
}