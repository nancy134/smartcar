const MemoryStorage = (function(){

    var _service;

    var __accessToken = null;
    var __refreshToken = null;


    function _getService(){
        if (!_service){
            _service = this;
            return _service;
        }
        return _service;
    }

    //
    // Murban Access Token
    //
    function _setAccessToken(accessToken){
       console.log("accessToken: "+accessToken); 
       if (accessToken === null){
           console.log("passed null accesstoken");
           return;
       }
        __accessToken = accessToken;
    }
    function _accessToken(){
        return __accessToken;
    }

    //
    // Murban Refresh Token
    //
    function _setRefreshToken(refreshToken){
        __refreshToken = refreshToken;
    }
    function _refreshToken(){
        return __refreshToken;
    }


    // Murban Clear All
    function _murbanClearAll(){
        __accessToken = null;
        __refreshToken = null; 
    }

    return {
        getService: _getService,

        // Murban accessToken
        accessToken: _accessToken,
        setAccessToken: _setAccessToken,

        // Murban refreshToken
        refreshToken: _refreshToken,
        setRefreshToken: _setRefreshToken,

        // Murban Clear All
        murbanClearAll: _sparkClearAll,

    }
}) ();

export default MemoryStorage; 
