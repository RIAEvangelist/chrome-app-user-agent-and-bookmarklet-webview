# ![Chrome App User Agent icon](https://raw.github.com/RIAEvangelist/chrome-app-user-agent-and-bookmarklet-webview/master/example/bookmarklet/Bookmark-48.png) Google Chrome App webviewJS script injector for sandboxed and global scopes
Manifest based userAgent example   
bookmarklet (ish) example  
direct function injection example  
***
### example dir
this gives an example of every type of useage as well as implementing the customUserAgentScript in __example5__
of the js/bookmarklet.js file.

The code will automatically use the data from your manifest file to build its specific user agent. You can further customize the code if you like, but if we all keep it somewhat similar it will help webpage owners see how many users are using chrome apps to view their site. This will help our community as a whole gain traction without confusing website/app developers marketers and owners.
***
### Download and try the demo from the chrome webstore  
https://chrome.google.com/webstore/detail/set-user-agent-app-webvie/mpbnpaonopfcidhkmpmfbjflikfafape

__example icon author__  : [AhaSoft](http://www.aha-soft.com/)  
__example icon license__ : [CC Attribution Non-Commercial No Derivatives](http://creativecommons.org/licenses/by-nc-nd/3.0/)

[JitterBeast](http://theoatmeal.com/blog/jitterbeast) belongs to and was created by [The Oatmeal](http://theoatmeal.com/) if you don't know who that is, welcome
to a new chapter of your previously mindnumbingly boring existance.


***
### how to use
***
First include the code from runWebviewJS.js in your background (copy & paste) or instance code (as a script tag).  
***
Then listen for the webview to start loading. Either with an annonymous or shared handler function.

Shared (best performance)

    function webviewStarted(e){
        ....Do stuff...
    }
    
    document.querySelector('webview').addEventListener(
        'loadstart',
        webviewStarted
    );
    
Annonymous (function created on the fly each time)

    function webviewStarted(e){
        ....Do stuff...
    }
    
    document.querySelector('webview').addEventListener(
        'loadstart',
        function(e){
            ...Do stuff...
        }
    );
    
***
Next, in your handler function, set the code to send your code or file

    runWebviewJS(
        el,             (webview element)
        code,           (code to run OR filename)
        runASAP,        (run code as soon as possible) *false
        requiresGlobal, (needs explicit access to webview window global scope) *false
        isFile,         (load file from app dir) *false
        data            (template object with variables to replace in file) *false
    )

Example data object

    {
        hello   : 'world',
        numNum  : function(){
            return Math.floor(
                Math.rand()*1000
            );
        }
    }
    
__${hello}__ will be replaced with __'world'__ and  
__${numNum}__ will be replaced with a randomly generated whole number from 0 to 1000 in the specified file. This is only for files. Code snippits should be sent as desired for use or removed into a template file.

Example code __ALL CODE MUST BE SENT WRAPPED IN A FUNCTION TO LIMIT SCOPE__

    function(){
        function bodyClick(e){
            console.log(e);
        }
        
        document.body.addEventListener(
            'click',
            bodyClick
        );
    }
    
___OR___ you can send the same thing as a string. One might want to do this to add in custom constants or variables from the parent scope before sending to the webview.

    "function(){function bodyClick(e){console.log(e);}document.body.addEventListener('click',bodyClick);}"

if you want to use a file the code paramater will be the name of the file.

    'js/my-awesome-webview-code.js'

Please feel free to leave questions bug requests or any feedback at all.

Special thanks to __Fady Samuel__ and __Ken Rockot__ who helped me point me in the right direction
to achive what I was looking for in this.

---
> Written with [StackEdit](http://benweet.github.io/stackedit/).
