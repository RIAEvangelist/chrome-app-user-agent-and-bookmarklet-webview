function runWebviewJS(el,code,requiresGlobal,isFile,data){
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
                code: '(' + code + ')()' 
            }
        );
        return;
    }
    
    if(!data && !requiresGlobal){
        el.executeScript(
            { 
                file:code 
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
                    code: script
                }
            );
            return;
        }
        el.executeScript(
            { 
                code: '(' + insertScriptTag + '(' + script + '))' 
            }
        );
    };
    
    xhr.send();
}

function insertScriptTag(code) {
    var script = document.createElement('script');
    script.innerText = '(' + code + ')()';
    document.head.appendChild(script);
};