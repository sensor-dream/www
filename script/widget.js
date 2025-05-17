/*! For license information please see widget.js.LICENSE.txt */
(() => {
    "use strict";
    var t = {};

    function e() {
        try {
            if (window.ym) {
                const t = document.cookie.match("(?:^|;)\\s*_ym_uid=([^;]*)");
                return t ? decodeURIComponent(t[1]) : void 0
            }
        } catch (t) {
            return
        }
    }

    function i() {
        try {
            if (window.ga) {
                return window.ga.getAll()[0].get("clientId")
            }
        } catch (t) {
            return
        }
    }

    function n() {
        let t = !1;
        return function(e) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
        }(navigator.userAgent || navigator.vendor || window.opera), t
    }
    t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (t) {
            if ("object" == typeof window) return window
        }
    }(), (() => {
        var e;
        t.g.importScripts && (e = t.g.location + "");
        var i = t.g.document;
        if (!e && i && (i.currentScript && "SCRIPT" === i.currentScript.tagName.toUpperCase() && (e = i.currentScript.src), !e)) {
            var n = i.getElementsByTagName("script");
            if (n.length)
                for (var r = n.length - 1; r > -1 && (!e || !/^http(s?):/.test(e));) e = n[r--].src
        }
        if (!e) throw new Error("Automatic publicPath is not supported in this browser");
        e = e.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), t.p = e
    })();
    const r = Symbol("isLocationPatched");

    function o() {
        return n() ? "mobile" : "desktop"
    }
    const a = t => t && t[0].toUpperCase() + t.slice(1) || "",
        s = t => t.replaceAll("\ufeff", "").replaceAll("&#65279;", "");

    function l(t) {
        return fetch(`https://widget.yourgood.app/api/settings/get-for-external?id=${t}`).then((t => t.json())).then((t => {
            let {
                data: e
            } = t;
            return e
        }))
    }

    function c(t, n) {
        let {
            name: r,
            wazzupId: a,
            hid: s,
            integrations: l
        } = n;
        const c = o();
        /^\d{8}$/.test(a) && (a = "mobile" === c ? "WM" + a : "WW" + a);
        const d = {
            settingsId: t,
            wazzupId: a,
            hid: s,
            name: r,
            cookies: document.cookie,
            referrer: document.referrer,
            url: window.location.toString(),
            ymId: e(),
            gaId: i(),
            deviceType: c,
            coMagicId: window?.Comagic?.getSessionId(),
            callTouchId: window.call_value || null,
            isAdblockDetected: Boolean(localStorage.getItem("hasAdblock"))
        };
        return fetch("https://widget.yourgood.app/api/statistics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(d)
        }).then((t => t.json())).then((t => {
            let {
                data: e
            } = t;
            return e
        }))
    }

    function d(t) {
        return fetch(`https://widget.yourgood.app/api/integrations/get-by-settings?id=${t}`).then((t => (t.ok || console.warn("Can not get integrations. Http", t.status), t.json()))).then((t => {
            let {
                data: e
            } = t;
            return e ?? []
        })).catch((() => []))
    }

    function u(t) {
        return fetch(`https://widget.yourgood.app/api/statistics/dialog-events?settingsId=${t}`).then((t => t.json())).then((t => {
            let {
                data: e
            } = t;
            return e ?? []
        })).catch((() => []))
    }

    function p(t) {
        return fetch(`https://widget.yourgood.app/api/subscriptions/external?widgetId=${t}`).then((t => t.json())).then((t => {
            let {
                data: e
            } = t;
            return e
        })).catch((() => null))
    }

    function h(t) {
        return fetch(`https://widget.yourgood.app/api/ab-tests/customers-tests?widgetId=${t}`).then((t => t.json())).then((t => {
            let {
                data: e
            } = t;
            return e
        })).catch((() => null))
    }

    function f(t) {
        const e = {
            settingsId: t.settingsId,
            wazzupId: t.wazzupId,
            error: t.error,
            metric: t.metric,
            type: t.type
        };
        return fetch("https://widget.yourgood.app/api/statistics/send-dialog-event-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(e)
        }).then((t => t.json())).then((t => {
            let {
                data: e
            } = t;
            return e
        }))
    }
    let g = t => crypto.getRandomValues(new Uint8Array(t)),
        m = (t, e = 21) => ((t, e, i) => {
            let n = (2 << Math.log(t.length - 1) / Math.LN2) - 1,
                r = -~(1.6 * n * e / t.length);
            return (o = e) => {
                let a = "";
                for (;;) {
                    let e = i(r),
                        s = r;
                    for (; s--;)
                        if (a += t[e[s] & n] || "", a.length === o) return a
                }
            }
        })(t, e, g);

    function v(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var n in i) t[n] = i[n]
        }
        return t
    }
    var w = function t(e, i) {
        function n(t, n, r) {
            if ("undefined" != typeof document) {
                "number" == typeof(r = v({}, i, r)).expires && (r.expires = new Date(Date.now() + 864e5 * r.expires)), r.expires && (r.expires = r.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                var o = "";
                for (var a in r) r[a] && (o += "; " + a, !0 !== r[a] && (o += "=" + r[a].split(";")[0]));
                return document.cookie = t + "=" + e.write(n, t) + o
            }
        }
        return Object.create({
            set: n,
            get: function(t) {
                if ("undefined" != typeof document && (!arguments.length || t)) {
                    for (var i = document.cookie ? document.cookie.split("; ") : [], n = {}, r = 0; r < i.length; r++) {
                        var o = i[r].split("="),
                            a = o.slice(1).join("=");
                        try {
                            var s = decodeURIComponent(o[0]);
                            if (n[s] = e.read(a, s), t === s) break
                        } catch (t) {}
                    }
                    return t ? n[t] : n
                }
            },
            remove: function(t, e) {
                n(t, "", v({}, e, {
                    expires: -1
                }))
            },
            withAttributes: function(e) {
                return t(this.converter, v({}, this.attributes, e))
            },
            withConverter: function(e) {
                return t(v({}, this.converter, e), this.attributes)
            }
        }, {
            attributes: {
                value: Object.freeze(i)
            },
            converter: {
                value: Object.freeze(e)
            }
        })
    }({
        read: function(t) {
            return '"' === t[0] && (t = t.slice(1, -1)), t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
        },
        write: function(t) {
            return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
        }
    }, {
        path: "/"
    });
    const b = window,
        C = b.ShadowRoot && (void 0 === b.ShadyCSS || b.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
        y = Symbol(),
        x = new WeakMap;
    class P {
        constructor(t, e, i) {
            if (this._$cssResult$ = !0, i !== y) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
            this.cssText = t, this.t = e
        }
        get styleSheet() {
            let t = this.o;
            const e = this.t;
            if (C && void 0 === t) {
                const i = void 0 !== e && 1 === e.length;
                i && (t = x.get(e)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), i && x.set(e, t))
            }
            return t
        }
        toString() {
            return this.cssText
        }
    }
    const M = (t, ...e) => {
            const i = 1 === t.length ? t[0] : e.reduce(((e, i, n) => e + (t => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ("number" == typeof t) return t;
                throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
            })(i) + t[n + 1]), t[0]);
            return new P(i, t, y)
        },
        F = C ? t => t : t => t instanceof CSSStyleSheet ? (t => {
            let e = "";
            for (const i of t.cssRules) e += i.cssText;
            return (t => new P("string" == typeof t ? t : t + "", void 0, y))(e)
        })(t) : t;
    var $;
    const B = window,
        k = B.trustedTypes,
        _ = k ? k.emptyScript : "",
        S = B.reactiveElementPolyfillSupport,
        E = {
            toAttribute(t, e) {
                switch (e) {
                    case Boolean:
                        t = t ? _ : null;
                        break;
                    case Object:
                    case Array:
                        t = null == t ? t : JSON.stringify(t)
                }
                return t
            },
            fromAttribute(t, e) {
                let i = t;
                switch (e) {
                    case Boolean:
                        i = null !== t;
                        break;
                    case Number:
                        i = null === t ? null : Number(t);
                        break;
                    case Object:
                    case Array:
                        try {
                            i = JSON.parse(t)
                        } catch (t) {
                            i = null
                        }
                }
                return i
            }
        },
        I = (t, e) => e !== t && (e == e || t == t),
        A = {
            attribute: !0,
            type: String,
            converter: E,
            reflect: !1,
            hasChanged: I
        },
        z = "finalized";
    class W extends HTMLElement {
        constructor() {
            super(), this._$Ei = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu()
        }
        static addInitializer(t) {
            var e;
            this.finalize(), (null !== (e = this.h) && void 0 !== e ? e : this.h = []).push(t)
        }
        static get observedAttributes() {
            this.finalize();
            const t = [];
            return this.elementProperties.forEach(((e, i) => {
                const n = this._$Ep(i, e);
                void 0 !== n && (this._$Ev.set(n, i), t.push(n))
            })), t
        }
        static createProperty(t, e = A) {
            if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
                const i = "symbol" == typeof t ? Symbol() : "__" + t,
                    n = this.getPropertyDescriptor(t, i, e);
                void 0 !== n && Object.defineProperty(this.prototype, t, n)
            }
        }
        static getPropertyDescriptor(t, e, i) {
            return {
                get() {
                    return this[e]
                },
                set(n) {
                    const r = this[t];
                    this[e] = n, this.requestUpdate(t, r, i)
                },
                configurable: !0,
                enumerable: !0
            }
        }
        static getPropertyOptions(t) {
            return this.elementProperties.get(t) || A
        }
        static finalize() {
            if (this.hasOwnProperty(z)) return !1;
            this[z] = !0;
            const t = Object.getPrototypeOf(this);
            if (t.finalize(), void 0 !== t.h && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
                const t = this.properties,
                    e = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
                for (const i of e) this.createProperty(i, t[i])
            }
            return this.elementStyles = this.finalizeStyles(this.styles), !0
        }
        static finalizeStyles(t) {
            const e = [];
            if (Array.isArray(t)) {
                const i = new Set(t.flat(1 / 0).reverse());
                for (const t of i) e.unshift(F(t))
            } else void 0 !== t && e.push(F(t));
            return e
        }
        static _$Ep(t, e) {
            const i = e.attribute;
            return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0
        }
        _$Eu() {
            var t;
            this._$E_ = new Promise((t => this.enableUpdating = t)), this._$AL = new Map, this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach((t => t(this)))
        }
        addController(t) {
            var e, i;
            (null !== (e = this._$ES) && void 0 !== e ? e : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (i = t.hostConnected) || void 0 === i || i.call(t))
        }
        removeController(t) {
            var e;
            null === (e = this._$ES) || void 0 === e || e.splice(this._$ES.indexOf(t) >>> 0, 1)
        }
        _$Eg() {
            this.constructor.elementProperties.forEach(((t, e) => {
                this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e])
            }))
        }
        createRenderRoot() {
            var t;
            const e = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
            return ((t, e) => {
                C ? t.adoptedStyleSheets = e.map((t => t instanceof CSSStyleSheet ? t : t.styleSheet)) : e.forEach((e => {
                    const i = document.createElement("style"),
                        n = b.litNonce;
                    void 0 !== n && i.setAttribute("nonce", n), i.textContent = e.cssText, t.appendChild(i)
                }))
            })(e, this.constructor.elementStyles), e
        }
        connectedCallback() {
            var t;
            void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach((t => {
                var e;
                return null === (e = t.hostConnected) || void 0 === e ? void 0 : e.call(t)
            }))
        }
        enableUpdating(t) {}
        disconnectedCallback() {
            var t;
            null === (t = this._$ES) || void 0 === t || t.forEach((t => {
                var e;
                return null === (e = t.hostDisconnected) || void 0 === e ? void 0 : e.call(t)
            }))
        }
        attributeChangedCallback(t, e, i) {
            this._$AK(t, i)
        }
        _$EO(t, e, i = A) {
            var n;
            const r = this.constructor._$Ep(t, i);
            if (void 0 !== r && !0 === i.reflect) {
                const o = (void 0 !== (null === (n = i.converter) || void 0 === n ? void 0 : n.toAttribute) ? i.converter : E).toAttribute(e, i.type);
                this._$El = t, null == o ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null
            }
        }
        _$AK(t, e) {
            var i;
            const n = this.constructor,
                r = n._$Ev.get(t);
            if (void 0 !== r && this._$El !== r) {
                const t = n.getPropertyOptions(r),
                    o = "function" == typeof t.converter ? {
                        fromAttribute: t.converter
                    } : void 0 !== (null === (i = t.converter) || void 0 === i ? void 0 : i.fromAttribute) ? t.converter : E;
                this._$El = r, this[r] = o.fromAttribute(e, t.type), this._$El = null
            }
        }
        requestUpdate(t, e, i) {
            let n = !0;
            void 0 !== t && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || I)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), !0 === i.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map), this._$EC.set(t, i))) : n = !1), !this.isUpdatePending && n && (this._$E_ = this._$Ej())
        }
        async _$Ej() {
            this.isUpdatePending = !0;
            try {
                await this._$E_
            } catch (t) {
                Promise.reject(t)
            }
            const t = this.scheduleUpdate();
            return null != t && await t, !this.isUpdatePending
        }
        scheduleUpdate() {
            return this.performUpdate()
        }
        performUpdate() {
            var t;
            if (!this.isUpdatePending) return;
            this.hasUpdated, this._$Ei && (this._$Ei.forEach(((t, e) => this[e] = t)), this._$Ei = void 0);
            let e = !1;
            const i = this._$AL;
            try {
                e = this.shouldUpdate(i), e ? (this.willUpdate(i), null === (t = this._$ES) || void 0 === t || t.forEach((t => {
                    var e;
                    return null === (e = t.hostUpdate) || void 0 === e ? void 0 : e.call(t)
                })), this.update(i)) : this._$Ek()
            } catch (t) {
                throw e = !1, this._$Ek(), t
            }
            e && this._$AE(i)
        }
        willUpdate(t) {}
        _$AE(t) {
            var e;
            null === (e = this._$ES) || void 0 === e || e.forEach((t => {
                var e;
                return null === (e = t.hostUpdated) || void 0 === e ? void 0 : e.call(t)
            })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t)
        }
        _$Ek() {
            this._$AL = new Map, this.isUpdatePending = !1
        }
        get updateComplete() {
            return this.getUpdateComplete()
        }
        getUpdateComplete() {
            return this._$E_
        }
        shouldUpdate(t) {
            return !0
        }
        update(t) {
            void 0 !== this._$EC && (this._$EC.forEach(((t, e) => this._$EO(e, this[e], t))), this._$EC = void 0), this._$Ek()
        }
        updated(t) {}
        firstUpdated(t) {}
    }
    var T;
    W[z] = !0, W.elementProperties = new Map, W.elementStyles = [], W.shadowRootOptions = {
        mode: "open"
    }, null == S || S({
        ReactiveElement: W
    }), (null !== ($ = B.reactiveElementVersions) && void 0 !== $ ? $ : B.reactiveElementVersions = []).push("1.6.3");
    const H = window,
        L = H.trustedTypes,
        O = L ? L.createPolicy("lit-html", {
            createHTML: t => t
        }) : void 0,
        V = "$lit$",
        j = `lit$${(Math.random()+"").slice(9)}$`,
        D = "?" + j,
        U = `<${D}>`,
        R = document,
        Z = () => R.createComment(""),
        N = t => null === t || "object" != typeof t && "function" != typeof t,
        Q = Array.isArray,
        G = t => Q(t) || "function" == typeof(null == t ? void 0 : t[Symbol.iterator]),
        q = "[ \t\n\f\r]",
        Y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
        J = /-->/g,
        K = />/g,
        X = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
        tt = /'/g,
        et = /"/g,
        it = /^(?:script|style|textarea|title)$/i,
        nt = t => (e, ...i) => ({
            _$litType$: t,
            strings: e,
            values: i
        }),
        rt = nt(1),
        ot = (nt(2), Symbol.for("lit-noChange")),
        at = Symbol.for("lit-nothing"),
        st = new WeakMap,
        lt = R.createTreeWalker(R, 129, null, !1);

    function ct(t, e) {
        if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
        return void 0 !== O ? O.createHTML(e) : e
    }
    const dt = (t, e) => {
        const i = t.length - 1,
            n = [];
        let r, o = 2 === e ? "<svg>" : "",
            a = Y;
        for (let e = 0; e < i; e++) {
            const i = t[e];
            let s, l, c = -1,
                d = 0;
            for (; d < i.length && (a.lastIndex = d, l = a.exec(i), null !== l);) d = a.lastIndex, a === Y ? "!--" === l[1] ? a = J : void 0 !== l[1] ? a = K : void 0 !== l[2] ? (it.test(l[2]) && (r = RegExp("</" + l[2], "g")), a = X) : void 0 !== l[3] && (a = X) : a === X ? ">" === l[0] ? (a = null != r ? r : Y, c = -1) : void 0 === l[1] ? c = -2 : (c = a.lastIndex - l[2].length, s = l[1], a = void 0 === l[3] ? X : '"' === l[3] ? et : tt) : a === et || a === tt ? a = X : a === J || a === K ? a = Y : (a = X, r = void 0);
            const u = a === X && t[e + 1].startsWith("/>") ? " " : "";
            o += a === Y ? i + U : c >= 0 ? (n.push(s), i.slice(0, c) + V + i.slice(c) + j + u) : i + j + (-2 === c ? (n.push(void 0), e) : u)
        }
        return [ct(t, o + (t[i] || "<?>") + (2 === e ? "</svg>" : "")), n]
    };
    class ut {
        constructor({
            strings: t,
            _$litType$: e
        }, i) {
            let n;
            this.parts = [];
            let r = 0,
                o = 0;
            const a = t.length - 1,
                s = this.parts,
                [l, c] = dt(t, e);
            if (this.el = ut.createElement(l, i), lt.currentNode = this.el.content, 2 === e) {
                const t = this.el.content,
                    e = t.firstChild;
                e.remove(), t.append(...e.childNodes)
            }
            for (; null !== (n = lt.nextNode()) && s.length < a;) {
                if (1 === n.nodeType) {
                    if (n.hasAttributes()) {
                        const t = [];
                        for (const e of n.getAttributeNames())
                            if (e.endsWith(V) || e.startsWith(j)) {
                                const i = c[o++];
                                if (t.push(e), void 0 !== i) {
                                    const t = n.getAttribute(i.toLowerCase() + V).split(j),
                                        e = /([.?@])?(.*)/.exec(i);
                                    s.push({
                                        type: 1,
                                        index: r,
                                        name: e[2],
                                        strings: t,
                                        ctor: "." === e[1] ? mt : "?" === e[1] ? wt : "@" === e[1] ? bt : gt
                                    })
                                } else s.push({
                                    type: 6,
                                    index: r
                                })
                            } for (const e of t) n.removeAttribute(e)
                    }
                    if (it.test(n.tagName)) {
                        const t = n.textContent.split(j),
                            e = t.length - 1;
                        if (e > 0) {
                            n.textContent = L ? L.emptyScript : "";
                            for (let i = 0; i < e; i++) n.append(t[i], Z()), lt.nextNode(), s.push({
                                type: 2,
                                index: ++r
                            });
                            n.append(t[e], Z())
                        }
                    }
                } else if (8 === n.nodeType)
                    if (n.data === D) s.push({
                        type: 2,
                        index: r
                    });
                    else {
                        let t = -1;
                        for (; - 1 !== (t = n.data.indexOf(j, t + 1));) s.push({
                            type: 7,
                            index: r
                        }), t += j.length - 1
                    } r++
            }
        }
        static createElement(t, e) {
            const i = R.createElement("template");
            return i.innerHTML = t, i
        }
    }

    function pt(t, e, i = t, n) {
        var r, o, a, s;
        if (e === ot) return e;
        let l = void 0 !== n ? null === (r = i._$Co) || void 0 === r ? void 0 : r[n] : i._$Cl;
        const c = N(e) ? void 0 : e._$litDirective$;
        return (null == l ? void 0 : l.constructor) !== c && (null === (o = null == l ? void 0 : l._$AO) || void 0 === o || o.call(l, !1), void 0 === c ? l = void 0 : (l = new c(t), l._$AT(t, i, n)), void 0 !== n ? (null !== (a = (s = i)._$Co) && void 0 !== a ? a : s._$Co = [])[n] = l : i._$Cl = l), void 0 !== l && (e = pt(t, l._$AS(t, e.values), l, n)), e
    }
    class ht {
        constructor(t, e) {
            this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e
        }
        get parentNode() {
            return this._$AM.parentNode
        }
        get _$AU() {
            return this._$AM._$AU
        }
        u(t) {
            var e;
            const {
                el: {
                    content: i
                },
                parts: n
            } = this._$AD, r = (null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e ? e : R).importNode(i, !0);
            lt.currentNode = r;
            let o = lt.nextNode(),
                a = 0,
                s = 0,
                l = n[0];
            for (; void 0 !== l;) {
                if (a === l.index) {
                    let e;
                    2 === l.type ? e = new ft(o, o.nextSibling, this, t) : 1 === l.type ? e = new l.ctor(o, l.name, l.strings, this, t) : 6 === l.type && (e = new Ct(o, this, t)), this._$AV.push(e), l = n[++s]
                }
                a !== (null == l ? void 0 : l.index) && (o = lt.nextNode(), a++)
            }
            return lt.currentNode = R, r
        }
        v(t) {
            let e = 0;
            for (const i of this._$AV) void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++
        }
    }
    class ft {
        constructor(t, e, i, n) {
            var r;
            this.type = 2, this._$AH = at, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cp = null === (r = null == n ? void 0 : n.isConnected) || void 0 === r || r
        }
        get _$AU() {
            var t, e;
            return null !== (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== e ? e : this._$Cp
        }
        get parentNode() {
            let t = this._$AA.parentNode;
            const e = this._$AM;
            return void 0 !== e && 11 === (null == t ? void 0 : t.nodeType) && (t = e.parentNode), t
        }
        get startNode() {
            return this._$AA
        }
        get endNode() {
            return this._$AB
        }
        _$AI(t, e = this) {
            t = pt(this, t, e), N(t) ? t === at || null == t || "" === t ? (this._$AH !== at && this._$AR(), this._$AH = at) : t !== this._$AH && t !== ot && this._(t) : void 0 !== t._$litType$ ? this.g(t) : void 0 !== t.nodeType ? this.$(t) : G(t) ? this.T(t) : this._(t)
        }
        k(t) {
            return this._$AA.parentNode.insertBefore(t, this._$AB)
        }
        $(t) {
            this._$AH !== t && (this._$AR(), this._$AH = this.k(t))
        }
        _(t) {
            this._$AH !== at && N(this._$AH) ? this._$AA.nextSibling.data = t : this.$(R.createTextNode(t)), this._$AH = t
        }
        g(t) {
            var e;
            const {
                values: i,
                _$litType$: n
            } = t, r = "number" == typeof n ? this._$AC(t) : (void 0 === n.el && (n.el = ut.createElement(ct(n.h, n.h[0]), this.options)), n);
            if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === r) this._$AH.v(i);
            else {
                const t = new ht(r, this),
                    e = t.u(this.options);
                t.v(i), this.$(e), this._$AH = t
            }
        }
        _$AC(t) {
            let e = st.get(t.strings);
            return void 0 === e && st.set(t.strings, e = new ut(t)), e
        }
        T(t) {
            Q(this._$AH) || (this._$AH = [], this._$AR());
            const e = this._$AH;
            let i, n = 0;
            for (const r of t) n === e.length ? e.push(i = new ft(this.k(Z()), this.k(Z()), this, this.options)) : i = e[n], i._$AI(r), n++;
            n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n)
        }
        _$AR(t = this._$AA.nextSibling, e) {
            var i;
            for (null === (i = this._$AP) || void 0 === i || i.call(this, !1, !0, e); t && t !== this._$AB;) {
                const e = t.nextSibling;
                t.remove(), t = e
            }
        }
        setConnected(t) {
            var e;
            void 0 === this._$AM && (this._$Cp = t, null === (e = this._$AP) || void 0 === e || e.call(this, t))
        }
    }
    class gt {
        constructor(t, e, i, n, r) {
            this.type = 1, this._$AH = at, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._$AH = Array(i.length - 1).fill(new String), this.strings = i) : this._$AH = at
        }
        get tagName() {
            return this.element.tagName
        }
        get _$AU() {
            return this._$AM._$AU
        }
        _$AI(t, e = this, i, n) {
            const r = this.strings;
            let o = !1;
            if (void 0 === r) t = pt(this, t, e, 0), o = !N(t) || t !== this._$AH && t !== ot, o && (this._$AH = t);
            else {
                const n = t;
                let a, s;
                for (t = r[0], a = 0; a < r.length - 1; a++) s = pt(this, n[i + a], e, a), s === ot && (s = this._$AH[a]), o || (o = !N(s) || s !== this._$AH[a]), s === at ? t = at : t !== at && (t += (null != s ? s : "") + r[a + 1]), this._$AH[a] = s
            }
            o && !n && this.j(t)
        }
        j(t) {
            t === at ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "")
        }
    }
    class mt extends gt {
        constructor() {
            super(...arguments), this.type = 3
        }
        j(t) {
            this.element[this.name] = t === at ? void 0 : t
        }
    }
    const vt = L ? L.emptyScript : "";
    class wt extends gt {
        constructor() {
            super(...arguments), this.type = 4
        }
        j(t) {
            t && t !== at ? this.element.setAttribute(this.name, vt) : this.element.removeAttribute(this.name)
        }
    }
    class bt extends gt {
        constructor(t, e, i, n, r) {
            super(t, e, i, n, r), this.type = 5
        }
        _$AI(t, e = this) {
            var i;
            if ((t = null !== (i = pt(this, t, e, 0)) && void 0 !== i ? i : at) === ot) return;
            const n = this._$AH,
                r = t === at && n !== at || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive,
                o = t !== at && (n === at || r);
            r && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t
        }
        handleEvent(t) {
            var e, i;
            "function" == typeof this._$AH ? this._$AH.call(null !== (i = null === (e = this.options) || void 0 === e ? void 0 : e.host) && void 0 !== i ? i : this.element, t) : this._$AH.handleEvent(t)
        }
    }
    class Ct {
        constructor(t, e, i) {
            this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i
        }
        get _$AU() {
            return this._$AM._$AU
        }
        _$AI(t) {
            pt(this, t)
        }
    }
    const yt = H.litHtmlPolyfillSupport;
    null == yt || yt(ut, ft), (null !== (T = H.litHtmlVersions) && void 0 !== T ? T : H.litHtmlVersions = []).push("2.8.0");
    const xt = (t, e, i) => {
        var n, r;
        const o = null !== (n = null == i ? void 0 : i.renderBefore) && void 0 !== n ? n : e;
        let a = o._$litPart$;
        if (void 0 === a) {
            const t = null !== (r = null == i ? void 0 : i.renderBefore) && void 0 !== r ? r : null;
            o._$litPart$ = a = new ft(e.insertBefore(Z(), t), t, void 0, null != i ? i : {})
        }
        return a._$AI(t), a
    };
    var Pt, Mt;
    class Ft extends W {
        constructor() {
            super(...arguments), this.renderOptions = {
                host: this
            }, this._$Do = void 0
        }
        createRenderRoot() {
            var t, e;
            const i = super.createRenderRoot();
            return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i
        }
        update(t) {
            const e = this.render();
            this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xt(e, this.renderRoot, this.renderOptions)
        }
        connectedCallback() {
            var t;
            super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0)
        }
        disconnectedCallback() {
            var t;
            super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1)
        }
        render() {
            return ot
        }
    }
    Ft.finalized = !0, Ft._$litElement$ = !0, null === (Pt = globalThis.litElementHydrateSupport) || void 0 === Pt || Pt.call(globalThis, {
        LitElement: Ft
    });
    const $t = globalThis.litElementPolyfillSupport;
    null == $t || $t({
        LitElement: Ft
    });
    (null !== (Mt = globalThis.litElementVersions) && void 0 !== Mt ? Mt : globalThis.litElementVersions = []).push("3.3.3");
    const Bt = t.p + "images/widget-button-whatsapp-and-telegram.gif",
        kt = t.p + "images/widget-button-whatsapp-and-telegram-and-viber.gif",
        _t = t.p + "images/widget-button-whatsapp-and-viber.gif",
        St = t.p + "images/widget-button-telegram-and-viber.gif";

    function Et(t, e, i) {
        return t ? e() : null == i ? void 0 : i()
    }
    const It = 1,
        At = t => (...e) => ({
            _$litDirective$: t,
            values: e
        });
    class zt {
        constructor(t) {}
        get _$AU() {
            return this._$AM._$AU
        }
        _$AT(t, e, i) {
            this._$Ct = t, this._$AM = e, this._$Ci = i
        }
        _$AS(t, e) {
            return this.update(t, e)
        }
        update(t, e) {
            return this.render(...e)
        }
    }
    const Wt = At(class extends zt {
            constructor(t) {
                var e;
                if (super(t), t.type !== It || "class" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")
            }
            render(t) {
                return " " + Object.keys(t).filter((e => t[e])).join(" ") + " "
            }
            update(t, [e]) {
                var i, n;
                if (void 0 === this.it) {
                    this.it = new Set, void 0 !== t.strings && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((t => "" !== t))));
                    for (const t in e) e[t] && !(null === (i = this.nt) || void 0 === i ? void 0 : i.has(t)) && this.it.add(t);
                    return this.render(e)
                }
                const r = t.element.classList;
                this.it.forEach((t => {
                    t in e || (r.remove(t), this.it.delete(t))
                }));
                for (const t in e) {
                    const i = !!e[t];
                    i === this.it.has(t) || (null === (n = this.nt) || void 0 === n ? void 0 : n.has(t)) || (i ? (r.add(t), this.it.add(t)) : (r.remove(t), this.it.delete(t)))
                }
                return ot
            }
        }),
        Tt = "important",
        Ht = " !" + Tt,
        Lt = At(class extends zt {
            constructor(t) {
                var e;
                if (super(t), t.type !== It || "style" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")
            }
            render(t) {
                return Object.keys(t).reduce(((e, i) => {
                    const n = t[i];
                    return null == n ? e : e + `${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`
                }), "")
            }
            update(t, [e]) {
                const {
                    style: i
                } = t.element;
                if (void 0 === this.ht) {
                    this.ht = new Set;
                    for (const t in e) this.ht.add(t);
                    return this.render(e)
                }
                this.ht.forEach((t => {
                    null == e[t] && (this.ht.delete(t), t.includes("-") ? i.removeProperty(t) : i[t] = "")
                }));
                for (const t in e) {
                    const n = e[t];
                    if (null != n) {
                        this.ht.add(t);
                        const e = "string" == typeof n && n.endsWith(Ht);
                        t.includes("-") || e ? i.setProperty(t, e ? n.slice(0, -11) : n, e ? Tt : "") : i[t] = n
                    }
                }
                return ot
            }
        }),
        Ot = () => `https://widget.yourgood.ru/?utm_source=${encodeURIComponent(window.location.host)}&utm_medium=cta_modal&utm_content=viral`,
        Vt = M`
  .PFMessage,
  .PFChat,
  .PFModal {
    --pf-primary: #212121;
    --pf-secondary: #757575;
    --pf-disabled: #9e9e9e;
    --pf-main-blue: #2962ff;
    --pf-main-blue-dark: #1d4ed6;
    --pf-main-blue-light: #5481ff;
    --pf-blue-shade-50: #94b0ff;
    --pf-blue-shade-8: #eef3ff;
    --pf-blue-shade-4: #f7f9ff;
    --pf-background: #f8f9fb;
    --pf-main-yellow: #ffa726;
    --pf-yellow-shade-12: #fff4e5;
    --pf-main-green: #4caf50;
    --pf-green-shade-8: #f3faf3;
    --pf-main-red: #d32f2f;
    --pf-red-shade-50: #e99797;
    --pf-red-shade-8: #fbeeee;
    --pf-red-shade-4: #fdf7f7;
    --pf-grey-900: #212121;
    --pf-grey-800: #424242;
    --pf-grey-700: #616161;
    --pf-grey-600: #757575;
    --pf-grey-500: #9e9e9e;
    --pf-grey-400: #bdbdbd;
    --pf-grey-300: #e0e0e0;
    --pf-grey-200: #eee;
    --pf-grey-100: #f5f5f5;
    --pf-white: #fff;
    --pf-modal-telegram-color: #2aabee;
    --pf-modal-whatsapp-color: #5ed169;
    --pf-modal-viber-color: #655cac;
    --pf-chat-whatsapp-background: #f6f6f6;
  }
`,
        jt = M`
  .PFModalButtonWhatsapp .PFModalButtonIcon {
     --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M4 20L5.27221 15.3802C4.48567 14.0242 4.07307 12.4886 4.07736 10.9187C4.07736 5.99952 8.10028 2 13.0387 2C15.437 2 17.6891 2.92823 19.3782 4.61359C21.0716 6.29895 22.0043 8.5404 22 10.923C22 15.8422 17.9771 19.8417 13.0344 19.8417H13.0301C11.5301 19.8417 10.0559 19.4653 8.74498 18.7552L4 20ZM8.97278 17.1426L9.24355 17.3051C10.3868 17.981 11.6977 18.336 13.0344 18.3403H13.0387C17.1433 18.3403 20.4871 15.0166 20.4871 10.9273C20.4871 8.94677 19.7135 7.08603 18.308 5.68298C16.9026 4.27994 15.0286 3.50998 13.0387 3.50998C8.93409 3.5057 5.59026 6.82937 5.59026 10.9187C5.59026 12.3175 5.98137 13.682 6.72922 14.8626L6.90544 15.145L6.15329 17.8783L8.97278 17.1426Z' fill='url(%23paint0_linear_1767_5881)'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.7994 7.18869C10.6317 6.81654 10.4555 6.80799 10.2965 6.80371C10.1676 6.79943 10.0171 6.79943 9.86669 6.79943C9.71626 6.79943 9.47557 6.85504 9.26927 7.07747C9.06297 7.29991 8.48704 7.83888 8.48704 8.93821C8.48704 10.0333 9.29076 11.0941 9.40251 11.2438C9.51426 11.3935 10.9541 13.7163 13.2277 14.6103C15.1188 15.3546 15.5057 15.2048 15.914 15.1664C16.3223 15.1279 17.2377 14.6274 17.4269 14.1055C17.6117 13.5837 17.6117 13.1388 17.5558 13.0447C17.4999 12.9506 17.3495 12.895 17.126 12.7837C16.9025 12.6725 15.8022 12.1336 15.5959 12.0566C15.3896 11.9838 15.2392 11.9453 15.093 12.1678C14.9426 12.3902 14.5128 12.8907 14.3839 13.0404C14.2549 13.1901 14.1217 13.2072 13.8982 13.096C13.6747 12.9848 12.9526 12.7495 12.0973 11.9881C11.4312 11.3978 10.9799 10.6664 10.8509 10.4439C10.722 10.2215 10.838 10.1017 10.9498 9.9905C11.0486 9.89211 11.1733 9.72956 11.285 9.60124C11.3968 9.47291 11.4355 9.3788 11.5085 9.22909C11.5816 9.07937 11.5472 8.95105 11.4913 8.83983C11.4355 8.73289 10.9971 7.62928 10.7994 7.18869Z' fill='white'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_1767_5881' x1='13.0018' y1='19.9983' x2='13.0018' y2='2' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F9F9F9'/%3E%3Cstop offset='1' stop-color='white'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
  }

  .PFModalButtonTelegram .PFModalButtonIcon {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.24138 11.8319C7.90571 9.79974 11.016 8.46001 12.5722 7.81272C17.0156 5.96457 17.9389 5.64353 18.5407 5.63293C18.673 5.63059 18.969 5.6634 19.1607 5.81895C19.3226 5.95029 19.3671 6.12772 19.3884 6.25225C19.4097 6.37677 19.4363 6.66045 19.4152 6.88211C19.1744 9.41209 18.1325 15.5517 17.6024 18.3853C17.3781 19.5843 16.9365 19.9863 16.509 20.0257C15.5798 20.1112 14.8743 19.4116 13.9743 18.8217C12.5661 17.8986 11.7706 17.324 10.4037 16.4232C8.82398 15.3822 9.84803 14.8101 10.7483 13.875C10.9839 13.6303 15.0778 9.90662 15.157 9.56882C15.1669 9.52657 15.1761 9.3691 15.0826 9.28594C14.989 9.20279 14.8509 9.23122 14.7513 9.25384C14.61 9.28589 12.3604 10.7728 8.00238 13.7146C7.36383 14.1531 6.78545 14.3667 6.26725 14.3555C5.69596 14.3432 4.59704 14.0325 3.78011 13.767C2.77811 13.4412 1.98174 13.269 2.05108 12.7159C2.0872 12.4278 2.48397 12.1331 3.24138 11.8319Z' fill='white'/%3E%3C/svg%3E");
  }

  .PFModalButtonViber .PFModalButtonIcon {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M19.6455 8.13866L19.6408 8.11973C19.2578 6.57115 17.5308 4.9095 15.9449 4.56381L15.927 4.56011C13.3619 4.07078 10.7609 4.07078 8.19632 4.56011L8.17789 4.56381C6.59252 4.9095 4.86552 6.57126 4.48197 8.11973L4.47771 8.13866C4.00417 10.3012 4.00417 12.4944 4.47771 14.657L4.48197 14.6759C4.84922 16.1584 6.44753 17.7438 7.97428 18.1797V19.9083C7.97428 20.534 8.73672 20.8413 9.17028 20.3898L10.9217 18.5693C11.3016 18.5905 11.6817 18.6024 12.0616 18.6024C13.3528 18.6024 14.6447 18.4802 15.927 18.2356L15.9448 18.2319C17.5308 17.8862 19.2577 16.2245 19.6408 14.676L19.6455 14.6571C20.119 12.4944 20.119 10.3013 19.6455 8.13866ZM18.2594 14.3435C18.0037 15.3538 16.6925 16.6097 15.6507 16.8418C14.2868 17.1012 12.912 17.212 11.5387 17.174C11.5113 17.1732 11.4851 17.1839 11.4661 17.2035C11.2711 17.4035 10.1873 18.5162 10.1873 18.5162L8.82717 19.9122C8.72771 20.0159 8.55299 19.9453 8.55299 19.8022V16.9386C8.55299 16.8913 8.51922 16.8511 8.47274 16.8419C8.47246 16.8418 8.47223 16.8418 8.47195 16.8418C7.43012 16.6097 6.11937 15.3537 5.86317 14.3434C5.43695 12.3887 5.43695 10.407 5.86317 8.45226C6.11937 7.44196 7.43012 6.18598 8.47195 5.95391C10.854 5.50087 13.2692 5.50087 15.6507 5.95391C16.6931 6.18598 18.0037 7.44196 18.2595 8.45226C18.6862 10.4071 18.6862 12.3887 18.2594 14.3435Z' fill='white'/%3E%3Cpath d='M14.3275 15.6661C14.1673 15.6174 14.0147 15.5848 13.8729 15.526C12.4039 14.9166 11.0521 14.1303 9.98127 12.9251C9.37232 12.2398 8.8957 11.466 8.49284 10.6472C8.30176 10.2589 8.14076 9.85542 7.97662 9.45445C7.82699 9.08888 8.04741 8.71121 8.27947 8.43569C8.49726 8.17714 8.77754 7.97934 9.08106 7.83346C9.31795 7.71967 9.55158 7.7853 9.72462 7.98606C10.0986 8.42018 10.4422 8.87647 10.7203 9.37969C10.8914 9.68921 10.8445 10.0675 10.5344 10.2782C10.459 10.3293 10.3904 10.3895 10.3202 10.4473C10.2586 10.498 10.2007 10.5492 10.1585 10.6178C10.0813 10.7432 10.0777 10.8914 10.1273 11.0278C10.5096 12.0785 11.154 12.8955 12.2116 13.3356C12.3808 13.406 12.5507 13.4879 12.7457 13.4653C13.0722 13.4271 13.1779 13.069 13.4067 12.8819C13.6303 12.699 13.9162 12.6966 14.157 12.849C14.398 13.0016 14.6315 13.1652 14.8637 13.3307C15.0916 13.4931 15.3185 13.6519 15.5286 13.8371C15.7308 14.0151 15.8004 14.2486 15.6866 14.4901C15.4782 14.9326 15.175 15.3006 14.7377 15.5356C14.6142 15.6017 14.4667 15.6232 14.3275 15.6661C14.4667 15.6232 14.1673 15.6174 14.3275 15.6661Z' fill='white'/%3E%3Cpath d='M12.0655 7.32718C13.9868 7.38105 15.565 8.65612 15.9032 10.5557C15.9608 10.8793 15.9813 11.2102 16.0069 11.5388C16.0177 11.6769 15.9394 11.8082 15.7904 11.81C15.6364 11.8119 15.5671 11.683 15.557 11.5449C15.5372 11.2715 15.5235 10.9968 15.4858 10.7258C15.287 9.29448 14.1457 8.11034 12.721 7.85627C12.5066 7.81802 12.2873 7.808 12.0701 7.7852C11.9328 7.77081 11.7531 7.76252 11.7227 7.59183C11.6972 7.44875 11.8179 7.33485 11.9542 7.32751C11.9911 7.32533 12.0283 7.32706 12.0655 7.32718C13.9869 7.38105 12.0283 7.32706 12.0655 7.32718Z' fill='white'/%3E%3Cpath d='M14.9856 11.1117C14.9824 11.1357 14.9808 11.1921 14.9667 11.2452C14.9158 11.4381 14.6232 11.4622 14.5559 11.2676C14.536 11.2099 14.533 11.1441 14.5329 11.082C14.5322 10.6751 14.4438 10.2685 14.2385 9.91443C14.0276 9.55048 13.7052 9.24466 13.3273 9.05947C13.0987 8.94758 12.8516 8.87797 12.601 8.83659C12.4915 8.81844 12.3809 8.80752 12.2708 8.79218C12.1375 8.77364 12.0663 8.68869 12.0727 8.55731C12.0785 8.43422 12.1685 8.34557 12.3027 8.35325C12.7436 8.37822 13.1695 8.47365 13.5616 8.68118C14.3587 9.10337 14.8141 9.76967 14.9471 10.6595C14.953 10.6998 14.9627 10.7397 14.9658 10.7801C14.9733 10.8799 14.978 10.9799 14.9856 11.1117C14.9824 11.1356 14.978 10.9799 14.9856 11.1117Z' fill='white'/%3E%3Cpath d='M13.7897 11.0654C13.629 11.0683 13.543 10.9793 13.5263 10.832C13.5148 10.7293 13.5057 10.6251 13.4811 10.5251C13.4329 10.3282 13.3282 10.1457 13.1625 10.025C13.0844 9.96809 12.9957 9.9266 12.9029 9.89972C12.785 9.86561 12.6625 9.87502 12.545 9.84624C12.4172 9.81493 12.3466 9.71144 12.3667 9.59166C12.3849 9.48257 12.491 9.39745 12.6102 9.40613C13.3551 9.45989 13.8875 9.845 13.9635 10.722C13.969 10.7839 13.9752 10.8492 13.9615 10.9085C13.9379 11.0097 13.8628 11.0605 13.7897 11.0654C13.8628 11.0605 13.6289 11.0683 13.7897 11.0654Z' fill='white'/%3E%3Cpath d='M19.6445 8.13837L19.6398 8.11944C19.4251 7.25138 18.788 6.34786 17.9902 5.6604L16.9117 6.61622C17.553 7.12722 18.1025 7.83513 18.2586 8.45192C18.6853 10.4067 18.6853 12.3883 18.2586 14.3432C18.0028 15.3535 16.6916 16.6095 15.6498 16.8415C14.2859 17.1009 12.9112 17.2117 11.5378 17.1737C11.5105 17.1729 11.4842 17.1836 11.4652 17.2032C11.2703 17.4032 10.1864 18.5159 10.1864 18.5159L8.8263 19.9119C8.72685 20.0156 8.55213 19.9451 8.55213 19.8019V16.9383C8.55213 16.891 8.51836 16.8508 8.47188 16.8416C8.4716 16.8416 8.47137 16.8415 8.47109 16.8415C7.879 16.7096 7.20033 16.2469 6.67751 15.6867L5.61182 16.6311C6.27738 17.3551 7.13582 17.9404 7.97325 18.1795V19.9082C7.97325 20.5339 8.73569 20.8411 9.16925 20.3896L10.9207 18.5691C11.3006 18.5903 11.6805 18.6022 12.0606 18.6022C13.3518 18.6022 14.6436 18.48 15.9259 18.2354L15.9438 18.2318C17.5297 17.8861 19.2567 16.2245 19.6397 14.6759L19.6444 14.6569C20.118 12.4941 20.118 10.3011 19.6445 8.13837Z' fill='white'/%3E%3Cpath d='M15.5289 13.8359C15.3187 13.6509 15.0918 13.492 14.864 13.3296C14.6318 13.1641 14.3983 13.0005 14.1573 12.8479C13.9164 12.6955 13.6307 12.6979 13.407 12.8807C13.1782 13.0678 13.0725 13.426 12.746 13.4642C12.551 13.4868 12.3811 13.4048 12.2118 13.3345C11.5612 13.0638 11.0675 12.6499 10.6943 12.1272L9.90137 12.83C9.9283 12.8612 9.95401 12.8932 9.98139 12.924C11.0522 14.1292 12.4041 14.9155 13.873 15.5249C14.0147 15.5837 14.1674 15.6164 14.3276 15.665C14.1674 15.6163 14.4669 15.6221 14.3276 15.665C14.4669 15.6221 14.6143 15.6006 14.7379 15.5344C15.1753 15.2994 15.4785 14.9314 15.6868 14.489C15.8007 14.2475 15.7311 14.014 15.5289 13.8359Z' fill='white'/%3E%3Cpath d='M14.819 8.46826L14.481 8.76792C15.0122 9.28481 15.3786 9.96986 15.4833 10.7237C15.5209 10.9949 15.5348 11.2695 15.5545 11.5429C15.5646 11.681 15.6338 11.8099 15.7879 11.8081C15.937 11.8062 16.0153 11.675 16.0045 11.5368C15.9787 11.2083 15.9583 10.8773 15.9007 10.5537C15.7527 9.72223 15.367 9.0104 14.819 8.46826Z' fill='white'/%3E%3Cpath d='M14.9446 10.6577C14.8478 10.0093 14.5788 9.48024 14.132 9.07715L13.7949 9.37591C13.9693 9.53064 14.1201 9.71236 14.2362 9.91279C14.4414 10.2669 14.5299 10.6734 14.5305 11.0803C14.5307 11.1425 14.5336 11.2082 14.5536 11.2661C14.621 11.4608 14.9134 11.4367 14.9644 11.2437C14.9785 11.1905 14.9801 11.1341 14.9833 11.1102C14.9756 10.9784 14.9801 11.1342 14.9833 11.1102C14.9756 10.9784 14.9709 10.8784 14.9633 10.7785C14.9603 10.7379 14.9507 10.698 14.9446 10.6577Z' fill='white'/%3E%3Cpath d='M13.4501 9.68457L13.1069 9.98877C13.1259 10.0002 13.1444 10.0122 13.1624 10.0253C13.328 10.146 13.4327 10.3284 13.481 10.5254C13.5055 10.6254 13.5146 10.7294 13.5262 10.8322C13.542 10.973 13.6219 11.0595 13.769 11.0645C13.7797 11.0643 13.7902 11.064 13.7969 11.064C13.8676 11.0561 13.9386 11.0065 13.9613 10.9086C13.975 10.8494 13.9687 10.784 13.9633 10.7221C13.9206 10.2318 13.7353 9.89541 13.4501 9.68457Z' fill='white'/%3E%3C/svg%3E");
  }
`,
        Dt = "https://widget.yourgood.app/",
        Ut = "https://widget.profeat.team/",
        Rt = ["#open", "#whatsapp", "#telegram", "#viber"],
        Zt = ["whatsapp", "telegram", "viber"],
        Nt = ["White", "Grass"],
        Qt = {
            telegram: "telegram",
            tgApi: "tgapi",
            whatsapp: "whatsapp",
            wapi: "wapi"
        };

    function Gt(t) {
        return t.background.theme.color
    }

    function qt(t) {
        return t.background.theme.layoutColor
    }

    function Yt(t) {
        return t.whatsappEnabled && t.telegramEnabled && !t.viberEnabled ? "whatsapp-and-telegram" : t.whatsappEnabled && !t.telegramEnabled && t.viberEnabled ? "whatsapp-and-viber" : !t.whatsappEnabled && t.telegramEnabled && t.viberEnabled ? "telegram-and-viber" : !t.whatsappEnabled || t.telegramEnabled || t.viberEnabled ? t.whatsappEnabled || !t.telegramEnabled || t.viberEnabled ? t.whatsappEnabled || t.telegramEnabled || !t.viberEnabled ? t.whatsappEnabled && t.telegramEnabled && t.viberEnabled ? "whatsapp-and-telegram-and-viber" : "" : "viber" : "telegram" : "whatsapp"
    }

    function Jt(t, e) {
        if (n()) {
            return Zt.includes(t) && !e ? t : void 0
        }
    }
    const Kt = "::$wazzupIdPlaceholder";

    function Xt(t, e) {
        const i = ((t, e, i) => {
            let n = i?.telegramGreetingMessage ? i.telegramGreetingMessage : t.telegramGreetingMessage;
            return t.telegramAppendWazzupId && (n.includes(` ${Kt} `) && (n = n.replaceAll(Kt, `${e}`)), n = n.replaceAll(Kt, ` ${e} `)), s(n)
        })(t, e, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null);
        if (t.telegramUsername.startsWith("https://t.me/")) return `${t.telegramUsername}?text=${i}`;
        let n = t.telegramUsername;
        return n.includes("@") && (n = n.replaceAll("@", "")), t.telegramUsername.toLowerCase().endsWith("bot") ? `https://t.me/${encodeURIComponent(n)}?start=${e}` : `https://t.me/${encodeURIComponent(n)}?text=${i}`
    }
    const te = "::$wazzupIdPlaceholder";

    function ee(t, e) {
        const i = ((t, e, i) => {
            let n = i?.whatsappGreetingMessage ? i.whatsappGreetingMessage : t.whatsappGreetingMessage;
            return t.whatsappAppendWazzupId && (n.includes(` ${te} `) && (n = n.replaceAll(te, `${e}`)), n = n.replaceAll(te, ` ${e} `)), s(n)
        })(t, e, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null);
        return `https://wa.me/${encodeURIComponent(t.whatsappNumber.replace("+",""))}?text=${encodeURIComponent(i)}`
    }

    function ie(t) {
        return t.viberUsername.includes("viber://pa?chatURI=") ? `${t.viberUsername}` : `viber://chat?number=${t.viberUsername}`
    }

    function ne(t, e, i, r, o, a) {
        const s = n() ? `WM${i}` : `WW${i}`;
        if (a) try {
            o.fireEvent("WP_click_widget"), c(t.id, {
                name: "click",
                wazzupId: s,
                hid: r
            }).then((i => {
                i && (o.fireEvent("WP_click_whatsapp"), c(t.id, {
                    name: "whatsapp_click",
                    wazzupId: s,
                    hid: r
                }), setTimeout((() => {
                    window.open(ee(t, s, e), "_blank")
                }), 1))
            }))
        } catch (t) {
            console.error(t)
        } else c(t.id, {
            name: "whatsapp_click",
            wazzupId: s,
            hid: r
        }).then((i => {
            i && (o.fireEvent("WP_click_whatsapp"), setTimeout((() => {
                window.open(ee(t, s, e), "_blank")
            }), 1))
        }))
    }

    function re(t, e, i, r, o, a) {
        const s = n() ? `WM${i}` : `WW${i}`;
        if (a) try {
            o.fireEvent("WP_click_widget"), c(t.id, {
                name: "click",
                wazzupId: s,
                hid: r
            }).then((i => {
                i && (o.fireEvent("WP_click_telegram"), c(t.id, {
                    name: "telegram_click",
                    wazzupId: s,
                    hid: r
                }), setTimeout((() => {
                    window.open(Xt(t, s, e), "_blank")
                }), 1))
            }))
        } catch (t) {
            console.error(t)
        } else c(t.id, {
            name: "telegram_click",
            wazzupId: s,
            hid: r
        }).then((i => {
            i && (o.fireEvent("WP_click_telegram"), setTimeout((() => {
                window.open(Xt(t, s, e), "_blank")
            }), 1))
        }))
    }

    function oe(t, e, i, r, o, a) {
        const s = n() ? `WM${i}` : `WW${i}`;
        if (a) try {
            o.fireEvent("WP_click_widget"), c(t.id, {
                name: "click",
                wazzupId: s,
                hid: r
            }).then((e => {
                e && (o.fireEvent("WP_click_viber"), c(t.id, {
                    name: "viber_click",
                    wazzupId: s,
                    hid: r
                }), setTimeout((() => {
                    const e = ie(t);
                    console.log("viberLink", e), window.open(e, "_blank")
                }), 1))
            }))
        } catch (t) {
            console.error(t)
        } else c(t.id, {
            name: "viber_click",
            wazzupId: s,
            hid: r
        }).then((e => {
            e && (o.fireEvent("WP_click_viber"), setTimeout((() => {
                const e = ie(t);
                console.log("viberLink", e), window.open(e, "_blank")
            }), 1))
        }))
    }

    function ae(t) {
        if ("White" === t) return rt`
        <svg width="138" height="24" viewBox="0 0 138 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_871_17971)">
        <path d="M48.1007 8.30615C45.9402 8.30615 44.1943 10.0532 44.1943 12.2153C44.1943 14.3773 45.9402 16.1244 48.1007 16.1244C50.2612 16.1244 52.007 14.3773 52.007 12.2153C52.007 10.0532 50.2612 8.30615 48.1007 8.30615ZM48.1007 14.5738C46.7913 14.5738 45.7438 13.5038 45.7438 12.2153C45.7438 10.905 46.8131 9.8567 48.1007 9.8567C49.4101 9.8567 50.4576 10.9268 50.4576 12.2153C50.4576 13.5038 49.4101 14.5738 48.1007 14.5738Z" fill="#1B1B1B"/>
        <path d="M13.2706 8.30615C11.1101 8.30615 9.36426 10.0532 9.36426 12.2153C9.36426 14.3773 11.1101 16.1244 13.2706 16.1244C15.4311 16.1244 17.1769 14.3773 17.1769 12.2153C17.1769 10.0532 15.4092 8.30615 13.2706 8.30615ZM13.2706 14.5738C11.9612 14.5738 10.9137 13.5038 10.9137 12.2153C10.9137 10.905 11.983 9.8567 13.2706 9.8567C14.5581 9.8567 15.6275 10.9268 15.6275 12.2153C15.6275 13.5038 14.5581 14.5738 13.2706 14.5738Z" fill="#1B1B1B"/>
        <path d="M56.7862 8.30615C54.6257 8.30615 52.8799 10.0532 52.8799 12.2153C52.8799 14.3773 54.6257 16.1244 56.7862 16.1244C58.9467 16.1244 60.6926 14.3773 60.6926 12.2153C60.6926 10.0532 58.9249 8.30615 56.7862 8.30615ZM56.7862 14.5738C55.4768 14.5738 54.4293 13.5038 54.4293 12.2153C54.4293 10.905 55.4987 9.8567 56.7862 9.8567C58.0956 9.8567 59.1431 10.9268 59.1431 12.2153C59.1431 13.5038 58.0738 14.5738 56.7862 14.5738Z" fill="#1B1B1B"/>
        <path d="M8.18579 6.07855L7.2692 4.83374C6.4181 5.44522 5.41425 5.77281 4.36675 5.77281C3.40653 5.77281 2.46813 5.4889 1.66068 4.96477L0.80957 6.25325C1.85708 6.95209 3.10101 7.32334 4.36675 7.32334C5.76342 7.32334 7.07281 6.88658 8.18579 6.07855Z" fill="#1C7EF1"/>
        <path d="M67.8286 5.99121V9.09229C67.174 8.59001 66.3447 8.28427 65.4718 8.28427C63.3113 8.28427 61.5654 10.0314 61.5654 12.1934C61.5654 14.3554 63.3113 16.1025 65.4718 16.1025C67.6323 16.1025 69.3781 14.3554 69.3781 12.1934V5.99121H67.8286ZM65.4718 14.5738C64.1624 14.5738 63.1149 13.5037 63.1149 12.2152C63.1149 10.9049 64.1842 9.85665 65.4718 9.85665C66.7812 9.85665 67.8286 10.9267 67.8286 12.2152C67.8286 13.5037 66.7593 14.5738 65.4718 14.5738Z" fill="#1B1B1B"/>
        <path d="M41.816 9.09232C41.1613 8.59003 40.3538 8.28429 39.4591 8.28429C37.2986 8.28429 35.5528 10.0314 35.5528 12.1934C35.5528 14.3336 37.2768 16.0588 39.3936 16.1025C40.703 16.1025 41.7505 17.1726 41.7505 18.4611C41.7505 19.7714 40.6812 20.8197 39.3936 20.8197C38.0843 20.8197 37.0367 19.7496 37.0367 18.4611H35.4873C35.4873 20.6231 37.2332 22.3702 39.3936 22.3702C41.5541 22.3702 43.3 20.6231 43.3 18.4611C43.3 17.1945 42.6889 16.0588 41.7505 15.3382C42.7326 14.6175 43.3654 13.4819 43.3654 12.1716V8.26245H41.816V9.09232ZM39.4591 14.5738C38.1497 14.5738 37.1022 13.5037 37.1022 12.2152C37.1022 10.9049 38.1715 9.85667 39.4591 9.85667C40.7685 9.85667 41.816 10.9268 41.816 12.2152C41.816 13.5037 40.7467 14.5738 39.4591 14.5738Z" fill="#1B1B1B"/>
        <path d="M24.2701 12.2152C24.2701 13.5255 23.2007 14.5737 21.9132 14.5737C20.6038 14.5737 19.5563 13.5036 19.5563 12.2152V8.52441H18.0068V12.4117C18.116 14.4645 19.8182 16.1243 21.9132 16.1243C24.03 16.1243 25.7322 14.4427 25.8195 12.3462V8.52441H24.2701V12.2152Z" fill="#1B1B1B"/>
        <path d="M6.85504 12.2152C6.85504 13.5255 5.7857 14.5737 4.49814 14.5737C3.21057 14.5737 2.14123 13.5036 2.14123 12.2152V8.52441H0.591797V12.4117C0.700912 14.4645 2.40312 16.1243 4.49814 16.1243C5.80752 16.1243 6.85504 17.1944 6.85504 18.4828C6.85504 19.7932 5.7857 20.8414 4.49814 20.8414C3.21057 20.8414 2.14123 19.7713 2.14123 18.4828H0.591797C0.591797 20.6449 2.33765 22.392 4.49814 22.392C6.65862 22.392 8.40447 20.6449 8.40447 18.4828C8.40447 17.1944 7.77159 16.0588 6.81138 15.3381C7.72795 14.6611 8.33901 13.5691 8.38266 12.3462V8.52441H6.8332V12.2152H6.85504Z" fill="#1B1B1B"/>
        <path d="M30.8819 8.30615C29.9872 8.30615 29.1797 8.6119 28.525 9.11418V8.52454H26.9756V15.8842H28.525V12.1934C28.525 10.8831 29.5944 9.83486 30.8819 9.83486C32.1695 9.83486 33.2388 10.905 33.2388 12.1934H34.7883C34.7883 10.0532 33.0424 8.30615 30.8819 8.30615Z" fill="#1B1B1B"/>
        <path d="M75.5459 5.16923C75.5459 2.31434 77.8574 0 80.7088 0H132.337C135.189 0 137.5 2.31434 137.5 5.16923V18.8308C137.5 21.6857 135.189 24 132.337 24H80.7088C77.8574 24 75.5459 21.6857 75.5459 18.8308V5.16923Z" fill="#B6D7FF"/>
        <path d="M131.356 8.55946V10.2378H126.511V8.55946H131.356ZM127.611 6.62939H129.842V14.1399C129.842 14.3462 129.874 14.507 129.937 14.6224C129.999 14.7343 130.087 14.813 130.198 14.8584C130.314 14.9039 130.446 14.9266 130.597 14.9266C130.701 14.9266 130.806 14.9179 130.911 14.9004C131.016 14.8794 131.096 14.8637 131.152 14.8532L131.503 16.5158C131.391 16.5507 131.234 16.5909 131.031 16.6364C130.829 16.6853 130.583 16.7151 130.293 16.7255C129.755 16.7465 129.284 16.6748 128.878 16.5105C128.477 16.3462 128.164 16.0909 127.941 15.7448C127.717 15.3986 127.607 14.9616 127.611 14.4336V6.62939Z" fill="#1B1B1B"/>
        <path d="M121.632 16.7728C120.805 16.7728 120.092 16.6049 119.495 16.2693C118.901 15.9301 118.444 15.4511 118.123 14.8322C117.801 14.2098 117.641 13.4738 117.641 12.6242C117.641 11.7955 117.801 11.0682 118.123 10.4424C118.444 9.81648 118.896 9.32872 119.479 8.97906C120.066 8.62941 120.754 8.45459 121.543 8.45459C122.074 8.45459 122.568 8.54025 123.026 8.71158C123.487 8.87941 123.888 9.13291 124.23 9.47207C124.576 9.81123 124.845 10.2378 125.037 10.7518C125.229 11.2623 125.325 11.8602 125.325 12.5455V13.1591H118.531V11.7745H123.225C123.225 11.4528 123.155 11.1679 123.015 10.9196C122.875 10.6714 122.682 10.4773 122.434 10.3375C122.189 10.1941 121.905 10.1224 121.58 10.1224C121.241 10.1224 120.941 10.2011 120.679 10.3584C120.42 10.5123 120.218 10.7203 120.071 10.9826C119.925 11.2413 119.849 11.5298 119.846 11.8479V13.1644C119.846 13.563 119.919 13.9074 120.066 14.1976C120.216 14.4878 120.427 14.7116 120.7 14.8689C120.972 15.0263 121.295 15.1049 121.669 15.1049C121.917 15.1049 122.144 15.07 122.35 15C122.556 14.9301 122.732 14.8252 122.879 14.6854C123.026 14.5455 123.137 14.3742 123.214 14.1714L125.278 14.3077C125.173 14.8042 124.959 15.2378 124.634 15.6084C124.312 15.9756 123.897 16.2623 123.387 16.4686C122.881 16.6714 122.296 16.7728 121.632 16.7728Z" fill="#1B1B1B"/>
        <path d="M111.961 19.8042C111.238 19.8042 110.618 19.7046 110.101 19.5053C109.588 19.3095 109.179 19.042 108.875 18.7028C108.571 18.3637 108.374 17.9826 108.283 17.5595L110.347 17.2815C110.41 17.4424 110.51 17.5927 110.646 17.7326C110.782 17.8724 110.962 17.9843 111.185 18.0682C111.412 18.1556 111.688 18.1993 112.013 18.1993C112.498 18.1993 112.898 18.0805 113.213 17.8427C113.53 17.6084 113.689 17.2151 113.689 16.6626V15.1889H113.595C113.497 15.4126 113.35 15.6242 113.155 15.8235C112.959 16.0228 112.708 16.1854 112.401 16.3112C112.093 16.4371 111.727 16.5 111.301 16.5C110.696 16.5 110.146 16.3602 109.651 16.0805C109.158 15.7972 108.765 15.3654 108.472 14.785C108.182 14.2011 108.037 13.4633 108.037 12.5717C108.037 11.6591 108.186 10.8969 108.482 10.285C108.779 9.67312 109.174 9.21508 109.666 8.91088C110.162 8.60669 110.705 8.45459 111.295 8.45459C111.746 8.45459 112.123 8.53151 112.427 8.68536C112.731 8.83571 112.975 9.02452 113.16 9.25179C113.349 9.47557 113.494 9.69585 113.595 9.91263H113.679V8.55948H115.895V16.6941C115.895 17.3794 115.727 17.9528 115.392 18.4144C115.056 18.8759 114.592 19.2221 113.998 19.4528C113.408 19.6871 112.729 19.8042 111.961 19.8042ZM112.008 14.8217C112.367 14.8217 112.671 14.7326 112.919 14.5542C113.171 14.3724 113.363 14.1137 113.495 13.778C113.632 13.4389 113.7 13.0333 113.7 12.5612C113.7 12.0892 113.633 11.6801 113.501 11.334C113.368 10.9843 113.176 10.7133 112.924 10.521C112.673 10.3287 112.367 10.2326 112.008 10.2326C111.641 10.2326 111.332 10.3322 111.081 10.5315C110.829 10.7273 110.639 11 110.51 11.3497C110.38 11.6993 110.316 12.1032 110.316 12.5612C110.316 13.0263 110.38 13.4284 110.51 13.7675C110.642 14.1032 110.833 14.3637 111.081 14.549C111.332 14.7308 111.641 14.8217 112.008 14.8217Z" fill="#1B1B1B"/>
        <path d="M101.628 16.7464C101.017 16.7464 100.463 16.5891 99.9672 16.2744C99.4748 15.9562 99.0836 15.4894 98.7938 14.874C98.5074 14.2551 98.3643 13.4964 98.3643 12.5978C98.3643 11.6747 98.5127 10.9072 98.8095 10.2954C99.1063 9.67997 99.501 9.22018 99.9934 8.91598C100.489 8.60829 101.032 8.45444 101.622 8.45444C102.073 8.45444 102.448 8.53137 102.749 8.68521C103.053 8.83556 103.297 9.02437 103.482 9.25165C103.671 9.47542 103.814 9.6957 103.912 9.91249H103.98V5.87402H106.206V16.6153H104.006V15.3251H103.912C103.807 15.5488 103.658 15.7709 103.466 15.9912C103.278 16.2079 103.032 16.388 102.728 16.5314C102.427 16.6747 102.061 16.7464 101.628 16.7464ZM102.335 14.9684C102.695 14.9684 102.998 14.8705 103.246 14.6747C103.498 14.4754 103.69 14.1974 103.823 13.8408C103.959 13.4842 104.027 13.0663 104.027 12.5873C104.027 12.1083 103.96 11.6922 103.828 11.3391C103.695 10.9859 103.503 10.7132 103.252 10.5209C103 10.3286 102.695 10.2324 102.335 10.2324C101.968 10.2324 101.659 10.3321 101.408 10.5314C101.156 10.7307 100.966 11.0069 100.837 11.36C100.708 11.7132 100.643 12.1223 100.643 12.5873C100.643 13.0558 100.708 13.4702 100.837 13.8303C100.969 14.187 101.16 14.4667 101.408 14.6695C101.659 14.8688 101.968 14.9684 102.335 14.9684Z" fill="#1B1B1B"/>
        <path d="M94.3485 16.6154V8.55945H96.58V16.6154H94.3485ZM95.4695 7.52099C95.1377 7.52099 94.8531 7.41085 94.6156 7.19057C94.3816 6.96679 94.2646 6.69931 94.2646 6.38812C94.2646 6.08043 94.3816 5.81644 94.6156 5.59616C94.8531 5.37239 95.1377 5.2605 95.4695 5.2605C95.8012 5.2605 96.0841 5.37239 96.3181 5.59616C96.5555 5.81644 96.6743 6.08043 96.6743 6.38812C96.6743 6.69931 96.5555 6.96679 96.3181 7.19057C96.0841 7.41085 95.8012 7.52099 95.4695 7.52099Z" fill="#1B1B1B"/>
        <path d="M83.0939 16.6155L80.9043 8.55957H83.162L84.4087 13.9722H84.482L85.7811 8.55957H87.9969L89.317 13.9407H89.3851L90.6108 8.55957H92.8633L90.6789 16.6155H88.3165L86.9336 11.5491H86.834L85.4511 16.6155H83.0939Z" fill="#1B1B1B"/>
        </g>
        <defs>
        <clipPath id="clip0_871_17971">
        <rect width="137" height="24" fill="white" transform="translate(0.5)"/>
        </clipPath>
        </defs>
        </svg>
        `;
        const e = "White" === t || "Grass" === t ? "black" : "white";
        return rt`
        <svg width="138" height="24" viewBox="0 0 138 24" fill="${e}" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_871_18477)">
        <path d="M48.1007 8.30615C45.9402 8.30615 44.1943 10.0532 44.1943 12.2153C44.1943 14.3773 45.9402 16.1244 48.1007 16.1244C50.2612 16.1244 52.007 14.3773 52.007 12.2153C52.007 10.0532 50.2612 8.30615 48.1007 8.30615ZM48.1007 14.5738C46.7913 14.5738 45.7438 13.5038 45.7438 12.2153C45.7438 10.905 46.8131 9.8567 48.1007 9.8567C49.4101 9.8567 50.4576 10.9268 50.4576 12.2153C50.4576 13.5038 49.4101 14.5738 48.1007 14.5738Z" fill="${e}"/>
        <path d="M13.2706 8.30615C11.1101 8.30615 9.36426 10.0532 9.36426 12.2153C9.36426 14.3773 11.1101 16.1244 13.2706 16.1244C15.4311 16.1244 17.1769 14.3773 17.1769 12.2153C17.1769 10.0532 15.4092 8.30615 13.2706 8.30615ZM13.2706 14.5738C11.9612 14.5738 10.9137 13.5038 10.9137 12.2153C10.9137 10.905 11.983 9.8567 13.2706 9.8567C14.5581 9.8567 15.6275 10.9268 15.6275 12.2153C15.6275 13.5038 14.5581 14.5738 13.2706 14.5738Z" fill="${e}"/>
        <path d="M56.7862 8.30615C54.6257 8.30615 52.8799 10.0532 52.8799 12.2153C52.8799 14.3773 54.6257 16.1244 56.7862 16.1244C58.9467 16.1244 60.6926 14.3773 60.6926 12.2153C60.6926 10.0532 58.9249 8.30615 56.7862 8.30615ZM56.7862 14.5738C55.4768 14.5738 54.4293 13.5038 54.4293 12.2153C54.4293 10.905 55.4987 9.8567 56.7862 9.8567C58.0956 9.8567 59.1431 10.9268 59.1431 12.2153C59.1431 13.5038 58.0738 14.5738 56.7862 14.5738Z" fill="${e}"/>
        <path d="M8.18579 6.07855L7.2692 4.83374C6.4181 5.44522 5.41425 5.77281 4.36675 5.77281C3.40653 5.77281 2.46813 5.4889 1.66068 4.96477L0.80957 6.25325C1.85708 6.95209 3.10101 7.32334 4.36675 7.32334C5.76342 7.32334 7.07281 6.88658 8.18579 6.07855Z" fill="${"Black"===t?"#1C7EF1":e}"/>
        <path d="M67.8286 5.99121V9.09229C67.174 8.59001 66.3447 8.28427 65.4718 8.28427C63.3113 8.28427 61.5654 10.0314 61.5654 12.1934C61.5654 14.3554 63.3113 16.1025 65.4718 16.1025C67.6323 16.1025 69.3781 14.3554 69.3781 12.1934V5.99121H67.8286ZM65.4718 14.5738C64.1624 14.5738 63.1149 13.5037 63.1149 12.2152C63.1149 10.9049 64.1842 9.85665 65.4718 9.85665C66.7812 9.85665 67.8286 10.9267 67.8286 12.2152C67.8286 13.5037 66.7593 14.5738 65.4718 14.5738Z" fill="${e}"/>
        <path d="M41.816 9.09232C41.1613 8.59003 40.3538 8.28429 39.4591 8.28429C37.2986 8.28429 35.5528 10.0314 35.5528 12.1934C35.5528 14.3336 37.2768 16.0588 39.3936 16.1025C40.703 16.1025 41.7505 17.1726 41.7505 18.4611C41.7505 19.7714 40.6812 20.8197 39.3936 20.8197C38.0843 20.8197 37.0367 19.7496 37.0367 18.4611H35.4873C35.4873 20.6231 37.2332 22.3702 39.3936 22.3702C41.5541 22.3702 43.3 20.6231 43.3 18.4611C43.3 17.1945 42.6889 16.0588 41.7505 15.3382C42.7326 14.6175 43.3654 13.4819 43.3654 12.1716V8.26245H41.816V9.09232ZM39.4591 14.5738C38.1497 14.5738 37.1022 13.5037 37.1022 12.2152C37.1022 10.9049 38.1715 9.85667 39.4591 9.85667C40.7685 9.85667 41.816 10.9268 41.816 12.2152C41.816 13.5037 40.7467 14.5738 39.4591 14.5738Z" fill="${e}"/>
        <path d="M24.2701 12.2152C24.2701 13.5255 23.2007 14.5737 21.9132 14.5737C20.6038 14.5737 19.5563 13.5036 19.5563 12.2152V8.52441H18.0068V12.4117C18.116 14.4645 19.8182 16.1243 21.9132 16.1243C24.03 16.1243 25.7322 14.4427 25.8195 12.3462V8.52441H24.2701V12.2152Z" fill="${e}"/>
        <path d="M6.85504 12.2152C6.85504 13.5255 5.7857 14.5737 4.49814 14.5737C3.21057 14.5737 2.14123 13.5036 2.14123 12.2152V8.52441H0.591797V12.4117C0.700912 14.4645 2.40312 16.1243 4.49814 16.1243C5.80752 16.1243 6.85504 17.1944 6.85504 18.4828C6.85504 19.7932 5.7857 20.8414 4.49814 20.8414C3.21057 20.8414 2.14123 19.7713 2.14123 18.4828H0.591797C0.591797 20.6449 2.33765 22.392 4.49814 22.392C6.65862 22.392 8.40447 20.6449 8.40447 18.4828C8.40447 17.1944 7.77159 16.0588 6.81138 15.3381C7.72795 14.6611 8.33901 13.5691 8.38266 12.3462V8.52441H6.8332V12.2152H6.85504Z" fill="${e}"/>
        <path d="M30.8819 8.30615C29.9872 8.30615 29.1797 8.6119 28.525 9.11418V8.52454H26.9756V15.8842H28.525V12.1934C28.525 10.8831 29.5944 9.83486 30.8819 9.83486C32.1695 9.83486 33.2388 10.905 33.2388 12.1934H34.7883C34.7883 10.0532 33.0424 8.30615 30.8819 8.30615Z" fill="${e}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M75.5459 5.16923C75.5459 2.31434 77.8574 0 80.7087 0H132.337C135.189 0 137.5 2.31434 137.5 5.16923V18.8308C137.5 21.6857 135.189 24 132.337 24H80.7087C77.8574 24 75.5459 21.6857 75.5459 18.8308V5.16923ZM131.356 8.55945V10.2378H129.842V14.1399C129.842 14.3462 129.874 14.507 129.937 14.6224C130 14.7343 130.087 14.8129 130.199 14.8584C130.314 14.9039 130.447 14.9266 130.597 14.9266C130.702 14.9266 130.806 14.9178 130.911 14.9004C130.978 14.887 131.034 14.8758 131.081 14.8667L131.152 14.8532L131.503 16.5157C131.391 16.5507 131.234 16.5909 131.032 16.6364C130.829 16.6853 130.583 16.715 130.293 16.7255C129.755 16.7465 129.284 16.6748 128.879 16.5105C128.477 16.3462 128.165 16.0909 127.941 15.7448C127.717 15.3986 127.608 14.9615 127.611 14.4336V10.2378H126.511V8.55945H127.611V6.62938H129.842V8.55945H131.356ZM119.495 16.2692C120.092 16.6049 120.805 16.7727 121.632 16.7727C122.296 16.7727 122.881 16.6713 123.387 16.4685C123.897 16.2622 124.313 15.9755 124.634 15.6084C124.959 15.2378 125.174 14.8042 125.278 14.3077L123.214 14.1713C123.138 14.3741 123.026 14.5455 122.879 14.6853C122.733 14.8252 122.556 14.9301 122.35 15C122.144 15.0699 121.917 15.1049 121.669 15.1049C121.295 15.1049 120.972 15.0262 120.7 14.8689C120.428 14.7115 120.216 14.4878 120.066 14.1976C119.92 13.9073 119.846 13.5629 119.846 13.1643V13.1591H125.325V12.5455C125.325 11.8601 125.229 11.2622 125.037 10.7517C124.845 10.2378 124.576 9.81119 124.231 9.47203C123.888 9.13287 123.487 8.87937 123.026 8.71154C122.568 8.54021 122.074 8.45455 121.543 8.45455C120.754 8.45455 120.066 8.62937 119.48 8.97902C118.896 9.32867 118.444 9.81644 118.123 10.4423C117.802 11.0682 117.641 11.7955 117.641 12.6241C117.641 13.4738 117.802 14.2098 118.123 14.8322C118.444 15.4511 118.902 15.9301 119.495 16.2692ZM119.848 11.7745H123.225C123.225 11.4528 123.155 11.1678 123.015 10.9196C122.876 10.6713 122.682 10.4773 122.434 10.3374C122.189 10.1941 121.905 10.1224 121.58 10.1224C121.241 10.1224 120.941 10.2011 120.679 10.3584C120.421 10.5122 120.218 10.7203 120.071 10.9825C119.936 11.2212 119.862 11.4852 119.848 11.7745ZM111.961 19.8042C111.238 19.8042 110.618 19.7045 110.101 19.5052C109.588 19.3094 109.179 19.042 108.876 18.7028C108.572 18.3636 108.374 17.9825 108.284 17.5594L110.348 17.2815C110.41 17.4423 110.51 17.5927 110.646 17.7325C110.782 17.8724 110.962 17.9843 111.186 18.0682C111.413 18.1556 111.689 18.1993 112.013 18.1993C112.499 18.1993 112.899 18.0804 113.213 17.8427C113.531 17.6084 113.69 17.215 113.69 16.6626V15.1888H113.595C113.497 15.4126 113.351 15.6241 113.155 15.8234C112.96 16.0227 112.708 16.1853 112.401 16.3112C112.094 16.4371 111.727 16.5 111.301 16.5C110.697 16.5 110.147 16.3601 109.651 16.0804C109.158 15.7972 108.766 15.3654 108.472 14.785C108.182 14.2011 108.037 13.4633 108.037 12.5717C108.037 11.6591 108.186 10.8969 108.483 10.285C108.78 9.67308 109.174 9.21504 109.667 8.91084C110.162 8.60665 110.705 8.45455 111.296 8.45455C111.746 8.45455 112.123 8.53147 112.427 8.68532C112.731 8.83567 112.975 9.02448 113.16 9.25175C113.349 9.47553 113.494 9.69581 113.595 9.91259H113.679V8.55944H115.895V16.6941C115.895 17.3794 115.727 17.9528 115.392 18.4143C115.057 18.8759 114.592 19.222 113.999 19.4528C113.408 19.6871 112.729 19.8042 111.961 19.8042ZM112.008 14.8217C112.368 14.8217 112.672 14.7325 112.92 14.5542C113.171 14.3724 113.363 14.1136 113.496 13.778C113.632 13.4388 113.7 13.0332 113.7 12.5612C113.7 12.0892 113.634 11.6801 113.501 11.3339C113.368 10.9843 113.176 10.7133 112.925 10.521C112.673 10.3287 112.368 10.2325 112.008 10.2325C111.641 10.2325 111.332 10.3322 111.081 10.5315C110.829 10.7273 110.639 11 110.51 11.3497C110.381 11.6993 110.316 12.1031 110.316 12.5612C110.316 13.0262 110.381 13.4283 110.51 13.7675C110.643 14.1031 110.833 14.3636 111.081 14.549C111.332 14.7308 111.641 14.8217 112.008 14.8217ZM99.9675 16.2745C100.463 16.5892 101.017 16.7465 101.628 16.7465C102.061 16.7465 102.428 16.6748 102.728 16.5315C103.032 16.3881 103.278 16.208 103.467 15.9913C103.659 15.771 103.807 15.5489 103.912 15.3252H104.006V16.6154H106.206V5.87413H103.98V9.91259H103.912C103.814 9.6958 103.671 9.47552 103.482 9.25175C103.297 9.02447 103.053 8.83566 102.749 8.68531C102.449 8.53147 102.073 8.45455 101.623 8.45455C101.033 8.45455 100.49 8.60839 99.9937 8.91608C99.5013 9.22028 99.1067 9.68007 98.8098 10.2955C98.513 10.9073 98.3646 11.6748 98.3646 12.5979C98.3646 13.4965 98.5078 14.2552 98.7941 14.8741C99.084 15.4895 99.4751 15.9563 99.9675 16.2745ZM103.247 14.6748C102.999 14.8706 102.695 14.9685 102.335 14.9685C101.969 14.9685 101.659 14.8689 101.408 14.6696C101.16 14.4668 100.97 14.1871 100.837 13.8304C100.708 13.4703 100.643 13.0559 100.643 12.5874C100.643 12.1224 100.708 11.7133 100.837 11.3601C100.966 11.007 101.157 10.7308 101.408 10.5315C101.659 10.3322 101.969 10.2325 102.335 10.2325C102.695 10.2325 103 10.3287 103.252 10.521C103.503 10.7133 103.695 10.986 103.828 11.3392C103.961 11.6923 104.027 12.1084 104.027 12.5874C104.027 13.0664 103.959 13.4843 103.823 13.8409C103.69 14.1976 103.498 14.4755 103.247 14.6748ZM94.3491 16.6154V8.55944H96.5806V16.6154H94.3491ZM95.4701 7.52098C95.1383 7.52098 94.8537 7.41084 94.6162 7.19056C94.3822 6.96678 94.2653 6.6993 94.2653 6.38811C94.2653 6.08042 94.3822 5.81643 94.6162 5.59616C94.8537 5.37238 95.1383 5.26049 95.4701 5.26049C95.8018 5.26049 96.0847 5.37238 96.3187 5.59616C96.5562 5.81643 96.6749 6.08042 96.6749 6.38811C96.6749 6.6993 96.5562 6.96678 96.3187 7.19056C96.0847 7.41084 95.8018 7.52098 95.4701 7.52098ZM80.9047 8.55944L83.0943 16.6154H85.4515L86.8344 11.549H86.9339L88.3168 16.6154H90.6793L92.8637 8.55944H90.6112L89.3854 13.9406H89.3174L87.9973 8.55944H85.7815L84.4824 13.972H84.4091L83.1624 8.55944H80.9047Z" fill="${"White"===t||"Black"===t?"#B6D7FF":"Grass"===t?"black":"white"}"/>
        
        </g>
        <defs>
        <clipPath id="clip0_871_18477">
        <rect width="137" height="24" fill="${"Black"===t?"#1C7EF1":e}" transform="translate(0.5)"/>
        </clipPath>
        </defs>
        </svg>
    `
    }

    function se(t) {
        let e = "#2B3238";
        return t && (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) && (e = "White" === t || "Grass" === t ? "#2B3238" : "#FFFFFF"), rt`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 3.29289C16.3166 2.90237 15.6834 2.90237 15.2929 3.29289L10 8.58579L4.70711 3.29289C4.31658 2.90237 3.68342 2.90237 3.29289 3.29289C2.90237 3.68342 2.90237 4.31658 3.29289 4.70711L8.58579 10L3.29289 15.2929C2.90237 15.6834 2.90237 16.3166 3.29289 16.7071C3.68342 17.0976 4.31658 17.0976 4.70711 16.7071L10 11.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L11.4142 10L16.7071 4.70711C17.0976 4.31658 17.0976 3.68342 16.7071 3.29289Z" fill="${e}"/>
</svg>
    `
    }
    class le extends Ft {
        timerIdForAnimation = null;
        actionBody = {
            id: "default-uuid",
            widgetSettings: this.widget?.widgetSettings,
            backgroundImage: {
                url: null
            },
            logoImage: {
                url: null
            },
            isAppearance: !0
        };
        static properties = (() => ({
            _isOpen: {
                type: Boolean
            },
            widget: {
                type: Object
            },
            wazzupId: {
                type: String
            },
            integrationsService: {
                type: Object
            },
            isModal: {
                type: Boolean
            },
            subscription: {
                type: Object
            }
        }))();
        constructor() {
            super()
        }
        afterTransition(t) {
            t.target.classList.contains("PFHidden") && (t.target.style.display = "none")
        }
        open(t) {
            this._isOpen = !0, this.actionBody = t;
            const e = this.shadowRoot.getElementById("PFModalOverlay"),
                i = this.shadowRoot.getElementById("PFModal");
            clearTimeout(this.timerIdForAnimation), e.addEventListener("transitionend", this.afterTransition, !0), e.addEventListener("webkitTransitionEnd", this.afterTransition, !0), i.classList.remove("PFModalAnimateOut"), i.classList.add("PFModalAnimateIn", "PFAnimated"), e.classList.remove("PFHidden"), e.style.display = "flex", this.timerIdForAnimation = setTimeout((() => {
                e.style.opacity = 1, i.classList.remove("PFAnimated")
            }), 100)
        }
        close() {
            this._isOpen = !1, this.integrationsService.fireEvent("WP_modal_close"), this.dispatchEvent(new CustomEvent("close"));
            const t = this.shadowRoot.getElementById("PFModalOverlay"),
                e = this.shadowRoot.getElementById("PFModal");
            e.classList.remove("PFModalAnimateIn"), e.classList.add("PFModalAnimateOut", "PFAnimated"), t.classList.add("PFHidden"), this.timerIdForAnimation = setTimeout((() => {
                t.style.opacity = 0, e.classList.remove("PFAnimated")
            }), 100)
        }
        QrCodeSection(t) {
            const e = "Black" === t,
                i = Yt(this.widget),
                n = navigator.language || navigator.userLanguage,
                r = /ru/i.test(n) ? "Напишите с телефона" : "Write from your phone",
                o = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonWhatsapp"
            @click="${this.handleWhatsappOpenClick}"
          >

              ${this.widget.widgetSettings.textSettings.whatsappBtn}
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                s = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonTelegram"
            @click="${this.handleTelegramOpenClick}"
          >
              ${this.widget.widgetSettings.textSettings.telegramBtn}
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                l = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonViber"
            @click="${this.handleViberOpenClick}"
          >
              ${this.widget.widgetSettings.textSettings.viberBtn}
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                c = rt`
      <button
        class="PFModalButton ${`PFModalButton${a(i)}`}"
        @click="${"whatsapp"===i?this.handleWhatsappOpenClick:"telegram"===i?this.handleTelegramOpenClick:this.handleViberOpenClick}"
      >
       
          ${Et("whatsapp"===i,(()=>`${this.widget.widgetSettings.textSettings.whatsappBtn}`),(()=>Et("telegram"===i,(()=>`${this.widget.widgetSettings.textSettings.telegramBtn}`),(()=>`${this.widget.widgetSettings.textSettings.viberBtn}`))))}
         <div class="PFModalButtonIcon"></div>
      </button>
    `;
            let d = function(t, e) {
                const i = new URL("https://widget.yourgood.app");
                return i.pathname = "/api/qr/generate", i.searchParams.append("url", t), i.searchParams.append("type", e), i.toString()
            }((u = this.wazzupId, p = this.widget.id, `https://widget.yourgood.app/bridge?wid=${u}&sid=${p}`), i);
            var u, p;
            return rt`
      <div 
        class="PFQrActionsContainer"
        style="background: ${qt(this.widget.widgetSettings)}"
      >
        ${Et(!0,(()=>rt`
        <div class="PFQrActions">
          <div class="PFButtonsContainer">
            ${Et("whatsapp-and-telegram"===i,(()=>[o,s]),(()=>Et("whatsapp-and-viber"===i,(()=>[o,l]),(()=>Et("telegram-and-viber"===i,(()=>[s,l]),(()=>Et("whatsapp-and-telegram-and-viber"===i,(()=>[o,s,l]),(()=>c))))))))}
          </div>
        </div>
              <div class="PFQrScan">
                <img
                  class="PFQrScanImage"
                  width="152"
                  height="152"
                  alt=""
                  src="${d}"
                >
                <div class="PFQrTextContainer">
                ${Et(e,(()=>rt`
                  <div
                    class="PFQrTextDark"
                  >
                     ${r}
                  </div>
                `),(()=>rt`
                  <div
                  class="PFQrText"
                >
                  ${r}
                </div>
                `))}
                
              </div>
            `),(()=>at))}
      </div>
    `
        }
        cButtonClose() {
            return rt`
      <button class="PFModalButtonClose" @click="${this.close}">
        ${se("PFModalButtonCloseIcon")}
      </button>
    `
        }
        BackgroundImageSection() {
            const {
                widgetSettings: {
                    backgroundImageEnabled: t
                },
                backgroundImage: e
            } = this.widget;
            return t ? rt`
      <div class="PFModalBackground">
        <img
            class="PFModalBackgroundImage"
            src="${e.url}"
            alt=""
        >
      </div>
    ` : ""
        }
        logoFileSection() {
            const {
                widgetSettings: {
                    logoEnabled: t
                },
                logoImage: e
            } = this.widget;
            return t ? rt`
      <div class="PFModalHeaderLogo">
        <img
            class="PFModalHeaderLogoImage"
            src="${e.url}"
            alt=""
        >
      </div>
    ` : ""
        }
        defaultLogo() {
            return rt`
      <div class="PFModalHeaderLogo">
        <div class="PFModalHeaderLogoImageDefault">
        Ваш логотип
        </div>
      </div>
    `
        }
        cFooter() {
            const {
                widgetSettings: t
            } = this.widget;
            return rt`
      <div class="PFModalFooter">
        <a href="${Ot()}" target="_blank">
          ${ae(t.background.theme.name)}
        </a>
      </div>
    `
        }
        render() {
            const {
                backgroundImage: t,
                logoImage: e,
                widgetSettings: i,
                isAppearance: n
            } = this.widget, r = Nt.includes(i.background.theme.name), o = !1 === i.branding, s = new DOMParser, l = i.textSettings.header, c = i.textSettings.text, d = s.parseFromString(l, "text/html"), u = s.parseFromString(c, "text/html");
            return rt`
      <div
        id="PFModalOverlay"
        class="PFModalOverlay"
        style="z-index: 2147483647"
        aria-hidden="${!this._isOpen}"
      >
        <section
          id="PFModal"
          class=${Wt({PFModal:!0,PFModalWithoutBg:!i.backgroundImageEnabled&&null===t,[`PFModalBg${a(i.backgroundPosition)}`]:null!==t&&i.backgroundImageEnabled})}
          data-with-branding="${o}"
        >
          ${this.cButtonClose()}

          ${Et(t&&i.backgroundImageEnabled,(()=>this.BackgroundImageSection()),(()=>at))}

          <div class="PFModalBody" style="background: ${Gt(this.widget.widgetSettings)}">
            <header class="PFModalHeader">
              ${Et(e&&i.logoEnabled,(()=>this.logoFileSection()),(()=>Et(!e&&i.logoEnabled,(()=>this.defaultLogo()),(()=>at))))}
              ${Et(!e&&!t,(()=>rt`<div class="PFModalHeaderTextContent" style="height: 8px"></div>`),(()=>at))}
            <div class="PFModalHeaderTextContent">
            ${Et(r,(()=>rt`
              <div class="PFModalHeaderTitleDark">${d.body}</div>
               <div class="PFModalHeaderTextDark"><span>${u.body}</span></div>
              `),(()=>rt`
                <div class="PFModalHeaderTitle">${d.body}</div>
                <div class="PFModalHeaderText"><span>${u.body}</span></div>
              `))}
            
            </div>
            </header>

            <div>
              ${this.QrCodeSection(i.background.theme.name)}
            </div>

            ${Et(o,(()=>this.cFooter()),(()=>at))}
          </div>
        </section>
      </div>
    `
        }
        handleWhatsappOpenClick() {
            ne(this.widget, this.actionBody, this.wazzupId, this.hid, this.integrationsService)
        }
        handleTelegramOpenClick() {
            re(this.widget, this.actionBody, this.wazzupId, this.hid, this.integrationsService)
        }
        handleViberOpenClick() {
            oe(this.widget, this.actionBody, this.wazzupId, this.hid, this.integrationsService)
        }
        static styles = (() => M`
    ${Vt}
    ${jt}

    .PFModalOverlay {
      --pf-modal-scale: 1;
      --common-black: #2b3238;
      --common-rain: #D0DBE4;
      --primary: #212121;
      --common-dark: #1B1B1B;

      all: unset;
      position: fixed;
      left: 0;
      box-sizing: border-box;
      z-index: 9999;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.23);
      opacity: 0;
      transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1) opacity;
      display: none;
    }

    .PFModal {
      all: unset;
      position: relative;
      display: flex;
      width: 100%;
      box-shadow: 0 10px 20px 1px rgba(33, 33, 33, 0.04);
      border-radius: calc(16px * var(--pf-modal-scale));
      overflow: hidden;
      flex-direction: column;
      min-width: calc(480px * var(--pf-modal-scale));
      max-width: calc(480px * var(--pf-modal-scale));
    }

      .PFModal.PFModalBgLeft,
      .PFModal.PFModalBgRight {
        max-width: calc(708px * var(--pf-modal-scale));
      }

      .PFModal.PFModalBgRight {
        flex-direction: row-reverse;
      }

      .PFModalBgLeft {
        flex-direction: row;
      }

      .PFModal.PFModalBgLeft .PFModalBackground,
      .PFModal.PFModalBgRight .PFModalBackground {
        width: calc(228px * var(--pf-modal-scale));
        height: 100%;
      }
    

    .PFModal.PFModalBgTop .PFModalBackground {
      width: calc(480px * var(--pf-modal-scale));
      height: calc(164px * var(--pf-modal-scale));
    }

    .PFModal.PFModalBgTop .PFModalBackground .PFModalHeader {
      min-width: 302px;
    }

    .PFModal.PFModalBgTop {
      flex-direction: column;
      max-width: calc(480px * var(--pf-modal-scale));
    }

    .PFModal.PFModalWithoutBg {
      max-width: calc(518px * var(--pf-modal-scale)) !important;
      height: auto !important;
    }

    .PFModal.PFModalWithoutBg .PFModalHeader{
      padding-top: 24px;
    }

    .PFModal.PFModalWithoutBg .PFModalHeader:has(.PFModalHeaderLogo) {
      padding-top: 0px;
    }

    .PFModalButtonClose {
      --s: calc(36px * var(--pf-modal-scale));

      all: unset;
      position: absolute;
      z-index: 2;
      display: flex;
      top: calc(10px * var(--pf-modal-scale));
      right: calc(10px * var(--pf-modal-scale));
      align-items: center;
      justify-content: center;
      width: var(--s);
      height: var(--s);
      border-radius: 50%;
      cursor: pointer;
      background-color: white
    }

    .PFModalButtonCloseIcon {
     --s: calc(20px * var(--pf-modal-scale));

    all: unset;
    width: var(--s);
    height: var(--s);
    padding: calc(8px * var(--pf-modal-scale));
    background-color: var(--white);
    border-radius: 100px;
    }

    .PFModalBody {
      all: unset;
      position: relative;
      box-sizing: border-box;
      padding:
          calc(24px * var(--pf-modal-scale))
          calc(24px * var(--pf-modal-scale))
          calc(16px * var(--pf-modal-scale))
          calc(24px * var(--pf-modal-scale));
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: calc(24px * var(--pf-modal-scale));
    }

    .PFModalFooter {
      all: unset;
      align-items: center;
      // padding-bottom: calc(16px * var(--pf-modal-scale));
      display: flex;
      justify-content: center;
      text-align: center;
      color: inherit;
      gap: calc(10px * var(--pf-modal-scale));
      width: 100%;
      height: calc(24px * var(--pf-modal-scale));

      & svg {
        width: calc(137px * var(--pf-modal-scale));
        height: calc(24px * var(--pf-modal-scale));
      }
    }

    .PFModalFooter a {
      color: inherit;
      cursor: pointer;
      text-decoration: none;
    }

    .PFModalHeader {
      all: unset;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .PFModalHeaderLogo {
      all: unset;
      box-sizing: border-box; 
      display: flex;
      height: calc(56px * var(--pf-modal-scale));
      width: calc(100 * var(--pf-modal-scale));
      overflow: hidden;
    }

    .PFModalHeaderLogoImage {
      all: unset;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

   .PFModalHeaderLogoImageDefault {
      display: flex;
      max-height: 56px;
      padding: 0px 12px;
      justify-content: center;
      align-items: center;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border: 1px dashed var(--common-rain);
      background: white;
      color: var(--common-dark);
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
    }

    .PFModalHeaderTitle {
      
      text-align: center;
      word-wrap: anywhere !important;
      white-space: pre-line;
      font-family: 'Inter', sans-serif;
      font-size: calc(22px * var(--pf-modal-scale));
      font-style: normal;
      width: 100%;
      font-weight: 600;
      line-height: calc(32px * var(--pf-modal-scale)); /* 145.455% */
      letter-spacing: calc(-0.22px * var(--pf-modal-scale));

      & p {
        color: inherit !important;
        background-color: transparent !important;

        & span,
        & strong,
        & em,
        & u {
          color: inherit !important;
          background-color: transparent !important;
        }
      }

      body {
       color: white;
      }
    }


     .PFModalHeaderTitleDark {
     
      text-align: center;
      word-wrap: anywhere !important;
      white-space: pre-line;
      font-family: 'Inter', sans-serif;
      font-size: calc(22px * var(--pf-modal-scale));
      font-style: normal;
      width: 100%;
      font-weight: 600;
      line-height: calc(32px * var(--pf-modal-scale)); /* 145.455% */
      letter-spacing: calc(-0.22px * var(--pf-modal-scale));

      & p {
        color: inherit !important;
        background-color: transparent !important;

        & span,
        & strong,
        & em,
        & u {
          color: inherit !important;
          background-color: transparent !important;
        }
      }

      body {
       margin: 0;
       color: var(--common-black);
      }
    }

    .PFModalHeaderTextContent {
      display: flex;
      width: calc(384px * var(--pf-modal-scale));
      flex-direction: column;
      gap: calc(12px * var(--pf-modal-scale));
      align-items: center;
      padding-top: 4px;
    }


    .PFModalHeaderText {
      display: flex;
      flex-wrap: wrap;
      color: var(--primary);
      word-wrap: anywhere !important;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: calc(14px * var(--pf-modal-scale));
      font-style: normal;
      font-weight: 400;
      justify-content: center;
      width: 100%;
      line-height: calc(20px * var(--pf-modal-scale));

      body {
        margin: 0;
        color: white;
      }
    }

    .PFModalHeaderTextDark {
      display: flex;
      flex-wrap: wrap;
      color: var(--primary);
      word-wrap: anywhere !important;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: calc(14px * var(--pf-modal-scale));
      font-style: normal;
      font-weight: 400;
      justify-content: center;
      width: 100%;
      line-height: calc(20px * var(--pf-modal-scale));

      body {
        margin: 0;
      }
      
      color: var(--common-black)
    }

    .PFModalBackground {
      all: unset;
      display: flex;
      flex-shrink: 0;
      overflow: hidden;
      width: 100%;
      height: calc(240px * var(--pf-modal-scale));
    }

    .PFModalBackgroundImage {
      all: unset;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .PFModalButton {
      all: unset;
      box-sizing: border-box;
      padding: calc(12px * var(--pf-modal-scale)) calc(16px * var(--pf-modal-scale));
      display: flex;
      justify-content: center;
      align-items: center;
      gap: calc(8px * var(--pf-modal-scale));
      width: 100%;
      cursor: pointer;
      background-color: var(--pf-grey-200);
      border-radius: calc(8px * var(--pf-modal-scale));
      max-height: calc(48px * var(--pf-modal-scale));
      color: var(--pf-white);
      user-select: none;
      font-family: 'Inter', sans-serif !important;
      font-style: normal;
      font-weight: 400;
      font-size: calc(14px * var(--pf-modal-scale));
      line-height: calc(20px * var(--pf-modal-scale));
      letter-spacing: calc(0.17px * var(--pf-modal-scale));
      box-shadow: 0 1px 5px rgba(89, 104, 143, 0.06);
      text-align: center;
      width: 236px;
      white-space: nowrap;
      overflow: hidden;
    }

    .PFModalButton.PFModalButtonWhatsapp {
      background-color: var(--pf-modal-whatsapp-color);
    }
    .PFModalButton.PFModalButtonWhatsapp:hover {
      background-color: #52b85c;
    }
    .PFModalButton.PFModalButtonWhatsapp:active {
      background-color: #469c4e;
    }

    .PFModalButton.PFModalButtonTelegram {
      background-color: var(--pf-modal-telegram-color);
    }
    .PFModalButton.PFModalButtonTelegram:hover {
      background-color: #228cc6;
    }
    .PFModalButton.PFModalButtonTelegram:active {
      background-color: #1b719f;
    }


    .PFModalButton.PFModalButtonViber {
      background-color: var(--pf-modal-viber-color);
    }
    .PFModalButton.PFModalButtonViber:hover {
      background-color: #8074D6;
    }
    .PFModalButton.PFModalButtonViber:active {
      background-color: #655cac;
    }

    .PFModalButtonIcon {
      --s: calc(28px * var(--pf-modal-scale));

      all: unset;
      box-sizing: border-box;
      width: var(--s);
      height: var(--s);
      mask: var(--icon);
      -webkit-mask: var(--icon);
      mask-size: 100% 100%;
      -webkit-mask-size: 100% 100%;
      background-color: currentColor;
      flex-shrink: 0;
    }

    .PFQrActionsContainer {
      width: auto;
      background: var(--background);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      gap: calc(20px * var(--pf-modal-scale));
      padding: calc(20px * var(--pf-modal-scale));
    }

    .PFActionsContainerWithoutQr {
      display: block !important;
    }

    .PFQrActions {
      width: 100%;
    }

    .PFQrScan {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      gap: calc(8px * var(--pf-modal-scale));
    }

    .PFQrScanText {
      height: 42px;
      color: #212121;
      text-align: center;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 143%;
      letter-spacing: 0.17px;
      margin: 0;
      margin-bottom: 12px;
    }

    .PFQrActionsContainer.dark .PFQrScanText{
      color: #fff;
    }

    .PFQrScanImage {
      width: calc(136px * var(--pf-modal-scale));
      height: calc(136px * var(--pf-modal-scale));
      border-radius: calc(16px * var(--pf-modal-scale));
      overflow: hidden;
    }

    .PFQrTextContainer {
      width: 100%;
      display: flex;
      flex-direction: row;
      grid-gap: calc(12px * var(--pf-modal-scale));
      align-items: center;
      justify-content: center;
    }

    .PFQrText {
      color: var(--common-black);
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: calc(10px * var(--pf-modal-scale));
      font-style: normal;
      font-weight: 400;
      line-height: calc(14px * var(--pf-modal-scale));
    }

    .PFQrTextDark {
      color: white;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: calc(10px * var(--pf-modal-scale));
      font-style: normal;
      font-weight: 400;
      line-height: calc(14px * var(--pf-modal-scale));
    }

    .PFQrActionsTitleContainer {
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 12px;
    }

    .PFQrActionsTitleContainerWithoutQr {
      all: unset;
      display: block;
      margin-bottom: 18px;
    }

    .PFQrActionsTitle {
      width: 100%;
      margin: 0;
      text-align: center;
      color: #212121;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 143%;
      letter-spacing: 0.17px;
    }

    .PFQrActionsContainer.dark .PFQrActionsTitle{
      color: #fff;
    }

    .PFButtonsContainer {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 16px;
    }

    .PFModalDualCardItem {
      all: unset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: calc(24px * var(--pf-modal-scale));
      background-color: transparent;
      border-width: 0;
      box-sizing: border-box;
      padding-top: calc(16px * var(--pf-modal-scale));
      padding-left: calc(16px * var(--pf-modal-scale));
      padding-right: calc(16px * var(--pf-modal-scale));
    }

    .PFModalDualCardItemButtonFooter {
      all: unset;
      width: 100%;
      display: flex;
      box-sizing: border-box;
    }

    .PFModalDualCardItemButton {
      all: unset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: calc(16px * var(--pf-modal-scale));
    }

    .PFModalAnimateIn {
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      transform: translate3d(0, 0, 0);
    }

    .PFModalAnimateIn.PFAnimated {
      transform: translate3d(0, 100%, 0);
    }

    .PFModalAnimateOut {
      transition: transform 0.27s cubic-bezier(0.175, 0.885, 0.32, 1);
      transform: translate3d(0, 100%, 0);
    }
  `)()
    }
    customElements.get("pf-modal") || customElements.define("pf-modal", le), customElements.get("pf-default") || customElements.define("pf-default", class extends le {});
    class ce extends Ft {
        constructor() {
            super()
        }
        afterTransition(t) {
            t.target.classList.contains("PFHidden") && (t.target.style.display = "none")
        }
        open(t) {
            this._isOpen = !0, this.actionBody = t;
            const e = this.shadowRoot.getElementById("PFModalOverlay"),
                i = this.shadowRoot.getElementById("PFModal");
            clearTimeout(this.timerIdForAnimation), e.addEventListener("transitionend", this.afterTransition, !0), e.addEventListener("webkitTransitionEnd", this.afterTransition, !0), i.classList.remove("PFModalAnimateOut"), i.classList.add("PFModalAnimateIn", "PFAnimated"), e.classList.remove("PFHidden"), e.style.display = "flex", this.timerIdForAnimation = setTimeout((() => {
                e.style.opacity = 1, i.classList.remove("PFAnimated")
            }), 100)
        }
        close() {
            this._isOpen = !1, this.integrationsService.fireEvent("WP_modal_close"), this.dispatchEvent(new CustomEvent("close"));
            const t = this.shadowRoot.getElementById("PFModalOverlay"),
                e = this.shadowRoot.getElementById("PFModal");
            e.classList.remove("PFModalAnimateIn"), e.classList.add("PFModalAnimateOut", "PFAnimated"), t.classList.add("PFHidden"), this.timerIdForAnimation = setTimeout((() => {
                t.style.opacity = 0, e.classList.remove("PFAnimated")
            }), 100)
        }
        isSubscriptionExpired() {
            if (!this.subscription) return !0;
            if (!this.subscription.subscriptionPlan) return !0;
            return new Date(this.subscription.subscriptionPlan.dueDate).getTime() < Date.now()
        }
        telegramClick() {
            const t = Yt(this.widget),
                e = Jt(t, this.isSubscriptionExpired());
            re(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e)
        }
        whatsappClick() {
            const t = Yt(this.widget),
                e = Jt(t, this.isSubscriptionExpired());
            ne(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e)
        }
        viberClick() {
            const t = Yt(this.widget),
                e = Jt(t, this.isSubscriptionExpired());
            oe(this.widget, 0, this.wazzupId, this.hid, this.integrationsService, e)
        }
        cButtonClose(t) {
            return rt`
      <button class="PFModalButtonClose" @click="${this.close}">
        ${se(t,!0)}
      </button>
    `
        }
        buttonsSection() {
            const t = Yt(this.widget),
                e = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonWhatsapp"
            @click="${this.whatsappClick}"
          >
            <span>
              ${this.widget.widgetSettings.textSettings.whatsappBtn}
            </span>
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                i = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonTelegram"
            @click="${this.telegramClick}"
          >
            <span>
              ${this.widget.widgetSettings.textSettings.telegramBtn}
            </span>
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                n = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonViber"
            @click="${this.viberClick}"
          >
            <span>
              ${this.widget.widgetSettings.textSettings.viberBtn}
            </span>
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                r = rt`
      <button
        class="PFModalButton ${`PFModalButton${a(t)}`}"
        @click="${"whatsapp"===t?this.whatsappClick:"telegram"===t?this.telegramClick:this.viberClick}"
      >
       
        <span>
          ${Et("whatsapp"===t,(()=>`${this.widget.widgetSettings.textSettings.whatsappBtn}`),(()=>Et("telegram"===t,(()=>`${this.widget.widgetSettings.textSettings.telegramBtn}`),(()=>`${this.widget.widgetSettings.textSettings.viberBtn}`))))}
        </span>
         <div class="PFModalButtonIcon"></div>
      </button>
    `;
            return rt`
      <div 
        class="PFButtons"
        style="background: ${qt(this.widget.widgetSettings)}"
      >
        <div class="PFButtonsContainer">
            ${Et("whatsapp-and-telegram"===t,(()=>[e,i]),(()=>Et("whatsapp-and-viber"===t,(()=>[e,n]),(()=>Et("telegram-and-viber"===t,(()=>[i,n]),(()=>Et("whatsapp-and-telegram-and-viber"===t,(()=>[e,i,n]),(()=>r))))))))}
         
     
        </div>
    `
        }
        cFooter() {
            const {
                widgetSettings: t
            } = this.widget;
            return rt`
      <div class="PFModalFooter">
        <a href="${Ot()}" target="_blank">
          ${ae(t.background.theme.name)}
        </a>
      </div>
    `
        }
        logoFileSection() {
            const {
                widgetSettings: {
                    logoEnabled: t
                },
                logoImage: e
            } = this.widget;
            return t ? rt`
      <div class="PFModalHeaderLogo">
        <img
            class="PFModalHeaderLogoImage"
            src="${e.url}"
            alt=""
        >
      </div>
    ` : ""
        }
        defaultLogo() {
            return rt`
      <div class="PFModalHeaderLogo" style="width: auto !important">
        <div class="PFModalHeaderLogoImageDefault">
        Ваш логотип
        </div>
      </div>
    `
        }
        render() {
            const {
                logoImage: t,
                widgetSettings: e
            } = this.widget, i = e.background.theme.name, n = Nt.includes(i), r = !1 === e.branding, o = new DOMParser, a = e.textSettings.header, s = e.textSettings.text, l = o.parseFromString(a, "text/html"), c = o.parseFromString(s, "text/html");
            return rt`
      <div
        id="PFModalOverlay"
        class="PFModalOverlay"
        style="background: ${e.background.theme.color}"
        aria-hidden="${!this._isOpen}"
      >
        <section
          id="PFModal"
          class=${Wt({PFModal:!0})}
          data-with-branding="${r}"
        >
          ${this.cButtonClose(i)}
        
          <div class="PFModalBody" style="background: ${Gt(this.widget.widgetSettings)}">
          ${Et(t&&e.logoEnabled,(()=>this.logoFileSection()),(()=>Et(!t&&e.logoEnabled,(()=>this.defaultLogo()),(()=>at))))}
            <header class="PFModalHeader">
            
            <div class="PFModalHeaderTextContent">
            ${Et(n,(()=>rt`
              <div class="PFModalHeaderTitleDark">${l.body}</div>
               <div class="PFModalHeaderTextDark"><span>${c.body}</span></div>
              `),(()=>rt`
                <div class="PFModalHeaderTitle">${l.body}</div>
                <div class="PFModalHeaderText"><span>${c.body}</span></div>
              `))}
            
            </div>
            </header>
            ${this.buttonsSection()}
            ${Et(r,(()=>this.cFooter()),(()=>at))}
          </div>
        </section>
      </div>
    `
        }
        static styles = (() => M`
    ${Vt}
    ${jt}

    .PFModalOverlay {
      --pf-modal-scale: 1;
      --common-black: #2b3238;
      --common-rain: #D0DBE4;
      --primary: #212121;
      --common-dark: #1B1B1B;

      all: unset;
      position: fixed;
      left: 0;
      box-sizing: border-box;
      z-index: 21474836472;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.23);
      opacity: 0;
      transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1) opacity;
      display: none;
    }

    .PFModal {
      all: unset;
      position: relative;
      display: flex;
      justify-content: center;
      height: 100vh;
      width: inherit;
      flex-direction: column;
    }

    .PFModalButtonClose {
      --s: calc(36px * var(--pf-modal-scale));

      all: unset;
      position: absolute;
      z-index: 2;
      display: flex;
      top: calc(10px * var(--pf-modal-scale));
      right: calc(10px * var(--pf-modal-scale));
      align-items: center;
      justify-content: center;
      width: var(--s);
      height: var(--s);
      border-radius: 50%;
      cursor: pointer;
    }

    .PFModalButtonCloseIcon {
     --s: calc(20px * var(--pf-modal-scale));
        width: var(--s);
        height: var(--s);
        padding: calc(8px * var(--pf-modal-scale));
        border-radius: 100px;
    }

    .PFModalBody {
      all: unset;
      position: relative;
      box-sizing: border-box;
      width: 328px;
      z-index: 9999;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: calc(24px * var(--pf-modal-scale));
    }

    .PFModalFooter {
        all: unset;
        position: fixed;
        display: flex;
        padding: 24px 0pc 32px 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        bottom: 0; 
        left: 50%; 
        width: 100%;
        transform: translateX(-50%);

        & svg {
            width: calc(137px * var(--pf-modal-scale));
            height: calc(24px * var(--pf-modal-scale));
        }
    }

    .PFModalFooter a {
      color: inherit;
      cursor: pointer;
      text-decoration: none;
    }


    .PFModalHeader {
      all: unset;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .PFModalHeaderLogo {
      all: unset;
      box-sizing: border-box;
      display: flex;
      height: calc(56px * var(--pf-modal-scale));
      width: calc(100px * var(--pf-modal-scale));
      overflow: hidden;
      align-items: center;
      justify-content: center;
      padding: 3px;
    }

    .PFModalHeaderLogoImage {
      all: unset;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

   .PFModalHeaderLogoImageDefault {
      display: flex;
      height: 56px;
      padding: 0px 12px;
      justify-content: center;
      align-items: center;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border: 1px dashed var(--common-rain);
      background: white;
      color: var(--common-dark);
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
    }

    .PFModalHeaderTitle {
      text-align: center;
      word-wrap: anywhere !important;
      white-space: pre-line;
      font-family: 'Inter', sans-serif;
      font-size: calc(18px * var(--pf-modal-scale));
      font-style: normal;
      width: 100%;
      font-weight: 600;
      line-height: 28px;
      letter-spacing: -0.18px;

      & p {
        color: inherit !important;
        background-color: transparent !important;

        & span,
        & strong,
        & em,
        & u {
          color: inherit !important;
          background-color: transparent !important;
        }
      }

      body {
       color: white;
      }
    }


     .PFModalHeaderTitleDark {
     
      text-align: center;
      word-wrap: anywhere !important;
      white-space: pre-line;
      font-family: 'Inter', sans-serif;
      font-size: calc(18px * var(--pf-modal-scale));
      font-style: normal;
      width: 100%;
      font-weight: 600;
      line-height: 28px;
      letter-spacing: -0.18px;

      & p {
        color: inherit !important;
        background-color: transparent !important;

        & span,
        & strong,
        & em,
        & u {
          color: inherit !important;
          background-color: transparent !important;
        }
      }

      body {
       color: var(--common-black);
      }
    }

    .PFModalHeaderTextContent {
      display: flex;
      width: calc(328px * var(--pf-modal-scale));
      flex-direction: column;
      gap: calc(12px * var(--pf-modal-scale));
      align-items: center;
      padding-top: 4px;
    }


    .PFModalHeaderText {
      display: flex;
      flex-wrap: wrap;
      color: var(--primary);
      word-wrap: anywhere !important;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: calc(14px * var(--pf-modal-scale));
      font-style: normal;
      font-weight: 400;
      justify-content: center;
      width: 100%;
      line-height: calc(20px * var(--pf-modal-scale));

      body {
        margin: 0;
        color: white;
      }
    }

    .PFModalHeaderTextDark {
      display: flex;
      flex-wrap: wrap;
      color: var(--primary);
      word-wrap: anywhere !important;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: calc(14px * var(--pf-modal-scale));
      font-style: normal;
      font-weight: 400;
      justify-content: center;
      width: 100%;
      line-height: calc(20px * var(--pf-modal-scale));

      body {
        margin: 0;
      }
      
      color: var(--common-black)
    }

    .PFModalButton {
      all: unset;
      box-sizing: border-box;
      padding: calc(12px * var(--pf-modal-scale)) calc(16px * var(--pf-modal-scale));
      display: flex;
      justify-content: center;
      align-items: center;
      gap: calc(8px * var(--pf-modal-scale));
      width: 100%;
      cursor: pointer;
      background-color: var(--pf-grey-200);
      border-radius: calc(8px * var(--pf-modal-scale));
      max-height: calc(48px * var(--pf-modal-scale));
      color: var(--pf-white);
      user-select: none;
      font-family: 'Inter', sans-serif !important;
      font-style: normal;
      font-weight: 400;
      font-size: calc(14px * var(--pf-modal-scale));
      line-height: calc(20px * var(--pf-modal-scale));
      letter-spacing: calc(0.17px * var(--pf-modal-scale));
      box-shadow: 0 1px 5px rgba(89, 104, 143, 0.06);
      text-align: center;
      width: 296px;
      white-space: nowrap;
      overflow: hidden;
    }

    .PFModalButton.PFModalButtonWhatsapp {
      background-color: var(--pf-modal-whatsapp-color);
    }
    .PFModalButton.PFModalButtonWhatsapp:hover {
      background-color: #52b85c;
    }
    .PFModalButton.PFModalButtonWhatsapp:active {
      background-color: #469c4e;
    }

    .PFModalButton.PFModalButtonTelegram {
      background-color: var(--pf-modal-telegram-color);
    }
    .PFModalButton.PFModalButtonTelegram:hover {
      background-color: #228cc6;
    }
    .PFModalButton.PFModalButtonTelegram:active {
      background-color: #1b719f;
    }


    .PFModalButton.PFModalButtonViber {
      background-color: var(--pf-modal-viber-color);
    }
    .PFModalButton.PFModalButtonViber:hover {
      background-color: #8074D6;
    }
    .PFModalButton.PFModalButtonViber:active {
      background-color: #655cac;
    }

    .PFModalButtonIcon {
      --s: calc(28px * var(--pf-modal-scale));

      all: unset;
      box-sizing: border-box;
      width: var(--s);
      height: var(--s);
      mask: var(--icon);
      -webkit-mask: var(--icon);
      mask-size: 100% 100%;
      -webkit-mask-size: 100% 100%;
      background-color: currentColor;
      flex-shrink: 0;
    }

    .PFButtons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      max-width: 328px;
      padding: calc(16px * var(--pf-modal-scale));
    }

    .PFButtonsContainer {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }

    .PFModalDualCardItem {
      all: unset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: calc(24px * var(--pf-modal-scale));
      background-color: transparent;
      border-width: 0;
      box-sizing: border-box;
      padding-top: calc(16px * var(--pf-modal-scale));
      padding-left: calc(16px * var(--pf-modal-scale));
      padding-right: calc(16px * var(--pf-modal-scale));
    }

    .PFModalDualCardItemButtonFooter {
      all: unset;
      width: 100%;
      display: flex;
      box-sizing: border-box;
    }

    .PFModalDualCardItemButton {
      all: unset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: calc(16px * var(--pf-modal-scale));
    }

    .PFModalAnimateIn {
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      transform: translate3d(0, 0, 0);
    }

    .PFModalAnimateIn.PFAnimated {
      transform: translate3d(0, 100%, 0);
    }

    .PFModalAnimateOut {
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1);
      transform: translate3d(0, 100%, 0);
    }
  `)()
    }
    customElements.get("pf-modal-mobile") || customElements.define("pf-modal-mobile", ce);
    class de extends Ft {
        constructor() {
            super()
        }
        afterTransition(t) {
            t.target.classList.contains("PFHidden") && (t.target.style.display = "none")
        }
        open(t) {
            this._isOpen = !0, this.actionBody = t;
            const e = this.shadowRoot.getElementById("PFModalOverlay"),
                i = this.shadowRoot.getElementById("PFModal");
            clearTimeout(this.timerIdForAnimation), e.addEventListener("transitionend", this.afterTransition, !0), e.addEventListener("webkitTransitionEnd", this.afterTransition, !0), i.classList.remove("PFModalAnimateOut"), i.classList.add("PFModalAnimateIn", "PFAnimated"), e.classList.remove("PFHidden"), e.style.display = "flex", this.timerIdForAnimation = setTimeout((() => {
                e.style.opacity = 1, i.classList.remove("PFAnimated")
            }), 100)
        }
        close() {
            this._isOpen = !1, this.integrationsService.fireEvent("WP_modal_close"), this.dispatchEvent(new CustomEvent("close"));
            const t = this.shadowRoot.getElementById("PFModalOverlay"),
                e = this.shadowRoot.getElementById("PFModal");
            e.classList.remove("PFModalAnimateIn"), e.classList.add("PFModalAnimateOut", "PFAnimated"), t.classList.add("PFHidden"), this.timerIdForAnimation = setTimeout((() => {
                t.style.opacity = 0, e.classList.remove("PFAnimated")
            }), 100)
        }
        isSubscriptionExpired() {
            if (!this.subscription) return !0;
            if (!this.subscription.subscriptionPlan) return !0;
            return new Date(this.subscription.subscriptionPlan.dueDate).getTime() < Date.now()
        }
        telegramClick() {
            const t = Yt(this.widget),
                e = Jt(t, this.isSubscriptionExpired());
            re(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e)
        }
        whatsappClick() {
            const t = Yt(this.widget),
                e = Jt(t, this.isSubscriptionExpired());
            ne(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e)
        }
        viberClick() {
            const t = Yt(this.widget),
                e = Jt(t, this.isSubscriptionExpired());
            oe(this.widget, 0, this.wazzupId, this.hid, this.integrationsService, e)
        }
        cButtonClose(t) {
            return rt`
      <button class="PFModalButtonClose" @click="${this.close}">
        ${se(t,!0)}
      </button>
    `
        }
        buttonsSection() {
            const t = Yt(this.widget),
                e = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonWhatsapp"
            @click="${this.whatsappClick}"
          >
            <span>
              ${this.widget.widgetSettings.textSettings.whatsappBtn}
            </span>
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                i = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonTelegram"
            @click="${this.telegramClick}"
          >
            <span>
              ${this.widget.widgetSettings.textSettings.telegramBtn}
            </span>
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                n = rt`
      <div class="PFModalDualCardItemButton">
        <footer class="PFModalDualCardItemButtonFooter">
          <button
            class="PFModalButton PFModalButtonViber"
            @click="${this.viberClick}"
          >
            <span>
              ${this.widget.widgetSettings.textSettings.viberBtn}
            </span>
            <div class="PFModalButtonIcon"></div>
          </button>
        </footer>
      </div>
    `,
                r = rt`
      <button
        class="PFModalButton ${`PFModalButton${a(t)}`}"
       @click="${"whatsapp"===t?this.whatsappClick:"telegram"===t?this.telegramClick:this.viberClick}"
      >
       
        <span>
          ${Et("whatsapp"===t,(()=>`${this.widget.widgetSettings.textSettings.whatsappBtn}`),(()=>Et("telegram"===t,(()=>`${this.widget.widgetSettings.textSettings.telegramBtn}`),(()=>`${this.widget.widgetSettings.textSettings.viberBtn}`))))}
        </span>
         <div class="PFModalButtonIcon"></div>
      </button>
    `;
            return rt`
      <div 
        class="PFButtons"
        style="background: ${qt(this.widget.widgetSettings)}"
      >
        <div class="PFButtonsContainer">
            ${Et("whatsapp-and-telegram"===t,(()=>[e,i]),(()=>Et("whatsapp-and-viber"===t,(()=>[e,n]),(()=>Et("telegram-and-viber"===t,(()=>[i,n]),(()=>Et("whatsapp-and-telegram-and-viber"===t,(()=>[e,i,n]),(()=>r))))))))}
         
     
        </div>
    `
        }
        cFooter() {
            const {
                widgetSettings: t
            } = this.widget;
            return rt`
      <div class="PFModalFooter">
        <a href="${Ot()}" target="_blank">
          ${ae(t.background.theme.name)}
        </a>
      </div>
    `
        }
        logoFileSection() {
            const {
                widgetSettings: {
                    logoEnabled: t
                },
                logoImage: e
            } = this.widget;
            return t ? rt`
      <div class="PFModalHeaderLogo">
        <img
            class="PFModalHeaderLogoImage"
            src="${e.url}"
            alt=""
        >
      </div>
    ` : ""
        }
        defaultLogo() {
            return rt`
      <div class="PFModalHeaderLogo" style="width: auto !important">
        <div class="PFModalHeaderLogoImageDefault">
        Ваш логотип
        </div>
      </div>
    `
        }
        render() {
            const {
                logoImage: t,
                widgetSettings: e
            } = this.widget, i = e.background.theme.name, n = Nt.includes(i), r = !1 === e.branding, o = new DOMParser, a = e.textSettings.header, s = e.textSettings.text, l = o.parseFromString(a, "text/html"), c = o.parseFromString(s, "text/html");
            return rt`
      <div
        id="PFModalOverlay"
        class="PFModalOverlay"
        aria-hidden="${!this._isOpen}"
      >
        <section
          id="PFModal"
          style="background: ${Gt(this.widget.widgetSettings)}"
          class=${Wt({PFModal:!0})}
          data-with-branding="${r}"
        >
          ${this.cButtonClose(i)}
        
          <div class="PFModalBody" style="background: ${Gt(this.widget.widgetSettings)}">
          
            <header class="PFModalHeader">
            ${Et(t&&e.logoEnabled,(()=>this.logoFileSection()),(()=>Et(!t&&e.logoEnabled,(()=>this.defaultLogo()),(()=>at))))}
            <div class="PFModalHeaderTextContent">
            ${Et(n,(()=>rt`
              <div class="PFModalHeaderTitleDark">${l.body}</div>
               <div class="PFModalHeaderTextDark"><span>${c.body}</span></div>
              `),(()=>rt`
                <div class="PFModalHeaderTitle">${l.body}</div>
                <div class="PFModalHeaderText"><span>${c.body}</span></div>
              `))}
            
            </div>
            ${this.buttonsSection()}
            </header>
            
            ${Et(r,(()=>this.cFooter()),(()=>rt`<div style="margin-top: 40px;"/>`))}
          </div>
        </section>
      </div>
    `
        }
        static styles = (() => M`
    ${Vt}
    ${jt}

    .PFModalOverlay {
      --pf-modal-scale: 1;
      --common-black: #2b3238;
      --common-rain: #D0DBE4;
      --primary: #212121;
      --common-dark: #1B1B1B;

      all: unset;
      position: fixed;
      left: 0;
      box-sizing: border-box;
      z-index: 21474836461;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      background-color: rgba(0, 0, 0, 0.23);
      opacity: 0;
      transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1) opacity;
      display: none;
    }

    .PFModal {
      all: unset;
      position: relative;
      display: flex;
      justify-content: flex-end;
      height: auto;
      width: inherit;
      flex-direction: column;
      gap: 40px;
      border-radius: 16px 16px 0px 0px;
    }

    .PFModalButtonClose {
      --s: calc(20px * var(--pf-modal-scale));

      all: unset;
      position: absolute;
      z-index: 2;
      display: flex;
      top: calc(16px * var(--pf-modal-scale));
      right: calc(16px * var(--pf-modal-scale));
      align-items: center;
      justify-content: center;
      width: var(--s);
      height: var(--s);
      border-radius: 50%;
      cursor: pointer;
    }

    .PFModalButtonCloseIcon {
     --s: calc(20px * var(--pf-modal-scale));
        width: var(--s);
        height: var(--s);
        padding: calc(8px * var(--pf-modal-scale));
        border-radius: 100px;
    }

    .PFModalBody {
      all: unset;
      position: relative;
      box-sizing: border-box;
      width: 328px;
      z-index: 9999;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: calc(40px * var(--pf-modal-scale));
      margin-top: 40px;
    }

    .PFModalFooter {
        all: unset;
        position: relative;
        display: flex;
        padding: 24px 0px 32px 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        bottom: 0; 
        left: 50%; 
        width: 100%;
        transform: translateX(-50%);

        & svg {
            width: calc(137px * var(--pf-modal-scale));
            height: calc(24px * var(--pf-modal-scale));
        }
    }

    .PFModalFooter a {
      color: inherit;
      cursor: pointer;
      text-decoration: none;
    }


    .PFModalHeader {
      all: unset;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
      margin-top: 40px;
      text-align: center;
    }

    .PFModalHeaderLogo {
      all: unset;
      box-sizing: border-box;
      display: flex;
      height: calc(56px * var(--pf-modal-scale));
      width: calc(100px * var(--pf-modal-scale));
      overflow: hidden;
      align-items: center;
      justify-content: center;
      padding: 3px;
    }

    .PFModalHeaderLogoImage {
      all: unset;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

   .PFModalHeaderLogoImageDefault {
      display: flex;
      height: 56px;
      padding: 0px 12px;
      justify-content: center;
      align-items: center;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border: 1px dashed var(--common-rain);
      background: white;
      color: var(--common-dark);
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
    }

    .PFModalHeaderTitle {
      text-align: center;
      word-wrap: anywhere !important;
      white-space: pre-line;
      font-family: 'Inter', sans-serif;
      font-size: calc(18px * var(--pf-modal-scale));
      font-style: normal;
      width: 100%;
      font-weight: 600;
      line-height: 28px;
      letter-spacing: -0.18px;

      & p {
        color: inherit !important;
        background-color: transparent !important;

        & span,
        & strong,
        & em,
        & u {
          color: inherit !important;
          background-color: transparent !important;
        }
      }

      body {
       color: white;
      }
    }


     .PFModalHeaderTitleDark {
     
      text-align: center;
      word-wrap: anywhere !important;
      white-space: pre-line;
      font-family: 'Inter', sans-serif;
      font-size: calc(18px * var(--pf-modal-scale));
      font-style: normal;
      width: 100%;
      font-weight: 600;
      line-height: 28px;
      letter-spacing: -0.18px;

      & p {
        color: inherit !important;
        background-color: transparent !important;

        & span,
        & strong,
        & em,
        & u {
          color: inherit !important;
          background-color: transparent !important;
        }
      }

      body {
       margin: 0;
       color: var(--common-black);
      }
    }

    .PFModalHeaderTextContent {
      display: flex;
      width: calc(328px * var(--pf-modal-scale));
      flex-direction: column;
      gap: calc(12px * var(--pf-modal-scale));
      align-items: center;
    }


    .PFModalHeaderText {
      display: flex;
      flex-wrap: wrap;
      color: var(--primary);
      word-wrap: anywhere !important;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: calc(14px * var(--pf-modal-scale));
      font-style: normal;
      font-weight: 400;
      justify-content: center;
      width: 100%;
      line-height: calc(20px * var(--pf-modal-scale));

      body {
        margin: 0;
        color: white;
      }
    }

    .PFModalHeaderTextDark {
      display: flex;
      flex-wrap: wrap;
      color: var(--primary);
      word-wrap: anywhere !important;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: calc(14px * var(--pf-modal-scale));
      font-style: normal;
      font-weight: 400;
      justify-content: center;
      width: 100%;
      line-height: calc(20px * var(--pf-modal-scale));

      body {
        margin: 0;
      }
      
      color: var(--common-black)
    }

    .PFModalButton {
      all: unset;
      box-sizing: border-box;
      padding: calc(12px * var(--pf-modal-scale)) calc(16px * var(--pf-modal-scale));
      display: flex;
      justify-content: center;
      align-items: center;
      gap: calc(8px * var(--pf-modal-scale));
      width: 100%;
      cursor: pointer;
      background-color: var(--pf-grey-200);
      border-radius: calc(8px * var(--pf-modal-scale));
      max-height: calc(48px * var(--pf-modal-scale));
      color: var(--pf-white);
      user-select: none;
      font-family: 'Inter', sans-serif !important;
      font-style: normal;
      font-weight: 400;
      font-size: calc(14px * var(--pf-modal-scale));
      line-height: calc(20px * var(--pf-modal-scale));
      letter-spacing: calc(0.17px * var(--pf-modal-scale));
      box-shadow: 0 1px 5px rgba(89, 104, 143, 0.06);
      text-align: center;
      width: 296px;
      white-space: nowrap;
      overflow: hidden;
    }

    .PFModalButton.PFModalButtonWhatsapp {
      background-color: var(--pf-modal-whatsapp-color);
    }
    .PFModalButton.PFModalButtonWhatsapp:hover {
      background-color: #52b85c;
    }
    .PFModalButton.PFModalButtonWhatsapp:active {
      background-color: #469c4e;
    }

    .PFModalButton.PFModalButtonTelegram {
      background-color: var(--pf-modal-telegram-color);
    }
    .PFModalButton.PFModalButtonTelegram:hover {
      background-color: #228cc6;
    }
    .PFModalButton.PFModalButtonTelegram:active {
      background-color: #1b719f;
    }


    .PFModalButton.PFModalButtonViber {
      background-color: var(--pf-modal-viber-color);
    }
    .PFModalButton.PFModalButtonViber:hover {
      background-color: #8074D6;
    }
    .PFModalButton.PFModalButtonViber:active {
      background-color: #655cac;
    }

    .PFModalButtonIcon {
      --s: calc(28px * var(--pf-modal-scale));

      all: unset;
      box-sizing: border-box;
      width: var(--s);
      height: var(--s);
      mask: var(--icon);
      -webkit-mask: var(--icon);
      mask-size: 100% 100%;
      -webkit-mask-size: 100% 100%;
      background-color: currentColor;
      flex-shrink: 0;
    }

    .PFButtons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      max-width: 328px;
      padding: calc(16px * var(--pf-modal-scale));
    }

    .PFButtonsContainer {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }

    .PFModalDualCardItem {
      all: unset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: calc(24px * var(--pf-modal-scale));
      background-color: transparent;
      border-width: 0;
      box-sizing: border-box;
      padding-top: calc(16px * var(--pf-modal-scale));
      padding-left: calc(16px * var(--pf-modal-scale));
      padding-right: calc(16px * var(--pf-modal-scale));
    }

    .PFModalDualCardItemButtonFooter {
      all: unset;
      width: 100%;
      display: flex;
      box-sizing: border-box;
    }

    .PFModalDualCardItemButton {
      all: unset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: calc(16px * var(--pf-modal-scale));
    }

    .PFModalAnimateIn {
        transition: transform 0.3s ease-out;
        transform: translate3d(0, 0, 0);
    }

    .PFModalAnimateIn.PFAnimated {
        transform: translate3d(0, 100%, 0);
    }

    .PFModalAnimateOut {
        transition: transform 0.3s ease-out;
        transform: translate3d(0, 100%, 0);
    }
  `)()
    }
    customElements.get("pf-modal-mobile-action") || customElements.define("pf-modal-mobile-action", de);
    const ue = new Map;
    ue.set("default", "pf-default"), ue.set("message", "pf-message"), ue.set("chat", "pf-chat"), ue.set("modal", "pf-modal"), ue.set("mobile", "pf-modal-mobile");
    class pe extends Ft {
        static properties = (() => ({
            widget: {
                type: Object
            },
            wazzupId: {
                type: String
            },
            hid: {
                type: String
            },
            integrationsService: {
                type: Object
            },
            subscription: {
                type: Object
            },
            anyActionPassed$: {
                type: Object
            },
            modalStateChange$: {
                type: Object
            },
            tests: {
                type: Object
            }
        }))();
        constructor() {
            super()
        }
        getBodyForDefaultModal() {
            const {
                widgetSettings: t
            } = this.widget, e = this.widget.whatsappGreetingMessage;
            return {
                redirect: Yt(this.widget),
                backgroundPosition: "left",
                text: t.textSettings.header,
                whatsappButtonText: t.whatsappBtn,
                telegramButtonText: t.telegramBtn,
                viberButtonText: t.viberBtn,
                background: t.background.theme.color,
                branding: t.branding,
                whatsappGreetingMessage: e,
                backgroundImage: this.widget.backgroundImage,
                logoImage: this.widget.logoImage,
                whatsappEnabled: this.widget.whatsappEnabled,
                telegramEnabled: this.widget.telegramEnabled,
                viberEnabled: this.widget.viberEnabled
            }
        }
        isSubscriptionExpired() {
            if (!this.subscription) return !0;
            if (!this.subscription.subscriptionPlan) return !0;
            return new Date(this.subscription.subscriptionPlan.dueDate).getTime() < Date.now()
        }
        open() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "pf-default",
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            const n = this.shadowRoot.querySelector(t),
                r = e || this.getBodyForDefaultModal();
            n && (n.open(r), i && this.integrationsService.fireEvent("WP_click_widget"))
        }
        closeModal() {
            this.shadowRoot.querySelector("pf-default").close()
        }
        menuClick() {
            const t = this.getBodyForDefaultModal(),
                e = Jt(t, this.isSubscriptionExpired());
            e ? "whatsapp" === e ? ne(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e) : "telegram" === e && re(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e) : (c(this.widget.id, {
                name: "click",
                wazzupId: this.wazzupId,
                hid: this.hid
            }), this.open())
        }
        menuClickMobile() {
            const t = this.getBodyForDefaultModal(),
                e = Jt(t.redirect, this.isSubscriptionExpired());
            e ? "whatsapp" === e ? ne(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e) : "telegram" === e ? re(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e) : "viber" === e && oe(this.widget, 0, this.wazzupId, this.hid, this.integrationsService, e) : (c(this.widget.id, {
                name: "click",
                wazzupId: this.wazzupId,
                hid: this.hid
            }), this.open("pf-modal-mobile"))
        }
        telegramClick() {
            const t = this.getBodyForDefaultModal(),
                e = Jt(t, this.isSubscriptionExpired());
            re(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e)
        }
        whatsappClick() {
            const t = this.getBodyForDefaultModal(),
                e = Jt(t, this.isSubscriptionExpired());
            ne(this.widget, t, this.wazzupId, this.hid, this.integrationsService, e)
        }
        viberClick() {
            const t = this.getBodyForDefaultModal(),
                e = Jt(t, this.isSubscriptionExpired());
            oe(this.widget, 0, this.wazzupId, this.hid, this.integrationsService, e)
        }
        convertDataProfeatToHref(t) {
            t.forEach((t => {
                t.hasAttribute("href") && (t.setAttribute("data-profeat", t.getAttribute("href")), t.removeAttribute("href"))
            }))
        }
        initMagicUrlListener() {
            const t = document.querySelectorAll("[data-profeat], [href]"),
                e = Array.from(t).filter((t => {
                    const e = t.getAttribute("data-profeat"),
                        i = t.getAttribute("href"),
                        n = e && e?.includes(Dt) || i && i?.includes(Dt),
                        r = e && e?.includes(Ut) || i && i?.includes(Ut);
                    return !(!n && !r || null === n && null === r) && Rt.some((t => {
                        const n = i?.includes(t),
                            r = e?.includes(t);
                        return r || n
                    }))
                }));
            this.convertDataProfeatToHref(e), e.forEach((t => {
                const e = t.getAttribute("data-profeat"),
                    i = t.getAttribute("href") || e;
                i && null !== i && t.addEventListener("click", (t => {
                    this.onMagicUrlElementClick(t, this, i)
                }))
            }))
        }
        onMagicUrlElementClick(t, e, i) {
            t.preventDefault(), t.stopPropagation();
            const n = i?.split("#")[1],
                r = e.widget,
                o = r.whatsappEnabled,
                a = r.telegramEnabled,
                s = r.viberEnabled,
                l = this.isSubscriptionExpired();
            this.handleMessengerClickForMyButton(n, l, r, e, o, a, s)
        }
        handleMessengerClickForMyButton(t, e, i, r, o, a, s) {
            switch (t) {
                case "open":
                    return n() ? !o || a || s ? o || !a || s ? o || a || !s ? r.open("pf-modal-mobile") : this.handleMessengerClickForMyButton("viber", e, i, r, o, a, s) : this.handleMessengerClickForMyButton("telegram", e, i, r, o, a, s) : this.handleMessengerClickForMyButton("whatsapp", e, i, r, o, a, s) : r.open("pf-default", {
                        ...i
                    });
                case "whatsapp":
                    if (!o) break;
                    if (n()) return e ? r.open("pf-modal-mobile") : r.whatsappClick();
                    r.open("pf-default");
                    break;
                case "telegram":
                    if (!a) break;
                    if (n()) return e ? r.open("pf-modal-mobile") : r.telegramClick();
                    r.open("pf-default", {
                        ...i
                    });
                    break;
                case "viber":
                    if (!s) break;
                    if (n()) return e ? r.open("pf-modal-mobile") : r.viberClick();
                    r.open("pf-default", {
                        ...i
                    })
            }
        }
        setWidgetVisibility(t) {
            const e = this.shadowRoot.getElementById("PWPreviewWidgetButtonWrapper");
            e && (t ? e.classList.add("PWPreviewWidgetButtonWrapperVisible") : e.classList.remove("PWPreviewWidgetButtonWrapperVisible"))
        }
        connectedCallback() {
            super.connectedCallback(), this.initMagicUrlListener();
            const t = this.widget.hidden;
            t && document.addEventListener("hideWidgetComponent", (() => {
                this.setWidgetVisibility(!1)
            })), setTimeout((() => {
                t || this.setWidgetVisibility(!0), this.anyActionPassed$.subscribe((t => {
                    t && (n() ? this.open("pf-modal-mobile-action") : this.open())
                })), this.modalStateChange$.subscribe((t => {
                    t ? this.open("pf-default") : (this._isOpen = !1, this.closeModal())
                }))
            }), 0)
        }
        getTransformWidget() {
            let t = n() ? 16 : 32,
                e = n() ? 24 : 32;
            return t = `calc(100% - ${t}px - 64px)`, e = `${e}px`, {
                left: t,
                bottom: e
            }
        }
        cModalSlot() {
            return rt`
      <pf-default
        .widget="${this.widget}"
        .wazzupId="${this.wazzupId}"
        .hid="${this.hid}"
        .integrationsService="${this.integrationsService}",
        .isModal="${!1}"
        .subscription="${this.subscription}"
      ></pf-default>
      <pf-modal
        .widget="${this.widget}"
        .wazzupId="${this.wazzupId}"
        .hid="${this.hid}"
        .integrationsService="${this.integrationsService}",
        .isModal="${!0}"
        .subscription="${this.subscription}"
      ></pf-modal>
      <pf-modal-mobile
        .widget="${this.widget}"
        .wazzupId="${this.wazzupId}"
        .hid="${this.hid}"
        .integrationsService="${this.integrationsService}",
        .isModal="${!0}"
        .subscription="${this.subscription}"
      ></pf-modal-mobile>
       <pf-modal-mobile-action
        .widget="${this.widget}"
        .wazzupId="${this.wazzupId}"
        .hid="${this.hid}"
        .integrationsService="${this.integrationsService}",
        .isModal="${!0}"
        .subscription="${this.subscription}"
      ></pf-modal-mobile>
    `
        }
        cIconWidget(t) {
            return rt`
    ${Et("whatsapp"===t,(()=>rt`
       <svg class="PWPreviewWidgetButtonIcon" xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
            <path d="M34.9046 11.0658C31.7461 7.92972 27.5456 6.20177 23.0701 6.20001C13.8489 6.20001 6.34398 13.6424 6.34029 22.7903C6.3391 25.7145 7.10946 28.5688 8.57344 31.0848L6.20001 39.6825L15.0687 37.3753C17.5123 38.697 20.2634 39.3936 23.0635 39.3948H23.0704C32.2906 39.3948 39.7963 31.9515 39.8 22.8035C39.8018 18.3703 38.0633 14.2018 34.9046 11.0658ZM23.0704 36.5927H23.0647C20.5695 36.5917 18.1223 35.927 15.9874 34.6705L15.4796 34.3717L10.2168 35.7408L11.6215 30.6521L11.2908 30.1303C9.89889 27.9347 9.16375 25.397 9.16484 22.7914C9.16785 15.1881 15.4057 9.00218 23.0757 9.00218C26.7897 9.00358 30.281 10.4399 32.9064 13.0464C35.5317 15.653 36.9767 19.1177 36.9753 22.8025C36.9723 30.4064 30.7345 36.5927 23.0704 36.5927ZM30.6976 26.2646C30.2795 26.0571 28.2244 25.0542 27.8412 24.9158C27.458 24.7774 27.1794 24.7083 26.9006 25.1234C26.622 25.5384 25.8209 26.4722 25.577 26.7488C25.3332 27.0255 25.0893 27.0601 24.6713 26.8526C24.2533 26.6451 22.9064 26.2073 21.3097 24.795C20.0671 23.6959 19.2281 22.3382 18.9843 21.9231C18.7404 21.508 18.9584 21.2837 19.1676 21.077C19.3556 20.8913 19.5856 20.5928 19.7946 20.3507C20.0036 20.1087 20.0733 19.9357 20.2126 19.6591C20.352 19.3824 20.2823 19.1402 20.1778 18.9328C20.0733 18.7253 19.2373 16.6847 18.8889 15.8547C18.5496 15.0463 18.2049 15.1557 17.9484 15.143C17.7048 15.131 17.4258 15.1284 17.1472 15.1284C16.8686 15.1284 16.4157 15.2322 16.0325 15.6472C15.6494 16.0622 14.5695 17.0652 14.5695 19.1057C14.5695 21.1462 16.0673 23.1175 16.2764 23.3941C16.4854 23.6708 19.224 27.8582 23.4173 29.6539C24.4147 30.081 25.1933 30.3361 25.8004 30.5272C26.8018 30.8426 27.713 30.7981 28.4334 30.6914C29.2365 30.5724 30.9065 29.6886 31.2549 28.7202C31.6033 27.7518 31.6033 26.9218 31.4987 26.7489C31.3942 26.5759 31.1156 26.4722 30.6976 26.2646Z" fill="white"/>
        </svg>
    `),(()=>Et("telegram"===t,(()=>rt`
        <svg xmlns="http://www.w3.org/2000/svg" class="PWPreviewWidgetButtonIcon" width="46" height="46" viewBox="0 0 46 46" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.06234 21.7623C15.1154 18.2343 20.4854 15.9083 23.1722 14.7846C30.8438 11.576 32.4379 11.0186 33.4769 11.0002C33.7054 10.9961 34.2163 11.0531 34.5473 11.3232C34.8268 11.5512 34.9037 11.8592 34.9405 12.0754C34.9773 12.2916 35.0231 12.7841 34.9867 13.1689C34.5709 17.5612 32.7721 28.2203 31.857 33.1397C31.4697 35.2214 30.7073 35.9193 29.9691 35.9876C28.3649 36.1361 27.1467 34.9216 25.593 33.8974C23.1617 32.2948 21.7882 31.2972 19.4282 29.7333C16.7008 27.926 18.4688 26.9327 20.0232 25.3094C20.4299 24.8845 27.4981 18.4198 27.6349 17.8334C27.652 17.76 27.6679 17.4866 27.5063 17.3422C27.3448 17.1979 27.1064 17.2472 26.9344 17.2865C26.6905 17.3422 22.8065 19.9236 15.2823 25.0309C14.1798 25.7921 13.1812 26.163 12.2865 26.1436C11.3002 26.1222 9.40291 25.5828 7.99246 25.1218C6.26249 24.5563 4.88754 24.2574 5.00727 23.297C5.06963 22.7968 5.75465 22.2853 7.06234 21.7623Z" fill="white"/>
        </svg>
    `),(()=>rt`
        <svg class="PWPreviewWidgetButtonIcon" xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
        <path d="M39.5505 14.2207L39.5404 14.1801C38.718 10.8554 35.0105 7.28801 31.6056 6.54585L31.5673 6.53791C26.0601 5.48736 20.4762 5.48736 14.9702 6.53791L14.9307 6.54585C11.527 7.28801 7.81932 10.8556 6.99588 14.1801L6.98674 14.2207C5.9701 18.8635 5.9701 23.5721 6.98674 28.2149L6.99588 28.2556C7.78433 31.4382 11.2157 34.8419 14.4935 35.7779V39.489C14.4935 40.8323 16.1304 41.492 17.0612 40.5226L20.8213 36.6142C21.6369 36.6597 22.4529 36.6852 23.2687 36.6852C26.0408 36.6852 28.8142 36.423 31.5671 35.8978L31.6055 35.8899C35.0103 35.1477 38.7179 31.5801 39.5403 28.2557L39.5504 28.2151C40.567 23.5721 40.567 18.8638 39.5505 14.2207ZM36.5747 27.5418C36.0257 29.7108 33.2107 32.4073 30.9739 32.9055C28.0458 33.4624 25.0943 33.7003 22.1459 33.6187C22.0872 33.617 22.0308 33.6398 21.9901 33.6819C21.5715 34.1114 19.2447 36.5003 19.2447 36.5003L16.3246 39.4973C16.1111 39.72 15.7359 39.5684 15.7359 39.2612V33.1132C15.7359 33.0117 15.6634 32.9255 15.5637 32.9057C15.5631 32.9055 15.5626 32.9055 15.562 32.9054C13.3253 32.4072 10.5112 29.7107 9.96117 27.5417C9.04612 23.345 9.04612 19.0906 9.96117 14.894C10.5112 12.7249 13.3253 10.0285 15.562 9.53025C20.676 8.55761 25.8611 8.55761 30.9741 9.53025C33.2119 10.0285 36.0258 12.7249 36.5749 14.894C37.4909 19.0907 37.4909 23.3451 36.5747 27.5418Z" fill="white"/>
        <path d="M28.134 30.3801C27.7901 30.2756 27.4625 30.2055 27.158 30.0794C24.0043 28.771 21.102 27.083 18.8031 24.4956C17.4958 23.0242 16.4725 21.3631 15.6076 19.6051C15.1974 18.7714 14.8517 17.9052 14.4994 17.0444C14.1781 16.2595 14.6513 15.4487 15.1495 14.8572C15.6171 14.3021 16.2188 13.8774 16.8705 13.5643C17.379 13.32 17.8806 13.4609 18.2521 13.8919C19.055 14.8239 19.7927 15.8035 20.3898 16.8839C20.7571 17.5484 20.6563 18.3606 19.9906 18.8128C19.8288 18.9227 19.6814 19.0518 19.5308 19.1759C19.3985 19.2847 19.2742 19.3946 19.1835 19.5418C19.018 19.8113 19.01 20.1293 19.1166 20.4223C19.9374 22.6779 21.3208 24.432 23.5913 25.3769C23.9546 25.528 24.3194 25.7039 24.7381 25.6552C25.439 25.5733 25.666 24.8043 26.1572 24.4026C26.6373 24.0101 27.2509 24.0049 27.768 24.3322C28.2854 24.6597 28.7867 25.011 29.2852 25.3663C29.7745 25.7149 30.2615 26.0558 30.7128 26.4534C31.1468 26.8356 31.2962 27.3369 31.0518 27.8555C30.6046 28.8054 29.9535 29.5954 29.0147 30.0999C28.7496 30.242 28.4329 30.288 28.134 30.3801C28.4329 30.288 27.7901 30.2756 28.134 30.3801Z" fill="white"/>
        <path d="M23.277 12.4785C27.4019 12.5941 30.79 15.3316 31.516 19.4097C31.6398 20.1046 31.6838 20.8149 31.7388 21.5203C31.762 21.8169 31.5939 22.0987 31.2739 22.1027C30.9433 22.1066 30.7946 21.8299 30.7729 21.5335C30.7305 20.9466 30.701 20.3568 30.6201 19.7749C30.1932 16.702 27.7429 14.1598 24.6843 13.6144C24.224 13.5322 23.7532 13.5107 23.2868 13.4618C22.9921 13.4309 22.6062 13.4131 22.5409 13.0466C22.4862 12.7395 22.7454 12.4949 23.038 12.4792C23.1172 12.4745 23.1971 12.4782 23.277 12.4785C27.4021 12.5941 23.1971 12.4782 23.277 12.4785Z" fill="white"/>
        <path d="M29.5452 20.6042C29.5384 20.6558 29.5349 20.7768 29.5046 20.8908C29.3952 21.3049 28.7671 21.3567 28.6227 20.9389C28.5798 20.8149 28.5734 20.6738 28.5732 20.5403C28.5717 19.6668 28.3819 18.7939 27.9413 18.0337C27.4884 17.2524 26.7963 16.5958 25.9849 16.1982C25.4942 15.958 24.9636 15.8085 24.4257 15.7197C24.1906 15.6807 23.9531 15.6573 23.7168 15.6244C23.4306 15.5846 23.2776 15.4022 23.2913 15.1201C23.304 14.8559 23.4972 14.6655 23.7852 14.682C24.7318 14.7356 25.6462 14.9405 26.488 15.3861C28.1993 16.2925 29.177 17.7229 29.4624 19.6332C29.4752 19.7199 29.4959 19.8055 29.5025 19.8923C29.5186 20.1066 29.5289 20.3212 29.5452 20.6042C29.5384 20.6555 29.5289 20.3212 29.5452 20.6042Z" fill="white"/>
        <path d="M26.9797 20.5044C26.6347 20.5106 26.45 20.3195 26.4143 20.0033C26.3897 19.7828 26.3699 19.5592 26.3173 19.3444C26.2136 18.9216 25.9889 18.5299 25.6333 18.2708C25.4655 18.1485 25.2751 18.0594 25.0759 18.0017C24.8228 17.9285 24.5598 17.9487 24.3074 17.8869C24.0332 17.8197 23.8815 17.5975 23.9246 17.3404C23.9638 17.1062 24.1915 16.9234 24.4475 16.9421C26.0468 17.0575 27.1898 17.8843 27.3529 19.767C27.3646 19.8999 27.378 20.0402 27.3486 20.1675C27.2979 20.3848 27.1368 20.4938 26.9797 20.5044C27.1368 20.4938 26.6346 20.5105 26.9797 20.5044Z" fill="white"/>
        <path d="M39.5503 14.2199L39.5402 14.1793C39.0792 12.3156 37.7113 10.3759 35.9985 8.89998L33.6831 10.952C35.0599 12.0491 36.2396 13.5689 36.5748 14.8931C37.4909 19.0899 37.4909 23.3441 36.5748 27.541C36.0257 29.71 33.2106 32.4065 30.974 32.9047C28.0458 33.4616 25.0944 33.6996 22.1459 33.6179C22.0872 33.6162 22.0309 33.6391 21.9901 33.6812C21.5716 34.1106 19.2447 36.4995 19.2447 36.4995L16.3246 39.4966C16.1111 39.7192 15.736 39.5679 15.736 39.2604V33.1125C15.736 33.0109 15.6635 32.9247 15.5637 32.905C15.5631 32.905 15.5626 32.9047 15.562 32.9047C14.2908 32.6216 12.8338 31.6282 11.7114 30.4255L9.42343 32.4529C10.8523 34.0073 12.6953 35.264 14.4932 35.7773V39.4885C14.4932 40.8318 16.1301 41.4915 17.0609 40.5221L20.821 36.6136C21.6366 36.6592 22.4524 36.6847 23.2684 36.6847C26.0404 36.6847 28.8138 36.4225 31.5668 35.8973L31.6052 35.8895C35.01 35.1473 38.7176 31.5799 39.54 28.2553L39.55 28.2147C40.5668 23.5713 40.5668 18.863 39.5503 14.2199Z" fill="white"/>
        <path d="M30.7132 26.4506C30.2619 26.0532 29.7747 25.7121 29.2856 25.3635C28.7871 25.0082 28.2858 24.6569 27.7684 24.3294C27.2513 24.0022 26.6378 24.0073 26.1576 24.3999C25.6664 24.8015 25.4395 25.5705 24.7384 25.6524C24.3199 25.7011 23.955 25.5251 23.5917 25.3741C22.1948 24.7929 21.1349 23.9042 20.3338 22.7821L18.6314 24.2909C18.6892 24.3579 18.7444 24.4267 18.8032 24.4928C21.1022 27.0802 24.0046 28.7682 27.158 30.0766C27.4623 30.2029 27.7902 30.2731 28.134 30.3773C27.7902 30.2729 28.4332 30.2854 28.134 30.3773C28.4332 30.2854 28.7496 30.2391 29.0149 30.097C29.954 29.5925 30.6048 28.8024 31.0521 27.8526C31.2966 27.3341 31.1472 26.8328 30.7132 26.4506Z" fill="white"/>
        <path d="M29.1927 14.9285L28.4669 15.5719C29.6075 16.6816 30.394 18.1523 30.6188 19.7708C30.6996 20.353 30.7293 20.9424 30.7717 21.5294C30.7933 21.826 30.9419 22.1026 31.2727 22.0988C31.5929 22.0948 31.7609 21.8131 31.7377 21.5164C31.6825 20.8112 31.6386 20.1006 31.5149 19.4058C31.1971 17.6207 30.3691 16.0925 29.1927 14.9285Z" fill="white"/>
        <path d="M29.4617 19.6294C29.2538 18.2374 28.6764 17.1015 27.7172 16.2361L26.9934 16.8776C27.3677 17.2097 27.6915 17.5999 27.9408 18.0302C28.3815 18.7904 28.5713 19.6632 28.5727 20.5368C28.573 20.6702 28.5794 20.8114 28.6223 20.9356C28.7669 21.3536 29.3947 21.3018 29.5041 20.8875C29.5344 20.7733 29.5379 20.6522 29.5448 20.6009C29.5282 20.318 29.5379 20.6525 29.5448 20.6009C29.5282 20.318 29.5181 20.1033 29.5019 19.8888C29.4955 19.8016 29.4747 19.716 29.4617 19.6294Z" fill="white"/>
        <path d="M26.2512 17.539L25.5145 18.1921C25.5551 18.2167 25.5949 18.2425 25.6335 18.2705C25.9891 18.5296 26.2138 18.9213 26.3175 19.3441C26.3701 19.5588 26.3896 19.7822 26.4145 20.0029C26.4485 20.3051 26.6201 20.4908 26.9358 20.5017C26.9588 20.501 26.9814 20.5006 26.9957 20.5004C27.1476 20.4836 27.3 20.3771 27.3487 20.1669C27.3781 20.0399 27.3646 19.8993 27.353 19.7665C27.2614 18.7139 26.8634 17.9917 26.2512 17.539Z" fill="white"/>
        </svg>
    `))))}
  `
        }
        gifMessengerButton() {
            const t = Yt(this.getBodyForDefaultModal());
            return rt`
      <img
          class="PWPreviewWidgetButtonGif"
          src="${{"whatsapp-and-telegram-and-viber":kt,"whatsapp-and-viber":_t,"telegram-and-viber":St,"whatsapp-and-telegram":Bt}[t]}"
          alt="Mixed logo"
      >
    `
        }
        cWaveWidget(t) {
            return rt`
      <div
          class="${Wt({PWPreviewWidgetButtonWaveColor:!0,PWPreviewWidgetButtonWaveColorWhatsapp:"whatsapp"===t,PWPreviewWidgetButtonWaveColorTelegram:"telegram"===t,PWPreviewWidgetButtonWaveColorViber:"viber"===t})}"
      >
        <div class="PWPreviewWidgetButtonWave"></div>
      </div>
    `
        }
        render() {
            const {
                whatsappEnabled: t,
                telegramEnabled: e,
                viberEnabled: i
            } = this.widget, r = Yt(this.widget);
            let o = null;
            o = n() ? "mobile" : "menu";
            const a = {
                    whatsapp: this.whatsappClick,
                    telegram: this.telegramClick,
                    menu: this.menuClick,
                    mobile: this.menuClickMobile
                },
                s = this.getTransformWidget(),
                l = a[o];
            if (r) return rt`
      ${this.cModalSlot()}

      ${rt`
          <section
            id="PWPreviewWidgetButtonWrapper"
            class="PWPreviewWidgetButtonWrapper"
            style="${Lt({width:"64px",height:"64px",...s})}"
          >
            <button
              id="PWPreviewWidgetButton"
              class="${Wt({PWPreviewWidgetButton:!0,PWPreviewWidgetButtonTypeWhatsapp:t&&!e&&!i,PWPreviewWidgetButtonTypeTelegram:e&&!t&&!i,PWPreviewWidgetButtonTypeViber:i&&!e&&!t})}"
              @click="${l}"
            >
              ${Et(t&&e||t&&i||e&&i||t&&i&&i,(()=>this.gifMessengerButton()),(()=>this.cIconWidget(r)))}

              ${this.cWaveWidget(r)}
            </button>
          </section>
        `}
      `
        }
        static styles = (() => M`
    .PWPreviewWidgetButtonWrapper {
      all: unset;
      position: fixed;
      display: none;
      aspect-ratio: 1 / 1;
      z-index: 2147483646;
    }

    .PWPreviewWidgetButtonWrapperVisible {
      display: flex;
    }

    .PWPreviewWidgetButton {
      all: unset;
      position: absolute;
      z-index: 3;
      width: 100%;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.5), opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1);
      transform: scale(1);
      color: white;
      user-select: none;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      -webkit-tap-highlight-color: transparent;
    }

    .PWPreviewWidgetButton:focus,
    .PWPreviewWidgetButton:active {
      outline: none;
    }

    .PWPreviewWidgetButtonIsHidden {
      opacity: 0 !important;
    }

    .PWPreviewWidgetButton:hover {
      transform: scale(1.15);
    }


    .PWPreviewWidgetButton:active {
      transform: scale(1.2);
    }

    .PWPreviewWidgetButtonTypeWhatsapp,
    .PWPreviewWidgetButtonTypeTelegram,
    .PWPreviewWidgetButtonTypeViber {
      border-radius: 50%;
    }

    .PWPreviewWidgetButtonTypeWhatsapp::before,
    .PWPreviewWidgetButtonTypeTelegram::before,
    .PWPreviewWidgetButtonTypeViber::before {
      content: '';
      position: absolute;
      width: 100%;
      max-width: calc(100% - 6px);
      aspect-ratio: 1 / 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }

    .PWPreviewWidgetButtonTypeWhatsapp {
      background: linear-gradient(0deg, #22BC3C 0%, #5CD767 100%);
    }

    .PWPreviewWidgetButtonTypeWhatsapp::before {
      background-color: #5CD767;
    }

    .PWPreviewWidgetButtonTypeTelegram {
      background: linear-gradient(180deg, #2AABEE 0%, #229ED9 99.26%);
    }

    .PWPreviewWidgetButtonTypeViber {
      background: linear-gradient(180deg, #8074D6 0%, #6F62CE 100%);
    }

    .PWPreviewWidgetButtonTypeViber::before {
      background: #6F62CE;
    }

    .PWPreviewWidgetButtonTypeTelegram::before {
      background-color: #229ED9;
    }

    .PWPreviewWidgetButtonGif {
      all: unset;
      display: block;
      max-width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      overflow: hidden;
    }

    .PWPreviewWidgetButtonIcon {
      all: unset;
      position: relative;
      z-index: 1;
      display: block;
      max-width: 68%;
      aspect-ratio: 1 / 1;
    }

    .PWPreviewWidgetButtonWaveColor {
      all: unset;
      display: block;
      position: absolute;
      z-index: 1;
      width: 100%;
      aspect-ratio: 1 / 1;
      color: white;
    }

    .PWPreviewWidgetButtonWaveColorWhatsapp {
      color: #26d367;
    }

    .PWPreviewWidgetButtonWaveColorTelegram {
      color: #229ED9;
    }

    .PWPreviewWidgetButtonWaveColorViber {
      color: #6F62CE;
    }

    @keyframes PWPreviewWidgetButtonWaveSonic {
      from {
        transform: scale(1);
        opacity: 0;
      }

      60% {
        transform: scale(1);
        opacity: 0;
      }

      70% {
        opacity: 0.4;
      }

      to {
        transform: scale(2);
        opacity: 0;
      }
    }

    .PWPreviewWidgetButtonWave {
      all: unset;
      display: block;
      position: absolute;
      z-index: 1;
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background: radial-gradient(rgb(255, 255, 255, 0), currentColor);
      animation: PWPreviewWidgetButtonWaveSonic 4s ease infinite;
    }
  `)()
    }
    customElements.get("pf-widget") || customElements.define("pf-widget", pe);
    class he {
        integrations = [];
        constructor(t) {
            this.integrations = t
        }
        insertIntegrations() {
            const t = {
                ym: this.#t,
                ga: this.#e,
                callTouch: () => {},
                coMagic: () => {},
                uis: () => {},
                callTracking: () => {}
            };
            for (const e of this.integrations) {
                const i = t[e?.type];
                i ? i(e) : console.error(`integrationMapItem is undefined for integration.type: ${e?.type}`)
            }
        }
        #e(t) {
            if (!window.gtag) {
                const e = document.createElement("script");

                function i() {
                    dataLayer.push(arguments)
                }
                e.src = `https://www.googletagmanager.com/gtag/js?id=${t.ga.counter}`, e.async = !0, document.head.appendChild(e), window.dataLayer = window.dataLayer || [], i("js", new Date), window.gtag = i, window.gtag("config", t.ga.counter)
            }
        }
        #t(t) {
            ! function(t, e, i, n, r, o, a) {
                t[r] = t[r] || function() {
                    (t[r].a = t[r].a || []).push(arguments)
                }, t[r].l = 1 * new Date;
                for (var s = 0; s < document.scripts.length; s++)
                    if (document.scripts[s].src === n) return;
                o = e.createElement(i), a = e.getElementsByTagName(i)[0], o.async = 1, o.src = n, a.parentNode.insertBefore(o, a)
            }(window, document, "script", "metrika/tag.js", "ym"), window.ym(t.ym.counter, "init", {
                webvisor: !0,
                clickmap: !0,
                accurateTrackBounce: !0
            })
        }
        async fireEvent(t, e) {
            this.integrations.forEach((async i => {
                switch (i.type) {
                    case "ym":
                        if (i.ym.isApi) t.includes("WP_dialog") || window.ym(i.ym.counter, "reachGoal", t);
                        else {
                            let n = !1;
                            try {
                                window.ym(i.ym.counter, "reachGoal", t)
                            } catch (t) {
                                n = !0
                            }
                            t.includes("WP_dialog") && e && await f({
                                settingsId: e?.settingsId,
                                wazzupId: e?.wazzupId,
                                error: n,
                                type: e?.transport,
                                metric: "yandex"
                            })
                        }
                        break;
                    case "ga":
                        if (i.ga.isApi) t.includes("WP_dialog") || window.gtag("event", t, {
                            send_to: i.ga.counter
                        });
                        else {
                            let n = !1;
                            try {
                                window.gtag("event", t, {
                                    send_to: i.ga.counter
                                })
                            } catch (t) {
                                n = !0
                            }
                            t.includes("WP_dialog") && e && await f({
                                settingsId: e?.settingsId,
                                wazzupId: e?.wazzupId,
                                error: n,
                                type: e?.transport,
                                metric: "google"
                            })
                        }
                        break;
                    case "uis":
                    case "coMagic":
                        window.Comagic && window.Comagic.trackEvent("profeat", t)
                }
            }))
        }
        async handleDialogEvents(t) {
            for (const e of t)[Qt.telegram, Qt.tgApi].includes(e.transport) ? await this.fireEvent("WP_dialog_telegram", e) : await this.fireEvent("WP_dialog_whatsapp", e)
        }
    }
    var fe = function(t, e) {
        return fe = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(t, e) {
            t.__proto__ = e
        } || function(t, e) {
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
        }, fe(t, e)
    };

    function ge(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");

        function i() {
            this.constructor = t
        }
        fe(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    }

    function me(t, e, i, n) {
        return new(i || (i = Promise))((function(r, o) {
            function a(t) {
                try {
                    l(n.next(t))
                } catch (t) {
                    o(t)
                }
            }

            function s(t) {
                try {
                    l(n.throw(t))
                } catch (t) {
                    o(t)
                }
            }

            function l(t) {
                var e;
                t.done ? r(t.value) : (e = t.value, e instanceof i ? e : new i((function(t) {
                    t(e)
                }))).then(a, s)
            }
            l((n = n.apply(t, e || [])).next())
        }))
    }

    function ve(t, e) {
        var i, n, r, o = {
                label: 0,
                sent: function() {
                    if (1 & r[0]) throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            },
            a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = s(0), a.throw = s(1), a.return = s(2), "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }), a;

        function s(s) {
            return function(l) {
                return function(s) {
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0, s[0] && (o = 0)), o;) try {
                        if (i = 1, n && (r = 2 & s[0] ? n.return : s[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, s[1])).done) return r;
                        switch (n = 0, r && (s = [2 & s[0], r.value]), s[0]) {
                            case 0:
                            case 1:
                                r = s;
                                break;
                            case 4:
                                return o.label++, {
                                    value: s[1],
                                    done: !1
                                };
                            case 5:
                                o.label++, n = s[1], s = [0];
                                continue;
                            case 7:
                                s = o.ops.pop(), o.trys.pop();
                                continue;
                            default:
                                if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                    o = 0;
                                    continue
                                }
                                if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                    o.label = s[1];
                                    break
                                }
                                if (6 === s[0] && o.label < r[1]) {
                                    o.label = r[1], r = s;
                                    break
                                }
                                if (r && o.label < r[2]) {
                                    o.label = r[2], o.ops.push(s);
                                    break
                                }
                                r[2] && o.ops.pop(), o.trys.pop();
                                continue
                        }
                        s = e.call(t, o)
                    } catch (t) {
                        s = [6, t], n = 0
                    } finally {
                        i = r = 0
                    }
                    if (5 & s[0]) throw s[1];
                    return {
                        value: s[0] ? s[1] : void 0,
                        done: !0
                    }
                }([s, l])
            }
        }
    }
    Object.create;

    function we(t) {
        var e = "function" == typeof Symbol && Symbol.iterator,
            i = e && t[e],
            n = 0;
        if (i) return i.call(t);
        if (t && "number" == typeof t.length) return {
            next: function() {
                return t && n >= t.length && (t = void 0), {
                    value: t && t[n++],
                    done: !t
                }
            }
        };
        throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }

    function be(t, e) {
        var i = "function" == typeof Symbol && t[Symbol.iterator];
        if (!i) return t;
        var n, r, o = i.call(t),
            a = [];
        try {
            for (;
                (void 0 === e || e-- > 0) && !(n = o.next()).done;) a.push(n.value)
        } catch (t) {
            r = {
                error: t
            }
        } finally {
            try {
                n && !n.done && (i = o.return) && i.call(o)
            } finally {
                if (r) throw r.error
            }
        }
        return a
    }

    function Ce(t, e, i) {
        if (i || 2 === arguments.length)
            for (var n, r = 0, o = e.length; r < o; r++) !n && r in e || (n || (n = Array.prototype.slice.call(e, 0, r)), n[r] = e[r]);
        return t.concat(n || Array.prototype.slice.call(e))
    }

    function ye(t) {
        return this instanceof ye ? (this.v = t, this) : new ye(t)
    }

    function xe(t, e, i) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var n, r = i.apply(t, e || []),
            o = [];
        return n = Object.create(("function" == typeof AsyncIterator ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", (function(t) {
            return function(e) {
                return Promise.resolve(e).then(t, c)
            }
        })), n[Symbol.asyncIterator] = function() {
            return this
        }, n;

        function a(t, e) {
            r[t] && (n[t] = function(e) {
                return new Promise((function(i, n) {
                    o.push([t, e, i, n]) > 1 || s(t, e)
                }))
            }, e && (n[t] = e(n[t])))
        }

        function s(t, e) {
            try {
                ! function(t) {
                    t.value instanceof ye ? Promise.resolve(t.value.v).then(l, c) : d(o[0][2], t)
                }(r[t](e))
            } catch (t) {
                d(o[0][3], t)
            }
        }

        function l(t) {
            s("next", t)
        }

        function c(t) {
            s("throw", t)
        }

        function d(t, e) {
            t(e), o.shift(), o.length && s(o[0][0], o[0][1])
        }
    }

    function Pe(t) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var e, i = t[Symbol.asyncIterator];
        return i ? i.call(t) : (t = we(t), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
            return this
        }, e);

        function n(i) {
            e[i] = t[i] && function(e) {
                return new Promise((function(n, r) {
                    (function(t, e, i, n) {
                        Promise.resolve(n).then((function(e) {
                            t({
                                value: e,
                                done: i
                            })
                        }), e)
                    })(n, r, (e = t[i](e)).done, e.value)
                }))
            }
        }
    }
    Object.create;
    "function" == typeof SuppressedError && SuppressedError;

    function Me(t) {
        return "function" == typeof t
    }

    function Fe(t) {
        var e = t((function(t) {
            Error.call(t), t.stack = (new Error).stack
        }));
        return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e
    }
    var $e = Fe((function(t) {
        return function(e) {
            t(this), this.message = e ? e.length + " errors occurred during unsubscription:\n" + e.map((function(t, e) {
                return e + 1 + ") " + t.toString()
            })).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = e
        }
    }));

    function Be(t, e) {
        if (t) {
            var i = t.indexOf(e);
            0 <= i && t.splice(i, 1)
        }
    }
    var ke = function() {
            function t(t) {
                this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null
            }
            var e;
            return t.prototype.unsubscribe = function() {
                var t, e, i, n, r;
                if (!this.closed) {
                    this.closed = !0;
                    var o = this._parentage;
                    if (o)
                        if (this._parentage = null, Array.isArray(o)) try {
                            for (var a = we(o), s = a.next(); !s.done; s = a.next()) {
                                s.value.remove(this)
                            }
                        } catch (e) {
                            t = {
                                error: e
                            }
                        } finally {
                            try {
                                s && !s.done && (e = a.return) && e.call(a)
                            } finally {
                                if (t) throw t.error
                            }
                        } else o.remove(this);
                    var l = this.initialTeardown;
                    if (Me(l)) try {
                        l()
                    } catch (t) {
                        r = t instanceof $e ? t.errors : [t]
                    }
                    var c = this._finalizers;
                    if (c) {
                        this._finalizers = null;
                        try {
                            for (var d = we(c), u = d.next(); !u.done; u = d.next()) {
                                var p = u.value;
                                try {
                                    Ee(p)
                                } catch (t) {
                                    r = null != r ? r : [], t instanceof $e ? r = Ce(Ce([], be(r)), be(t.errors)) : r.push(t)
                                }
                            }
                        } catch (t) {
                            i = {
                                error: t
                            }
                        } finally {
                            try {
                                u && !u.done && (n = d.return) && n.call(d)
                            } finally {
                                if (i) throw i.error
                            }
                        }
                    }
                    if (r) throw new $e(r)
                }
            }, t.prototype.add = function(e) {
                var i;
                if (e && e !== this)
                    if (this.closed) Ee(e);
                    else {
                        if (e instanceof t) {
                            if (e.closed || e._hasParent(this)) return;
                            e._addParent(this)
                        }(this._finalizers = null !== (i = this._finalizers) && void 0 !== i ? i : []).push(e)
                    }
            }, t.prototype._hasParent = function(t) {
                var e = this._parentage;
                return e === t || Array.isArray(e) && e.includes(t)
            }, t.prototype._addParent = function(t) {
                var e = this._parentage;
                this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t
            }, t.prototype._removeParent = function(t) {
                var e = this._parentage;
                e === t ? this._parentage = null : Array.isArray(e) && Be(e, t)
            }, t.prototype.remove = function(e) {
                var i = this._finalizers;
                i && Be(i, e), e instanceof t && e._removeParent(this)
            }, t.EMPTY = ((e = new t).closed = !0, e), t
        }(),
        _e = ke.EMPTY;

    function Se(t) {
        return t instanceof ke || t && "closed" in t && Me(t.remove) && Me(t.add) && Me(t.unsubscribe)
    }

    function Ee(t) {
        Me(t) ? t() : t.unsubscribe()
    }
    var Ie = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        },
        Ae = {
            setTimeout: function(t, e) {
                for (var i = [], n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
                var r = Ae.delegate;
                return (null == r ? void 0 : r.setTimeout) ? r.setTimeout.apply(r, Ce([t, e], be(i))) : setTimeout.apply(void 0, Ce([t, e], be(i)))
            },
            clearTimeout: function(t) {
                var e = Ae.delegate;
                return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(t)
            },
            delegate: void 0
        };

    function ze(t) {
        Ae.setTimeout((function() {
            var e = Ie.onUnhandledError;
            if (!e) throw t;
            e(t)
        }))
    }

    function We() {}
    var Te = He("C", void 0, void 0);

    function He(t, e, i) {
        return {
            kind: t,
            value: e,
            error: i
        }
    }
    var Le = null;

    function Oe(t) {
        if (Ie.useDeprecatedSynchronousErrorHandling) {
            var e = !Le;
            if (e && (Le = {
                    errorThrown: !1,
                    error: null
                }), t(), e) {
                var i = Le,
                    n = i.errorThrown,
                    r = i.error;
                if (Le = null, n) throw r
            }
        } else t()
    }
    var Ve = function(t) {
            function e(e) {
                var i = t.call(this) || this;
                return i.isStopped = !1, e ? (i.destination = e, Se(e) && e.add(i)) : i.destination = Qe, i
            }
            return ge(e, t), e.create = function(t, e, i) {
                return new Re(t, e, i)
            }, e.prototype.next = function(t) {
                this.isStopped ? Ne(function(t) {
                    return He("N", t, void 0)
                }(t), this) : this._next(t)
            }, e.prototype.error = function(t) {
                this.isStopped ? Ne(He("E", void 0, t), this) : (this.isStopped = !0, this._error(t))
            }, e.prototype.complete = function() {
                this.isStopped ? Ne(Te, this) : (this.isStopped = !0, this._complete())
            }, e.prototype.unsubscribe = function() {
                this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this), this.destination = null)
            }, e.prototype._next = function(t) {
                this.destination.next(t)
            }, e.prototype._error = function(t) {
                try {
                    this.destination.error(t)
                } finally {
                    this.unsubscribe()
                }
            }, e.prototype._complete = function() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }, e
        }(ke),
        je = Function.prototype.bind;

    function De(t, e) {
        return je.call(t, e)
    }
    var Ue = function() {
            function t(t) {
                this.partialObserver = t
            }
            return t.prototype.next = function(t) {
                var e = this.partialObserver;
                if (e.next) try {
                    e.next(t)
                } catch (t) {
                    Ze(t)
                }
            }, t.prototype.error = function(t) {
                var e = this.partialObserver;
                if (e.error) try {
                    e.error(t)
                } catch (t) {
                    Ze(t)
                } else Ze(t)
            }, t.prototype.complete = function() {
                var t = this.partialObserver;
                if (t.complete) try {
                    t.complete()
                } catch (t) {
                    Ze(t)
                }
            }, t
        }(),
        Re = function(t) {
            function e(e, i, n) {
                var r, o, a = t.call(this) || this;
                Me(e) || !e ? r = {
                    next: null != e ? e : void 0,
                    error: null != i ? i : void 0,
                    complete: null != n ? n : void 0
                } : a && Ie.useDeprecatedNextContext ? ((o = Object.create(e)).unsubscribe = function() {
                    return a.unsubscribe()
                }, r = {
                    next: e.next && De(e.next, o),
                    error: e.error && De(e.error, o),
                    complete: e.complete && De(e.complete, o)
                }) : r = e;
                return a.destination = new Ue(r), a
            }
            return ge(e, t), e
        }(Ve);

    function Ze(t) {
        var e;
        Ie.useDeprecatedSynchronousErrorHandling ? (e = t, Ie.useDeprecatedSynchronousErrorHandling && Le && (Le.errorThrown = !0, Le.error = e)) : ze(t)
    }

    function Ne(t, e) {
        var i = Ie.onStoppedNotification;
        i && Ae.setTimeout((function() {
            return i(t, e)
        }))
    }
    var Qe = {
            closed: !0,
            next: We,
            error: function(t) {
                throw t
            },
            complete: We
        },
        Ge = "function" == typeof Symbol && Symbol.observable || "@@observable";

    function qe(t) {
        return t
    }

    function Ye(t) {
        return 0 === t.length ? qe : 1 === t.length ? t[0] : function(e) {
            return t.reduce((function(t, e) {
                return e(t)
            }), e)
        }
    }
    var Je = function() {
        function t(t) {
            t && (this._subscribe = t)
        }
        return t.prototype.lift = function(e) {
            var i = new t;
            return i.source = this, i.operator = e, i
        }, t.prototype.subscribe = function(t, e, i) {
            var n, r = this,
                o = (n = t) && n instanceof Ve || function(t) {
                    return t && Me(t.next) && Me(t.error) && Me(t.complete)
                }(n) && Se(n) ? t : new Re(t, e, i);
            return Oe((function() {
                var t = r,
                    e = t.operator,
                    i = t.source;
                o.add(e ? e.call(o, i) : i ? r._subscribe(o) : r._trySubscribe(o))
            })), o
        }, t.prototype._trySubscribe = function(t) {
            try {
                return this._subscribe(t)
            } catch (e) {
                t.error(e)
            }
        }, t.prototype.forEach = function(t, e) {
            var i = this;
            return new(e = Ke(e))((function(e, n) {
                var r = new Re({
                    next: function(e) {
                        try {
                            t(e)
                        } catch (t) {
                            n(t), r.unsubscribe()
                        }
                    },
                    error: n,
                    complete: e
                });
                i.subscribe(r)
            }))
        }, t.prototype._subscribe = function(t) {
            var e;
            return null === (e = this.source) || void 0 === e ? void 0 : e.subscribe(t)
        }, t.prototype[Ge] = function() {
            return this
        }, t.prototype.pipe = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return Ye(t)(this)
        }, t.prototype.toPromise = function(t) {
            var e = this;
            return new(t = Ke(t))((function(t, i) {
                var n;
                e.subscribe((function(t) {
                    return n = t
                }), (function(t) {
                    return i(t)
                }), (function() {
                    return t(n)
                }))
            }))
        }, t.create = function(e) {
            return new t(e)
        }, t
    }();

    function Ke(t) {
        var e;
        return null !== (e = null != t ? t : Ie.Promise) && void 0 !== e ? e : Promise
    }
    var Xe = Array.isArray,
        ti = Object.getPrototypeOf,
        ei = Object.prototype,
        ii = Object.keys;

    function ni(t) {
        if (1 === t.length) {
            var e = t[0];
            if (Xe(e)) return {
                args: e,
                keys: null
            };
            if ((n = e) && "object" == typeof n && ti(n) === ei) {
                var i = ii(e);
                return {
                    args: i.map((function(t) {
                        return e[t]
                    })),
                    keys: i
                }
            }
        }
        var n;
        return {
            args: t,
            keys: null
        }
    }
    var ri = function(t) {
        return t && "number" == typeof t.length && "function" != typeof t
    };

    function oi(t) {
        return Me(null == t ? void 0 : t.then)
    }

    function ai(t) {
        return Me(t[Ge])
    }

    function si(t) {
        return Symbol.asyncIterator && Me(null == t ? void 0 : t[Symbol.asyncIterator])
    }

    function li(t) {
        return new TypeError("You provided " + (null !== t && "object" == typeof t ? "an invalid object" : "'" + t + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")
    }
    var ci = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";

    function di(t) {
        return Me(null == t ? void 0 : t[ci])
    }

    function ui(t) {
        return xe(this, arguments, (function() {
            var e, i, n;
            return ve(this, (function(r) {
                switch (r.label) {
                    case 0:
                        e = t.getReader(), r.label = 1;
                    case 1:
                        r.trys.push([1, , 9, 10]), r.label = 2;
                    case 2:
                        return [4, ye(e.read())];
                    case 3:
                        return i = r.sent(), n = i.value, i.done ? [4, ye(void 0)] : [3, 5];
                    case 4:
                        return [2, r.sent()];
                    case 5:
                        return [4, ye(n)];
                    case 6:
                        return [4, r.sent()];
                    case 7:
                        return r.sent(), [3, 2];
                    case 8:
                        return [3, 10];
                    case 9:
                        return e.releaseLock(), [7];
                    case 10:
                        return [2]
                }
            }))
        }))
    }

    function pi(t) {
        return Me(null == t ? void 0 : t.getReader)
    }

    function hi(t) {
        if (t instanceof Je) return t;
        if (null != t) {
            if (ai(t)) return r = t, new Je((function(t) {
                var e = r[Ge]();
                if (Me(e.subscribe)) return e.subscribe(t);
                throw new TypeError("Provided object does not correctly implement Symbol.observable")
            }));
            if (ri(t)) return n = t, new Je((function(t) {
                for (var e = 0; e < n.length && !t.closed; e++) t.next(n[e]);
                t.complete()
            }));
            if (oi(t)) return i = t, new Je((function(t) {
                i.then((function(e) {
                    t.closed || (t.next(e), t.complete())
                }), (function(e) {
                    return t.error(e)
                })).then(null, ze)
            }));
            if (si(t)) return fi(t);
            if (di(t)) return e = t, new Je((function(t) {
                var i, n;
                try {
                    for (var r = we(e), o = r.next(); !o.done; o = r.next()) {
                        var a = o.value;
                        if (t.next(a), t.closed) return
                    }
                } catch (t) {
                    i = {
                        error: t
                    }
                } finally {
                    try {
                        o && !o.done && (n = r.return) && n.call(r)
                    } finally {
                        if (i) throw i.error
                    }
                }
                t.complete()
            }));
            if (pi(t)) return fi(ui(t))
        }
        var e, i, n, r;
        throw li(t)
    }

    function fi(t) {
        return new Je((function(e) {
            (function(t, e) {
                var i, n, r, o;
                return me(this, void 0, void 0, (function() {
                    var a, s;
                    return ve(this, (function(l) {
                        switch (l.label) {
                            case 0:
                                l.trys.push([0, 5, 6, 11]), i = Pe(t), l.label = 1;
                            case 1:
                                return [4, i.next()];
                            case 2:
                                if ((n = l.sent()).done) return [3, 4];
                                if (a = n.value, e.next(a), e.closed) return [2];
                                l.label = 3;
                            case 3:
                                return [3, 1];
                            case 4:
                                return [3, 11];
                            case 5:
                                return s = l.sent(), r = {
                                    error: s
                                }, [3, 11];
                            case 6:
                                return l.trys.push([6, , 9, 10]), n && !n.done && (o = i.return) ? [4, o.call(i)] : [3, 8];
                            case 7:
                                l.sent(), l.label = 8;
                            case 8:
                                return [3, 10];
                            case 9:
                                if (r) throw r.error;
                                return [7];
                            case 10:
                                return [7];
                            case 11:
                                return e.complete(), [2]
                        }
                    }))
                }))
            })(t, e).catch((function(t) {
                return e.error(t)
            }))
        }))
    }

    function gi(t, e, i, n, r) {
        void 0 === n && (n = 0), void 0 === r && (r = !1);
        var o = e.schedule((function() {
            i(), r ? t.add(this.schedule(null, n)) : this.unsubscribe()
        }), n);
        if (t.add(o), !r) return o
    }

    function mi(t) {
        return function(e) {
            if (function(t) {
                    return Me(null == t ? void 0 : t.lift)
                }(e)) return e.lift((function(e) {
                try {
                    return t(e, this)
                } catch (t) {
                    this.error(t)
                }
            }));
            throw new TypeError("Unable to lift unknown Observable type")
        }
    }

    function vi(t, e, i, n, r) {
        return new wi(t, e, i, n, r)
    }
    var wi = function(t) {
        function e(e, i, n, r, o, a) {
            var s = t.call(this, e) || this;
            return s.onFinalize = o, s.shouldUnsubscribe = a, s._next = i ? function(t) {
                try {
                    i(t)
                } catch (t) {
                    e.error(t)
                }
            } : t.prototype._next, s._error = r ? function(t) {
                try {
                    r(t)
                } catch (t) {
                    e.error(t)
                } finally {
                    this.unsubscribe()
                }
            } : t.prototype._error, s._complete = n ? function() {
                try {
                    n()
                } catch (t) {
                    e.error(t)
                } finally {
                    this.unsubscribe()
                }
            } : t.prototype._complete, s
        }
        return ge(e, t), e.prototype.unsubscribe = function() {
            var e;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                var i = this.closed;
                t.prototype.unsubscribe.call(this), !i && (null === (e = this.onFinalize) || void 0 === e || e.call(this))
            }
        }, e
    }(Ve);

    function bi(t, e) {
        return void 0 === e && (e = 0), mi((function(i, n) {
            i.subscribe(vi(n, (function(i) {
                return gi(n, t, (function() {
                    return n.next(i)
                }), e)
            }), (function() {
                return gi(n, t, (function() {
                    return n.complete()
                }), e)
            }), (function(i) {
                return gi(n, t, (function() {
                    return n.error(i)
                }), e)
            })))
        }))
    }

    function Ci(t, e) {
        return void 0 === e && (e = 0), mi((function(i, n) {
            n.add(t.schedule((function() {
                return i.subscribe(n)
            }), e))
        }))
    }

    function yi(t, e) {
        if (!t) throw new Error("Iterable cannot be null");
        return new Je((function(i) {
            gi(i, e, (function() {
                var n = t[Symbol.asyncIterator]();
                gi(i, e, (function() {
                    n.next().then((function(t) {
                        t.done ? i.complete() : i.next(t.value)
                    }))
                }), 0, !0)
            }))
        }))
    }

    function xi(t, e) {
        if (null != t) {
            if (ai(t)) return function(t, e) {
                return hi(t).pipe(Ci(e), bi(e))
            }(t, e);
            if (ri(t)) return function(t, e) {
                return new Je((function(i) {
                    var n = 0;
                    return e.schedule((function() {
                        n === t.length ? i.complete() : (i.next(t[n++]), i.closed || this.schedule())
                    }))
                }))
            }(t, e);
            if (oi(t)) return function(t, e) {
                return hi(t).pipe(Ci(e), bi(e))
            }(t, e);
            if (si(t)) return yi(t, e);
            if (di(t)) return function(t, e) {
                return new Je((function(i) {
                    var n;
                    return gi(i, e, (function() {
                            n = t[ci](), gi(i, e, (function() {
                                var t, e, r;
                                try {
                                    e = (t = n.next()).value, r = t.done
                                } catch (t) {
                                    return void i.error(t)
                                }
                                r ? i.complete() : i.next(e)
                            }), 0, !0)
                        })),
                        function() {
                            return Me(null == n ? void 0 : n.return) && n.return()
                        }
                }))
            }(t, e);
            if (pi(t)) return function(t, e) {
                return yi(ui(t), e)
            }(t, e)
        }
        throw li(t)
    }

    function Pi(t, e) {
        return e ? xi(t, e) : hi(t)
    }

    function Mi(t, e) {
        return mi((function(i, n) {
            var r = 0;
            i.subscribe(vi(n, (function(i) {
                n.next(t.call(e, i, r++))
            })))
        }))
    }
    var Fi = Array.isArray;

    function $i(t) {
        return Mi((function(e) {
            return function(t, e) {
                return Fi(e) ? t.apply(void 0, Ce([], be(e))) : t(e)
            }(t, e)
        }))
    }

    function Bi(t) {
        return t && Me(t.schedule)
    }

    function ki(t) {
        return t[t.length - 1]
    }

    function _i(t) {
        return Bi(ki(t)) ? t.pop() : void 0
    }

    function Si() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var i = _i(t),
            n = function(t) {
                return Me(ki(t)) ? t.pop() : void 0
            }(t),
            r = ni(t),
            o = r.args,
            a = r.keys;
        if (0 === o.length) return Pi([], i);
        var s = new Je(function(t, e, i) {
            void 0 === i && (i = qe);
            return function(n) {
                Ei(e, (function() {
                    for (var r = t.length, o = new Array(r), a = r, s = r, l = function(r) {
                            Ei(e, (function() {
                                var l = Pi(t[r], e),
                                    c = !1;
                                l.subscribe(vi(n, (function(t) {
                                    o[r] = t, c || (c = !0, s--), s || n.next(i(o.slice()))
                                }), (function() {
                                    --a || n.complete()
                                })))
                            }), n)
                        }, c = 0; c < r; c++) l(c)
                }), n)
            }
        }(o, i, a ? function(t) {
            return function(t, e) {
                return t.reduce((function(t, i, n) {
                    return t[i] = e[n], t
                }), {})
            }(a, t)
        } : qe));
        return n ? s.pipe($i(n)) : s
    }

    function Ei(t, e, i) {
        t ? gi(i, t, e) : e()
    }

    function Ii() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return Pi(t, _i(t))
    }

    function Ai(t, e) {
        return mi((function(i, n) {
            var r = null,
                o = 0,
                a = !1,
                s = function() {
                    return a && !r && n.complete()
                };
            i.subscribe(vi(n, (function(i) {
                null == r || r.unsubscribe();
                var a = 0,
                    l = o++;
                hi(t(i, l)).subscribe(r = vi(n, (function(t) {
                    return n.next(e ? e(i, t, l, a++) : t)
                }), (function() {
                    r = null, s()
                })))
            }), (function() {
                a = !0, s()
            })))
        }))
    }
    var zi = function(t) {
            function e(e, i) {
                return t.call(this) || this
            }
            return ge(e, t), e.prototype.schedule = function(t, e) {
                return void 0 === e && (e = 0), this
            }, e
        }(ke),
        Wi = {
            setInterval: function(t, e) {
                for (var i = [], n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
                var r = Wi.delegate;
                return (null == r ? void 0 : r.setInterval) ? r.setInterval.apply(r, Ce([t, e], be(i))) : setInterval.apply(void 0, Ce([t, e], be(i)))
            },
            clearInterval: function(t) {
                var e = Wi.delegate;
                return ((null == e ? void 0 : e.clearInterval) || clearInterval)(t)
            },
            delegate: void 0
        },
        Ti = function(t) {
            function e(e, i) {
                var n = t.call(this, e, i) || this;
                return n.scheduler = e, n.work = i, n.pending = !1, n
            }
            return ge(e, t), e.prototype.schedule = function(t, e) {
                var i;
                if (void 0 === e && (e = 0), this.closed) return this;
                this.state = t;
                var n = this.id,
                    r = this.scheduler;
                return null != n && (this.id = this.recycleAsyncId(r, n, e)), this.pending = !0, this.delay = e, this.id = null !== (i = this.id) && void 0 !== i ? i : this.requestAsyncId(r, this.id, e), this
            }, e.prototype.requestAsyncId = function(t, e, i) {
                return void 0 === i && (i = 0), Wi.setInterval(t.flush.bind(t, this), i)
            }, e.prototype.recycleAsyncId = function(t, e, i) {
                if (void 0 === i && (i = 0), null != i && this.delay === i && !1 === this.pending) return e;
                null != e && Wi.clearInterval(e)
            }, e.prototype.execute = function(t, e) {
                if (this.closed) return new Error("executing a cancelled action");
                this.pending = !1;
                var i = this._execute(t, e);
                if (i) return i;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }, e.prototype._execute = function(t, e) {
                var i, n = !1;
                try {
                    this.work(t)
                } catch (t) {
                    n = !0, i = t || new Error("Scheduled action threw falsy error")
                }
                if (n) return this.unsubscribe(), i
            }, e.prototype.unsubscribe = function() {
                if (!this.closed) {
                    var e = this.id,
                        i = this.scheduler,
                        n = i.actions;
                    this.work = this.state = this.scheduler = null, this.pending = !1, Be(n, this), null != e && (this.id = this.recycleAsyncId(i, e, null)), this.delay = null, t.prototype.unsubscribe.call(this)
                }
            }, e
        }(zi),
        Hi = {
            now: function() {
                return (Hi.delegate || Date).now()
            },
            delegate: void 0
        },
        Li = function() {
            function t(e, i) {
                void 0 === i && (i = t.now), this.schedulerActionCtor = e, this.now = i
            }
            return t.prototype.schedule = function(t, e, i) {
                return void 0 === e && (e = 0), new this.schedulerActionCtor(this, t).schedule(i, e)
            }, t.now = Hi.now, t
        }(),
        Oi = new(function(t) {
            function e(e, i) {
                void 0 === i && (i = Li.now);
                var n = t.call(this, e, i) || this;
                return n.actions = [], n._active = !1, n
            }
            return ge(e, t), e.prototype.flush = function(t) {
                var e = this.actions;
                if (this._active) e.push(t);
                else {
                    var i;
                    this._active = !0;
                    do {
                        if (i = t.execute(t.state, t.delay)) break
                    } while (t = e.shift());
                    if (this._active = !1, i) {
                        for (; t = e.shift();) t.unsubscribe();
                        throw i
                    }
                }
            }, e
        }(Li))(Ti);

    function Vi(t, e, i) {
        void 0 === t && (t = 0), void 0 === i && (i = Oi);
        var n = -1;
        return null != e && (Bi(e) ? i = e : n = e), new Je((function(e) {
            var r, o = (r = t) instanceof Date && !isNaN(r) ? +t - i.now() : t;
            o < 0 && (o = 0);
            var a = 0;
            return i.schedule((function() {
                e.closed || (e.next(a++), 0 <= n ? this.schedule(void 0, n) : e.complete())
            }), o)
        }))
    }

    function ji(t, e, i) {
        return void 0 === i && (i = 1 / 0), Me(e) ? ji((function(i, n) {
            return Mi((function(t, r) {
                return e(i, t, n, r)
            }))(hi(t(i, n)))
        }), i) : ("number" == typeof e && (i = e), mi((function(e, n) {
            return function(t, e, i, n, r, o, a, s) {
                var l = [],
                    c = 0,
                    d = 0,
                    u = !1,
                    p = function() {
                        !u || l.length || c || e.complete()
                    },
                    h = function(t) {
                        return c < n ? f(t) : l.push(t)
                    },
                    f = function(t) {
                        o && e.next(t), c++;
                        var s = !1;
                        hi(i(t, d++)).subscribe(vi(e, (function(t) {
                            null == r || r(t), o ? h(t) : e.next(t)
                        }), (function() {
                            s = !0
                        }), void 0, (function() {
                            if (s) try {
                                c--;
                                for (var t = function() {
                                        var t = l.shift();
                                        a ? gi(e, a, (function() {
                                            return f(t)
                                        })) : f(t)
                                    }; l.length && c < n;) t();
                                p()
                            } catch (t) {
                                e.error(t)
                            }
                        })))
                    };
                return t.subscribe(vi(e, h, (function() {
                        u = !0, p()
                    }))),
                    function() {
                        null == s || s()
                    }
            }(e, n, t, i)
        })))
    }

    function Di() {
        return void 0 === (t = 1) && (t = 1 / 0), ji(qe, t);
        var t
    }

    function Ui() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return Di()(Pi(t, _i(t)))
    }

    function Ri() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var i = _i(t);
        return mi((function(e, n) {
            (i ? Ui(t, e, i) : Ui(t, e)).subscribe(n)
        }))
    }
    var Zi = ["addListener", "removeListener"],
        Ni = ["addEventListener", "removeEventListener"],
        Qi = ["on", "off"];

    function Gi(t, e, i, n) {
        if (Me(i) && (n = i, i = void 0), n) return Gi(t, e, i).pipe($i(n));
        var r = be(function(t) {
                return Me(t.addEventListener) && Me(t.removeEventListener)
            }(t) ? Ni.map((function(n) {
                return function(r) {
                    return t[n](e, r, i)
                }
            })) : function(t) {
                return Me(t.addListener) && Me(t.removeListener)
            }(t) ? Zi.map(qi(t, e)) : function(t) {
                return Me(t.on) && Me(t.off)
            }(t) ? Qi.map(qi(t, e)) : [], 2),
            o = r[0],
            a = r[1];
        if (!o && ri(t)) return ji((function(t) {
            return Gi(t, e, i)
        }))(hi(t));
        if (!o) throw new TypeError("Invalid event target");
        return new Je((function(t) {
            var e = function() {
                for (var e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
                return t.next(1 < e.length ? e : e[0])
            };
            return o(e),
                function() {
                    return a(e)
                }
        }))
    }

    function qi(t, e) {
        return function(i) {
            return function(n) {
                return t[i](e, n)
            }
        }
    }

    function Yi(t, e) {
        return mi((function(i, n) {
            var r = 0;
            i.subscribe(vi(n, (function(i) {
                return t.call(e, i, r++) && n.next(i)
            })))
        }))
    }
    const Ji = {
            showAfter: t => Ii(t.active).pipe(Ai((e => e ? Vi(1e3 * t.value).pipe(Mi((() => !0)), Ri(!1)) : Ii(!0)))),
            scroll: t => Ii(t.active).pipe(Ai((e => {
                return e ? Gi(window, "scroll").pipe(Mi((() => window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100)), (i = e => e < t.value, void 0 === (n = !0) && (n = !1), mi((function(t, e) {
                    var r = 0;
                    t.subscribe(vi(e, (function(t) {
                        var o = i(t, r++);
                        (o || n) && e.next(t), !o && e.complete()
                    })))
                }))), Yi((e => e >= t.value)), Mi((() => !0)), Ri(0)) : Ii(!0);
                var i, n
            }))),
            device: t => {
                if (!t.mobile && !t.desktop) return Ii(!1);
                return Ii(t[o()])
            },
            leftSite: t => Ii(t).pipe(Ai((t => t ? Gi(document, "mouseout").pipe(Mi((t => {
                const e = t.clientY <= 0,
                    i = "pf_widget_leave_modal";
                return !window.sessionStorage.getItem(i) && (e && setTimeout((() => {
                    window.sessionStorage.setItem(i, !0)
                }), 250), e)
            })), Yi((t => t)), Mi((() => !0)), Ri(!1)) : Ii(!1))))
        },
        Ki = t => (t => {
            const e = Object.entries(t);
            let i = !1;
            const n = e[3][1].active,
                r = e[1][1].active;
            return n || r || (i = !0), Si(e.map((t => {
                let [e, i] = t;
                return (0, Ji[e])(i)
            })).filter(Boolean)).pipe(Mi((e => {
                const n = Object.keys(t).indexOf("leftSite"),
                    r = e[n],
                    o = e.filter(((t, e) => e !== n)).every(Boolean);
                return i ? o && r : o || !0 === r
            })))
        })(t);
    var Xi = Fe((function(t) {
            return function() {
                t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
            }
        })),
        tn = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e
            }
            return ge(e, t), e.prototype.lift = function(t) {
                var e = new en(this, this);
                return e.operator = t, e
            }, e.prototype._throwIfClosed = function() {
                if (this.closed) throw new Xi
            }, e.prototype.next = function(t) {
                var e = this;
                Oe((function() {
                    var i, n;
                    if (e._throwIfClosed(), !e.isStopped) {
                        e.currentObservers || (e.currentObservers = Array.from(e.observers));
                        try {
                            for (var r = we(e.currentObservers), o = r.next(); !o.done; o = r.next()) {
                                o.value.next(t)
                            }
                        } catch (t) {
                            i = {
                                error: t
                            }
                        } finally {
                            try {
                                o && !o.done && (n = r.return) && n.call(r)
                            } finally {
                                if (i) throw i.error
                            }
                        }
                    }
                }))
            }, e.prototype.error = function(t) {
                var e = this;
                Oe((function() {
                    if (e._throwIfClosed(), !e.isStopped) {
                        e.hasError = e.isStopped = !0, e.thrownError = t;
                        for (var i = e.observers; i.length;) i.shift().error(t)
                    }
                }))
            }, e.prototype.complete = function() {
                var t = this;
                Oe((function() {
                    if (t._throwIfClosed(), !t.isStopped) {
                        t.isStopped = !0;
                        for (var e = t.observers; e.length;) e.shift().complete()
                    }
                }))
            }, e.prototype.unsubscribe = function() {
                this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
            }, Object.defineProperty(e.prototype, "observed", {
                get: function() {
                    var t;
                    return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype._trySubscribe = function(e) {
                return this._throwIfClosed(), t.prototype._trySubscribe.call(this, e)
            }, e.prototype._subscribe = function(t) {
                return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t)
            }, e.prototype._innerSubscribe = function(t) {
                var e = this,
                    i = this,
                    n = i.hasError,
                    r = i.isStopped,
                    o = i.observers;
                return n || r ? _e : (this.currentObservers = null, o.push(t), new ke((function() {
                    e.currentObservers = null, Be(o, t)
                })))
            }, e.prototype._checkFinalizedStatuses = function(t) {
                var e = this,
                    i = e.hasError,
                    n = e.thrownError,
                    r = e.isStopped;
                i ? t.error(n) : r && t.complete()
            }, e.prototype.asObservable = function() {
                var t = new Je;
                return t.source = this, t
            }, e.create = function(t, e) {
                return new en(t, e)
            }, e
        }(Je),
        en = function(t) {
            function e(e, i) {
                var n = t.call(this) || this;
                return n.destination = e, n.source = i, n
            }
            return ge(e, t), e.prototype.next = function(t) {
                var e, i;
                null === (i = null === (e = this.destination) || void 0 === e ? void 0 : e.next) || void 0 === i || i.call(e, t)
            }, e.prototype.error = function(t) {
                var e, i;
                null === (i = null === (e = this.destination) || void 0 === e ? void 0 : e.error) || void 0 === i || i.call(e, t)
            }, e.prototype.complete = function() {
                var t, e;
                null === (e = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === e || e.call(t)
            }, e.prototype._subscribe = function(t) {
                var e, i;
                return null !== (i = null === (e = this.source) || void 0 === e ? void 0 : e.subscribe(t)) && void 0 !== i ? i : _e
            }, e
        }(tn),
        nn = function(t) {
            function e(e) {
                var i = t.call(this) || this;
                return i._value = e, i
            }
            return ge(e, t), Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return this.getValue()
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype._subscribe = function(e) {
                var i = t.prototype._subscribe.call(this, e);
                return !i.closed && e.next(this._value), i
            }, e.prototype.getValue = function() {
                var t = this,
                    e = t.hasError,
                    i = t.thrownError,
                    n = t._value;
                if (e) throw i;
                return this._throwIfClosed(), n
            }, e.prototype.next = function(e) {
                t.prototype.next.call(this, this._value = e)
            }, e
        }(tn);

    function rn() {
        return document.getElementById("kSELUFVYyGJm") ? (localStorage.removeItem("hasAdblock"), !1) : (localStorage.setItem("hasAdblock", !0), !0)
    }
    const on = "0123456789abcdef";
    class an {
        constructor(t) {
            this.bytes = t
        }
        static ofInner(t) {
            if (16 !== t.length) throw new TypeError("not 128-bit length");
            return new an(t)
        }
        static fromFieldsV7(t, e, i, n) {
            if (!Number.isInteger(t) || !Number.isInteger(e) || !Number.isInteger(i) || !Number.isInteger(n) || t < 0 || e < 0 || i < 0 || n < 0 || t > 0xffffffffffff || e > 4095 || i > 1073741823 || n > 4294967295) throw new RangeError("invalid field value");
            const r = new Uint8Array(16);
            return r[0] = t / 2 ** 40, r[1] = t / 2 ** 32, r[2] = t / 2 ** 24, r[3] = t / 65536, r[4] = t / 256, r[5] = t, r[6] = 112 | e >>> 8, r[7] = e, r[8] = 128 | i >>> 24, r[9] = i >>> 16, r[10] = i >>> 8, r[11] = i, r[12] = n >>> 24, r[13] = n >>> 16, r[14] = n >>> 8, r[15] = n, new an(r)
        }
        static parse(t) {
            var e, i, n, r;
            let o;
            switch (t.length) {
                case 32:
                    o = null === (e = /^[0-9a-f]{32}$/i.exec(t)) || void 0 === e ? void 0 : e[0];
                    break;
                case 36:
                    o = null === (i = /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(t)) || void 0 === i ? void 0 : i.slice(1, 6).join("");
                    break;
                case 38:
                    o = null === (n = /^\{([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})\}$/i.exec(t)) || void 0 === n ? void 0 : n.slice(1, 6).join("");
                    break;
                case 45:
                    o = null === (r = /^urn:uuid:([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(t)) || void 0 === r ? void 0 : r.slice(1, 6).join("")
            }
            if (o) {
                const t = new Uint8Array(16);
                for (let e = 0; e < 16; e += 4) {
                    const i = parseInt(o.substring(2 * e, 2 * e + 8), 16);
                    t[e + 0] = i >>> 24, t[e + 1] = i >>> 16, t[e + 2] = i >>> 8, t[e + 3] = i
                }
                return new an(t)
            }
            throw new SyntaxError("could not parse UUID string")
        }
        toString() {
            let t = "";
            for (let e = 0; e < this.bytes.length; e++) t += on.charAt(this.bytes[e] >>> 4), t += on.charAt(15 & this.bytes[e]), 3 !== e && 5 !== e && 7 !== e && 9 !== e || (t += "-");
            return t
        }
        toHex() {
            let t = "";
            for (let e = 0; e < this.bytes.length; e++) t += on.charAt(this.bytes[e] >>> 4), t += on.charAt(15 & this.bytes[e]);
            return t
        }
        toJSON() {
            return this.toString()
        }
        getVariant() {
            const t = this.bytes[8] >>> 4;
            if (t < 0) throw new Error("unreachable");
            if (t <= 7) return this.bytes.every((t => 0 === t)) ? "NIL" : "VAR_0";
            if (t <= 11) return "VAR_10";
            if (t <= 13) return "VAR_110";
            if (t <= 15) return this.bytes.every((t => 255 === t)) ? "MAX" : "VAR_RESERVED";
            throw new Error("unreachable")
        }
        getVersion() {
            return "VAR_10" === this.getVariant() ? this.bytes[6] >>> 4 : void 0
        }
        clone() {
            return new an(this.bytes.slice(0))
        }
        equals(t) {
            return 0 === this.compareTo(t)
        }
        compareTo(t) {
            for (let e = 0; e < 16; e++) {
                const i = this.bytes[e] - t.bytes[e];
                if (0 !== i) return Math.sign(i)
            }
            return 0
        }
    }
    class sn {
        constructor(t) {
            this.timestamp = 0, this.counter = 0, this.random = null != t ? t : ln()
        }
        generate() {
            return this.generateOrResetCore(Date.now(), 1e4)
        }
        generateOrAbort() {
            return this.generateOrAbortCore(Date.now(), 1e4)
        }
        generateOrResetCore(t, e) {
            let i = this.generateOrAbortCore(t, e);
            return void 0 === i && (this.timestamp = 0, i = this.generateOrAbortCore(t, e)), i
        }
        generateOrAbortCore(t, e) {
            if (!Number.isInteger(t) || t < 1 || t > 0xffffffffffff) throw new RangeError("`unixTsMs` must be a 48-bit positive integer");
            if (e < 0 || e > 0xffffffffffff) throw new RangeError("`rollbackAllowance` out of reasonable range");
            if (t > this.timestamp) this.timestamp = t, this.resetCounter();
            else {
                if (!(t + e >= this.timestamp)) return;
                this.counter++, this.counter > 4398046511103 && (this.timestamp++, this.resetCounter())
            }
            return an.fromFieldsV7(this.timestamp, Math.trunc(this.counter / 2 ** 30), this.counter & 2 ** 30 - 1, this.random.nextUint32())
        }
        resetCounter() {
            this.counter = 1024 * this.random.nextUint32() + (1023 & this.random.nextUint32())
        }
        generateV4() {
            const t = new Uint8Array(Uint32Array.of(this.random.nextUint32(), this.random.nextUint32(), this.random.nextUint32(), this.random.nextUint32()).buffer);
            return t[6] = 64 | t[6] >>> 4, t[8] = 128 | t[8] >>> 2, an.ofInner(t)
        }
    }
    const ln = () => {
        if ("undefined" != typeof crypto && void 0 !== crypto.getRandomValues) return new cn;
        if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
        return {
            nextUint32: () => 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random())
        }
    };
    class cn {
        constructor() {
            this.buffer = new Uint32Array(8), this.cursor = 65535
        }
        nextUint32() {
            return this.cursor >= this.buffer.length && (crypto.getRandomValues(this.buffer), this.cursor = 0), this.buffer[this.cursor++]
        }
    }
    let dn;
    const un = () => (dn || (dn = new sn)).generate();

    function pn(t) {
        Promise.all([l(t), d(t), u(t), p(t), h(t), vn()]).then((e => {
            let [i, n, r, o, a, s] = e;
            if (!i) return void console.error("Can not find widget with id", t);
            ! function() {
                const t = document.createElement("link");
                t.rel = "stylesheet", t.href = "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap", document.head.appendChild(t)
            }();
            const l = function() {
                    const t = new nn(!1);
                    return window.pfWidget = {
                        open: () => t.next(!0),
                        close: () => t.next(!1)
                    }, {
                        modalStateChange$: t.pipe((e = 1, Yi((function(t, i) {
                            return e <= i
                        }))))
                    };
                    var e
                }(),
                d = mn(),
                p = new he(n);
            p.insertIntegrations(), p.handleDialogEvents(r), setInterval((() => {
                u(t).then((t => p.handleDialogEvents(t)))
            }), 9e4);
            const h = Ki(i.widgetSettings.actions);
            ! function(t) {
                let {
                    widget: e,
                    wazzupId: i,
                    hid: n,
                    integrationsService: r,
                    subscription: o,
                    anyActionPassed$: a,
                    modalStateChange$: s,
                    tests: l
                } = t;
                const c = rt`
    <pf-widget
      style="z-index: 2147483647"
      .widget="${e}"
      .wazzupId="${i}"
      .hid="${n}"
      .integrationsService="${r}"
      .subscription="${o}"
      .anyActionPassed$="${a}"
      .modalStateChange$="${s}"
      .tests="${l}"
    ></pf-widget>
  `;
                xt(c, document.body)
            }({
                widget: i,
                wazzupId: d,
                hid: s,
                integrationsService: p,
                subscription: o,
                anyActionPassed$: h,
                modalStateChange$: l.modalStateChange$,
                tests: a
            });
            const f = document.createElement("script");
            f.src = "https://widget.yourgood.app/script/ads.bundle.min.js", document.body.appendChild(f), f.onload = () => {
                rn(), c(t, {
                    name: "enter",
                    wazzupId: d,
                    hid: s,
                    integrations: n
                })
            }, f.onerror = e => {
                rn(), c(t, {
                    name: "enter",
                    wazzupId: d,
                    hid: s,
                    integrations: n
                })
            }
        }))
    }
    const hn = "__buttonly_id",
        fn = "__hid",
        gn = 730;

    function mn() {
        ! function() {
            const t = w.get(hn);
            t && t.includes("-") && w.set(hn, t.replace("-", ""), {
                expires: gn
            })
        }();
        let t = m("123456789", 8)();
        return w.get(hn) || w.set(hn, t, {
            expires: gn
        }), w.get(hn)
    }

    function vn() {
        const t = w.get(fn);
        if (!t) {
            const t = un().toString();
            return w.set(fn, t, {
                expires: gn
            }), t
        }
        return t
    }! function() {
        const t = function() {
            if (window.ygWidgetId) return null;
            const t = document.head.querySelectorAll("[data-pf-id]"),
                e = t.length > 1 ? t[0].dataset.pfId : document.currentScript.dataset.pfId;
            return window.ygWidgetId = e, e
        }();
        t ? (! function() {
            if (!0 === window[r]) return;
            window[r] = !0;
            let t = history.pushState;
            history.pushState = function() {
                let e = t.apply(this, arguments);
                return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange")), e
            };
            let e = history.replaceState;
            history.replaceState = function() {
                let t = e.apply(this, arguments);
                return window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange")), t
            }
        }(), function(t) {
            let {
                widgetId: e,
                referrer: i
            } = t;
            fetch("https://widget.yourgood.app/api/statistics-inner/create-setup-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify({
                    settingsId: e,
                    referrer: i
                })
            }).then((t => t.json())).catch((() => {}))
        }({
            widgetId: t,
            referrer: window.location.href
        }), new Promise(((t, e) => {
            t()
        })).then((() => l(t))).then((e => {
            var i;
            e.seoOptimization ? (i = 3e3, new Promise((t => setTimeout(t, i)))).then((() => pn(t))) : pn(t)
        }))) : console.error("You can only install 1 of <yourgoods> widget")
    }()
})();