import { __assign, __awaiter, __generator } from "tslib";
import * as React from 'react';
var getJSApi = function () {
    return new Promise(function (resolve, reject) {
        var _a, _b;
        if (typeof window === 'undefined')
            reject({ message: 'unsupported platform' });
        // @ts-ignore
        var postcodeSDK = (_a = window.daum) === null || _a === void 0 ? void 0 : _a.Postcode;
        if (postcodeSDK) {
            resolve(postcodeSDK);
            return;
        }
        var jsapi = document.createElement('script');
        jsapi.type = 'text/javascript';
        jsapi.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        var s = document.getElementsByTagName('script')[0];
        (_b = s === null || s === void 0 ? void 0 : s.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(jsapi, s);
        // @ts-ignore
        jsapi.onload = function () { return resolve(window.daum.Postcode); };
        jsapi.onabort = jsapi.onerror = reject;
    });
};
var Postcode = function (_a) {
    var onSelected = _a.onSelected, jsOptions = _a.jsOptions, style = _a.style;
    var layer = React.useRef(null);
    var loadData = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var Postcode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getJSApi()];
                case 1:
                    Postcode = _a.sent();
                    if (Postcode) {
                        // @ts-ignore
                        new window.daum.Postcode(__assign(__assign({}, jsOptions), { width: '100%', oncomplete: function (data) {
                                onSelected(data);
                            }, onclose: function () {
                                loadData();
                            } })).embed(layer.current, { autoClose: false });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [onSelected]);
    React.useEffect(function () {
        loadData()["catch"](console.warn);
    }, [loadData]);
    // @ts-ignore
    return React.createElement("div", { ref: layer, style: style });
};
export default Postcode;
//# sourceMappingURL=app.js.map