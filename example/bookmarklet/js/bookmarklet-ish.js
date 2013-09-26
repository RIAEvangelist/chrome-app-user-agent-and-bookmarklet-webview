window.addEventListener(
    'load',
    function(){
        document.querySelector('webview').addEventListener(
            'loadstart',
            webviewReady
        );
    }
);

function webviewReady(e){
    runWebviewJS(
        e.target,
        function(){
            document.querySelector('html').style.background='rgba(10,150,200,1)';
        }
    );
    
    example2(e.target,200,100,10);
}

function example2(el,r,g,b){
    runWebviewJS(
        el,
        'function(){console.log("Example 2","rgb('+[r,g,b]+')")}'
    );
    
    example3(el);
}

function example3(el){
    runWebviewJS(
        el,
        'js/example3.js',
        false, /*runASAP*/
        false, /*requiresGlobal*/
        true   /*isFile*/
    );
    
    example4(el);
}

function example4(el){
    runWebviewJS(
        el,
        'js/example4.js',
        false, //runASAP
        false, //requiresGlobal
        true,  //isFile
        {
            img:'http://s3.amazonaws.com/theoatmeal-img/blog/jitterbeast.gif'
        }      //template data
    );
    
    example5(el);
}

function example5(el){
    runWebviewJS(
        el,
        'js/customUserAgent.js',
        true,                       //runASAP
        true,                       //requiresGlobal
        true,                       //isFile
        chrome.runtime.getManifest()//template data
    );
}