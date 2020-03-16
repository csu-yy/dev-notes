//https://s3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js
! function(e, t) {
  function n() {
    function n(e, t, n) {
      for (var o = 0; o < e.length; o++) document.addEventListener(e[o], t, n)
    }

    function o(e, t) {
      for (var n, o, r = t[0].toUpperCase() + t.slice(1), i = 0; i < VENDOR_PREFIXES.length;) {
        if (n = VENDOR_PREFIXES[i], o = n ? n + r : t, o in e) return e[o];
        i++
      }
      return void 0
    }
    var i, a, s = "1.1.23",
      u = e._page_type ? e._page_type : 0,
      c = e._tt_config,
      d = {
        FAIL: 0,
        UNUSE: 1,
        SUCCESS: 2
      },
      f = "",
      l = "",
      g = 20,
      _ = null,
      p = "",
      v = "",
      m = "",
      h = "",
      S = "",
      y = "",
      w = "",
      b = "",
      E = "",
      I = "",
      C = "",
      T = "",
      x = "",
      U = document.getElementById("_tt_real_page_url") ? document.getElementById("_tt_real_page_url").getAttribute("href") : "",
      A = d.UNUSE,
      P = d.UNUSE,
      N = d.UNUSE,
      D = d.SUCCESS,
      F = d.UNUSE,
      q = {
        combineData: function() {
          for (var e = {}, t = Array.prototype.slice.call(arguments), n = 0; n < t.length; n++)
            for (var o in t[n]) e[o] && t[n][o] && (e[o] = t[n][o]), e[o] || void 0 === t[n][o] || null === t[n][o] || (e[o] = t[n][o]);
          return e
        },
        getOS: function() {
          var e = navigator.userAgent,
            t = {
              android: e.match(/(Android)\s+([\d.]+)/),
              ipad: e.match(/(iPad).*OS\s([\d_]+)/),
              iphone: e.match(/(iPhone\sOS)\s([\d_]+)/)
            },
            n = "";
          return t.android ? n = "android" : (t.ipad || t.iphone) && (n = "ios"), n
        },
        isAwemeCompatible: function() {
          var e = !1;
          try {
            e = q.isAweme() && "ios" == q.getOS() && parseInt(y.replace(/\./g, "")) < 182
          } catch (t) {}
          return e
        },
        isLiveCompatible: function() {
          var e = !1;
          try {
            e = q.isLive() && "ios" == q.getOS() && parseInt(y.replace(/\./g, "")) < 420
          } catch (t) {}
          return e
        },
        isArray: function(e) {
          return "[object Array]" === Object.prototype.toString.call(e)
        },
        isExternal: function() {
          var e = !q.isToutiao() && /(UCBrowser|baiduboxapp|baidubrowser|MQQBrowser|QQ|MicroMessenger|Weibo|Opera|Firefox|MSIE|360SE|MetaSr|TheWorld|Firefox|LBBROWSER|Chrome|Safari)(\s|\/|_)(\S)/i.test(navigator.userAgent);
          return e
        },
        isToutiao: function() {
          var e = "http://nativeapp.toutiao.com" == document.referrer || /(News|NewsSocial|Explore|NewsArticle|NewsInHouse|joke_essay|Joke|Video|VideoInHouse|VideoArticle|live_stream|aweme|open_news)(\s|\/|_)(\S)/i.test(navigator.userAgent);
          return e
        },
        isMainToutiao: function() {
          return /(NewsArticle)(\s|\/|_)(\S)/i.test(navigator.userAgent)
        },
        isTTAD: function() {
          return /(TTAD)(\s|\/|_)(\S)/i.test(navigator.userAgent)
        },
        isLive: function() {
          return /(live_stream)(\s|\/|_)(\S)/i.test(navigator.userAgent)
        },
        isAweme: function() {
          return /(aweme)(\s|\/|_)(\S)/i.test(navigator.userAgent)
        },
        isJoke: function() {
          return /(joke_essay|Joke)(\s|\/|_)(\S)/i.test(navigator.userAgent)
        },
        getDefer: function() {
          var e = {},
            t = new Promise(function(t, n) {
              e.resolve = t, e.reject = n
            });
          return e.promise = t, e
        },
        getLocationParam: function(e) {
          var t = {
            QueryString: function(e) {
              var t = window.location.href,
                n = new RegExp("[&?]{1}" + e + "=([^&?|^#?]*)", "ig");
              return t.match(n) ? decodeURI(t.match(n)[0].substr(e.length + 2)) : (t = document.referrer, t.match(n) ? decodeURI(t.match(n)[0].substr(e.length + 2)) : "")
            }
          };
          return t.QueryString(e)
        },
        queryToJson: function(e) {
          for (var t, n, o, r, i = e.substr(e.lastIndexOf("?") + 1), a = i.split("&"), s = a.length, u = {}, c = 0; s > c; c++) a[c] && (r = a[c].split("="), t = r[0], n = r[1], o = u[t], "undefined" == typeof o ? u[t] = n : this.isArray(o) ? o.push(n) : u[t] = [o, n]);
          return u
        },
        getSdkPath: function() {
          var e = "",
            t = "",
            n = ["s0.", "s1.", "s2.", "s3."],
            o = n.length;
          if (r) e = r.src;
          else
            for (var i = document.getElementsByTagName("script"), a = i.length || 0, s = 0; a > s; s++) {
              var u = i[s].src; - 1 !== u.indexOf("toutiao-track-log") && (e = u)
            }
          for (var s = 0; o > s; s++) - 1 !== e.indexOf(n[s]) && (t = n[s]);
          return t
        },
        jsonToQuery: function(e) {
          var t = [];
          e = e || {};
          var n = /^(?:string|boolean|number)/i;
          for (var o in e) e.hasOwnProperty(o) && n.test(typeof e[o]) && t.push(o + "=" + e[o]);
          return t.join("&")
        },
        extend: function(e, t) {
          for (var n in t) e[n] = t[n]
        },
        getAdId: function() {
          var e = q.getLocationParam("_tt_ad_id") || q.getLocationParam("ad_id") || q.getLocationParam("aid");
          return e
        },
        getReqId: function() {
          return q.getLocationParam("req_id") || ""
        },
        getCid: function() {
          return q.getLocationParam("cid") || ""
        },
        getWebUrlInfo: function() {
          var e, t = window.decodeURIComponent(q.getLocationParam("_toutiao_params") || q.getLocationParam("_toutiao_recommend") || "");
          try {
            e = JSON.parse(t)
          } catch (n) {}
          return e
        },
        encodeParams: function(e) {
          var t = [];
          e = e || {};
          var n = /^(?:string|boolean|number)/i;
          for (var o in e)
            if (e.hasOwnProperty(o) && n.test(typeof e[o])) {
              var r = decodeURIComponent(e[o]);
              t.push(encodeURIComponent(o) + "=" + encodeURIComponent(r))
            }
          return t.join("&")
        },
        jsonp: function(e) {
          if (e = e || {}, !e.url || !e.callback) throw new Error("鍙傛暟涓嶅悎娉�");
          var t = ("jsonp_" + Math.random()).replace(".", ""),
            n = document.getElementsByTagName("head")[0];
          e.data[e.callback] = t;
          var o = this.encodeParams(e.data),
            r = document.createElement("script");
          n.appendChild(r), window[t] = function(o) {
            n.removeChild(r), clearTimeout(r.timer), window[t] = null, e.success && e.success(o)
          }, r.src = e.url + "?" + o, e.time && (r.timer = setTimeout(function() {
            window[t] = null, n.removeChild(r), e.fail && e.fail({
              message: "瓒呮椂"
            })
          }, e.time))
        },
        syncGet: function(e, t) {
          var n = t || 0,
            o = this,
            r = new XMLHttpRequest;
          r.open("GET", e.url, !1), r.withCredentials = !0, r.onreadystatechange = function() {
            4 === r.readyState && 200 !== r.status && 1 > n && (n++, o.syncGet(e, n))
          }, r.send(null)
        },
        retry: function(e, t) {
          function n() {
            e(function(e) {
              e && t > o && (o++, n())
            })
          }
          var t = t || 1,
            o = 0;
          n()
        },
        imageGet: function(e) {
          var t = new Image;
          t.src = window.location.protocol + e.url
        },
        addLoadEvent: function(e) {
          var t = window.onload;
          window.onload = "function" != typeof window.onload ? e : function() {
            t(), e()
          }
        },
        getSiteId: function() {
          var e = window.location.pathname,
            t = /\d+/g,
            n = e.match(t) || [];
          return n[0] || ""
        },
        setToSessionStorage: function(e, t) {
          var n = window.sessionStorage;
          n.setItem(e, t)
        },
        getFromSessionStorage: function(e) {
          var t = window.sessionStorage;
          return t.getItem(e)
        },
        _parseUmengData: function(t) {
          var n = {
              value: E || q.getCid()
            },
            o = n.extra = {
              sdk_version: q.getSdkPath() + s + (this.isTTAD() ? ".t" : ""),
              site_id: x,
              options: {},
              log_extra: _ || q.getFromSessionStorage("umeng_log_extra") || "{}",
              convert_id: t.convert_id || I || 0
            };
          for (var r in t)
            if ("target" === r) q.extend(o, this._getPosition(t[r]));
            else if ("page_url" === r) o[r] = decodeURIComponent(t[r]) || decodeURIComponent(e.location.href);
          else if ("page_type" === r) o[r] = t[r] || u;
          else if ("track_data" === r) {
            var i = JSON.parse(e.decodeURIComponent(t[r])),
              a = ["page_url", "page_type", "event_type", "event_value", "xpath", "os", "select_content"];
            a.forEach(function(e) {
              var t = i[0][e];
              o[e] = t || 0 === t ? t : ""
            })
          } else o[r] = t[r];
          try {
            o.options = JSON.parse(t.options || "{}")
          } catch (c) {
            o.options.other = t.options
          }
          return o.options = JSON.stringify(o.options), "xpath" === t.event_type && (o.dom_md5 = l), o.log_extra = _ || q.getFromSessionStorage("umeng_log_extra") || "{}", o.tt_bridge = 1e3 + 100 * A + 10 * P + F, o.tt_env = 1e3 + 100 * A + 10 * N + D, n
        },
        _sendUmengEvent: function(e, t, n) {
          var o = "android" === q.getOS(),
            r = 1,
            i = "";
          i = q.isJoke() || o || q.isLive() || q.isAweme() ? "log_event" : "custom_event";
          var a = "bytedance://" + i + "?category=umeng&tag=" + e + "&label=" + t,
            s = q.isMainToutiao() && "6.6.7" == y;
          if (s && (a = a + "&realtime_report=" + r), n)
            for (var u in n) {
              var c = n[u];
              if ("extra" === u && "object" == typeof c)
                if (o) a += "&extra=" + encodeURIComponent(JSON.stringify(c));
                else {
                  var d = c,
                    f = "";
                  for (var l in d) f += "object" == typeof d[l] ? "&" + l + "=" + encodeURIComponent(JSON.stringify(d[l])) : "&" + l + "=" + encodeURIComponent(d[l]);
                  a += f
                }
              else a += "&" + u + "=" + encodeURIComponent(c)
            }
          if (s) try {
            var g = {};
            g.url = "//ad.toutiao.com/tetris/event_fail_rate_count/?log=" + encodeURIComponent(JSON.stringify(n)) + "&t=" + 1 * new Date, q.imageGet(g)
          } catch (_) {}
          try {
            window.webkit.messageHandlers.observe.postMessage(a)
          } catch (p) {
            console.log(a)
          }
        },
        _sendConvertEvent: function(e, t, n) {
          var o = ("ios" === q.getOS(), 1),
            r = "log_event",
            i = q.isMainToutiao() && "6.6.7" == y;
          i && (a = a + "&realtime_report=" + o);
          var a = "bytedance://" + r + "?category=umeng&tag=" + e + "&label=" + t;
          if (n)
            for (var s in n) {
              var u = n[s];
              if ("extra" === s && "object" == typeof u) {
                var c = u,
                  d = "";
                for (var f in c) d += "object" == typeof c[f] ? "&" + f + "=" + encodeURIComponent(JSON.stringify(c[f])) : "&" + f + "=" + encodeURIComponent(c[f]);
                a += d
              } else a += "&" + s + "=" + encodeURIComponent(u)
            }
          if (i) try {
            var l = {};
            l.url = "//ad.toutiao.com/tetris/event_fail_rate_count/?log=" + encodeURIComponent(JSON.stringify(n)) + "&t=" + 1 * new Date, q.imageGet(l)
          } catch (g) {}
          try {
            var l = {};
            l.url = "//ad.toutiao.com/tetris/event_fail_rate_count/?type=sdk&log=" + encodeURIComponent(JSON.stringify(n)) + "&t=" + 1 * new Date, q.imageGet(l)
          } catch (g) {}
          try {
            window.webkit.messageHandlers.observe.postMessage(a)
          } catch (_) {
            console.log(a)
          }
        }
      },
      O = {
        getChildrenIndex: function(e) {
          if (e.sourceIndex) return e.sourceIndex - e.parentNode.sourceIndex - 1;
          for (var t = 0; e = e.previousElementSibling;) t++;
          return t
        },
        getXPath: function(e) {
          for (var t = ""; e.length;) {
            var n = Array.prototype.pop.apply(e);
            if (n && n.tagName && "body" != n.tagName.toLowerCase() && "html" != n.tagName.toLowerCase()) {
              var o = "function" == typeof n.getAttribute ? n.getAttribute("id") : "";
              t += n.tagName.toLowerCase() + this.getChildrenIndex(n) + (o ? "#" + o : "") + (0 == e.length ? "" : ">")
            }
          }
          return t
        },
        getElementByAttr: function(e, t) {
          if ("string" == typeof e && (e = document.getElementById(e)), e || (e = document), e.querySelectorAll) {
            var n = e.querySelectorAll("[" + t + "]");
            return n = Array.prototype.slice.call(n)
          }
          for (var o = e.getElementsByTagName("*"), r = o.length, i = 0, a = []; r > i; i++) {
            var s = o[i];
            s.getAttribute(t) && a.push(s)
          }
          return a
        },
        getPerformanceObj: function() {
          if (!window.performance) return "";
          var e = performance.timing;
          return e
        },
        getDomCount: function() {
          return document.getElementsByTagName("*").length
        },
        getElementParentsAndSelf: function(e) {
          var t = this.getElementParents(e);
          return t.unshift(e), t
        },
        getElementParents: function(e) {
          for (var t = []; e;) e = e.parentNode, e && t.push(e);
          return t
        },
        delegate: function(e, t, n, o) {
          function r(t) {
            var r = /^\[(.*)\]$/,
              a = window.event ? window.event : t,
              s = a.target || a.srcElement;
            if (r.test(n))
              for (var u = n.match(r)[1], c = O.getElementByAttr(e, u), d = s; d;) {
                if (i.inElement(d, c)) {
                  o.call(s, a);
                  break
                }
                d = d.parentNode
              }
          }
          if ("string" == typeof e && (e = document.getElementById(e)), e || (e = document), n && "function" == typeof o) {
            var i = this;
            e[t] = r
          }
        },
        inElement: function(e, t) {
          for (var n = t.length, o = 0; n > o; o++)
            if (e == t[o]) return !0;
          return !1
        }
      };
    ! function(e) {
      "use strict";

      function t(e, t) {
        var n = (65535 & e) + (65535 & t),
          o = (e >> 16) + (t >> 16) + (n >> 16);
        return o << 16 | 65535 & n
      }

      function n(e, t) {
        return e << t | e >>> 32 - t
      }

      function o(e, o, r, i, a, s) {
        return t(n(t(t(o, e), t(i, s)), a), r)
      }

      function r(e, t, n, r, i, a, s) {
        return o(t & n | ~t & r, e, t, i, a, s)
      }

      function i(e, t, n, r, i, a, s) {
        return o(t & r | n & ~r, e, t, i, a, s)
      }

      function a(e, t, n, r, i, a, s) {
        return o(t ^ n ^ r, e, t, i, a, s)
      }

      function s(e, t, n, r, i, a, s) {
        return o(n ^ (t | ~r), e, t, i, a, s)
      }

      function u(e, n) {
        e[n >> 5] |= 128 << n % 32, e[(n + 64 >>> 9 << 4) + 14] = n;
        var o, u, c, d, f, l = 1732584193,
          g = -271733879,
          _ = -1732584194,
          p = 271733878;
        for (o = 0; o < e.length; o += 16) u = l, c = g, d = _, f = p, l = r(l, g, _, p, e[o], 7, -680876936), p = r(p, l, g, _, e[o + 1], 12, -389564586), _ = r(_, p, l, g, e[o + 2], 17, 606105819), g = r(g, _, p, l, e[o + 3], 22, -1044525330), l = r(l, g, _, p, e[o + 4], 7, -176418897), p = r(p, l, g, _, e[o + 5], 12, 1200080426), _ = r(_, p, l, g, e[o + 6], 17, -1473231341), g = r(g, _, p, l, e[o + 7], 22, -45705983), l = r(l, g, _, p, e[o + 8], 7, 1770035416), p = r(p, l, g, _, e[o + 9], 12, -1958414417), _ = r(_, p, l, g, e[o + 10], 17, -42063), g = r(g, _, p, l, e[o + 11], 22, -1990404162), l = r(l, g, _, p, e[o + 12], 7, 1804603682), p = r(p, l, g, _, e[o + 13], 12, -40341101), _ = r(_, p, l, g, e[o + 14], 17, -1502002290), g = r(g, _, p, l, e[o + 15], 22, 1236535329), l = i(l, g, _, p, e[o + 1], 5, -165796510), p = i(p, l, g, _, e[o + 6], 9, -1069501632), _ = i(_, p, l, g, e[o + 11], 14, 643717713), g = i(g, _, p, l, e[o], 20, -373897302), l = i(l, g, _, p, e[o + 5], 5, -701558691), p = i(p, l, g, _, e[o + 10], 9, 38016083), _ = i(_, p, l, g, e[o + 15], 14, -660478335), g = i(g, _, p, l, e[o + 4], 20, -405537848), l = i(l, g, _, p, e[o + 9], 5, 568446438), p = i(p, l, g, _, e[o + 14], 9, -1019803690), _ = i(_, p, l, g, e[o + 3], 14, -187363961), g = i(g, _, p, l, e[o + 8], 20, 1163531501), l = i(l, g, _, p, e[o + 13], 5, -1444681467), p = i(p, l, g, _, e[o + 2], 9, -51403784), _ = i(_, p, l, g, e[o + 7], 14, 1735328473), g = i(g, _, p, l, e[o + 12], 20, -1926607734), l = a(l, g, _, p, e[o + 5], 4, -378558), p = a(p, l, g, _, e[o + 8], 11, -2022574463), _ = a(_, p, l, g, e[o + 11], 16, 1839030562), g = a(g, _, p, l, e[o + 14], 23, -35309556), l = a(l, g, _, p, e[o + 1], 4, -1530992060), p = a(p, l, g, _, e[o + 4], 11, 1272893353), _ = a(_, p, l, g, e[o + 7], 16, -155497632), g = a(g, _, p, l, e[o + 10], 23, -1094730640), l = a(l, g, _, p, e[o + 13], 4, 681279174), p = a(p, l, g, _, e[o], 11, -358537222), _ = a(_, p, l, g, e[o + 3], 16, -722521979), g = a(g, _, p, l, e[o + 6], 23, 76029189), l = a(l, g, _, p, e[o + 9], 4, -640364487), p = a(p, l, g, _, e[o + 12], 11, -421815835), _ = a(_, p, l, g, e[o + 15], 16, 530742520), g = a(g, _, p, l, e[o + 2], 23, -995338651), l = s(l, g, _, p, e[o], 6, -198630844), p = s(p, l, g, _, e[o + 7], 10, 1126891415), _ = s(_, p, l, g, e[o + 14], 15, -1416354905), g = s(g, _, p, l, e[o + 5], 21, -57434055), l = s(l, g, _, p, e[o + 12], 6, 1700485571), p = s(p, l, g, _, e[o + 3], 10, -1894986606), _ = s(_, p, l, g, e[o + 10], 15, -1051523), g = s(g, _, p, l, e[o + 1], 21, -2054922799), l = s(l, g, _, p, e[o + 8], 6, 1873313359), p = s(p, l, g, _, e[o + 15], 10, -30611744), _ = s(_, p, l, g, e[o + 6], 15, -1560198380), g = s(g, _, p, l, e[o + 13], 21, 1309151649), l = s(l, g, _, p, e[o + 4], 6, -145523070), p = s(p, l, g, _, e[o + 11], 10, -1120210379), _ = s(_, p, l, g, e[o + 2], 15, 718787259), g = s(g, _, p, l, e[o + 9], 21, -343485551), l = t(l, u), g = t(g, c), _ = t(_, d), p = t(p, f);
        return [l, g, _, p]
      }

      function c(e) {
        var t, n = "",
          o = 32 * e.length;
        for (t = 0; o > t; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n
      }

      function d(e) {
        var t, n = [];
        for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
        var o = 8 * e.length;
        for (t = 0; o > t; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return n
      }

      function f(e) {
        return c(u(d(e), 8 * e.length))
      }

      function l(e, t) {
        var n, o, r = d(e),
          i = [],
          a = [];
        for (i[15] = a[15] = void 0, r.length > 16 && (r = u(r, 8 * e.length)), n = 0; 16 > n; n += 1) i[n] = 909522486 ^ r[n], a[n] = 1549556828 ^ r[n];
        return o = u(i.concat(d(t)), 512 + 8 * t.length), c(u(a.concat(o), 640))
      }

      function g(e) {
        var t, n, o = "0123456789abcdef",
          r = "";
        for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), r += o.charAt(t >>> 4 & 15) + o.charAt(15 & t);
        return r
      }

      function _(e) {
        return unescape(encodeURIComponent(e))
      }

      function p(e) {
        return f(_(e))
      }

      function v(e) {
        return g(p(e))
      }

      function m(e, t) {
        return l(_(e), _(t))
      }

      function h(e, t) {
        return g(m(e, t))
      }

      function S(e, t, n) {
        return t ? n ? m(t, e) : h(t, e) : n ? p(e) : v(e)
      }
      e.md5 = S
    }(this);
    var R = {
      getPrefix: function(e) {
        var t = "";
        try {
          t = e.split("_")[0]
        } catch (n) {}
        return t
      },
      traversal: function(e, t, n, o, r) {
        if (e && 1 === e.nodeType && !(n >= o)) {
          var i = "",
            a = this.getPrefix(t);
          r(t);
          for (var s, u = 0, c = e.childNodes, d = 0; u < c.length; u++) s = c[u], s && 1 === s.nodeType && (i = a + "," + d + "_" + s.tagName, this.traversal(s, i, n + 1, o, r), ++d)
        }
      }
    };
    VENDOR_PREFIXES = ["", "webkit", "Moz", "MS", "ms", "o"];
    var j, M = window,
      k = void 0 !== o(M, "PointerEvent"),
      L = "ontouchstart" in M;
    ! function(e) {
      e[e.Default = 0] = "Default", e[e.Start = 1] = "Start", e[e.Move = 2] = "Move", e[e.End = 4] = "End", e[e.Cancle = 8] = "Cancle"
    }(j || (j = {}));
    var B = {
      pointer: {
        events: ["pointerdown", "pointermove", "pointerup", "pointercancel"],
        handler: function(e) {
          var t = e.type,
            n = {
              status: j.Default,
              timestamp: Date.now(),
              position: [e.clientX, e.clientY]
            };
          return t !== this.events[0] || 0 !== e.button && "touch" !== e.pointerType ? t === this.events[1] ? n.status = j.Move : t === this.events[2] ? n.status = j.End : t === this.events[3] && (n.status = j.Cancle) : n.status = j.Start, n
        }
      },
      touch: {
        events: ["touchstart", "touchmove", "touchend", "touchcancel"],
        handler: function(e) {
          var t = e.type;
          if (1 !== e.changedTouches.length) return null;
          var n = {
            status: j.Default,
            timestamp: Date.now(),
            position: [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
          };
          return t === this.events[0] ? n.status = j.Start : t === this.events[1] ? n.status = j.Move : t === this.events[2] ? n.status = j.End : t === this.events[3] && (n.status = j.Cancle), n.status === j.Default ? null : n
        }
      },
      mouse: {
        events: ["mousedown", "mousemove", "mouseup"],
        handler: function(e) {
          var t = e.type,
            n = {
              status: j.Default,
              timestamp: Date.now(),
              position: [e.clientX, e.clientY]
            };
          return t === this.events[0] && 0 === e.button ? n.status = j.Start : t === this.events[1] ? n.status = j.Move : t === this.events[2] && (n.status = j.End), n.status & j.Move && 1 !== e.which && (n.status = j.End), n.status === j.Default ? null : n
        }
      }
    };
    "MSPointerEvent" in M && !("PointerEvent" in M) && (B.pointer.events = ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel"]);
    var J = {
        interval: 300,
        time: 250,
        threshold: 9,
        posThreshold: 10
      },
      X = {};
    X.addClickEvent = function(e, t) {
      var o = function(t) {
        var n, o, r, i;
        return function(a) {
          var s = B[t].handler(a);
          if (null !== s) {
            if (s.status & j.Start) return n = j.Start, o = s.timestamp, r = s.position, void(i = a.target);
            if (s.status & j.End) n & j.Start && s.timestamp - o < J.time && Math.sqrt(Math.pow(s.position[0] - r[0], 2) + Math.pow(s.position[1] - r[1], 2)) < J.threshold && e(a);
            else if (s.status & j.Move && n & j.Start) return
          }
          n = 0, o = 0, r = [0, 0], i = null
        }
      };
      k ? n(B.pointer.events, o("pointer"), t) : L ? n(B.touch.events, o("touch"), t) : n(B.mouse.events, o("mouse"), t)
    }, ! function Q(e, t, n) {
      function o(i, a) {
        if (!t[i]) {
          if (!e[i]) {
            var s = "function" == typeof require && require;
            if (!a && s) return s(i, !0);
            if (r) return r(i, !0);
            var u = new Error("Cannot find module '" + i + "'");
            throw u.code = "MODULE_NOT_FOUND", u
          }
          var c = t[i] = {
            exports: {}
          };
          e[i][0].call(c.exports, function(t) {
            var n = e[i][1][t];
            return o(n ? n : t)
          }, c, c.exports, Q, e, t, n)
        }
        return t[i].exports
      }
      for (var r = "function" == typeof require && require, i = 0; i < n.length; i++) o(n[i]);
      return o
    }({
      1: [function(e, t) {
        "use strict";

        function n() {}

        function o(e) {
          try {
            return e.then
          } catch (t) {
            return p = t, v
          }
        }

        function r(e, t) {
          try {
            return e(t)
          } catch (n) {
            return p = n, v
          }
        }

        function i(e, t, n) {
          try {
            e(t, n)
          } catch (o) {
            return p = o, v
          }
        }

        function a(e) {
          if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
          if ("function" != typeof e) throw new TypeError("not a function");
          this._37 = 0, this._12 = null, this._59 = [], e !== n && g(e, this)
        }

        function s(e, t, o) {
          return new e.constructor(function(r, i) {
            var s = new a(n);
            s.then(r, i), u(e, new l(t, o, s))
          })
        }

        function u(e, t) {
          for (; 3 === e._37;) e = e._12;
          return 0 === e._37 ? void e._59.push(t) : void _(function() {
            var n = 1 === e._37 ? t.onFulfilled : t.onRejected;
            if (null === n) return void(1 === e._37 ? c(t.promise, e._12) : d(t.promise, e._12));
            var o = r(n, e._12);
            o === v ? d(t.promise, p) : c(t.promise, o)
          })
        }

        function c(e, t) {
          if (t === e) return d(e, new TypeError("A promise cannot be resolved with itself."));
          if (t && ("object" == typeof t || "function" == typeof t)) {
            var n = o(t);
            if (n === v) return d(e, p);
            if (n === e.then && t instanceof a) return e._37 = 3, e._12 = t, void f(e);
            if ("function" == typeof n) return void g(n.bind(t), e)
          }
          e._37 = 1, e._12 = t, f(e)
        }

        function d(e, t) {
          e._37 = 2, e._12 = t, f(e)
        }

        function f(e) {
          for (var t = 0; t < e._59.length; t++) u(e, e._59[t]);
          e._59 = null
        }

        function l(e, t, n) {
          this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
        }

        function g(e, t) {
          var n = !1,
            o = i(e, function(e) {
              n || (n = !0, c(t, e))
            }, function(e) {
              n || (n = !0, d(t, e))
            });
          n || o !== v || (n = !0, d(t, p))
        }
        var _ = e("asap/raw"),
          p = null,
          v = {};
        t.exports = a, a._99 = n, a.prototype.then = function(e, t) {
          if (this.constructor !== a) return s(this, e, t);
          var o = new a(n);
          return u(this, new l(e, t, o)), o
        }
      }, {
        "asap/raw": 4
      }],
      2: [function(e, t) {
        "use strict";

        function n(e) {
          var t = new o(o._99);
          return t._37 = 1, t._12 = e, t
        }
        var o = e("./core.js");
        t.exports = o;
        var r = n(!0),
          i = n(!1),
          a = n(null),
          s = n(void 0),
          u = n(0),
          c = n("");
        o.resolve = function(e) {
          if (e instanceof o) return e;
          if (null === e) return a;
          if (void 0 === e) return s;
          if (e === !0) return r;
          if (e === !1) return i;
          if (0 === e) return u;
          if ("" === e) return c;
          if ("object" == typeof e || "function" == typeof e) try {
            var t = e.then;
            if ("function" == typeof t) return new o(t.bind(e))
          } catch (d) {
            return new o(function(e, t) {
              t(d)
            })
          }
          return n(e)
        }, o.all = function(e) {
          var t = Array.prototype.slice.call(e);
          return new o(function(e, n) {
            function r(a, s) {
              if (s && ("object" == typeof s || "function" == typeof s)) {
                if (s instanceof o && s.then === o.prototype.then) {
                  for (; 3 === s._37;) s = s._12;
                  return 1 === s._37 ? r(a, s._12) : (2 === s._37 && n(s._12), void s.then(function(e) {
                    r(a, e)
                  }, n))
                }
                var u = s.then;
                if ("function" == typeof u) {
                  var c = new o(u.bind(s));
                  return void c.then(function(e) {
                    r(a, e)
                  }, n)
                }
              }
              t[a] = s, 0 === --i && e(t)
            }
            if (0 === t.length) return e([]);
            for (var i = t.length, a = 0; a < t.length; a++) r(a, t[a])
          })
        }, o.reject = function(e) {
          return new o(function(t, n) {
            n(e)
          })
        }, o.race = function(e) {
          return new o(function(t, n) {
            e.forEach(function(e) {
              o.resolve(e).then(t, n)
            })
          })
        }, o.prototype["catch"] = function(e) {
          return this.then(null, e)
        }
      }, {
        "./core.js": 1
      }],
      3: [function(e, t) {
        "use strict";

        function n() {
          if (s.length) throw s.shift()
        }

        function o(e) {
          var t;
          t = a.length ? a.pop() : new r, t.task = e, i(t)
        }

        function r() {
          this.task = null
        }
        var i = e("./raw"),
          a = [],
          s = [],
          u = i.makeRequestCallFromTimer(n);
        t.exports = o, r.prototype.call = function() {
          try {
            this.task.call()
          } catch (e) {
            o.onerror ? o.onerror(e) : (s.push(e), u())
          } finally {
            this.task = null, a[a.length] = this
          }
        }
      }, {
        "./raw": 4
      }],
      4: [function(e, t) {
        (function(e) {
          "use strict";

          function n(e) {
            s.length || (a(), u = !0), s[s.length] = e
          }

          function o() {
            for (; c < s.length;) {
              var e = c;
              if (c += 1, s[e].call(), c > d) {
                for (var t = 0, n = s.length - c; n > t; t++) s[t] = s[t + c];
                s.length -= c, c = 0
              }
            }
            s.length = 0, c = 0, u = !1
          }

          function r(e) {
            var t = 1,
              n = new f(e),
              o = document.createTextNode("");
            return n.observe(o, {
                characterData: !0
              }),
              function() {
                t = -t, o.data = t
              }
          }

          function i(e) {
            return function() {
              function t() {
                clearTimeout(n), clearInterval(o), e()
              }
              var n = setTimeout(t, 0),
                o = setInterval(t, 50)
            }
          }
          t.exports = n;
          var a, s = [],
            u = !1,
            c = 0,
            d = 1024,
            f = e.MutationObserver || e.WebKitMutationObserver;
          a = "function" == typeof f ? r(o) : i(o), n.requestFlush = a, n.makeRequestCallFromTimer = i
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
      }, {}],
      5: [function() {
        "function" != typeof Promise.prototype.done && (Promise.prototype.done = function() {
          var e = arguments.length ? this.then.apply(this, arguments) : this;
          e.then(null, function(e) {
            setTimeout(function() {
              throw e
            }, 0)
          })
        })
      }, {}],
      6: [function(e) {
        e("asap"), "undefined" == typeof Promise && (Promise = e("./lib/core.js"), e("./lib/es6-extensions.js")), e("./polyfill-done.js")
      }, {
        "./lib/core.js": 1,
        "./lib/es6-extensions.js": 2,
        "./polyfill-done.js": 5,
        asap: 3
      }]
    }, {}, [6]), x = u ? q.getSiteId() : "", e._taq = {
      push: function(e) {
        var t = e.useHttp || !1,
          n = {};
        if (!e.event_type) return void console.log("event_type is null");
        e.convert_id && (I = e.convert_id);
        var o = function() {
          n = _taq._assembleData(e), e.convert_id && (n.convert_id = e.convert_id), _taq._send_log(n, t)
        };
        i && a ? Promise.all([i, a]).then(function() {
          o()
        }, function() {
          o()
        }) : o()
      },
      _get_basedata: function(e) {
        var t = function() {
          return "function" == typeof e && e(_taq._assembleBaseData()), Promise.resolve(_taq._assembleBaseData())
        };
        return i && a ? Promise.all([i, a]).then(function() {
          return t()
        }).catch(function() {
          return t()
        }) : t()
      },
      get_query: function(e) {
        var t = {};
        return e.event_type ? t = this._assembleData(e) : void console.log("event_type is null")
      },
      get_query_promise: function(e, t) {
        return e.event_type ? i && a ? Promise.all([i, a]).then(function() {
          return "function" == typeof t && t(_taq._assembleData(e)), Promise.resolve(_taq._assembleData(e))
        }).catch(function() {
          return "function" == typeof t && t(_taq._assembleData(e)), Promise.resolve(_taq._assembleData(e))
        }) : ("function" == typeof t && t(_taq._assembleData(e)), Promise.resolve(_taq._assembleData(e))) : void console.log("event_type is null")
      },
      getCommonData: function() {
        return {
          req_id: p,
          ad_id: C,
          cid: E,
          device_id: v,
          user_id: m
        }
      },
      getFromTTBridge: function(e, t) {
        "adInfo" == e ? A = d.FAIL : "appInfo" == e && (P = d.FAIL), q.retry(function(n) {
          "function" == typeof ToutiaoJSBridge.call && ToutiaoJSBridge.call(e, {}, function(o) {
            "adInfo" == e ? A = d.SUCCESS : "appInfo" == e && (P = d.SUCCESS), n(), t(o)
          }), setTimeout(function() {
            (A == d.FAIL || P == d.FAIL) && n(new Error("jsbridge timeout error"))
          }, 400)
        }, 1)
      },
      _send_http_log: function(e) {
        var t = "//isub.snssdk.com/2/wap/landing_tetris_log/";
        e.source = "webunion", e.sdk_version = q.getSdkPath() + s, t += "?" + q.jsonToQuery(e);
        try {
          q.syncGet({
            url: t
          })
        } catch (n) {}
      },
      _send_log: function(e, t) {//gyy
        var n = q.isAwemeCompatible(),
          o = q.isLiveCompatible();
        if (t === !0 && this._send_http_log(e), q.isToutiao()) {
          (n || o) && this._send_http_log(e);
          var r = q._parseUmengData(e);
          return q.isTTAD() ? void q._sendConvertEvent("embeded_ad", "convert", r) : void q._sendUmengEvent("embeded_ad", "convert", r)
        }
        this._send_http_log(e)
      },
      _assembleData: function(t) {
        var n = {},
          o = {},
          r = {},
          i = "",
          a = this;
        for (var s in t)
          if ("target" == s) {
            var c = a._getPosition(t[s]);
            q.extend(n, c)
          } else n[s] = t[s];
        try {
          o = JSON.parse(t.options || "{}")
        } catch (f) {
          console.log("options 蹇呴』涓篔SON鏍煎紡瀛楃涓�"), o.other = t.options
        }
        return "performance" === t.event_type && (o.performance = O.getPerformanceObj()), "xpath" === t.event_type && (o.dom_md5 = l), n.options = o, n.log_extra = _ || q.getFromSessionStorage("umeng_log_extra") || "{}", n.os = q.getOS(), n.page_url = U || decodeURIComponent(e.location.href), n.page_type = n.page_type || u, q.extend(r, a._getDeviceInfo()), q.extend(r, a._getPageInfo()), i = window.encodeURIComponent(JSON.stringify([n])), q.extend(r, {
          track_data: i
        }), D = q.isExternal() ? d.FAIL : d.SUCCESS, r.tt_bridge = 1e3 + 100 * A + 10 * P + F, r.tt_env = 1e3 + 100 * A + 10 * N + D, r.app_id = b, r
      },
      _assembleBaseData: function() {
        var t = {
          log_extra: _ || q.getFromSessionStorage("umeng_log_extra") || "{}",
          os: q.getOS(),
          page_url: U || decodeURIComponent(e.location.href),
          page_type: u,
          tt_bridge: 1e3 + 100 * A + 10 * P + F,
          tt_env: 1e3 + 100 * A + 10 * N + D,
          app_id: b
        };
        return q.extend(t, this._getDeviceInfo()), q.extend(t, this._getPageInfo()), t
      },
      _getPageInfo: function() {
        var e = {},
          t = q.getFromSessionStorage("umeng_cid");
        return e.req_id = p || q.getReqId() || q.getFromSessionStorage("umeng_req_id") || "", e.cid = E || q.getCid() || "", "" === e.cid && t && (e.cid = t, N = d.SUCCESS), e.site_id = x, e.ad_id = q.getAdId(), e
      },
      _getDeviceInfo: function() {
        var e = {};
        return e.device_id = v || q.getFromSessionStorage("umeng_device_id") || "", e.user_id = m, e.uid = h || q.getFromSessionStorage("umeng_uid") || "", e.ut = S || q.getFromSessionStorage("umeng_ut") || "", e.app_version = y, e.version_code = w, e
      },
      _getPosition: function(n) {
        if (n) {
          var o = e.innerWidth || t.body.clientWidth,
            r = n.offsetLeft,
            i = n.offsetHeight,
            a = 320,
            s = O.getElementParentsAndSelf(n),
            u = {
              ox: r,
              oy: i,
              tx: ~~(r * a / o),
              ty: ~~(i * a / o),
              xpath: O.getXPath(s)
            };
          return u
        }
      }
    };
    var G = {
      initFlags: function() {
        A = d.FAIL, P = d.FAIL
      },
      initMd5: function() {
        R.traversal(t.body, "0_body", 0, g, function(e) {
          f += e
        }), l = md5(f)
      },
      bindEvent: function() {
        var e = this;
        X.addClickEvent(function(n) {
          for (var o = n.target, r = o; o != t;) "function" == typeof o.hasAttribute && o.hasAttribute("tt-data-click") && e._sendTargetMsg(o), o = o.parentNode;
          if (o == t && !c) {
            var i = {};
            i.target = r, i.event_type = "xpath", i.page_url = U || decodeURIComponent(location.href), i.page_type = u, i.convert_id = I, _taq.push(i)
          }
        }, !0), document.addEventListener("beforecopy", function(e) {
          var t = q.isAwemeCompatible(),
            n = q.isLiveCompatible(),
            o = document.getSelection().toString(),
            r = o.length;
          ("android" === q.getOS() || !q.isToutiao() || t || n) && (o = encodeURIComponent(o));
          var i = e.target;
          if (!c && r > 0 && 200 > r) {
            var a = {};
            a.target = i, a.select_content = o, a.event_type = "xpath", a.page_url = U || decodeURIComponent(location.href), a.page_type = u, a.convert_id = I, _taq.push(a)
          }
        }, !0)
      },
      getInfoFromUrl: function() {
        var e = q.getWebUrlInfo();
        return e ? (N = d.SUCCESS, C = q.getAdId() || "", p = e.req_id || "", I = e.convert_id || "", E = e.cid || "", h = e.uid || "", S = e.ut || "", v = e.device_id || "", _ = e.log_extra || "", q.setToSessionStorage("umeng_ad_id", C), q.setToSessionStorage("umeng_req_id", p), q.setToSessionStorage("umeng_cid", E), q.setToSessionStorage("umeng_uid", h), q.setToSessionStorage("umeng_ut", S), q.setToSessionStorage("umeng_device_id", v), q.setToSessionStorage("umeng_log_extra", _), {
          ad_id: C,
          req_id: p,
          cid: E,
          user_id: h,
          device_id: v,
          log_extra: _
        }) : !1
      },
      initFromSessionStorage: function() {
        var e = q.getDefer(),
          t = q.getDefer();
        return "ad" === q.getFromSessionStorage("_tt_ad_info_success") ? (p = p || q.getFromSessionStorage("_tt_req_id"), E = E || q.getFromSessionStorage("_tt_cid"), I = I || q.getFromSessionStorage("_tt_convert_id"), _ = _ || q.getFromSessionStorage("_tt_log_extra"), A = d.UNUSE, F = d.SUCCESS, e.resolve({
          req_id: p,
          cid: E,
          convert_id: I,
          log_extra: _
        })) : (_taq.getFromTTBridge("adInfo", function(t) {
          var n;
          t = t || {}, "string" == typeof t && (t = JSON.parse(t)), E = t.cid || t.ad_id || "", n = JSON.parse(t.log_extra || "{}"), p = n.req_id || "", I = n.convert_id || "", _ = t.log_extra || "{}", q.setToSessionStorage("_tt_ad_info_success", "ad"), q.setToSessionStorage("_tt_cid", E), q.setToSessionStorage("_tt_req_id", p), q.setToSessionStorage("_tt_convert_id", I), q.setToSessionStorage("_tt_log_extra", _), e.resolve({
            req_id: p,
            cid: E,
            convert_id: I,
            log_extra: _
          })
        }), setTimeout(function() {
          e.reject({
            req_id: p,
            cid: E,
            convert_id: I,
            log_extra: _
          })
        }, 1e3)), "app" === q.getFromSessionStorage("_tt_app_info_success") ? (v = v || q.getFromSessionStorage("_tt_device_id"), m = m || q.getFromSessionStorage("_tt_user_id"), y = y || q.getFromSessionStorage("_tt_app_version"), w = w || q.getFromSessionStorage("_tt_version_code"), b = b || q.getFromSessionStorage("_tt_app_id"), P = d.UNUSE, t.resolve({
          device_id: v,
          user_id: m,
          app_version: y,
          version_code: w,
          app_id: b
        })) : (_taq.getFromTTBridge("appInfo", function(e) {
          e = e || {}, v = e.device_id || "", m = e.user_id || "", y = e.appVersion || "", w = e.versionCode || "", b = e.aid || "", T = e.netType || "", q.setToSessionStorage("_tt_app_info_success", "app"), q.setToSessionStorage("_tt_device_id", v), q.setToSessionStorage("_tt_user_id", m), q.setToSessionStorage("_tt_app_version", y), q.setToSessionStorage("_tt_version_code", w), q.setToSessionStorage("_tt_app_id", b), t.resolve({
            device_id: v,
            user_id: m,
            app_version: y,
            version_code: w,
            app_id: b
          })
        }), setTimeout(function() {
          t.reject({
            device_id: v,
            user_id: m,
            app_version: y,
            version_code: w,
            app_id: b
          })
        }, 1e3)), i = e.promise, a = t.promise, i.then(null, function() {}), a.then(null, function() {}), {
          adInfo: e.promise,
          appInfo: t.promise
        }
      },
      _sendTargetMsg: function(t) {
        var n = {};
        n.page_url = U || decodeURIComponent(e.location.href), n.page_type = u, n.event_type = t.getAttribute("tt-data-eventtype") || "", n.convert_id = t.getAttribute("tt-data-convertid") || "", n.event_value = t.getAttribute("tt-data-eventvalue") || "", n.target = t, n.options = t.getAttribute("tt-data-options") || "", _taq.push(n)
      }
    };
    e._taq.getCommonDataPromise = function() {
      var e = this._getPageInfo(),
        t = G.getInfoFromUrl();
      if (t) return q.combineData(e, t);
      if (q.isToutiao()) {
        var n = G.initFromSessionStorage();
        return q.combineData(e, n)
      }
      return q.combineData(e, {
        req_id: p,
        cid: E,
        user_id: h,
        device_id: v,
        log_extra: _
      })
    }, G.initMd5(), !G.getInfoFromUrl() && q.isToutiao() && G.initFromSessionStorage(), G.bindEvent()
  }

  function o(e, t) {
    var n = document.createElement("script");
    n.src = e, t = t || function() {}, n.onload = n.onreadystatechange = function() {
      this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (t(), this.onload = this.onreadystatechange = null, this.parentNode.removeChild(this))
    }, document.getElementsByTagName("head")[0].appendChild(n)
  }
  if (!e._taq) {
    var r = document.currentScript;
        e._taq = [], 
    o("https://s3.pstatp.com/inapp/toutiao.js", function() {
      if (n(), "undefined" == typeof window._page_type) {
        var e = ["ad.toutiao.com", "www.toutiaopage.com", "www.chengzijianzhan.com"].indexOf(location.hostname) > -1,
            t = location.search.indexOf("_toutiao_params") > -1;
        !e && t && ! function() {
          "use strict";
          ! function(e, t) {
            var n = e.seed = e.seed || [];
            if (n.start = +new Date, !n.initialize && !n.invoked) {
              n.invoked = !0, n.methods = ["track", "page", "on", "once"], n.factory = function(e) {
                return function() {
                  var t = Array.prototype.slice.call(arguments);
                  return t.unshift(e), n.push(t), n
                }
              };
              for (var o = 0; o < n.methods.length; o++) {
                var r = n.methods[o];
                n[r] = n.factory(r)
              }
              n.load = function() {
                var e = t.createElement("script");
                e.type = "text/javascript", e.async = !0, e.src = "//s3.pstatp.com/bytecom/resource/tetris/insight/v0.1-beta/analytics.js";
                var n = t.getElementsByTagName("script")[0];
                n.parentNode.insertBefore(e, n)
              }, n.SNIPPET_VERSION = "1.1.8", n.load()
            }
          }(window, document)
        }()
      }
    })
  }
}(window, document);