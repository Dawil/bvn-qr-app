'use strict';
bvnQrApp.factory('bvnProxy', [
    '$window', 
    function ($window) {
        var PROXY_URL = $window.location.origin.search('localhost') != -1 ? "http://localhost:3000/proxy/bounce" : "http://aqueous-harbor-1616.herokuapp.com/proxy/bounce";
        return {
            translate: function (config) {
                var targetUrl = config.url;
                config.url = PROXY_URL;
                if(config.method === 'GET') {
                    config.params['target_url'] = targetUrl;
                } else {
                    if(config.method === 'POST') {
                        var data = config.data;
                        config.data = {
                            'target_url': targetUrl,
                            data: data
                        };
                    }
                }
                return config;
            }
        };
    }]);
//@ sourceMappingURL=bvn_proxy.js.map
