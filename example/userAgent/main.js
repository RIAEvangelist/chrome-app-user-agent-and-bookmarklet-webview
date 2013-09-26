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

function webviewStarted(e){
    var manifest=chrome.runtime.getManifest();
    runWebviewJS(
        app.webview,
        'js/customUserAgent.js',
        true,
        true,
        true,
        manifest
    );
}

app.onload=function(e){
    app.webview=app.window.document.querySelector('webview');
    
    app.window.addEventListener(
        'loadstart',
        webviewStarted
    );
    
}

function runWebviewJS(el,code,runASAP,requiresGlobal,isFile,data){
    if(runASAP)
        runASAP='document_start';
    if(!runASAP)
        runASAP='document_idle';
        
    if(!isFile && requiresGlobal){
        el.executeScript(
            { 
                code: '(' + insertScriptTag + '(' + code + '))' 
            }
        );
        return;
    }
    
    if(!isFile){
        el.executeScript(
            { 
                code    : '(' + code + ')()',
                runAt   : runASAP
            }
        );
        return;
    }
    
    if(!data && !requiresGlobal){
        el.executeScript(
            { 
                file    : code,
                runAt   : runASAP
            }
        );
        return;
    }
    
    if(!data)
        data={};
    
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
        //console.log(script);
        if(!requiresGlobal){
            el.executeScript(
                { 
                    code    : script,
                    runAt   : runASAP
                }
            );
            return;
        }
        el.executeScript(
            { 
                code    : '(' + insertScriptTag + '(' + script + '))',
                runAt   : runASAP
            }
        );
    };
    
    xhr.send();
}

function insertScriptTag(code) {
    var script = document.createElement('script');
    script.innerText = '(' + code + ')()';
    window.userAgentSetter=setInterval(
        (
            function(script){
                return function(){
                    if(!document.head)
                        return;   
                    clearInterval(userAgentSetter);
                    document.head.appendChild(script);
                }
            }
        )(script),1  
    );
};