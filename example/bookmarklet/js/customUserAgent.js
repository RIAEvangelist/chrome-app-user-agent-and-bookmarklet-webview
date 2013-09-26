function(){
    var defaultUserAgent=navigator.userAgent;
    navigator.__defineGetter__(
        'userAgent',
        function(){
            return (
                'Chrome'+defaultUserAgent.split('Chrome')[1].split(
                    ' Safari'
                )[0]
            )
        }
    );
    
    navigator.__defineGetter__(
        'appVersion',
        function(){
            return '${version}';
        }
    );
    
    navigator.__defineGetter__(
        'appName',
        function(){
            return '${name}';
        }
    );
    
    navigator.__defineGetter__(
        'appCodeName',
        function(){
            return 'Google Chrome App';
        }
    );
}