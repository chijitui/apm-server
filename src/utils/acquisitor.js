const acquisitor = function (_id, url) {
  return `
    (function () {
      try {
        var niubilityAcquisitorApi = '${url}';
        var _acid = '${_id}';
        changeRequest(niubilityAcquisitorApi);
        if (window.addEventListener) {
          window.addEventListener('error', eventFn, true);
          window.addEventListener('load', function () {
            getBaseInfo(niubilityAcquisitorApi);
          });
        } else if (window.attachEvent) {
          window.attachEvent('error', eventFn);
          window.attachEvent('onload', function () {
            getBaseInfo(niubilityAcquisitorApi);
          });
        }

        function changeRequest(url) {
          try {
            if (!window.XMLHttpRequest) return;
            var _oldSend = window.XMLHttpRequest.prototype.send;
            window.XMLHttpRequest.prototype.send = function () {
              var params = arguments[0];
              var _oldStateChange = this.onreadystatechange;
              this.onreadystatechange = function () {
                if (this.readyState === 4 && this.status !== 200 && this.responseURL !== niubilityAcquisitorApi) {
                  var data = {
                    status: this.status,
                    statusText: this.statusText,
                    responseURL: this.responseURL,
                    response: this.response,
                    params: params,
                    date: +new Date(),
                    _acid: _acid
                  };
                  if (this.__raven_xhr && this.__raven_xhr.method) {
                    data.method = this.__raven_xhr.method.toUpperCase();
                  }
                  postSource(url, data);
                }
                _oldStateChange && _oldStateChange.apply(this, arguments);
              }
              return _oldSend.apply(this, arguments);
            }
          } catch (err) {
            console.log(err);
          }
        }

        function postSource(url, data) {
          var xhr = new XMLHttpRequest();
          xhr.open('post', url);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange = function () {
            console.log('欢迎使用 VIPKID 产品！');
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log('VIPKID 长期招聘前端工程师，欢迎来撩！');
            }
          }
          xhr.send(JSON.stringify(data));
        };

        function eventFn(event) {
          try {
            if (event.target && event.target.baseURI) {
              var data = {
                ua: window.window.navigator.userAgent,
                baseURI: event.target.baseURI,
                tag: event.target.localName,
                type: event.target.type,
                source: event.target.src || event.target.href,
                date: +new Date(),
                _acid: _acid
              };
              postSource(niubilityAcquisitorApi, data);
            }
          } catch (err) {
            console.log(err);
          }
        }

        function getBaseInfo(url) {
          try {
            var performance = window.performance || window.msPerformance || window.webkitPerformance;
            if (performance) {
              var timing = performance.timing;
              var timeOrigin = performance.timeOrigin ? performance.timeOrigin : performance.timing.fetchStart - 10;

              if (timing.loadEventEnd <= 0) {
                setTimeout(function(){
                  getBaseInfo(url);
                }, 1000);
                return;
              }
              var base = {
                url: window.location.href,
                ua: window.navigator.userAgent,

                //【重要】页面加载完成的时间
                loadPage: getTimePoint(timeOrigin, timing.navigationStart, timing.loadEventEnd),

                //【重要】解析 DOM 树结构的时间
                domReady: getTimePoint(timeOrigin, timing.responseEnd, timing.domComplete),

                //【重要】重定向的时间
                redirect: getTimePoint(timeOrigin, timing.redirectStart, timing.redirectEnd),

                //【重要】DNS 查询时间 
                lookupDomain: getTimePoint(timeOrigin, timing.domainLookupStart, timing.domainLookupEnd),

                //【重要】读取页面第一个字节的时间
                ttfb: getTimePoint(timeOrigin, timing.navigationStart, timing.responseStart),

                //【重要】内容加载完成的时间
                request: getTimePoint(timeOrigin, timing.requestStart, timing.responseEnd),

                //【重要】执行 onload 回调函数的时间
                loadEvent: getTimePoint(timeOrigin, timing.loadEventStart, timing.loadEventEnd),

                // DNS 缓存时间
                appcache: getTimePoint(timeOrigin, timing.fetchStart, timing.domainLookupStart),

                // 卸载页面的时间
                unloadEvent: getTimePoint(timeOrigin, timing.unloadEventStart, timing.unloadEventEnd),

                // TCP 建立连接完成握手的时间
                connect: getTimePoint(timeOrigin, timing.connectStart, timing.connectEnd),
              };

              postSource(url, {
                isCompatibled: true,
                date: +new Date(),
                base: base,
                _acid: _acid
              });
            } else {
              postSource(url, {
                isCompatibled: false,
                date: +new Date(),
                base: {
                  url: window.location.href,
                  ua: window.navigator.userAgent
                },
                _acid: _acid
              });
            }
          } catch (error) {
            console.log(error);
          }
        }

        function getTimePoint(base, start, end) {
          return {
            start: timeFormat(start - base),
            end: timeFormat(end - base)
          };
        }

        function timeFormat(time) {
          return time > 0 ? parseInt(time) : 0;
        }
      } catch (err) {
        console.log(err);
      }
    })();
  `
}

module.exports = acquisitor;