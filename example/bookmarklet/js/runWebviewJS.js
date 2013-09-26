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