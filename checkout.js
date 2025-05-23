(function() {
    var namespace = "StripeCheckout.require".split("."),
        name = namespace[namespace.length - 1],
        base = this,
        i;
    for (i = 0; i < namespace.length - 1; i++) {
        base = base[namespace[i]] = base[namespace[i]] || {}
    }
    if (base[name] === undefined) {
        base[name] = function() {
            var modules = {},
                cache = {};
            var requireRelative = function(name, root) {
                var path = expand(root, name),
                    indexPath = expand(path, "./index"),
                    module, fn;
                module = cache[path] || cache[indexPath];
                if (module) {
                    return module
                } else if (fn = modules[path] || modules[path = indexPath]) {
                    module = {
                        id: path,
                        exports: {}
                    };
                    cache[path] = module.exports;
                    fn(module.exports, function(name) {
                        return require(name, dirname(path))
                    }, module);
                    return cache[path] = module.exports
                } else {
                    throw "module " + name + " not found"
                }
            };
            var expand = function(root, name) {
                var results = [],
                    parts, part;
                if (/^\.\.?(\/|$)/.test(name)) {
                    parts = [root, name].join("/").split("/")
                } else {
                    parts = name.split("/")
                }
                for (var i = 0, length = parts.length; i < length; i++) {
                    part = parts[i];
                    if (part == "..") {
                        results.pop()
                    } else if (part != "." && part != "") {
                        results.push(part)
                    }
                }
                return results.join("/")
            };
            var dirname = function(path) {
                return path.split("/").slice(0, -1).join("/")
            };
            var require = function(name) {
                return requireRelative(name, "")
            };
            require.define = function(bundle) {
                for (var key in bundle) {
                    modules[key] = bundle[key]
                }
            };
            require.modules = modules;
            require.cache = cache;
            return require
        }.call()
    }
})();
StripeCheckout.require.define({
    "vendor/ready": function(exports, require, module) {
        ! function(name, definition) {
            if (typeof module != "undefined") module.exports = definition();
            else if (typeof define == "function" && typeof define.amd == "object") define(definition);
            else this[name] = definition()
        }("domready", function(ready) {
            var fns = [],
                fn, f = false,
                doc = document,
                testEl = doc.documentElement,
                hack = testEl.doScroll,
                domContentLoaded = "DOMContentLoaded",
                addEventListener = "addEventListener",
                onreadystatechange = "onreadystatechange",
                readyState = "readyState",
                loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/,
                loaded = loadedRgx.test(doc[readyState]);

            function flush(f) {
                loaded = 1;
                while (f = fns.shift()) f()
            }
            doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function() {
                doc.removeEventListener(domContentLoaded, fn, f);
                flush()
            }, f);
            hack && doc.attachEvent(onreadystatechange, fn = function() {
                if (/^c/.test(doc[readyState])) {
                    doc.detachEvent(onreadystatechange, fn);
                    flush()
                }
            });
            return ready = hack ? function(fn) {
                self != top ? loaded ? fn() : fns.push(fn) : function() {
                    try {
                        testEl.doScroll("left")
                    } catch (e) {
                        return setTimeout(function() {
                            ready(fn)
                        }, 50)
                    }
                    fn()
                }()
            } : function(fn) {
                loaded ? fn() : fns.push(fn)
            }
        })
    }
});
(function() {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
            var f, i, j, k, ref, ref1;
            j = this.length;
            f = start ? start : 0;
            for (i = k = ref = f, ref1 = j; ref <= ref1 ? k < ref1 : k > ref1; i = ref <= ref1 ? ++k : --k) {
                if (this[i] === obj) {
                    return i
                }
            }
            return -1
        }
    }
}).call(this);
StripeCheckout.require.define({
    "lib/helpers": function(exports, require, module) {
        (function() {
            var delurkWinPhone, helpers, uaVersionFn;
            uaVersionFn = function(re) {
                return function() {
                    var uaMatch;
                    uaMatch = helpers.userAgent.match(re);
                    return uaMatch && parseInt(uaMatch[1])
                }
            };
            delurkWinPhone = function(fn) {
                return function() {
                    return fn() && !helpers.isWindowsPhone()
                }
            };
            helpers = {
                userAgent: window.navigator.userAgent,
                escape: function(value) {
                    return value && ("" + value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;")
                },
                trim: function(value) {
                    return value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                },
                sanitizeURL: function(value) {
                    var SCHEME_WHITELIST, allowed, j, len, scheme;
                    if (!value) {
                        return
                    }
                    value = helpers.trim(value);
                    SCHEME_WHITELIST = ["data:", "http:", "https:"];
                    allowed = false;
                    for (j = 0, len = SCHEME_WHITELIST.length; j < len; j++) {
                        scheme = SCHEME_WHITELIST[j];
                        if (value.indexOf(scheme) === 0) {
                            allowed = true;
                            break
                        }
                    }
                    if (!allowed) {
                        return null
                    }
                    return encodeURI(value)
                },
                iOSVersion: uaVersionFn(/(?:iPhone OS |iPad; CPU OS )(\d+)_\d+/),
                iOSMinorVersion: uaVersionFn(/(?:iPhone OS |iPad; CPU OS )\d+_(\d+)/),
                iOSBuildVersion: uaVersionFn(/(?:iPhone OS |iPad; CPU OS )\d+_\d+_(\d+)/),
                androidWebkitVersion: uaVersionFn(/Mozilla\/5\.0.*Android.*AppleWebKit\/([\d]+)/),
                androidVersion: uaVersionFn(/Android (\d+)\.\d+/),
                firefoxVersion: uaVersionFn(/Firefox\/(\d+)\.\d+/),
                chromeVersion: uaVersionFn(/Chrome\/(\d+)\.\d+/),
                safariVersion: uaVersionFn(/Version\/(\d+)\.\d+ Safari/),
                iOSChromeVersion: uaVersionFn(/CriOS\/(\d+)\.\d+/),
                iOSNativeVersion: uaVersionFn(/Stripe\/(\d+)\.\d+/),
                ieVersion: uaVersionFn(/(?:MSIE |Trident\/.*rv:)(\d{1,2})\./),
                isiOSChrome: function() {
                    return /CriOS/.test(helpers.userAgent)
                },
                isiOSFirefox: function() {
                    return helpers.isiOS() && /FxiOS\//.test(helpers.userAgent)
                },
                isiOSWebView: function() {
                    return /(iPhone|iPod|iPad).*AppleWebKit((?!.*Safari)|(.*\([^)]*like[^)]*Safari[^)]*\)))/i.test(helpers.userAgent)
                },
                getiOSWebViewType: function() {
                    if (helpers.isiOSWebView()) {
                        if (window.indexedDB) {
                            return "WKWebView"
                        } else {
                            return "UIWebView"
                        }
                    }
                },
                isiOS: delurkWinPhone(function() {
                    return /(iPhone|iPad|iPod)/i.test(helpers.userAgent)
                }),
                isiOSNative: function() {
                    return this.isiOS() && this.iOSNativeVersion() >= 3
                },
                isiPad: function() {
                    return /(iPad)/i.test(helpers.userAgent)
                },
                isMac: delurkWinPhone(function() {
                    return /mac/i.test(helpers.userAgent)
                }),
                isWindowsPhone: function() {
                    return /(Windows\sPhone|IEMobile)/i.test(helpers.userAgent)
                },
                isWindowsOS: function() {
                    return /(Windows NT \d\.\d)/i.test(helpers.userAgent)
                },
                isIE: function() {
                    return /(MSIE ([0-9]{1,}[\.0-9]{0,})|Trident\/)/i.test(helpers.userAgent)
                },
                isChrome: function() {
                    return "chrome" in window
                },
                isSafari: delurkWinPhone(function() {
                    var userAgent;
                    userAgent = helpers.userAgent;
                    return /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)
                }),
                isFirefox: delurkWinPhone(function() {
                    return helpers.firefoxVersion() != null
                }),
                isAndroidBrowser: function() {
                    var version;
                    version = helpers.androidWebkitVersion();
                    return version && version < 537
                },
                isAndroidChrome: function() {
                    var version;
                    version = helpers.androidWebkitVersion();
                    return version && version >= 537
                },
                isAndroidDevice: delurkWinPhone(function() {
                    return /Android/.test(helpers.userAgent)
                }),
                isAndroidWebView: function() {
                    return helpers.isAndroidChrome() && /Version\/\d+\.\d+/.test(helpers.userAgent)
                },
                isAndroidFacebookApp: function() {
                    return helpers.isAndroidChrome() && /FBAV\/\d+\.\d+/.test(helpers.userAgent)
                },
                isNativeWebContainer: function() {
                    return window.cordova != null || /GSA\/\d+\.\d+/.test(helpers.userAgent)
                },
                isSupportedMobileOS: function() {
                    return helpers.isiOS() || helpers.isAndroidDevice()
                },
                isAndroidWebapp: function() {
                    var metaTag;
                    if (!helpers.isAndroidChrome()) {
                        return false
                    }
                    metaTag = document.getElementsByName("apple-mobile-web-app-capable")[0] || document.getElementsByName("mobile-web-app-capable")[0];
                    return metaTag && metaTag.content === "yes"
                },
                isiOSBroken: function() {
                    var chromeVersion;
                    chromeVersion = helpers.iOSChromeVersion();
                    if (helpers.iOSVersion() === 9 && helpers.iOSMinorVersion() >= 2 && chromeVersion && chromeVersion <= 47) {
                        return true
                    }
                    if (helpers.isiPad() && helpers.iOSVersion() === 8) {
                        switch (helpers.iOSMinorVersion()) {
                            case 0:
                                return true;
                            case 1:
                                return helpers.iOSBuildVersion() < 1
                        }
                    }
                    if (helpers.isiOSFirefox()) {
                        return true
                    }
                    return false
                },
                couldBeBrokenSFSVC: function() {
                    var iOSVersion;
                    iOSVersion = helpers.iOSVersion();
                    return (iOSVersion === 9 || iOSVersion === 10) && !helpers.isiOSWebView() && !helpers.isiOSChrome() && !helpers.isiOSFirefox() && !helpers.isNativeWebContainer() && !helpers.isiPad()
                },
                isSafariStandaloneMode: function() {
                    return window.navigator && window.navigator.standalone
                },
                getViewportTags: function() {
                    var j, keyval, keyvalSplit, len, metaTags, ref, viewport, viewportContent;
                    metaTags = Array.prototype.slice.call(document.getElementsByTagName("meta")).filter(function(tag) {
                        return tag.name === "viewport" && tag.getAttribute("content") != null
                    });
                    if (!metaTags.length) {
                        return {}
                    }
                    viewportContent = metaTags[metaTags.length - 1].content;
                    viewport = {};
                    ref = viewportContent.split(",");
                    for (j = 0, len = ref.length; j < len; j++) {
                        keyval = ref[j];
                        keyvalSplit = keyval.split("=");
                        if (keyvalSplit.length === 2) {
                            viewport[keyvalSplit[0].trim()] = keyvalSplit[1].trim()
                        }
                    }
                    return viewport
                },
                isFullscreenMobileCapableViewport: function() {
                    var heightIsOK, initialScaleIsOK, viewportTags, widthIsOK;
                    viewportTags = this.getViewportTags();
                    initialScaleIsOK = !!viewportTags["initial-scale"] && parseInt(viewportTags["initial-scale"], 10) === 1;
                    widthIsOK = !viewportTags["width"] || viewportTags["width"] === "device-width";
                    heightIsOK = !viewportTags["height"] || viewportTags["height"] === "device-height";
                    return initialScaleIsOK && widthIsOK && heightIsOK
                },
                iOSChromeTabViewWillFail: function() {
                    var isUserGesture, ref, ref1;
                    isUserGesture = (ref = (ref1 = window.event) != null ? ref1.type : void 0) === "click" || ref === "touchstart" || ref === "touchend";
                    return helpers.iOSChromeVersion() < 48 && !isUserGesture
                },
                isInsideFrame: function() {
                    return window.top !== window.self
                },
                isSmallScreen: function() {
                    return Math.min(window.screen.availHeight, window.screen.availWidth) <= 640 || /FakeCheckoutMobile/.test(helpers.userAgent)
                },
                pad: function(number, width, padding) {
                    var leading;
                    if (width == null) {
                        width = 2
                    }
                    if (padding == null) {
                        padding = "0"
                    }
                    number = number + "";
                    if (number.length > width) {
                        return number
                    }
                    leading = new Array(width - number.length + 1).join(padding);
                    return leading + number
                },
                requestAnimationFrame: function(callback) {
                    return (typeof window.requestAnimationFrame === "function" ? window.requestAnimationFrame(callback) : void 0) || (typeof window.webkitRequestAnimationFrame === "function" ? window.webkitRequestAnimationFrame(callback) : void 0) || window.setTimeout(callback, 100)
                },
                requestAnimationInterval: function(func, interval) {
                    var callback, previous;
                    previous = new Date;
                    callback = function() {
                        var frame, now, remaining;
                        frame = helpers.requestAnimationFrame(callback);
                        now = new Date;
                        remaining = interval - (now - previous);
                        if (remaining <= 0) {
                            previous = now;
                            func()
                        }
                        return frame
                    };
                    return callback()
                },
                getQueryParameterByName: function(name) {
                    var match;
                    match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
                    return match && decodeURIComponent(match[1].replace(/\+/g, " "))
                },
                addQueryParameter: function(url, name, value) {
                    var hashParts, query;
                    query = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                    hashParts = new String(url).split("#");
                    hashParts[0] += hashParts[0].indexOf("?") !== -1 ? "&" : "?";
                    hashParts[0] += query;
                    return hashParts.join("#")
                },
                bind: function(element, name, callback) {
                    if (element.addEventListener) {
                        return element.addEventListener(name, callback, false)
                    } else {
                        return element.attachEvent("on" + name, callback)
                    }
                },
                unbind: function(element, name, callback) {
                    if (element.removeEventListener) {
                        return element.removeEventListener(name, callback, false)
                    } else {
                        return element.detachEvent("on" + name, callback)
                    }
                },
                host: function(url) {
                    var parent, parser;
                    parent = document.createElement("div");
                    parent.innerHTML = '<a href="' + this.escape(url) + '">x</a>';
                    parser = parent.firstChild;
                    return parser.protocol + "//" + parser.host
                },
                strip: function(html) {
                    var ref, ref1, tmp;
                    tmp = document.createElement("div");
                    tmp.innerHTML = html;
                    return (ref = (ref1 = tmp.textContent) != null ? ref1 : tmp.innerText) != null ? ref : ""
                },
                replaceFullWidthNumbers: function(el) {
                    var char, fullWidth, halfWidth, idx, j, len, original, ref, replaced;
                    fullWidth = "０１２３４５６７８９";
                    halfWidth = "0123456789";
                    original = el.value;
                    replaced = "";
                    ref = original.split("");
                    for (j = 0, len = ref.length; j < len; j++) {
                        char = ref[j];
                        idx = fullWidth.indexOf(char);
                        if (idx > -1) {
                            char = halfWidth[idx]
                        }
                        replaced += char
                    }
                    if (original !== replaced) {
                        return el.value = replaced
                    }
                },
                setAutocomplete: function(el, type) {
                    var secureCCFill;
                    secureCCFill = helpers.chromeVersion() > 14 || helpers.safariVersion() > 7;
                    if (type !== "cc-csc" && (!/^cc-/.test(type) || secureCCFill)) {
                        el.setAttribute("x-autocompletetype", type);
                        el.setAttribute("autocompletetype", type)
                    } else {
                        el.setAttribute("autocomplete", "off")
                    }
                    if (!(type === "country-name" || type === "language" || type === "sex" || type === "gender-identity")) {
                        el.setAttribute("autocorrect", "off");
                        el.setAttribute("spellcheck", "off")
                    }
                    if (!(/name|honorific/.test(type) || (type === "locality" || type === "city" || type === "adminstrative-area" || type === "state" || type === "province" || type === "region" || type === "language" || type === "org" || type === "organization-title" || type === "sex" || type === "gender-identity"))) {
                        return el.setAttribute("autocapitalize", "off")
                    }
                },
                hashCode: function(str) {
                    var hash, i, j, ref;
                    hash = 5381;
                    for (i = j = 0, ref = str.length; j < ref; i = j += 1) {
                        hash = (hash << 5) + hash + str.charCodeAt(i)
                    }
                    return (hash >>> 0) % 65535
                },
                clientLocale: function() {
                    return (window.navigator.languages || [])[0] || window.navigator.userLanguage || window.navigator.language
                },
                dashToCamelCase: function(dashed) {
                    return dashed.replace(/-(\w)/g, function(match, char) {
                        return char.toUpperCase()
                    })
                },
                camelToDashCase: function(cameled) {
                    return cameled.replace(/([A-Z])/g, function(g) {
                        return "-" + g.toLowerCase()
                    })
                },
                isArray: Array.isArray || function(val) {
                    return {}.toString.call(val) === "[object Array]"
                },
                extractBrowserFamily: function(userAgent) {
                    if (/SamsungBrowser/.test(userAgent)) {
                        return "SamsungBrowser"
                    }
                    if (/\bInstagram\b/i.test(userAgent)) {
                        return "Instagram"
                    }
                    if (/\bFirefox\b/i.test(userAgent)) {
                        return "Firefox"
                    }
                    if (/Edge\//i.test(userAgent) || /Edg\//i.test(userAgent)) {
                        return "IE Edge"
                    }
                    if (/(MSIE ([0-9]{1,}[.0-9]{0,})|Trident\/)/i.test(userAgent)) {
                        return "IE"
                    }
                    if (/\bFB_IAB\b/.test(userAgent)) {
                        return "Facebook"
                    }
                    if (/\bChrome\b/i.test(userAgent)) {
                        return "Chrome"
                    }
                    if (/\bSafari\b/i.test(userAgent)) {
                        return "Safari"
                    }
                    return "Other"
                }
            };
            module.exports = helpers
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/spellChecker": function(exports, require, module) {
        (function() {
            var levenshtein;
            module.exports = {
                levenshtein: levenshtein = function(str1, str2) {
                    var d, i, j, k, l, m, n, o, p, ref, ref1, ref2, ref3;
                    m = str1.length;
                    n = str2.length;
                    d = [];
                    if (!m) {
                        return n
                    }
                    if (!n) {
                        return m
                    }
                    for (i = k = 0, ref = m; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
                        d[i] = [i]
                    }
                    for (j = l = 1, ref1 = n; 1 <= ref1 ? l <= ref1 : l >= ref1; j = 1 <= ref1 ? ++l : --l) {
                        d[0][j] = j
                    }
                    for (i = o = 1, ref2 = m; 1 <= ref2 ? o <= ref2 : o >= ref2; i = 1 <= ref2 ? ++o : --o) {
                        for (j = p = 1, ref3 = n; 1 <= ref3 ? p <= ref3 : p >= ref3; j = 1 <= ref3 ? ++p : --p) {
                            if (str1[i - 1] === str2[j - 1]) {
                                d[i][j] = d[i - 1][j - 1]
                            } else {
                                d[i][j] = Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1
                            }
                        }
                    }
                    return d[m][n]
                },
                suggest: function(dictionary, badword, threshold) {
                    var dist, k, len, maxDist, suggestion, word;
                    if (threshold == null) {
                        threshold = Infinity
                    }
                    maxDist = Infinity;
                    suggestion = null;
                    for (k = 0, len = dictionary.length; k < len; k++) {
                        word = dictionary[k];
                        dist = levenshtein(word, badword);
                        if (dist < maxDist) {
                            maxDist = dist;
                            suggestion = word
                        }
                    }
                    if (maxDist < threshold) {
                        return suggestion
                    } else {
                        return null
                    }
                }
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/optionHelpers": function(exports, require, module) {
        (function() {
            var dumpObject, flatten, helpers, identity, prettyPrint, repr, toBoolean, toNumber, toString, truncate;
            helpers = require("lib/helpers");
            flatten = function(obj) {
                var flattened, key, ref, val;
                flattened = {};
                for (key in obj) {
                    val = obj[key];
                    if ((ref = typeof val) === "function" || ref === "object") {
                        flattened[key] = "" + val
                    } else {
                        flattened[key] = val
                    }
                }
                return JSON.stringify(flattened)
            };
            repr = function(val) {
                switch (typeof val) {
                    case "function":
                        return '"' + val + '"';
                    case "object":
                        return flatten(val);
                    default:
                        return "" + JSON.stringify(val)
                }
            };
            truncate = function(val, cap) {
                if (val.length - 3 > cap) {
                    return val.slice(0, cap - 3) + "..."
                } else {
                    return val
                }
            };
            dumpObject = function(obj) {
                return truncate(repr(obj), 50)
            };
            prettyPrint = function(key, rawOptions) {
                var original, ref;
                original = (ref = rawOptions.__originals) != null ? ref[key] : void 0;
                if (original) {
                    return original
                } else if (rawOptions.buttonIntegration) {
                    return "data-" + helpers.camelToDashCase(key)
                } else {
                    return key
                }
            };
            toBoolean = function(val) {
                return val !== "false" && val !== false && val != null
            };
            toNumber = function(val) {
                if (typeof val === "number") {
                    return val
                } else if (typeof val === "string") {
                    return parseInt(val)
                }
            };
            toString = function(val) {
                if (val == null) {
                    return ""
                } else {
                    return "" + val
                }
            };
            identity = function(val) {
                return val
            };
            module.exports = {
                prettyPrint: prettyPrint,
                flatten: flatten,
                repr: repr,
                truncate: truncate,
                dumpObject: dumpObject,
                toBoolean: toBoolean,
                toNumber: toNumber,
                toString: toString,
                identity: identity
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/paymentMethods": function(exports, require, module) {
        (function() {
            var ERROR, METHODS, OPTIONAL, PRETTY_METHODS, PRIVATE, REQUIRED, WARNING, _exports, alipayEnabled, alipayToCanonical, canonicalize, checkContext, checkNoDuplicates, checkNoOldAPI, coerceDefaults, deepMethodTypeCheck, helpers, isValidMethod, methodName, methodsArrayToDict, optionHelpers, optionValidator, ref, ref1, simpleMethodTypeCheck, simpleToCanonical, singleMethodTypeCheck, spec, transformMethods, hasProp = {}.hasOwnProperty,
                indexOf = [].indexOf || function(item) {
                    for (var i = 0, l = this.length; i < l; i++) {
                        if (i in this && this[i] === item) return i
                    }
                    return -1
                };
            helpers = require("lib/helpers");
            optionHelpers = require("lib/optionHelpers");
            optionValidator = require("lib/optionValidator");
            ref = optionValidator.severities, ERROR = ref.ERROR, WARNING = ref.WARNING;
            ref1 = optionValidator.importances, OPTIONAL = ref1.OPTIONAL, REQUIRED = ref1.REQUIRED, PRIVATE = ref1.PRIVATE;
            alipayEnabled = function(key, val, options) {
                var prettyAlipay, type;
                type = typeof val;
                if (type !== "boolean" && val !== "auto") {
                    prettyAlipay = optionHelpers.prettyPrint("alipay", options);
                    return {
                        type: WARNING,
                        message: "The '" + prettyAlipay + "' option can be true, false, or 'auto', but instead we found " + optionHelpers.dumpObject(val) + "."
                    }
                } else {
                    return null
                }
            };
            METHODS = {
                alipay: {
                    method: {
                        importance: REQUIRED,
                        spec: optionValidator.ignore,
                        checkContext: optionValidator.ignore
                    },
                    enabled: {
                        importance: REQUIRED,
                        spec: alipayEnabled,
                        checkContext: optionValidator.ignore,
                        "default": false
                    },
                    reusable: {
                        importance: OPTIONAL,
                        spec: optionValidator.isNullableBoolean,
                        checkContext: optionValidator.ignore,
                        "default": false
                    }
                },
                card: {
                    method: {
                        importance: REQUIRED,
                        spec: optionValidator.ignore,
                        checkContext: optionValidator.ignore
                    },
                    enabled: {
                        importance: OPTIONAL,
                        spec: optionValidator.isBoolean,
                        checkContext: optionValidator.ignore,
                        "default": true
                    }
                },
                bitcoin: {
                    method: {
                        importance: REQUIRED,
                        spec: optionValidator.ignore,
                        checkContext: optionValidator.ignore
                    },
                    enabled: {
                        importance: OPTIONAL,
                        spec: optionValidator.isBoolean,
                        checkContext: optionValidator.ignore,
                        "default": false
                    }
                }
            };
            isValidMethod = function(method) {
                return method in METHODS
            };
            PRETTY_METHODS = function() {
                var method, methods, n;
                methods = function() {
                    var results;
                    results = [];
                    for (method in METHODS) {
                        results.push("'" + method + "'")
                    }
                    return results
                }();
                n = methods.length;
                methods[n - 1] = "or " + methods[n - 1];
                return methods.join(", ")
            }();
            simpleMethodTypeCheck = function(method) {
                var prettyMethod;
                if (!isValidMethod(method)) {
                    prettyMethod = optionHelpers.dumpObject(methodSettings.method);
                    return {
                        type: ERROR,
                        message: "'" + method + "' is not a valid payment method. It must be one of " + PRETTY_METHODS
                    }
                } else {
                    return null
                }
            };
            deepMethodTypeCheck = function(methodSettings) {
                var error, errors, optionSpec, ref2, warnings;
                error = simpleMethodTypeCheck(methodSettings.method);
                if (error != null) {
                    return error
                }
                optionSpec = METHODS[methodSettings.method];
                ref2 = optionValidator.validate(optionSpec, methodSettings), errors = ref2.errors, warnings = ref2.warnings;
                errors = errors.concat(warnings);
                if (errors.length > 0) {
                    return {
                        type: ERROR,
                        message: "Error when checking the '" + methodSettings.method + "' method:\n" + errors[0].toString()
                    }
                } else {
                    return null
                }
            };
            singleMethodTypeCheck = function(method, idx) {
                var methodSettings, pretty;
                if (typeof method === "string") {
                    return simpleMethodTypeCheck(method)
                } else if ((method != null ? method.method : void 0) != null) {
                    methodSettings = method;
                    return deepMethodTypeCheck(methodSettings)
                } else {
                    pretty = optionHelpers.dumpObject(methodSettings);
                    return {
                        type: ERROR,
                        message: "All elements of paymentMethods need to be either an object with a 'method' property or one of these strings: " + PRETTY_METHODS + ".\n At index " + idx + " we found '" + pretty + "' which was neither."
                    }
                }
            };
            spec = function(key, val, options) {
                var actualType, error, i, idx, len, method;
                if (val === null) {
                    return null
                }
                if (!helpers.isArray(val)) {
                    actualType = val === null ? "null" : typeof val;
                    return {
                        type: ERROR,
                        message: "Looking for an Array, but instead we found '" + actualType + "'."
                    }
                }
                for (idx = i = 0, len = val.length; i < len; idx = ++i) {
                    method = val[idx];
                    error = singleMethodTypeCheck(method, idx);
                    if (error != null) {
                        return error
                    }
                }
                return null
            };
            checkNoDuplicates = function(val) {
                var i, idx, len, method, ref2, sortedMethods, usedMethods;
                usedMethods = function() {
                    var i, len, results;
                    results = [];
                    for (i = 0, len = val.length; i < len; i++) {
                        method = val[i];
                        if (typeof method === "string") {
                            results.push(method)
                        } else if ((method != null ? method.method : void 0) != null) {
                            results.push(method.method)
                        } else {
                            results.push(null)
                        }
                    }
                    return results
                }();
                sortedMethods = usedMethods.concat().sort();
                ref2 = sortedMethods.slice(1);
                for (idx = i = 0, len = ref2.length; i < len; idx = ++i) {
                    method = ref2[idx];
                    if (method === sortedMethods[idx]) {
                        return {
                            type: ERROR,
                            message: "You've configured the payment method '" + method + "' multiple times."
                        }
                    }
                }
                return null
            };
            checkNoOldAPI = function(options) {
                var alipay, alipayReusable, bitcoin, paymentMethods;
                if (options.alipay != null || options.bitcoin != null || options.alipayReusable != null) {
                    alipay = optionHelpers.prettyPrint("alipay", options);
                    alipayReusable = optionHelpers.prettyPrint("alipayReusable", options);
                    bitcoin = optionHelpers.prettyPrint("bitcoin", options);
                    paymentMethods = optionHelpers.prettyPrint("paymentMethods", options);
                    return {
                        type: ERROR,
                        message: "Setting any of the the '" + alipay + "', '" + alipayReusable + "', or '" + bitcoin + "' options is disallowed if you are using '" + paymentMethods + "'."
                    }
                } else {
                    return null
                }
            };
            checkContext = function(key, val, options) {
                var error;
                error = checkNoOldAPI(options);
                if (error != null) {
                    return error
                }
                if (val == null) {
                    return
                }
                return checkNoDuplicates(val)
            };
            coerceDefaults = function(methodSpec, methodSettings) {
                var results, setting;
                results = [];
                for (setting in methodSpec) {
                    if (methodSettings[setting] == null) {
                        results.push(methodSettings[setting] = methodSpec[setting]["default"])
                    } else {
                        results.push(void 0)
                    }
                }
                return results
            };
            simpleToCanonical = function(method, enabled) {
                var methodSettings;
                methodSettings = {
                    method: method,
                    enabled: enabled
                };
                coerceDefaults(METHODS[method], methodSettings);
                return methodSettings
            };
            alipayToCanonical = function(enabled, reusable) {
                var methodSettings;
                methodSettings = {
                    method: "alipay",
                    enabled: enabled,
                    reusable: reusable
                };
                coerceDefaults(METHODS.alipay, methodSettings);
                return methodSettings
            };
            transformMethods = function(paymentMethods) {
                var has, hasMethod, i, len, method, methodSettings, result;
                result = [];
                has = {};
                for (method in METHODS) {
                    has[method] = false
                }
                for (i = 0, len = paymentMethods.length; i < len; i++) {
                    method = paymentMethods[i];
                    if (typeof method === "string") {
                        result.push(simpleToCanonical(method, true));
                        has[method] = true
                    } else {
                        methodSettings = method;
                        if (methodSettings["enabled"] == null) {
                            methodSettings["enabled"] = true
                        }
                        coerceDefaults(METHODS[methodSettings.method], methodSettings);
                        has[methodSettings.method] = true;
                        result.push(methodSettings)
                    }
                }
                for (method in has) {
                    hasMethod = has[method];
                    if (!hasMethod) {
                        result.push(simpleToCanonical(method, false))
                    }
                }
                return result
            };
            methodsArrayToDict = function(paymentMethods) {
                var enabled, i, len, methodSettings, settings;
                settings = {};
                enabled = [];
                for (i = 0, len = paymentMethods.length; i < len; i++) {
                    methodSettings = paymentMethods[i];
                    settings[methodSettings.method] = methodSettings;
                    if (methodSettings.enabled !== false) {
                        enabled.push(methodSettings.method)
                    }
                }
                return {
                    settings: settings,
                    enabled: enabled
                }
            };
            canonicalize = function(rawOptions) {
                var blacklist, hasAlipay, option, result, val;
                result = {};
                blacklist = ["bitcoin", "alipay", "alipayReusable"];
                for (option in rawOptions) {
                    if (!hasProp.call(rawOptions, option)) continue;
                    val = rawOptions[option];
                    if (indexOf.call(blacklist, option) < 0) {
                        result[option] = val
                    }
                }
                if (rawOptions.paymentMethods != null) {
                    result.paymentMethods = methodsArrayToDict(transformMethods(rawOptions.paymentMethods))
                } else {
                    hasAlipay = rawOptions.alipay || rawOptions.alipayReusable || false;
                    result.paymentMethods = methodsArrayToDict([simpleToCanonical("card", true), simpleToCanonical("bitcoin", rawOptions.bitcoin || false), alipayToCanonical(hasAlipay, rawOptions.alipayReusable)])
                }
                return result
            };
            _exports = {
                alipayEnabled: alipayEnabled,
                spec: spec,
                checkContext: checkContext,
                canonicalize: canonicalize,
                methods: function() {
                    var results;
                    results = [];
                    for (methodName in METHODS) {
                        results.push(methodName)
                    }
                    return results
                }()
            };
            for (methodName in METHODS) {
                _exports[methodName] = methodName
            }
            module.exports = _exports
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/optionSpecs": function(exports, require, module) {
        (function() {
            var BOOLEAN, BUTTON, BUTTON_CONFIGURE_OPTIONS, BUTTON_OPEN_OPTIONS, CUSTOM, CUSTOM_CONFIGURE_OPTIONS, CUSTOM_OPEN_OPTIONS, ERROR, NULLABLE_BOOLEAN, NULLABLE_NUMBER, NULLABLE_STRING, NULLABLE_URL, NUMBER, OPTIONAL, OPTIONS, OTHER, PRIVATE, REQUIRED, STRING, URL, WARNING, generateOptions, helpers, option, optionHelpers, optionValidator, optsettings, paymentMethods, ref, ref1;
            helpers = require("lib/helpers");
            optionHelpers = require("lib/optionHelpers");
            paymentMethods = require("lib/paymentMethods");
            optionValidator = require("lib/optionValidator");
            ref = optionValidator.severities, ERROR = ref.ERROR, WARNING = ref.WARNING;
            ref1 = optionValidator.importances, OPTIONAL = ref1.OPTIONAL, REQUIRED = ref1.REQUIRED, PRIVATE = ref1.PRIVATE;
            BUTTON = "button";
            CUSTOM = "custom";
            STRING = "string";
            URL = "url";
            BOOLEAN = "boolean";
            NUMBER = "number";
            NULLABLE_STRING = "null-string";
            NULLABLE_URL = "null-url";
            NULLABLE_BOOLEAN = "null-boolean";
            NULLABLE_NUMBER = "null-number";
            OTHER = "other";
            OPTIONS = {
                address: {
                    importance: PRIVATE,
                    type: OTHER,
                    checkContext: function(key, val, options) {
                        var prettyAddress, prettyBilling;
                        prettyAddress = optionHelpers.prettyPrint("address", options);
                        prettyBilling = optionHelpers.prettyPrint("billingAddress", options);
                        return {
                            type: WARNING,
                            message: "'" + prettyAddress + "' is deprecated.  Use '" + prettyBilling + "' instead."
                        }
                    }
                },
                alipay: {
                    importance: OPTIONAL,
                    type: OTHER,
                    coerceTo: function(val) {
                        if (val === "auto") {
                            return val
                        }
                        return optionHelpers.toBoolean(val)
                    },
                    spec: function(key, val, options) {
                        if (val === null) {
                            return null
                        } else {
                            return paymentMethods.alipayEnabled(key, val, options)
                        }
                    }
                },
                alipayReusable: {
                    importance: OPTIONAL,
                    type: NULLABLE_BOOLEAN,
                    checkContext: optionValidator.xRequiresY("alipayReusable", "alipay")
                },
                allowRememberMe: {
                    importance: OPTIONAL,
                    type: NULLABLE_BOOLEAN,
                    "default": true
                },
                amount: {
                    importance: OPTIONAL,
                    type: NULLABLE_NUMBER
                },
                billingAddress: {
                    importance: OPTIONAL,
                    type: NULLABLE_BOOLEAN
                },
                bitcoin: {
                    importance: OPTIONAL,
                    type: NULLABLE_BOOLEAN
                },
                buttonIntegration: {
                    importance: PRIVATE,
                    type: BOOLEAN,
                    "default": false
                },
                closed: {
                    only: CUSTOM,
                    importance: OPTIONAL,
                    type: OTHER
                },
                color: {
                    importance: PRIVATE,
                    type: STRING
                },
                createSource: {
                    importance: PRIVATE,
                    type: BOOLEAN
                },
                currency: {
                    importance: OPTIONAL,
                    type: NULLABLE_STRING,
                    "default": "usd"
                },
                description: {
                    importance: OPTIONAL,
                    type: NULLABLE_STRING
                },
                email: {
                    importance: OPTIONAL,
                    type: NULLABLE_STRING
                },
                image: {
                    importance: OPTIONAL,
                    type: NULLABLE_URL
                },
                key: {
                    importance: REQUIRED,
                    type: STRING
                },
                label: {
                    only: BUTTON,
                    importance: OPTIONAL,
                    type: NULLABLE_STRING
                },
                locale: {
                    importance: OPTIONAL,
                    type: NULLABLE_STRING
                },
                name: {
                    importance: OPTIONAL,
                    type: NULLABLE_STRING
                },
                nostyle: {
                    importance: PRIVATE,
                    type: BOOLEAN
                },
                notrack: {
                    importance: PRIVATE,
                    type: BOOLEAN
                },
                opened: {
                    only: CUSTOM,
                    importance: OPTIONAL,
                    type: OTHER
                },
                panelLabel: {
                    importance: OPTIONAL,
                    type: NULLABLE_STRING
                },
                paymentMethods: {
                    only: CUSTOM,
                    importance: OPTIONAL,
                    type: OTHER,
                    spec: paymentMethods.spec,
                    checkContext: paymentMethods.checkContext
                },
                referrer: {
                    importance: PRIVATE,
                    type: URL
                },
                shippingAddress: {
                    importance: OPTIONAL,
                    type: NULLABLE_BOOLEAN,
                    checkContext: optionValidator.xRequiresY("shippingAddress", "billingAddress")
                },
                source: {
                    importance: OPTIONAL,
                    type: OTHER,
                    only: CUSTOM,
                    checkContext: optionValidator.xPrecludesY("source", "token")
                },
                supportsTokenCallback: {
                    importance: PRIVATE,
                    type: BOOLEAN
                },
                timeLoaded: {
                    importance: PRIVATE,
                    type: OTHER
                },
                token: {
                    importance: function(integrationType, isConfigure) {
                        if (isConfigure) {
                            return OPTIONAL
                        } else {
                            if (integrationType === BUTTON) {
                                return REQUIRED
                            } else {
                                return function(option, val, rawOptions) {
                                    if (!val && !rawOptions["source"]) {
                                        return new optionValidator.ErrorMissingOneOfRequired(rawOptions, option, "source")
                                    } else {
                                        return null
                                    }
                                }
                            }
                        }
                    },
                    type: OTHER
                },
                trace: {
                    importance: PRIVATE,
                    type: BOOLEAN
                },
                url: {
                    importance: PRIVATE,
                    type: URL
                },
                zipCode: {
                    importance: OPTIONAL,
                    type: NULLABLE_BOOLEAN
                },
                __originals: {
                    importance: PRIVATE,
                    type: OTHER
                }
            };
            for (option in OPTIONS) {
                optsettings = OPTIONS[option];
                if (optsettings.coerceTo == null) {
                    optsettings.coerceTo = function() {
                        switch (optsettings.type) {
                            case STRING:
                            case NULLABLE_STRING:
                                return optionHelpers.toString;
                            case BOOLEAN:
                            case NULLABLE_BOOLEAN:
                                return optionHelpers.toBoolean;
                            case NUMBER:
                            case NULLABLE_NUMBER:
                                return optionHelpers.toNumber;
                            case URL:
                            case NULLABLE_URL:
                                return helpers.sanitizeURL;
                            case OTHER:
                                return optionHelpers.identity
                        }
                    }()
                }
                if (optsettings.spec == null) {
                    optsettings.spec = function() {
                        switch (optsettings.type) {
                            case STRING:
                            case URL:
                                return optionValidator.isString;
                            case BOOLEAN:
                                return optionValidator.isBoolean;
                            case NUMBER:
                                return optionValidator.isNumber;
                            case NULLABLE_STRING:
                            case NULLABLE_URL:
                                return optionValidator.isNullableString;
                            case NULLABLE_BOOLEAN:
                                return optionValidator.isNullableBoolean;
                            case NULLABLE_NUMBER:
                                return optionValidator.isNullableNumber;
                            case OTHER:
                                return optionValidator.ignore
                        }
                    }()
                }
                if (optsettings.checkContext == null) {
                    optsettings.checkContext = optionValidator.ignore
                }
            }
            generateOptions = function(arg) {
                var _optsettings, isConfigure, only, result, setting, val;
                only = arg.only, isConfigure = arg.isConfigure;
                result = {};
                for (option in OPTIONS) {
                    _optsettings = OPTIONS[option];
                    if (_optsettings.only != null && _optsettings.only !== only) {
                        continue
                    }
                    optsettings = {};
                    for (setting in _optsettings) {
                        val = _optsettings[setting];
                        if (setting === "importance") {
                            if (typeof val === "string") {
                                optsettings[setting] = val
                            } else {
                                optsettings[setting] = val(only, isConfigure)
                            }
                        } else {
                            optsettings[setting] = val
                        }
                    }
                    result[option] = optsettings
                }
                return result
            };
            BUTTON_CONFIGURE_OPTIONS = generateOptions({
                only: BUTTON,
                isConfigure: true
            });
            BUTTON_OPEN_OPTIONS = generateOptions({
                only: BUTTON,
                isConfigure: false
            });
            CUSTOM_CONFIGURE_OPTIONS = generateOptions({
                only: CUSTOM,
                isConfigure: true
            });
            CUSTOM_OPEN_OPTIONS = generateOptions({
                only: CUSTOM,
                isConfigure: false
            });
            module.exports = {
                _OPTIONS: OPTIONS,
                types: {
                    STRING: STRING,
                    BOOLEAN: BOOLEAN,
                    NUMBER: NUMBER,
                    NULLABLE_STRING: NULLABLE_STRING,
                    NULLABLE_URL: NULLABLE_URL,
                    NULLABLE_BOOLEAN: NULLABLE_BOOLEAN,
                    NULLABLE_NUMBER: NULLABLE_NUMBER,
                    URL: URL,
                    OTHER: OTHER
                },
                buttonConfigureOptions: BUTTON_CONFIGURE_OPTIONS,
                buttonOpenOptions: BUTTON_OPEN_OPTIONS,
                customConfigureOptions: CUSTOM_CONFIGURE_OPTIONS,
                customOpenOptions: CUSTOM_OPEN_OPTIONS,
                all: [BUTTON_CONFIGURE_OPTIONS, BUTTON_OPEN_OPTIONS, CUSTOM_CONFIGURE_OPTIONS, CUSTOM_OPEN_OPTIONS]
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/optionValidator": function(exports, require, module) {
        (function() {
            var ERROR, ErrorMissingOneOfRequired, ErrorMissingRequired, ErrorMisspelledRequired, OPTIONAL, PRIVATE, REQUIRED, WARNING, WarnBadContext, WarnMisspelledOptional, WarnOptionTypeError, WarnUnrecognized, checkConditionallyRequiredOptions, checkOptionContexts, checkOptionTypes, checkRequiredOptions, checkUnrecognizedOptions, coerceOption, fromSpec, ignore, isBoolean, isNullableBoolean, isNullableNumber, isNullableString, isNumber, isRequired, isString, optionHelpers, simpleNullableTypeCheck, simpleTypeCheck, spellChecker, validate, xPrecludesY, xRequiresY, indexOf = [].indexOf || function(item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) return i
                }
                return -1
            };
            spellChecker = require("lib/spellChecker");
            optionHelpers = require("lib/optionHelpers");
            ERROR = "error";
            WARNING = "warning";
            OPTIONAL = "optional";
            REQUIRED = "required";
            PRIVATE = "private";
            isRequired = function(importance) {
                return importance === REQUIRED
            };
            fromSpec = function(optionSpec) {
                var opt, val;
                return {
                    all: optionSpec,
                    required: function() {
                        var results;
                        results = [];
                        for (opt in optionSpec) {
                            val = optionSpec[opt];
                            if (isRequired(val.importance)) {
                                results.push(opt)
                            }
                        }
                        return results
                    }(),
                    conditionallyRequired: function() {
                        var results;
                        results = [];
                        for (opt in optionSpec) {
                            val = optionSpec[opt];
                            if (typeof val.importance === "function") {
                                results.push(opt)
                            }
                        }
                        return results
                    }(),
                    suggestable: function() {
                        var results;
                        results = [];
                        for (opt in optionSpec) {
                            val = optionSpec[opt];
                            if (val.importance !== PRIVATE) {
                                results.push(opt)
                            }
                        }
                        return results
                    }()
                }
            };
            simpleTypeCheck = function(expectedType, val) {
                var actualType;
                actualType = typeof val;
                if (actualType !== expectedType) {
                    if (val === null) {
                        actualType = "null"
                    }
                    return {
                        type: WARNING,
                        message: "Looking for type '" + expectedType + "', but instead we found '" + actualType + "'."
                    }
                } else {
                    return null
                }
            };
            simpleNullableTypeCheck = function(expectedType, val) {
                if (val === null) {
                    return null
                }
                return simpleTypeCheck(expectedType, val)
            };
            isString = function(key, val, options) {
                return simpleTypeCheck("string", val)
            };
            isBoolean = function(key, val, options) {
                return simpleTypeCheck("boolean", val)
            };
            isNumber = function(key, val, options) {
                return simpleTypeCheck("number", val)
            };
            isNullableString = function(key, val, options) {
                return simpleNullableTypeCheck("string", val)
            };
            isNullableBoolean = function(key, val, options) {
                return simpleNullableTypeCheck("boolean", val)
            };
            isNullableNumber = function(key, val, options) {
                return simpleNullableTypeCheck("number", val)
            };
            ignore = function() {
                return null
            };
            xRequiresY = function(requiring, required) {
                return function(key, val, options) {
                    var prettyRequired, prettyRequiring;
                    if (!options[required]) {
                        prettyRequired = optionHelpers.prettyPrint(required, options);
                        prettyRequiring = optionHelpers.prettyPrint(requiring, options);
                        return {
                            type: WARNING,
                            message: "'" + prettyRequired + "' must be enabled whenever '" + prettyRequiring + "' is."
                        }
                    }
                }
            };
            xPrecludesY = function(x, y) {
                return function(key, val, options) {
                    var prettyX, prettyY;
                    if (options[x] && options[y]) {
                        prettyX = optionHelpers.prettyPrint(x, options);
                        prettyY = optionHelpers.prettyPrint(y, options);
                        return {
                            type: ERROR,
                            message: "The options '" + prettyX + "' and '" + prettyY + "' can not be used at the same time."
                        }
                    }
                }
            };
            ErrorMissingRequired = function() {
                function ErrorMissingRequired(rawOptions1, key1) {
                    this.rawOptions = rawOptions1;
                    this.key = key1
                }
                ErrorMissingRequired.prototype.toString = function() {
                    var key;
                    key = optionHelpers.prettyPrint(this.key, this.rawOptions);
                    return "'" + key + "' is a required option, but was not found."
                };
                ErrorMissingRequired.prototype.trackedInfo = function() {
                    return {
                        result: "ErrorMissingRequired",
                        key: this.key
                    }
                };
                return ErrorMissingRequired
            }();
            ErrorMissingOneOfRequired = function() {
                function ErrorMissingOneOfRequired(rawOptions1, keyA1, keyB1) {
                    this.rawOptions = rawOptions1;
                    this.keyA = keyA1;
                    this.keyB = keyB1
                }
                ErrorMissingOneOfRequired.prototype.toString = function() {
                    var keyA, keyB;
                    keyA = optionHelpers.prettyPrint(this.keyA, this.rawOptions);
                    keyB = optionHelpers.prettyPrint(this.keyB, this.rawOptions);
                    return "Either '" + keyA + "' or '" + keyB + "' is a required option, but neither was found."
                };
                ErrorMissingOneOfRequired.prototype.trackedInfo = function() {
                    return {
                        result: "ErrorMissingOneOfRequired",
                        key: this.keyA
                    }
                };
                return ErrorMissingOneOfRequired
            }();
            ErrorMisspelledRequired = function() {
                function ErrorMisspelledRequired(rawOptions1, expected1, actual1) {
                    this.rawOptions = rawOptions1;
                    this.expected = expected1;
                    this.actual = actual1
                }
                ErrorMisspelledRequired.prototype.toString = function() {
                    var actual, expected;
                    expected = optionHelpers.prettyPrint(this.expected, this.rawOptions);
                    actual = optionHelpers.prettyPrint(this.actual, this.rawOptions);
                    return "Unrecognized option '" + actual + "'. Did you mean '" + expected + "'? ('" + expected + "' is required)"
                };
                ErrorMisspelledRequired.prototype.trackedInfo = function() {
                    return {
                        result: "ErrorMisspelledRequired",
                        expected: this.expected,
                        actual: this.actual
                    }
                };
                return ErrorMisspelledRequired
            }();
            WarnMisspelledOptional = function() {
                function WarnMisspelledOptional(rawOptions1, expected1, actual1) {
                    this.rawOptions = rawOptions1;
                    this.expected = expected1;
                    this.actual = actual1
                }
                WarnMisspelledOptional.prototype.toString = function() {
                    var actual, expected;
                    expected = optionHelpers.prettyPrint(this.expected, this.rawOptions);
                    actual = optionHelpers.prettyPrint(this.actual, this.rawOptions);
                    return "Unrecognized option '" + actual + "'. Did you mean '" + expected + "'?"
                };
                WarnMisspelledOptional.prototype.trackedInfo = function() {
                    return {
                        result: "WarnMisspelledOptional",
                        expected: this.expected,
                        actual: this.actual
                    }
                };
                return WarnMisspelledOptional
            }();
            WarnUnrecognized = function() {
                function WarnUnrecognized(rawOptions1, key1) {
                    this.rawOptions = rawOptions1;
                    this.key = key1
                }
                WarnUnrecognized.prototype.toString = function() {
                    var key;
                    key = optionHelpers.prettyPrint(this.key, this.rawOptions);
                    return "Unrecognized option '" + key + "'."
                };
                WarnUnrecognized.prototype.trackedInfo = function() {
                    return {
                        result: "WarnUnrecognized",
                        key: this.key
                    }
                };
                return WarnUnrecognized
            }();
            WarnOptionTypeError = function() {
                function WarnOptionTypeError(rawOptions1, key1, message1) {
                    this.rawOptions = rawOptions1;
                    this.key = key1;
                    this.message = message1
                }
                WarnOptionTypeError.prototype.toString = function() {
                    var key;
                    key = optionHelpers.prettyPrint(this.key, this.rawOptions);
                    return "Type mismatch for option '" + key + "':\n" + this.message
                };
                WarnOptionTypeError.prototype.trackedInfo = function() {
                    return {
                        result: "WarnOptionTypeError",
                        key: this.key,
                        message: this.message
                    }
                };
                return WarnOptionTypeError
            }();
            WarnBadContext = function() {
                function WarnBadContext(rawOptions1, key1, message1) {
                    this.rawOptions = rawOptions1;
                    this.key = key1;
                    this.message = message1
                }
                WarnBadContext.prototype.toString = function() {
                    return this.message
                };
                WarnBadContext.prototype.trackedInfo = function() {
                    return {
                        result: "WarnBadContext",
                        key: this.key,
                        message: this.message
                    }
                };
                return WarnBadContext
            }();
            coerceOption = function(optionSpec, option, val) {
                var OPTIONS;
                OPTIONS = fromSpec(optionSpec);
                if (val != null && OPTIONS.all[option] != null) {
                    return OPTIONS.all[option].coerceTo(val)
                } else {
                    return val
                }
            };
            checkRequiredOptions = function(OPTIONS, arg, rawOptions) {
                var errors, i, len, ref, reqOpt, warnings;
                errors = arg.errors, warnings = arg.warnings;
                ref = OPTIONS.required;
                for (i = 0, len = ref.length; i < len; i++) {
                    reqOpt = ref[i];
                    if (!(reqOpt in rawOptions)) {
                        errors.push(new ErrorMissingRequired(rawOptions, reqOpt))
                    }
                }
            };
            checkConditionallyRequiredOptions = function(OPTIONS, arg, rawOptions) {
                var error, errors, i, len, option, ref, val, warnings;
                errors = arg.errors, warnings = arg.warnings;
                ref = OPTIONS.conditionallyRequired;
                for (i = 0, len = ref.length; i < len; i++) {
                    option = ref[i];
                    val = rawOptions[option];
                    error = OPTIONS.all[option].importance(option, val, rawOptions);
                    if (!error) {
                        continue
                    }
                    errors.push(error)
                }
            };
            checkUnrecognizedOptions = function(OPTIONS, arg, rawOptions) {
                var THRESHOLD, err, errors, idx, missingRequiredErrors, option, suggestion, warnings;
                errors = arg.errors, warnings = arg.warnings;
                THRESHOLD = 4;
                for (option in rawOptions) {
                    if (!(option in OPTIONS.all)) {
                        suggestion = spellChecker.suggest(OPTIONS.suggestable, option, THRESHOLD);
                        if (indexOf.call(OPTIONS.required, suggestion) >= 0 || indexOf.call(OPTIONS.conditionallyRequired, suggestion) >= 0) {
                            missingRequiredErrors = function() {
                                var i, len, results;
                                results = [];
                                for (idx = i = 0, len = errors.length; i < len; idx = ++i) {
                                    err = errors[idx];
                                    if (err instanceof ErrorMissingRequired && err.key === suggestion || err instanceof ErrorMissingOneOfRequired && err.keyA === suggestion) {
                                        results.push(idx)
                                    }
                                }
                                return results
                            }();
                            if (missingRequiredErrors.length > 0) {
                                idx = missingRequiredErrors[0];
                                errors[idx] = new ErrorMisspelledRequired(rawOptions, suggestion, option)
                            } else {
                                warnings.push(new WarnUnrecognized(rawOptions, option))
                            }
                        } else if (suggestion != null) {
                            warnings.push(new WarnMisspelledOptional(rawOptions, suggestion, option))
                        } else {
                            warnings.push(new WarnUnrecognized(rawOptions, option))
                        }
                    }
                }
            };
            checkOptionTypes = function(OPTIONS, arg, rawOptions) {
                var error, errors, filtered, message, option, type, val, warnings;
                errors = arg.errors, warnings = arg.warnings;
                filtered = {};
                for (option in rawOptions) {
                    val = rawOptions[option];
                    if (option in OPTIONS.all) {
                        filtered[option] = val
                    }
                }
                for (option in filtered) {
                    val = filtered[option];
                    error = OPTIONS.all[option].spec(option, val, rawOptions);
                    if (!error) {
                        continue
                    }
                    type = error.type, message = error.message;
                    if (type === ERROR) {
                        errors.push(new WarnOptionTypeError(rawOptions, option, message))
                    } else {
                        warnings.push(new WarnOptionTypeError(rawOptions, option, message))
                    }
                }
            };
            checkOptionContexts = function(OPTIONS, arg, rawOptions) {
                var error, errors, filtered, message, option, type, val, warnings;
                errors = arg.errors, warnings = arg.warnings;
                filtered = {};
                for (option in rawOptions) {
                    val = rawOptions[option];
                    if (option in OPTIONS.all) {
                        filtered[option] = val
                    }
                }
                for (option in filtered) {
                    val = filtered[option];
                    error = OPTIONS.all[option].checkContext(option, val, rawOptions);
                    if (!error) {
                        continue
                    }
                    type = error.type, message = error.message;
                    if (type === ERROR) {
                        errors.push(new WarnBadContext(rawOptions, option, message))
                    } else {
                        warnings.push(new WarnBadContext(rawOptions, option, message))
                    }
                }
            };
            validate = function(optionSpec, rawOptions) {
                var OPTIONS, errors, warnings;
                OPTIONS = fromSpec(optionSpec);
                errors = [];
                warnings = [];
                checkRequiredOptions(OPTIONS, {
                    errors: errors,
                    warnings: warnings
                }, rawOptions);
                checkConditionallyRequiredOptions(OPTIONS, {
                    errors: errors,
                    warnings: warnings
                }, rawOptions);
                checkUnrecognizedOptions(OPTIONS, {
                    errors: errors,
                    warnings: warnings
                }, rawOptions);
                checkOptionTypes(OPTIONS, {
                    errors: errors,
                    warnings: warnings
                }, rawOptions);
                checkOptionContexts(OPTIONS, {
                    errors: errors,
                    warnings: warnings
                }, rawOptions);
                return {
                    errors: errors,
                    warnings: warnings
                }
            };
            module.exports = {
                ErrorMissingRequired: ErrorMissingRequired,
                ErrorMissingOneOfRequired: ErrorMissingOneOfRequired,
                ErrorMisspelledRequired: ErrorMisspelledRequired,
                WarnMisspelledOptional: WarnMisspelledOptional,
                WarnUnrecognized: WarnUnrecognized,
                WarnOptionTypeError: WarnOptionTypeError,
                WarnBadContext: WarnBadContext,
                severities: {
                    ERROR: ERROR,
                    WARNING: WARNING
                },
                importances: {
                    OPTIONAL: OPTIONAL,
                    REQUIRED: REQUIRED,
                    PRIVATE: PRIVATE
                },
                simpleTypeCheck: simpleTypeCheck,
                simpleNullableTypeCheck: simpleNullableTypeCheck,
                isString: isString,
                isBoolean: isBoolean,
                isNumber: isNumber,
                isNullableString: isNullableString,
                isNullableBoolean: isNullableBoolean,
                isNullableNumber: isNullableNumber,
                ignore: ignore,
                xRequiresY: xRequiresY,
                xPrecludesY: xPrecludesY,
                coerceOption: coerceOption,
                validate: validate
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/optionParser": function(exports, require, module) {
        (function() {
            var CHECKOUT_DOCS_URL, _trackIndividual, extractValue, formatMessage, helpers, keymode, optionSpecs, optionValidator, trackError, trackSummary, trackWarning, tracker;
            tracker = require("lib/tracker");
            helpers = require("lib/helpers");
            optionValidator = require("lib/optionValidator");
            optionSpecs = require("lib/optionSpecs");
            keymode = require("lib/keymode");
            CHECKOUT_DOCS_URL = "https://stripe.com/docs/checkout";
            extractValue = function(rawOptions, key) {
                var dashed, downcased;
                if (rawOptions[key] != null) {
                    return rawOptions[key]
                }
                downcased = key.toLowerCase();
                if (rawOptions[downcased] != null) {
                    return rawOptions[downcased]
                }
                dashed = helpers.camelToDashCase(key);
                if (rawOptions[dashed] != null) {
                    return rawOptions[dashed]
                }
            };
            formatMessage = function(origin, message) {
                return "StripeCheckout." + origin + ": " + message + "\nYou can learn about the available configuration options in the Checkout docs:\n" + CHECKOUT_DOCS_URL
            };
            _trackIndividual = function(level, origin, rawOptions, error) {
                var k, parameters, ref, v;
                parameters = {
                    "optchecker-origin": origin
                };
                ref = error.trackedInfo();
                for (k in ref) {
                    v = ref[k];
                    parameters["optchecker-" + k] = v
                }
                switch (level) {
                    case "error":
                        tracker.track.configError(parameters, rawOptions);
                        break;
                    case "warning":
                        tracker.track.configWarning(parameters, rawOptions)
                }
            };
            trackSummary = function(parameters, rawOptions) {
                var k, prefixedParams, v;
                prefixedParams = {};
                for (k in parameters) {
                    v = parameters[k];
                    prefixedParams["optchecker-" + k] = v
                }
                return tracker.track.configSummary(prefixedParams, rawOptions)
            };
            trackError = function(origin, rawOptions, error) {
                return _trackIndividual("error", origin, rawOptions, error)
            };
            trackWarning = function(origin, rawOptions, error) {
                return _trackIndividual("warning", origin, rawOptions, error)
            };
            module.exports = {
                coerceButtonOption: function(option, val) {
                    return optionValidator.coerceOption(optionSpecs.buttonConfigureOptions, option, val)
                },
                parse: function(rawOptions) {
                    var OPTIONS, opt, optsettings, parsed, val;
                    if (rawOptions == null) {
                        rawOptions = {}
                    }
                    parsed = {};
                    if (rawOptions.buttonIntegration) {
                        OPTIONS = optionSpecs.buttonOpenOptions
                    } else {
                        OPTIONS = optionSpecs.customOpenOptions
                    }
                    for (opt in OPTIONS) {
                        optsettings = OPTIONS[opt];
                        val = extractValue(rawOptions, opt);
                        if (val == null && optsettings["default"] != null) {
                            val = optsettings["default"]
                        }
                        parsed[opt] = optionValidator.coerceOption(OPTIONS, opt, val)
                    }
                    if (parsed.shippingAddress) {
                        parsed.billingAddress = true
                    }
                    if (rawOptions.address != null && rawOptions.address !== "false" && rawOptions.address !== false) {
                        parsed.billingAddress = true
                    }
                    if (parsed.billingAddress) {
                        parsed.zipCode = false
                    }
                    return parsed
                },
                checkUsage: function(origin, rawOptions, isDarkMode) {
                    var OPTIONS, error, errors, i, isConfigure, isNotTestmode, j, len, len1, mode, numErrors, numWarnings, quiet, ref, warning, warnings;
                    if (isDarkMode == null) {
                        isDarkMode = false
                    }
                    mode = keymode.fromKey(rawOptions.key);
                    isNotTestmode = mode !== keymode.KEY_MODES.test;
                    quiet = isNotTestmode || isDarkMode;
                    isConfigure = origin === "configure";
                    if (rawOptions.buttonIntegration) {
                        if (isConfigure) {
                            OPTIONS = optionSpecs.buttonConfigureOptions
                        } else {
                            OPTIONS = optionSpecs.buttonOpenOptions
                        }
                    } else {
                        if (isConfigure) {
                            OPTIONS = optionSpecs.customConfigureOptions
                        } else {
                            OPTIONS = optionSpecs.customOpenOptions
                        }
                    }
                    ref = optionValidator.validate(OPTIONS, rawOptions), errors = ref.errors, warnings = ref.warnings;
                    numErrors = errors.length;
                    numWarnings = warnings.length;
                    trackSummary({
                        origin: origin,
                        numErrors: numErrors,
                        numWarnings: numWarnings
                    }, rawOptions);
                    for (i = 0, len = errors.length; i < len; i++) {
                        error = errors[i];
                        if (!quiet) {
                            if (typeof console !== "undefined" && console !== null) {
                                console.error(formatMessage(origin, error.toString()))
                            }
                        }
                        trackError(origin, rawOptions, error)
                    }
                    quiet || (quiet = numErrors > 0);
                    for (j = 0, len1 = warnings.length; j < len1; j++) {
                        warning = warnings[j];
                        if (!quiet) {
                            if (typeof console !== "undefined" && console !== null) {
                                console.warn(formatMessage(origin, warning.toString()))
                            }
                        }
                        trackWarning(origin, rawOptions, warning)
                    }
                }
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/keymode": function(exports, require, module) {
        (function() {
            var KEY_MODES, fromKey;
            KEY_MODES = {
                live: "live",
                test: "test",
                unknown: "unknown"
            };
            fromKey = function(key) {
                if (typeof key === "string" || key instanceof String) {
                    if (/^pk_test_.*$/.test(key)) {
                        return KEY_MODES.test
                    }
                    if (/^pk_live_.*$/.test(key)) {
                        return KEY_MODES.live
                    }
                }
                return KEY_MODES.unknown
            };
            module.exports = {
                fromKey: fromKey,
                KEY_MODES: KEY_MODES
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/rpc": function(exports, require, module) {
        (function() {
            var RPC, helpers, tracker, bind = function(fn, me) {
                    return function() {
                        return fn.apply(me, arguments)
                    }
                },
                slice = [].slice;
            helpers = require("lib/helpers");
            tracker = require("lib/tracker");
            RPC = function() {
                function RPC(target, options) {
                    if (options == null) {
                        options = {}
                    }
                    this.processMessage = bind(this.processMessage, this);
                    this.sendMessage = bind(this.sendMessage, this);
                    this.invoke = bind(this.invoke, this);
                    this.startSession = bind(this.startSession, this);
                    this.rpcID = 0;
                    this.target = target;
                    this.callbacks = {};
                    this.readyQueue = [];
                    this.readyStatus = false;
                    this.methods = {};
                    helpers.bind(window, "message", function(_this) {
                        return function() {
                            var args;
                            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                            return _this.message.apply(_this, args)
                        }
                    }(this))
                }
                RPC.prototype.startSession = function() {
                    this.sendMessage("frameReady");
                    return this.frameReady()
                };
                RPC.prototype.invoke = function() {
                    var args, method;
                    method = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
                    tracker.trace.rpcInvoke(method);
                    return this.ready(function(_this) {
                        return function() {
                            return _this.sendMessage(method, args)
                        }
                    }(this))
                };
                RPC.prototype.message = function(e) {
                    var error, shouldProcess;
                    shouldProcess = false;
                    try {
                        shouldProcess = e.source === this.target
                    } catch (error) {}
                    if (shouldProcess) {
                        return this.processMessage(e.data)
                    }
                };
                RPC.prototype.ready = function(fn) {
                    if (this.readyStatus) {
                        return fn()
                    } else {
                        return this.readyQueue.push(fn)
                    }
                };
                RPC.prototype.frameCallback = function(id, result) {
                    var base;
                    if (typeof(base = this.callbacks)[id] === "function") {
                        base[id](result)
                    }
                    delete this.callbacks[id];
                    return true
                };
                RPC.prototype.frameReady = function() {
                    var callbacks, cb, i, len;
                    this.readyStatus = true;
                    callbacks = this.readyQueue.slice(0);
                    for (i = 0, len = callbacks.length; i < len; i++) {
                        cb = callbacks[i];
                        cb()
                    }
                    return false
                };
                RPC.prototype.isAlive = function() {
                    return true
                };
                RPC.prototype.sendMessage = function(method, args) {
                    var err, id, message, ref;
                    if (args == null) {
                        args = []
                    }
                    id = ++this.rpcID;
                    if (typeof args[args.length - 1] === "function") {
                        this.callbacks[id] = args.pop()
                    }
                    message = JSON.stringify({
                        method: method,
                        args: args,
                        id: id
                    });
                    if (((ref = this.target) != null ? ref.postMessage : void 0) == null) {
                        err = new Error("Unable to communicate with Checkout. Please contact support@stripe.com if the problem persists.");
                        if (this.methods.rpcError != null) {
                            this.methods.rpcError(err)
                        } else {
                            throw err
                        }
                        return
                    }
                    this.target.postMessage(message, "*");
                    return tracker.trace.rpcPostMessage(method, args, id)
                };
                RPC.prototype.processMessage = function(data) {
                    var base, error, method, name, result;
                    try {
                        data = JSON.parse(data)
                    } catch (error) {
                        return
                    }
                    if (["frameReady", "frameCallback", "isAlive"].indexOf(data.method) !== -1) {
                        result = null;
                        method = this[data.method];
                        if (method != null) {
                            result = method.apply(this, data.args)
                        }
                    } else {
                        result = typeof(base = this.methods)[name = data.method] === "function" ? base[name].apply(base, data.args) : void 0
                    }
                    if (data.method !== "frameCallback") {
                        return this.invoke("frameCallback", data.id, result)
                    }
                };
                return RPC
            }();
            module.exports = RPC
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/uuid": function(exports, require, module) {
        (function() {
            var S4;
            S4 = function() {
                return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
            };
            module.exports.generate = function() {
                var delim;
                delim = "-";
                return S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4()
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/pixel": function(exports, require, module) {
        (function() {
            var canTrack, encode, generateID, getCookie, getCookieID, getLocalStorageID, redactSensitiveParams, request, setCookie, track;
            redactSensitiveParams = function(value) {
                var str;
                str = "";
                if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
                    str = String(value)
                }
                return str.replace(/((?:password|pass|pwd)[^=]*=)[^&]*/gi, "$1<sanitized>")
            };
            generateID = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                    var r, v;
                    r = Math.random() * 16 | 0;
                    v = c === "x" ? r : r & 3 | 8;
                    return v.toString(16)
                })
            };
            setCookie = function(name, value, options) {
                var cookie, expires;
                if (options == null) {
                    options = {}
                }
                if (options.expires === true) {
                    options.expires = -1
                }
                if (typeof options.expires === "number") {
                    expires = new Date;
                    expires.setTime(expires.getTime() + options.expires * 24 * 60 * 60 * 1e3);
                    options.expires = expires
                }
                if (options.path == null) {
                    options.path = "/"
                }
                value = (value + "").replace(/[^!#-+\--:<-\[\]-~]/g, encodeURIComponent);
                cookie = encodeURIComponent(name) + "=" + value;
                if (options.expires) {
                    cookie += ";expires=" + options.expires.toGMTString()
                }
                if (options.path) {
                    cookie += ";path=" + options.path
                }
                if (options.domain) {
                    cookie += ";domain=" + options.domain
                }
                return document.cookie = cookie
            };
            getCookie = function(name) {
                var cookie, cookies, i, index, key, len, value;
                cookies = document.cookie.split("; ");
                for (i = 0, len = cookies.length; i < len; i++) {
                    cookie = cookies[i];
                    index = cookie.indexOf("=");
                    key = decodeURIComponent(cookie.substr(0, index));
                    value = decodeURIComponent(cookie.substr(index + 1));
                    if (key === name) {
                        return value
                    }
                }
                return null
            };
            encode = function(param) {
                if (typeof param === "string") {
                    return encodeURIComponent(param)
                } else {
                    return encodeURIComponent(JSON.stringify(param))
                }
            };
            request = function(url, params, callback) {
                var image, k, v;
                if (params == null) {
                    params = {}
                }
                params.i = (new Date).getTime();
                params = function() {
                    var results;
                    results = [];
                    for (k in params) {
                        v = params[k];
                        results.push(k + "=" + encode(v))
                    }
                    return results
                }().join("&");
                image = new Image;
                if (callback) {
                    image.onload = callback
                }
                image.src = url + "?" + params;
                return true
            };
            canTrack = function() {
                var dnt, ref;
                dnt = (ref = window.navigator.doNotTrack) != null ? ref.toString().toLowerCase() : void 0;
                switch (dnt) {
                    case "1":
                    case "yes":
                    case "true":
                        return false;
                    default:
                        return true
                }
            };
            getLocalStorageID = function() {
                var err, error, lsid;
                if (!canTrack()) {
                    return "DNT"
                }
                try {
                    lsid = generateID();
                    return lsid
                } catch (error) {
                    err = error;
                    return "NA"
                }
            };
            getCookieID = function() {
                var err, error, id;
                if (!canTrack()) {
                    return "DNT"
                }
                try {
                    id = generateID();
                    return id
                } catch (error) {
                    err = error;
                    return "NA"
                }
            };
            track = function(event, params, callback) {
                var k, request_params, v;
                if (params == null) {
                    params = {}
                }
                request_params = {
                    event: event,
                    rf: window.location.host
                };
                for (k in params) {
                    v = params[k];
                    request_params[k] = redactSensitiveParams(v)
                }
                request_params.lsid || (request_params.lsid = getLocalStorageID());
                request_params.cid || (request_params.cid = getCookieID());
                return request("https://q.stripe.com", request_params, callback)
            };
            module.exports.track = track;
            module.exports.getLocalStorageID = getLocalStorageID;
            module.exports.getCookieID = getCookieID;
            module.exports.generateID = generateID;
            module.exports.redactSensitiveParams = redactSensitiveParams
        }).call(this)
    }
});
StripeCheckout.require.define({
    "lib/tracker": function(exports, require, module) {
        (function() {
            var config, helpers, isEventNameExisting, pixel, setOptions, stateParameters, trace, traceSerialize, track, tracker, uuid, indexOf = [].indexOf || function(item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) return i
                }
                return -1
            };
            uuid = require("lib/uuid");
            pixel = require("lib/pixel");
            helpers = require("lib/helpers");
            config = {
                enabled: false,
                tracingEnabled: false,
                eventNamePrefix: "checkout.",
                distinctId: uuid.generate()
            };
            stateParameters = {};
            tracker = {};
            tracker.setEnabled = function(enabled) {
                return config.enabled = enabled
            };
            tracker.setTracingEnabled = function(enabled) {
                return config.tracingEnabled = enabled
            };
            tracker.setDistinctID = function(value) {
                if (value) {
                    return config.distinctId = value
                }
            };
            tracker.getDistinctID = function() {
                return config.distinctId
            };
            tracker.track = {
                outerOpen: function(parameters) {
                    var requiredKeys;
                    requiredKeys = ["key"];
                    return track("outer.open", parameters, requiredKeys, {
                        appendStateParameters: false
                    })
                },
                selfHostedError: function() {
                    return track("outer.selfHosted")
                },
                tabOpeningError: function() {
                    return track("outer.tabOpeningError")
                },
                viewport: function(viewport) {
                    return track("outer.viewport", {
                        viewport: viewport
                    })
                },
                iOSWebViewType: function() {
                    var type;
                    type = helpers.getiOSWebViewType();
                    if (type) {
                        return track("inner.iOSWebViewType", {
                            type: type
                        })
                    }
                },
                open: function(options) {
                    setOptions(options);
                    return track("open")
                },
                close: function(parameters) {
                    return track("close", parameters, ["withToken"])
                },
                configSummary: function(parameters, options) {
                    setOptions(options);
                    return track("config.summary", parameters, ["optchecker-origin", "optchecker-numErrors", "optchecker-numWarnings"])
                },
                configError: function(parameters, options) {
                    setOptions(options);
                    return track("config.error", parameters, ["optchecker-origin", "optchecker-result"])
                },
                configWarning: function(parameters, options) {
                    setOptions(options);
                    return track("config.warning", parameters, ["optchecker-origin", "optchecker-result"])
                },
                keyOverride: function(values) {
                    return track("config.keyOverride", values, ["configure", "open"])
                },
                localeOverride: function(values) {
                    return track("config.localeOverride", values, ["configure", "open"])
                },
                imageOverride: function(values) {
                    return track("config.imageOverride", values, ["configure", "open"])
                },
                submit: function() {
                    return track("submit")
                },
                invalid: function(parameters) {
                    if (parameters["err"] == null && parameters["fields"] == null) {
                        throw new Error("Cannot track invalid because err or fields should be provided")
                    }
                    return track("invalid", parameters)
                },
                tokenError: function(msg) {
                    return track("token.error", {
                        message: msg,
                        type: "exception"
                    })
                },
                sourceError: function(msg) {
                    return track("source.error", {
                        message: msg,
                        type: "exception"
                    })
                },
                back: function(parameters) {
                    return track("back", parameters, ["from_step", "to_step"])
                },
                token: function(parameters) {
                    return track("token", parameters, ["stripe_token"])
                },
                source: function(parameters) {
                    return track("source", parameters, ["stripe_source"])
                },
                i18nLocKeyMissing: function(key) {
                    return track("i18n.loc.missingKey", {
                        template_key: key
                    })
                },
                i18nLocPartiallyReplacedTemplate: function(key, value) {
                    return track("i18n.loc.partiallyReplacedTemplate", {
                        template_key: key,
                        template_value: value
                    })
                },
                i18nFormatLocaleMissing: function(locale) {
                    return track("i18n.format.localeMissing", {
                        locale: locale
                    })
                },
                alert: function(parameters) {
                    return track("alert", parameters)
                }
            };
            tracker.trace = {
                trigger: function(eventName, args) {
                    var EXCLUDED_EVENTS;
                    EXCLUDED_EVENTS = ["didResize", "viewAddedToDOM", "valueDidChange", "checkedDidChange", "keyUp", "keyDown", "keyPress", "keyInput", "click", "blur"];
                    eventName = eventName.split(".");
                    if (eventName[eventName.length - 1] === "checkout") {
                        eventName.pop()
                    }
                    eventName = eventName.join(".");
                    if (indexOf.call(EXCLUDED_EVENTS, eventName) < 0) {
                        if (this._triggerQueue == null) {
                            this._triggerQueue = {}
                        }
                        this._triggerQueue[eventName] = traceSerialize(args);
                        return this._triggerTimeout != null ? this._triggerTimeout : this._triggerTimeout = setTimeout(function(_this) {
                            return function() {
                                var ref;
                                ref = _this._triggerQueue;
                                for (eventName in ref) {
                                    args = ref[eventName];
                                    trace("trigger." + eventName, {
                                        args: args
                                    })
                                }
                                _this._triggerQueue = {};
                                return _this._triggerTimeout = null
                            }
                        }(this), 0)
                    }
                },
                rpcInvoke: function(method) {
                    return trace("rpc.invoke." + method)
                },
                rpcPostMessage: function(method, args, id) {
                    return trace("rpc.postMessage." + method, {
                        id: id,
                        args: traceSerialize(args)
                    })
                }
            };
            tracker.state = {
                setUIType: function(type) {
                    return stateParameters["st-ui-type"] = type
                },
                setUIIntegration: function(integration) {
                    return stateParameters["st-ui-integration"] = integration
                },
                setVariants: function(variants) {
                    var k, results, v;
                    results = [];
                    for (k in variants) {
                        v = variants[k];
                        results.push(stateParameters["st-variant-" + k] = v)
                    }
                    return results
                },
                setFeature: function(name, variant, selector) {
                    stateParameters["st-variant-" + name] = variant;
                    return stateParameters["st-selector-" + name] = selector
                },
                setRequestedLocale: function(locale) {
                    return stateParameters["st-locale"] = locale
                }
            };
            tracker.dontTrack = function(fn) {
                var enabled;
                enabled = config.enabled;
                config.enabled = false;
                fn();
                return config.enabled = enabled
            };
            setOptions = function(options) {
                var k, results, trackerOptionsAllowList, v;
                trackerOptionsAllowList = ["logoUrl", "companyName", "zipCode", "panelLabel", "currency", "purchaseDescription", "key"];
                results = [];
                for (k in options) {
                    v = options[k];
                    if (trackerOptionsAllowList.indexOf(k) !== -1) {
                        results.push(stateParameters["option-" + k] = v)
                    } else {
                        results.push(void 0)
                    }
                }
                return results
            };
            isEventNameExisting = function(eventName) {
                var exists, k, ref, v;
                exists = false;
                ref = tracker.events;
                for (k in ref) {
                    v = ref[k];
                    if (v === eventName) {
                        exists = true;
                        break
                    }
                }
                return exists
            };
            trace = function(eventName, parameters, requiredKeys, options) {
                if (parameters == null) {
                    parameters = {}
                }
                if (requiredKeys == null) {
                    requiredKeys = []
                }
                if (options == null) {
                    options = {}
                }
                if (!config.tracingEnabled) {
                    return
                }
                eventName = "trace." + eventName;
                return track.apply(this, arguments)
            };
            track = function(eventName, parameters, requiredKeys, options) {
                var fullEventName, i, k, key, len, missingKeys, v;
                if (parameters == null) {
                    parameters = {}
                }
                if (requiredKeys == null) {
                    requiredKeys = []
                }
                if (options == null) {
                    options = {}
                }
                if (!config.enabled) {
                    return
                }
                missingKeys = function() {
                    var i, len, results;
                    results = [];
                    for (i = 0, len = requiredKeys.length; i < len; i++) {
                        key = requiredKeys[i];
                        if (!(key in parameters)) {
                            results.push(key)
                        }
                    }
                    return results
                }();
                if (missingKeys.length > 0) {
                    throw new Error("Missing required data (" + missingKeys.join(", ") + ") for tracking " + eventName + ".")
                }
                parameters.distinct_id = config.distinctId;
                parameters.eventId = uuid.generate();
                if (options.appendStateParameters == null) {
                    options.appendStateParameters = true
                }
                if (options.appendStateParameters) {
                    for (k in stateParameters) {
                        v = stateParameters[k];
                        parameters[k] = v
                    }
                }
                parameters.h = screen.height;
                parameters.w = screen.width;
                for (v = i = 0, len = parameters.length; i < len; v = ++i) {
                    k = parameters[v];
                    if (v instanceof Array) {
                        v.sort()
                    }
                }
                fullEventName = "" + config.eventNamePrefix + eventName;
                return pixel.track(fullEventName, parameters)
            };
            traceSerialize = function(value) {
                var k, obj, v;
                if (value instanceof Array) {
                    return JSON.stringify(function() {
                        var i, len, results;
                        results = [];
                        for (i = 0, len = value.length; i < len; i++) {
                            v = value[i];
                            results.push(traceSerialize(v))
                        }
                        return results
                    }())
                } else if (value != null && value.target != null && value.type != null) {
                    return traceSerialize({
                        type: value.type,
                        target_id: value.target.id
                    })
                } else if (value instanceof Object) {
                    if (value.constructor === Object) {
                        obj = {};
                        for (k in value) {
                            v = value[k];
                            obj[k] = traceSerialize(v)
                        }
                        return JSON.stringify(obj)
                    } else {
                        return value.toString()
                    }
                } else {
                    return value
                }
            };
            module.exports = tracker
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/lib/origins": function(exports, require, module) {
        (function() {
            var isLocalhost, isStripeHosted;
            isStripeHosted = function(src) {
                return src.match(/checkout\.stripe\.com/)
            };
            isLocalhost = function(src) {
                return src.match(/localhost/)
            };
            module.exports = {
                isStripeHosted: isStripeHosted,
                isLocalhost: isLocalhost
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/lib/utils": function(exports, require, module) {
        (function() {
            var $, $$, addClass, append, css, hasAttr, hasClass, insertAfter, insertBefore, parents, remove, resolve, text, trigger, indexOf = [].indexOf || function(item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) return i
                }
                return -1
            };
            $ = function(sel) {
                return document.querySelectorAll(sel)
            };
            $$ = function(cls) {
                var el, i, len, ref, reg, results;
                if (typeof document.getElementsByClassName === "function") {
                    return document.getElementsByClassName(cls)
                } else if (typeof document.querySelectorAll === "function") {
                    return document.querySelectorAll("." + cls)
                } else {
                    reg = new RegExp("(^|\\s)" + cls + "(\\s|$)");
                    ref = document.getElementsByTagName("*");
                    results = [];
                    for (i = 0, len = ref.length; i < len; i++) {
                        el = ref[i];
                        if (reg.test(el.className)) {
                            results.push(el)
                        }
                    }
                    return results
                }
            };
            hasAttr = function(element, attr) {
                var node;
                if (typeof element.hasAttribute === "function") {
                    return element.hasAttribute(attr)
                } else {
                    node = element.getAttributeNode(attr);
                    return !!(node && (node.specified || node.nodeValue))
                }
            };
            trigger = function(element, name, data, bubble) {
                if (data == null) {
                    data = {}
                }
                if (bubble == null) {
                    bubble = true
                }
                if (window.jQuery) {
                    return jQuery(element).trigger(name, data)
                }
            };
            addClass = function(element, name) {
                return element.className += " " + name
            };
            hasClass = function(element, name) {
                return indexOf.call(element.className.split(" "), name) >= 0
            };
            css = function(element, css) {
                return element.style.cssText += ";" + css
            };
            insertBefore = function(element, child) {
                return element.parentNode.insertBefore(child, element)
            };
            insertAfter = function(element, child) {
                return element.parentNode.insertBefore(child, element.nextSibling)
            };
            append = function(element, child) {
                return element.appendChild(child)
            };
            remove = function(element) {
                var ref;
                return (ref = element.parentNode) != null ? ref.removeChild(element) : void 0
            };
            parents = function(node) {
                var ancestors;
                ancestors = [];
                while ((node = node.parentNode) && node !== document && indexOf.call(ancestors, node) < 0) {
                    ancestors.push(node)
                }
                return ancestors
            };
            resolve = function(url) {
                var parser;
                parser = document.createElement("a");
                parser.href = url;
                return "" + parser.href
            };
            text = function(element, value) {
                if ("innerText" in element) {
                    element.innerText = value
                } else {
                    element.textContent = value
                }
                return value
            };
            module.exports = {
                $: $,
                $$: $$,
                hasAttr: hasAttr,
                trigger: trigger,
                addClass: addClass,
                hasClass: hasClass,
                css: css,
                insertBefore: insertBefore,
                insertAfter: insertAfter,
                append: append,
                remove: remove,
                parents: parents,
                resolve: resolve,
                text: text
            }
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/controllers/app": function(exports, require, module) {
        (function() {
            var App, Checkout, RPC, TokenCallback, keymode, optionParser, origins, tracker, utils, bind = function(fn, me) {
                return function() {
                    return fn.apply(me, arguments)
                }
            };
            Checkout = require("outer/controllers/checkout");
            TokenCallback = require("outer/controllers/tokenCallback");
            RPC = require("lib/rpc");
            optionParser = require("lib/optionParser");
            tracker = require("lib/tracker");
            utils = require("outer/lib/utils");
            origins = require("outer/lib/origins");
            keymode = require("lib/keymode");
            App = function() {
                function App(options) {
                    var ref, ref1;
                    if (options == null) {
                        options = {}
                    }
                    this.setForceAppType = bind(this.setForceAppType, this);
                    this.setForceView = bind(this.setForceView, this);
                    this.getHost = bind(this.getHost, this);
                    this.setHost = bind(this.setHost, this);
                    this.configure = bind(this.configure, this);
                    this.close = bind(this.close, this);
                    this.open = bind(this.open, this);
                    this.configurations = {};
                    this.checkouts = {};
                    this.constructorOptions = {
                        host: "https://checkout.stripe.com",
                        forceView: false,
                        forceAppType: false
                    };
                    this.timeLoaded = Math.floor((new Date).getTime() / 1e3);
                    this.totalButtons = 0;
                    if (((ref = window.Prototype) != null ? (ref1 = ref.Version) != null ? ref1.indexOf("1.6") : void 0 : void 0) === 0) {
                        console.error("Stripe Checkout is not compatible with your version of Prototype.js. Please upgrade to version 1.7 or greater.")
                    }
                    this.ensureStripeHosted()
                }
                App.prototype.open = function(options, buttonId) {
                    var checkout, k, mergedOptions, ref, v;
                    if (options == null) {
                        options = {}
                    }
                    if (buttonId == null) {
                        buttonId = null
                    }
                    mergedOptions = {};
                    if (buttonId && this.configurations[buttonId]) {
                        ref = this.configurations[buttonId];
                        for (k in ref) {
                            v = ref[k];
                            mergedOptions[k] = v
                        }
                    }
                    for (k in options) {
                        v = options[k];
                        mergedOptions[k] = v
                    }
                    if (mergedOptions.image) {
                        mergedOptions.image = utils.resolve(mergedOptions.image)
                    }
                    mergedOptions.referrer = document.referrer;
                    mergedOptions.url = document.URL;
                    mergedOptions.timeLoaded = this.timeLoaded;
                    optionParser.checkUsage("open", mergedOptions);
                    this.validateOptions(options, "open");
                    mergedOptions.createSource = !!mergedOptions.source;
                    if (buttonId) {
                        checkout = this.checkouts[buttonId];
                        if (options.token != null || options.onToken != null) {
                            checkout.setOnToken(new TokenCallback(options))
                        }
                    } else {
                        checkout = new Checkout(new TokenCallback(options), this.constructorOptions, options)
                    }
                    this.trackOpen(checkout, mergedOptions);
                    this.trackViewport();
                    return checkout.open(mergedOptions)
                };
                App.prototype.close = function(buttonId) {
                    var ref;
                    return (ref = this.checkouts[buttonId]) != null ? ref.close() : void 0
                };
                App.prototype.configure = function(buttonId, options) {
                    if (options == null) {
                        options = {}
                    }
                    if (buttonId instanceof Object) {
                        options = buttonId;
                        buttonId = "button" + this.totalButtons++
                    }
                    this.enableTracker(options);
                    this.emitDeveloperWarning(options);
                    optionParser.checkUsage("configure", options);
                    if (options.image) {
                        options.image = utils.resolve(options.image)
                    }
                    this.validateOptions(options, "configure");
                    this.configurations[buttonId] = options;
                    this.checkouts[buttonId] = new Checkout(new TokenCallback(options), this.constructorOptions, options);
                    this.checkouts[buttonId].preload(options);
                    return {
                        open: function(_this) {
                            return function(options) {
                                return _this.open(options, buttonId)
                            }
                        }(this),
                        close: function(_this) {
                            return function() {
                                return _this.close(buttonId)
                            }
                        }(this)
                    }
                };
                App.prototype.ensureStripeHosted = function() {
                    var src;
                    if (document.currentScript) {
                        src = document.currentScript.src;
                        if (!origins.isStripeHosted(src)) {
                            if (origins.isLocalhost(src)) {
                                return console.error("Checkout needs to be loaded directly from \nhttps://checkout.stripe.com/checkout.js\nOtherwise your integration will not work in production.")
                            } else {
                                this.trackSelfHostedError();
                                return console.error("Checkout needs to be loaded directly from https://checkout.stripe.com/checkout.js")
                            }
                        }
                    }
                };
                App.prototype.validateOptions = function(options, which) {
                    var error, url;
                    try {
                        return JSON.stringify(options)
                    } catch (error) {
                        url = "https://stripe.com/docs/checkout#integration-custom";
                        throw new Error("Stripe Checkout was unable to serialize the options passed to StripeCheckout." + which + "(). Please consult the doumentation to confirm that you're supplying values of the expected type: " + url)
                    }
                };
                App.prototype.emitDeveloperWarning = function(options) {
                    var isTestmode, mode;
                    mode = keymode.fromKey(options.key);
                    isTestmode = mode === keymode.KEY_MODES.test;
                    if (isTestmode) {
                        return typeof console !== "undefined" && console !== null ? console.warn("You’re using the legacy version of Stripe Checkout.\n\nWe released a new version of Checkout in April 2019, which supports mobile wallets and other payment methods:\nhttps://stripe.com/docs/payments/checkout\n\nLearn how to upgrade to the new version:\nhttps://stripe.com/docs/payments/checkout/migration") : void 0
                    }
                };
                App.prototype.setHost = function(host) {
                    return this.constructorOptions.host = host
                };
                App.prototype.getHost = function() {
                    return this.constructorOptions.host
                };
                App.prototype.setForceView = function(force) {
                    return this.constructorOptions.forceView = force
                };
                App.prototype.setForceAppType = function(force) {
                    return this.constructorOptions.forceAppType = force
                };
                App.prototype.enableTracker = function(options) {
                    return tracker.setEnabled(!options.notrack)
                };
                App.prototype.trackOpen = function(checkout, options) {
                    var data;
                    this.enableTracker(options);
                    data = {
                        key: options.key,
                        lsid: "NA",
                        cid: "NA"
                    };
                    return tracker.track.outerOpen(data)
                };
                App.prototype.trackSelfHostedError = function() {
                    tracker.setEnabled(true);
                    return tracker.track.selfHostedError()
                };
                App.prototype.trackViewport = function(checkout, options) {
                    var error, metaTags, tag, viewport, viewportContent;
                    metaTags = document.getElementsByTagName("meta");
                    viewportContent = function() {
                        var i, len, results;
                        results = [];
                        for (i = 0, len = metaTags.length; i < len; i++) {
                            tag = metaTags[i];
                            if (tag.name === "viewport" && !!tag.content) {
                                results.push(tag.content)
                            }
                        }
                        return results
                    }().join(",");
                    try {
                        viewport = viewportContent.split(",").map(function(t) {
                            return t.trim().toLowerCase()
                        }).sort().join(", ");
                        return tracker.track.viewport(viewport)
                    } catch (error) {}
                };
                return App
            }();
            module.exports = App
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/controllers/button": function(exports, require, module) {
        (function() {
            var $$, Button, addClass, append, hasAttr, hasClass, helpers, insertAfter, optionParser, parents, ref, resolve, text, trigger, bind = function(fn, me) {
                return function() {
                    return fn.apply(me, arguments)
                }
            };
            ref = require("outer/lib/utils"), $$ = ref.$$, hasClass = ref.hasClass, addClass = ref.addClass, trigger = ref.trigger, append = ref.append, text = ref.text, parents = ref.parents, insertAfter = ref.insertAfter, hasAttr = ref.hasAttr, resolve = ref.resolve;
            helpers = require("lib/helpers");
            optionParser = require("lib/optionParser");
            Button = function() {
                Button.totalButtonId = 0;
                Button.load = function(app) {
                    var button, el, element;
                    element = $$("stripe-button");
                    element = function() {
                        var i, len, results;
                        results = [];
                        for (i = 0, len = element.length; i < len; i++) {
                            el = element[i];
                            if (!hasClass(el, "active")) {
                                results.push(el)
                            }
                        }
                        return results
                    }();
                    element = element[element.length - 1];
                    if (!element) {
                        return
                    }
                    addClass(element, "active");
                    button = new Button(element, app);
                    return button.append()
                };

                function Button(scriptEl, app) {
                    this.parseOptions = bind(this.parseOptions, this);
                    this.parentHead = bind(this.parentHead, this);
                    this.parentForm = bind(this.parentForm, this);
                    this.onToken = bind(this.onToken, this);
                    this.open = bind(this.open, this);
                    this.submit = bind(this.submit, this);
                    this.append = bind(this.append, this);
                    this.render = bind(this.render, this);
                    var base;
                    this.scriptEl = scriptEl;
                    this.app = app;
                    this.document = this.scriptEl.ownerDocument;
                    this.options = this.parseOptions();
                    (base = this.options).label || (base.label = "Pay with Card");
                    this.options.token = this.onToken;
                    this.options.buttonIntegration = true;
                    this.$el = document.createElement("button");
                    this.$el.setAttribute("type", "submit");
                    this.$el.className = "stripe-button-el";
                    helpers.bind(this.$el, "click", this.submit);
                    helpers.bind(this.$el, "touchstart", function() {});
                    this.render()
                }
                Button.prototype.render = function() {
                    this.$el.innerHTML = "";
                    this.$span = document.createElement("span");
                    text(this.$span, this.options.label);
                    if (!this.nostyle) {
                        this.$el.style.visibility = "hidden";
                        this.$span.style.display = "block";
                        this.$span.style.minHeight = "30px"
                    }
                    this.$style = document.createElement("link");
                    this.$style.setAttribute("type", "text/css");
                    this.$style.setAttribute("rel", "stylesheet");
                    this.$style.setAttribute("href", this.app.getHost() + "/v3/checkout/button-qpwW2WfkB0oGWVWIASjIOQ.css");
                    return append(this.$el, this.$span)
                };
                Button.prototype.append = function() {
                    var head;
                    if (this.scriptEl) {
                        insertAfter(this.scriptEl, this.$el)
                    }
                    if (!this.nostyle) {
                        head = this.parentHead();
                        if (head) {
                            append(head, this.$style)
                        }
                    }
                    if (this.$form = this.parentForm()) {
                        helpers.unbind(this.$form, "submit", this.submit);
                        helpers.bind(this.$form, "submit", this.submit)
                    }
                    if (!this.nostyle) {
                        setTimeout(function(_this) {
                            return function() {
                                return _this.$el.style.visibility = "visible"
                            }
                        }(this), 1e3)
                    }
                    this.app.setHost(helpers.host(this.scriptEl.src));
                    return this.appHandler = this.app.configure(this.options, {
                        form: this.$form
                    })
                };
                Button.prototype.disable = function() {
                    return this.$el.setAttribute("disabled", true)
                };
                Button.prototype.enable = function() {
                    return this.$el.removeAttribute("disabled")
                };
                Button.prototype.isDisabled = function() {
                    return hasAttr(this.$el, "disabled")
                };
                Button.prototype.submit = function(e) {
                    if (typeof e.preventDefault === "function") {
                        e.preventDefault()
                    }
                    if (!this.isDisabled()) {
                        this.open()
                    }
                    return false
                };
                Button.prototype.open = function() {
                    return this.appHandler.open(this.options)
                };
                Button.prototype.onToken = function(token, args) {
                    var $input, $tokenInput, $tokenTypeInput, key, value;
                    trigger(this.scriptEl, "token", token);
                    if (this.$form) {
                        $tokenInput = this.renderInput("stripeToken", token.id);
                        append(this.$form, $tokenInput);
                        $tokenTypeInput = this.renderInput("stripeTokenType", token.type);
                        append(this.$form, $tokenTypeInput);
                        if (token.email) {
                            append(this.$form, this.renderInput("stripeEmail", token.email))
                        }
                        if (args) {
                            for (key in args) {
                                value = args[key];
                                $input = this.renderInput(this.formatKey(key), value);
                                append(this.$form, $input)
                            }
                        }
                        this.$form.submit()
                    }
                    return this.disable()
                };
                Button.prototype.formatKey = function(key) {
                    var arg, args, i, len;
                    args = key.split("_");
                    key = "";
                    for (i = 0, len = args.length; i < len; i++) {
                        arg = args[i];
                        if (arg.length > 0) {
                            key = key + arg.substr(0, 1).toUpperCase() + arg.substr(1).toLowerCase()
                        }
                    }
                    return "stripe" + key
                };
                Button.prototype.renderInput = function(name, value) {
                    var input;
                    input = document.createElement("input");
                    input.type = "hidden";
                    input.name = name;
                    input.value = value;
                    return input
                };
                Button.prototype.parentForm = function() {
                    var el, elements, i, len, ref1;
                    elements = parents(this.$el);
                    for (i = 0, len = elements.length; i < len; i++) {
                        el = elements[i];
                        if (((ref1 = el.tagName) != null ? ref1.toLowerCase() : void 0) === "form") {
                            return el
                        }
                    }
                    return null
                };
                Button.prototype.parentHead = function() {
                    var ref1, ref2;
                    return ((ref1 = this.document) != null ? ref1.head : void 0) || ((ref2 = this.document) != null ? ref2.getElementsByTagName("head")[0] : void 0) || this.document.body
                };
                Button.prototype.parseOptions = function() {
                    var attr, camelOption, coercedValue, i, len, match, options, ref1, val;
                    options = {};
                    ref1 = this.scriptEl.attributes;
                    for (i = 0, len = ref1.length; i < len; i++) {
                        attr = ref1[i];
                        match = attr.name.match(/^data-(.+)$/);
                        if (match != null ? match[1] : void 0) {
                            camelOption = helpers.dashToCamelCase(match[1]);
                            if (camelOption === "image") {
                                if (attr.value) {
                                    val = resolve(attr.value)
                                }
                            } else {
                                val = attr.value
                            }
                            coercedValue = optionParser.coerceButtonOption(camelOption, val);
                            options[camelOption] = coercedValue;
                            if (options.__originals == null) {
                                options.__originals = {}
                            }
                            options.__originals[camelOption] = match[0]
                        }
                    }
                    return options
                };
                return Button
            }();
            module.exports = Button
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/controllers/checkout": function(exports, require, module) {
        (function() {
            var Checkout, IframeView, TabView, helpers, tracker, bind = function(fn, me) {
                return function() {
                    return fn.apply(me, arguments)
                }
            };
            helpers = require("lib/helpers");
            IframeView = require("outer/views/iframeView");
            TabView = require("outer/views/tabView");
            tracker = require("lib/tracker");
            Checkout = function() {
                Checkout.activeView = null;

                function Checkout(tokenCallback, options, configOptions) {
                    this.isLegacyIe = bind(this.isLegacyIe, this);
                    this.onTokenCallback = bind(this.onTokenCallback, this);
                    this.preload = bind(this.preload, this);
                    this.open = bind(this.open, this);
                    this.createView = bind(this.createView, this);
                    this.setOnToken = bind(this.setOnToken, this);
                    var couldBeBrokenSFSVC, forceIframeViewFromQuery, isFullscreenMobileCapableViewport;
                    this.host = options.host;
                    this.forceView = options.forceView;
                    this.forceAppType = options.forceAppType;
                    this.opened = false;
                    this.setOnToken(tokenCallback);
                    this.isMobileWebView = helpers.isNativeWebContainer() || helpers.isAndroidWebapp() || helpers.isAndroidFacebookApp() || helpers.isiOSWebView() || helpers.isiOSBroken();
                    couldBeBrokenSFSVC = helpers.couldBeBrokenSFSVC();
                    isFullscreenMobileCapableViewport = helpers.isFullscreenMobileCapableViewport();
                    forceIframeViewFromQuery = window.location.search.indexOf("__stripe_private_force_mobile_frame=true") !== -1;
                    this.useFullscreenMobileView = function() {
                        if (forceIframeViewFromQuery) {
                            return true
                        }
                        if (!isFullscreenMobileCapableViewport) {
                            return false
                        }
                        return couldBeBrokenSFSVC || helpers.isSafariStandaloneMode()
                    };
                    this.shouldPopup = helpers.isSupportedMobileOS() && !this.isMobileWebView && !this.useFullscreenMobileView();
                    this.createView()
                }
                Checkout.prototype.setOnToken = function(tokenCallback) {
                    var ref;
                    this.tokenCallback = tokenCallback;
                    this.onToken = function(_this) {
                        return function(data) {
                            return tokenCallback.trigger(data.token, data.args, _this.onTokenCallback)
                        }
                    }(this);
                    return (ref = this.view) != null ? ref.onToken = this.onToken : void 0
                };
                Checkout.prototype.createView = function() {
                    var forceViewClass, path, viewClass, views;
                    if (this.view != null) {
                        return
                    }
                    views = {
                        IframeView: IframeView,
                        TabView: TabView
                    };
                    forceViewClass = views[this.forceView];
                    viewClass = function() {
                        switch (false) {
                            case !forceViewClass:
                                return forceViewClass;
                            case !this.shouldPopup:
                                return TabView;
                            default:
                                return IframeView
                        }
                    }.call(this);
                    path = "/v3/82u6Z5A5MLNC2LtLYKXrWQ.html?distinct_id=" + tracker.getDistinctID();
                    if (this.forceAppType) {
                        path = path + "&force_app_type=" + this.forceAppType
                    }
                    this.view = new viewClass(this.onToken, this.host, path);
                    if (this.preloadOptions != null) {
                        this.view.preload(this.preloadOptions);
                        return this.preloadOptions = null
                    }
                };
                Checkout.prototype.open = function(options) {
                    var iframeFallback;
                    if (options == null) {
                        options = {}
                    }
                    this.opened = true;
                    if (Checkout.activeView && Checkout.activeView !== this.view) {
                        Checkout.activeView.close()
                    }
                    Checkout.activeView = this.view;
                    options.supportsTokenCallback = this.tokenCallback.supportsTokenCallback();
                    iframeFallback = function(_this) {
                        return function() {
                            if (!(_this.view instanceof TabView)) {
                                return
                            }
                            _this.view = new IframeView(_this.onToken, _this.host, "/v3/82u6Z5A5MLNC2LtLYKXrWQ.html");
                            tracker.track.tabOpeningError();
                            return _this.open(options)
                        }
                    }(this);
                    if (helpers.isiOSChrome() && helpers.iOSChromeTabViewWillFail()) {
                        return iframeFallback()
                    }
                    return this.view.open(options, function(_this) {
                        return function(status) {
                            if (!status) {
                                return iframeFallback()
                            }
                        }
                    }(this))
                };
                Checkout.prototype.close = function() {
                    var ref;
                    return (ref = this.view) != null ? ref.close() : void 0
                };
                Checkout.prototype.preload = function(options) {
                    if (this.view != null) {
                        return this.view.preload(options)
                    } else {
                        return this.preloadOptions = options
                    }
                };
                Checkout.prototype.onTokenCallback = function() {
                    return this.view.triggerTokenCallback.apply(this.view, arguments)
                };
                Checkout.prototype.isLegacyIe = function() {
                    return !(window.XMLHttpRequest != null && (new XMLHttpRequest).withCredentials != null)
                };
                return Checkout
            }();
            module.exports = Checkout
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/controllers/tokenCallback": function(exports, require, module) {
        (function() {
            var TokenCallback, bind = function(fn, me) {
                return function() {
                    return fn.apply(me, arguments)
                }
            };
            TokenCallback = function() {
                function TokenCallback(options) {
                    this.supportsTokenCallback = bind(this.supportsTokenCallback, this);
                    this.trigger = bind(this.trigger, this);
                    if (options.token) {
                        this.fn = options.token;
                        this.version = 1
                    }
                    if (options.source) {
                        this.fn = options.source;
                        this.version = 1
                    } else if (options.onToken) {
                        this.fn = options.onToken;
                        this.version = 2
                    }
                }
                TokenCallback.prototype.trigger = function(token, addresses, callback) {
                    var data, k, shipping, v;
                    if (this.version === 2) {
                        data = {
                            token: token
                        };
                        shipping = null;
                        for (k in addresses) {
                            v = addresses[k];
                            if (/^shipping_/.test(k)) {
                                if (shipping == null) {
                                    shipping = {}
                                }
                                shipping[k.replace(/^shipping_/, "")] = v
                            }
                        }
                        if (shipping != null) {
                            data.shipping = shipping
                        }
                        return this.fn(data, callback)
                    } else {
                        return this.fn(token, addresses)
                    }
                };
                TokenCallback.prototype.supportsTokenCallback = function() {
                    return this.version > 1
                };
                return TokenCallback
            }();
            module.exports = TokenCallback
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/views/iframeView": function(exports, require, module) {
        (function() {
            var IframeView, RPC, View, helpers, ready, utils, bind = function(fn, me) {
                    return function() {
                        return fn.apply(me, arguments)
                    }
                },
                extend = function(child, parent) {
                    for (var key in parent) {
                        if (hasProp.call(parent, key)) child[key] = parent[key]
                    }

                    function ctor() {
                        this.constructor = child
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor;
                    child.__super__ = parent.prototype;
                    return child
                },
                hasProp = {}.hasOwnProperty;
            utils = require("outer/lib/utils");
            helpers = require("lib/helpers");
            RPC = require("lib/rpc");
            View = require("outer/views/view");
            ready = require("vendor/ready");
            IframeView = function(superClass) {
                extend(IframeView, superClass);

                function IframeView(onToken, host, path) {
                    this.configure = bind(this.configure, this);
                    this.removeFrame = bind(this.removeFrame, this);
                    this.removeTouchOverlay = bind(this.removeTouchOverlay, this);
                    this.showTouchOverlay = bind(this.showTouchOverlay, this);
                    this.attachIframe = bind(this.attachIframe, this);
                    this.setToken = bind(this.setToken, this);
                    this.closed = bind(this.closed, this);
                    this.close = bind(this.close, this);
                    this.preload = bind(this.preload, this);
                    this.opened = bind(this.opened, this);
                    this.open = bind(this.open, this);
                    IframeView.__super__.constructor.apply(this, arguments);
                    this.useFullscreenMobileIframe = helpers.couldBeBrokenSFSVC();
                    this.backButtonListener = function(_this) {
                        return function() {
                            if (history.state === "temp1") {
                                _this.frame.style.visibility = "hidden";
                                _this.frame.style.display = "none";
                                return _this.close()
                            }
                        }
                    }(this)
                }
                IframeView.prototype.open = function(options, callback) {
                    IframeView.__super__.open.apply(this, arguments);
                    return ready(function(_this) {
                        return function() {
                            var left, loaded, ref;
                            _this.originalOverflowValue = document.body.style.overflow;
                            if (_this.useFullscreenMobileIframe) {
                                _this.originalPositionValue = document.body.style.position;
                                _this.originalWidthValue = document.body.style.width;
                                _this.originalHeightValue = document.body.style.height;
                                history.pushState("temp1", null, null);
                                history.pushState("temp2", null, null);
                                window.addEventListener("popstate", _this.backButtonListener);
                                document.body.style.overflow = "hidden";
                                document.body.style.position = "fixed";
                                document.body.style.width = "100%";
                                document.body.style.height = "100%"
                            }
                            if (_this.frame == null) {
                                _this.configure()
                            }
                            if (typeof $ !== "undefined" && $ !== null ? (ref = $.fn) != null ? ref.modal : void 0 : void 0) {
                                $(document).off("focusin.bs.modal").off("focusin.modal")
                            }
                            if (helpers.isIE()) {
                                document.body.style.overflow = "hidden"
                            }
                            _this.frame.style.display = "block";
                            if (_this.shouldShowTouchOverlay()) {
                                _this.showTouchOverlay();
                                left = window.scrollX || window.pageXOffset;
                                if (_this.iframeWidth() < window.innerWidth) {
                                    left += (window.innerWidth - _this.iframeWidth()) / 2
                                }
                                _this.frame.style.top = (window.scrollY || window.pageYOffset) + "px";
                                _this.frame.style.left = left + "px"
                            }
                            loaded = false;
                            setTimeout(function() {
                                if (loaded) {
                                    return
                                }
                                loaded = true;
                                callback(false);
                                return _this.removeFrame()
                            }, 8e3);
                            return _this.rpc.ready(function() {
                                if (loaded) {
                                    return
                                }
                                loaded = true;
                                callback(true);
                                _this.rpc.invoke("render", "", "iframe", _this.options);
                                if (helpers.isIE()) {
                                    document.body.style.overflow = "hidden"
                                }
                                return _this.rpc.invoke("open", {
                                    timeLoaded: _this.options.timeLoaded
                                })
                            })
                        }
                    }(this))
                };
                IframeView.prototype.opened = function() {
                    var base;
                    return typeof(base = this.options).opened === "function" ? base.opened() : void 0
                };
                IframeView.prototype.preload = function(options) {
                    return ready(function(_this) {
                        return function() {
                            _this.configure();
                            return _this.rpc.invoke("preload", options)
                        }
                    }(this))
                };
                IframeView.prototype.iframeWidth = function() {
                    if (helpers.isSmallScreen()) {
                        return 328
                    } else {
                        return 380
                    }
                };
                IframeView.prototype.close = function() {
                    if (!!this.rpc.target.window) {
                        return this.rpc.invoke("close")
                    }
                };
                IframeView.prototype.closed = function(e) {
                    var base, tokenReceived;
                    tokenReceived = this.token != null;
                    document.body.style.overflow = this.originalOverflowValue;
                    this.removeFrame();
                    if (this.useFullscreenMobileIframe) {
                        document.body.style.position = this.originalPositionValue;
                        document.body.style.width = this.originalWidthValue;
                        document.body.style.height = this.originalHeightValue;
                        window.removeEventListener("popstate", this.backButtonListener);
                        if (history.state === "temp2") {
                            history.go(-2)
                        } else if (history.state === "temp1") {
                            history.go(-1)
                        }
                    }
                    clearTimeout(this.tokenTimeout);
                    if (tokenReceived) {
                        this.onToken(this.token)
                    }
                    this.token = null;
                    if (typeof(base = this.options).closed === "function") {
                        base.closed()
                    }
                    if ((e != null ? e.type : void 0) === "error.close") {
                        return alert(e.message)
                    } else if (!tokenReceived) {
                        return this.preload(this.options)
                    }
                };
                IframeView.prototype.setToken = function(data) {
                    this.token = data;
                    if (this.tokenTimeout == null) {
                        this.tokenTimeout = setTimeout(function(_this) {
                            return function() {
                                _this.onToken(_this.token);
                                _this.tokenTimeout = null;
                                return _this.token = null
                            }
                        }(this), 3e3)
                    }
                    return null
                };
                IframeView.prototype.attachIframe = function() {
                    var cssText, iframe;
                    iframe = document.createElement("iframe");
                    iframe.setAttribute("frameBorder", "0");
                    iframe.setAttribute("allowtransparency", "true");
                    cssText = "z-index: 2147483647;\ndisplay: none;\nbackground: transparent;\nbackground: rgba(0,0,0,0.005);\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: auto;\nvisibility: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none;";
                    if (this.shouldShowTouchOverlay()) {
                        cssText += "position: absolute;\nwidth: " + this.iframeWidth() + "px;\nheight: " + Math.max(document.body.scrollHeight, window.innerHeight) + "px;"
                    } else {
                        cssText += "position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;";
                        if (this.useFullscreenMobileIframe) {
                            cssText += "overflow-x: hidden;\noverflow-y: auto;\nbackground-color: white;"
                        }
                    }
                    iframe.style.cssText = cssText;
                    helpers.bind(iframe, "load", function() {
                        return iframe.style.visibility = "visible"
                    });
                    iframe.src = this.host + this.path;
                    iframe.className = iframe.name = "stripe_checkout_app";
                    utils.append(document.body, iframe);
                    return iframe
                };
                IframeView.prototype.showTouchOverlay = function() {
                    var toRepaint;
                    if (this.overlay) {
                        return
                    }
                    this.overlay = document.createElement("div");
                    this.overlay.style.cssText = "z-index: 2147483646;\nbackground: #000;\nopacity: 0;\nborder: 0px none transparent;\noverflow: none;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none;\ntransition: opacity 320ms ease;\n-webkit-transition: opacity 320ms ease;\n-moz-transition: opacity 320ms ease;\n-ms-transition: opacity 320ms ease;";
                    this.overlay.style.position = "absolute";
                    this.overlay.style.left = 0;
                    this.overlay.style.top = 0;
                    this.overlay.style.width = document.body.scrollWidth + "px";
                    this.overlay.style.height = Math.max(document.body.scrollHeight, window.innerHeight) + "px";
                    utils.append(document.body, this.overlay);
                    toRepaint = this.overlay.offsetHeight;
                    return this.overlay.style.opacity = "0.5"
                };
                IframeView.prototype.removeTouchOverlay = function() {
                    var overlay;
                    if (!this.overlay) {
                        return
                    }
                    overlay = this.overlay;
                    overlay.style.opacity = "0";
                    setTimeout(function() {
                        return utils.remove(overlay)
                    }, 400);
                    return this.overlay = null
                };
                IframeView.prototype.removeFrame = function() {
                    var frame;
                    if (!this.frame) {
                        return
                    }
                    if (this.shouldShowTouchOverlay()) {
                        this.removeTouchOverlay()
                    }
                    frame = this.frame;
                    if (this.useFullscreenMobileIframe) {
                        this.frame.style.visibility = "hidden";
                        this.frame.style.display = "none"
                    }
                    setTimeout(function() {
                        return utils.remove(frame)
                    }, 500);
                    return this.frame = null
                };
                IframeView.prototype.configure = function() {
                    if (this.frame != null) {
                        this.removeFrame()
                    }
                    this.frame = this.attachIframe();
                    this.rpc = new RPC(this.frame.contentWindow, {
                        host: this.host
                    });
                    this.rpc.methods.closed = this.closed;
                    this.rpc.methods.setToken = this.setToken;
                    return this.rpc.methods.opened = this.opened
                };
                IframeView.prototype.shouldShowTouchOverlay = function() {
                    return !this.useFullscreenMobileIframe && helpers.isSupportedMobileOS()
                };
                return IframeView
            }(View);
            module.exports = IframeView
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/views/tabView": function(exports, require, module) {
        (function() {
            var RPC, TabView, View, helpers, bind = function(fn, me) {
                    return function() {
                        return fn.apply(me, arguments)
                    }
                },
                extend = function(child, parent) {
                    for (var key in parent) {
                        if (hasProp.call(parent, key)) child[key] = parent[key]
                    }

                    function ctor() {
                        this.constructor = child
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor;
                    child.__super__ = parent.prototype;
                    return child
                },
                hasProp = {}.hasOwnProperty;
            RPC = require("lib/rpc");
            helpers = require("lib/helpers");
            View = require("outer/views/view");
            TabView = function(superClass) {
                extend(TabView, superClass);

                function TabView() {
                    this.invokeOnToken = bind(this.invokeOnToken, this);
                    this.closed = bind(this.closed, this);
                    this.checkForClosedTab = bind(this.checkForClosedTab, this);
                    this.setToken = bind(this.setToken, this);
                    this.fullPath = bind(this.fullPath, this);
                    this.close = bind(this.close, this);
                    this.open = bind(this.open, this);
                    TabView.__super__.constructor.apply(this, arguments);
                    this.closedTabInterval = null;
                    this.color = null;
                    this.colorSet = false;
                    this.invokedOnToken = false
                }
                TabView.prototype.open = function(options, callback) {
                    var base, error, ref, ref1, targetName, url;
                    TabView.__super__.open.apply(this, arguments);
                    this.token = null;
                    this.invokedOnToken = false;
                    try {
                        if ((ref = this.frame) != null) {
                            ref.close()
                        }
                    } catch (error) {}
                    if (window.name === "stripe_checkout_tabview") {
                        window.name = ""
                    }
                    if (helpers.isiOSChrome()) {
                        targetName = "_blank"
                    } else {
                        targetName = "stripe_checkout_tabview"
                    }
                    this.frame = window.open(this.fullPath(), targetName);
                    if (!this.frame && ((ref1 = this.options.key) != null ? ref1.indexOf("test") : void 0) !== -1) {
                        url = "https://stripe.com/docs/checkout#integration-more-runloop";
                        console.error("Stripe Checkout was unable to open a new window, possibly due to a popup blocker.\nTo provide the best experience for your users, follow the guide at " + url + ".\nThis message will only appear when using a test publishable key.")
                    }
                    if (!this.frame || this.frame === window) {
                        this.close();
                        callback(false);
                        return
                    }
                    if (typeof(base = this.frame).focus === "function") {
                        base.focus()
                    }
                    this.rpc = new RPC(this.frame, {
                        host: this.host
                    });
                    this.rpc.methods.setToken = this.setToken;
                    this.rpc.methods.closed = this.closed;
                    return this.rpc.ready(function(_this) {
                        return function() {
                            var base1;
                            callback(true);
                            _this.rpc.invoke("render", "", "tab", _this.options);
                            _this.rpc.invoke("open");
                            if (typeof(base1 = _this.options).opened === "function") {
                                base1.opened()
                            }
                            return _this.checkForClosedTab()
                        }
                    }(this))
                };
                TabView.prototype.close = function() {
                    if (this.frame && this.frame !== window) {
                        return this.frame.close()
                    }
                };
                TabView.prototype.fullPath = function() {
                    return this.host + this.path
                };
                TabView.prototype.setToken = function(data) {
                    this.token = data;
                    if (this.tokenTimeout == null) {
                        this.tokenTimeout = setTimeout(function(_this) {
                            return function() {
                                _this.invokeOnToken();
                                _this.tokenTimeout = null;
                                return _this.token = null
                            }
                        }(this), 3e3)
                    }
                    return null
                };
                TabView.prototype.checkForClosedTab = function() {
                    if (this.closedTabInterval) {
                        clearInterval(this.closedTabInterval)
                    }
                    return this.closedTabInterval = setInterval(function(_this) {
                        return function() {
                            if (!_this.frame || !_this.frame.postMessage || _this.frame.closed) {
                                return _this.closed()
                            }
                        }
                    }(this), 100)
                };
                TabView.prototype.closed = function() {
                    var base;
                    clearInterval(this.closedTabInterval);
                    clearTimeout(this.tokenTimeout);
                    this.invokeOnToken();
                    return typeof(base = this.options).closed === "function" ? base.closed() : void 0
                };
                TabView.prototype.invokeOnToken = function() {
                    if (this.token != null && !this.invokedOnToken) {
                        this.onToken(this.token);
                        return this.invokedOnToken = true
                    }
                };
                return TabView
            }(View);
            module.exports = TabView
        }).call(this)
    }
});
StripeCheckout.require.define({
    "outer/views/view": function(exports, require, module) {
        (function() {
            var View, bind = function(fn, me) {
                    return function() {
                        return fn.apply(me, arguments)
                    }
                },
                slice = [].slice;
            View = function() {
                function View(onToken, host, path) {
                    this.triggerTokenCallback = bind(this.triggerTokenCallback, this);
                    this.open = bind(this.open, this);
                    this.onToken = onToken;
                    this.host = host;
                    this.path = path
                }
                View.prototype.open = function(options, callback) {
                    return this.options = options
                };
                View.prototype.close = function() {};
                View.prototype.preload = function(options) {};
                View.prototype.triggerTokenCallback = function() {
                    var args;
                    args = arguments;
                    return this.rpc.ready(function(_this) {
                        return function() {
                            var ref;
                            return (ref = _this.rpc).invoke.apply(ref, ["tokenCallback"].concat(slice.call(args)))
                        }
                    }(this))
                };
                return View
            }();
            module.exports = View
        }).call(this)
    }
});
(function() {
    var App, Button, app, ref, ref1, ref2, ref3, require;
    require = require || this.StripeCheckout.require;
    Button = require("outer/controllers/button");
    App = require("outer/controllers/app");
    if (((ref = this.StripeCheckout) != null ? ref.__app : void 0) == null) {
        this.StripeCheckout || (this.StripeCheckout = {});
        this.StripeCheckout.__app = app = new App;
        this.StripeCheckout.open = app.open;
        this.StripeCheckout.configure = app.configure;
        this.StripeButton = this.StripeCheckout;
        if (((ref1 = this.StripeCheckout) != null ? ref1.__forceView : void 0) != null) {
            app.setForceView(this.StripeCheckout.__forceView)
        }
        if (((ref2 = this.StripeCheckout) != null ? ref2.__forceAppType : void 0) != null) {
            app.setForceAppType(this.StripeCheckout.__forceAppType)
        }
        if (((ref3 = this.StripeCheckout) != null ? ref3.__host : void 0) && this.StripeCheckout.__host !== "") {
            app.setHost(this.StripeCheckout.__host)
        }
    }
    Button.load(this.StripeCheckout.__app)
}).call(this);
