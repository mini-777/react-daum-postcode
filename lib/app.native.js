import { __assign, __rest } from "tslib";
import * as React from 'react';
import WebView from 'react-native-webview';
import { Linking, View } from 'react-native';
var html = "\n<!DOCTYPE html>\n<html lang=\"ko\">\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no\">\n\t<style> \n\t  * { box-sizing: border-box }\n\t  html, body { width: 100%; height: 100%; margin:0px; padding: 0px; background-color: #ececec; } \n  </style>\n</head>\n<body>\n\t<div id=\"layer\" style=\"width:100%; min-height: 100%;\"></div>\n\t<script type=\"text/javascript\">\n    function callback() {\n\t\t\tvar element_layer = document.getElementById('layer');\n\t\t\telement_layer.innerHTML = \"\";\n      new daum.Postcode({\n        ...window.options,\n        onsearch: function () {\n          window.scrollTo(0, 0);\n        },\n        oncomplete: function(data) {\n          window.ReactNativeWebView.postMessage(JSON.stringify(data));\n        },\n        onresize: function(size) {\n          document.getElementById('layer').style.height = size.height + 'px';\n        },\n        onclose: function() {\n          callback();\n        },\n        width : '100%',\n        height: '100%',\n      }).embed(element_layer);\n    }\n\t\tfunction initOnReady(options) {\n    \twindow.options = options;\n\t\t\tvar s = document.createElement('script');\n\t\t\ts.type = 'text/javascript'; s.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';\n\t\t\ts.onreadystatechange = callback; s.onload = callback;\n\t\t\tvar x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);\n    }\n\t</script>\n</body>\n</html>\n";
var Postcode = function (_a) {
    var _b = _a.jsOptions, jsOptions = _b === void 0 ? { hideMapBtn: true } : _b, onSelected = _a.onSelected, onError = _a.onError, style = _a.style, otherProps = __rest(_a, ["jsOptions", "onSelected", "onError", "style"]);
    var injectedJavaScript = React.useMemo(function () { return "initOnReady(".concat(JSON.stringify(jsOptions), ");void(0);"); }, [jsOptions]);
    var onMessage = React.useCallback(function (_a) {
        var nativeEvent = _a.nativeEvent;
        try {
            nativeEvent.data && onSelected && onSelected(JSON.parse(nativeEvent.data));
        }
        catch (e) {
            onError(e);
        }
    }, [onSelected]);
    return (React.createElement(View, { style: style },
        React.createElement(WebView, __assign({ mixedContentMode: 'compatibility', androidLayerType: "hardware", renderToHardwareTextureAndroid: true, useWebKit: true }, otherProps, { source: { html: html, baseUrl: 'https://postcode.map.daum.net' }, onMessage: onMessage, injectedJavaScript: injectedJavaScript, onShouldStartLoadWithRequest: function (request) {
                var _a, _b, _c, _d;
                var isPostcode = !((_a = request.url) === null || _a === void 0 ? void 0 : _a.startsWith('https://postcode.map.daum.net/guide')) &&
                    (!((_b = request.url) === null || _b === void 0 ? void 0 : _b.startsWith('http')) ||
                        ((_c = request.url) === null || _c === void 0 ? void 0 : _c.startsWith('https://postcode.map.daum.net')) ||
                        ((_d = request.url) === null || _d === void 0 ? void 0 : _d.startsWith('http://postcode.map.daum.net')));
                if (!isPostcode) {
                    Linking.openURL(request.url);
                    return false;
                }
                else {
                    return true;
                }
            } }))));
};
export default Postcode;
//# sourceMappingURL=app.native.js.map