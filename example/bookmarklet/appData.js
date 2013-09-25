var defaultUserAgent=navigator.userAgent;
var manifest={
    version :'${manifest.version}',
    name    :'${manifest.name}'
}
window.top.navigator.__defineGetter__(
    'userAgent',
    function(){
        return (
            'Chrome'+
            defaultUserAgent.split('Chrome')[1]
                .split(' Safari')[0]
        )
    }
);
window.navigator.__defineGetter__(
    'appVersion',
    function(){
        return manifest.version;
    }
);
window.navigator.__defineGetter__(
    'appName',
    function(){
        return manifest.name;
    }
);
window.navigator.__defineGetter__(
    'appCodeName',
    function(){
        return 'Google Chrome App';
    }
);

console.log(navigator.appCodeName);