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
            }
        );
    }
);