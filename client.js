(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('babel-runtime/core-js/json/stringify'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/typeof'), require('babel-runtime/regenerator'), require('babel-runtime/core-js/promise'), require('babel-runtime/core-js/object/keys'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('isomorphic-fetch')) :
  typeof define === 'function' && define.amd ? define(['exports', 'babel-runtime/core-js/json/stringify', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/typeof', 'babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/core-js/object/keys', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'isomorphic-fetch'], factory) :
  (factory((global['next-auth-client'] = {}),null,null,null,null,null,null,null,null,null,null));
}(this, (function (exports,_JSON$stringify,_Object$assign,_typeof,_regeneratorRuntime,_Promise,_Object$keys,_asyncToGenerator,_classCallCheck,_createClass,fetch) { 'use strict';

  _JSON$stringify = _JSON$stringify && _JSON$stringify.hasOwnProperty('default') ? _JSON$stringify['default'] : _JSON$stringify;
  _Object$assign = _Object$assign && _Object$assign.hasOwnProperty('default') ? _Object$assign['default'] : _Object$assign;
  _typeof = _typeof && _typeof.hasOwnProperty('default') ? _typeof['default'] : _typeof;
  _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _Promise = _Promise && _Promise.hasOwnProperty('default') ? _Promise['default'] : _Promise;
  _Object$keys = _Object$keys && _Object$keys.hasOwnProperty('default') ? _Object$keys['default'] : _Object$keys;
  _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
  _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
  _createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
  fetch = fetch && fetch.hasOwnProperty('default') ? fetch['default'] : fetch;

  var _class = function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
      key: 'init',

      /**
       * This is an async, isometric method which returns a session object -
       * either by looking up the current express session object when run on the
       * server, or by using fetch (and optionally caching the result in local
       * storage) when run on the client.
       *
       * Note that actual session tokens are not stored in local storage, they are
       * kept in an HTTP Only cookie as protection against session hi-jacking by
       * malicious JavaScript.
       **/
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var _this = this;

          var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref2$req = _ref2.req,
              req = _ref2$req === undefined ? null : _ref2$req,
              _ref2$force = _ref2.force,
              force = _ref2$force === undefined ? false : _ref2$force,
              _ref2$pathPrefix = _ref2.pathPrefix,
              pathPrefix = _ref2$pathPrefix === undefined ? '/auth' : _ref2$pathPrefix;

          var session;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  session = {};

                  if (req) {
                    if (req.session) {
                      // If running on the server session data should be in the req object
                      session.csrfToken = req.connection._httpMessage.locals._csrf;
                      session.expires = req.session.cookie._expires;
                      // If the user is logged in, add the user to the session object
                      if (req.user) {
                        session.user = req.user;
                      }
                    }
                  } else {
                    // If running in the browser attempt to load session from sessionStore
                    if (force === true) {
                      // If force update is set, reset data store
                      this._removeLocalStore('session');
                    } else {
                      session = this._getLocalStore('session');
                    }
                  }

                  // If session data exists, has not expired AND force is not set then
                  // return the stored session we already have.

                  if (!(session && _Object$keys(session).length > 0 && session.expires && session.expires > Date.now())) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt('return', new _Promise(function (resolve) {
                    resolve(session);
                  }));

                case 6:
                  if (!(typeof window === 'undefined')) {
                    _context.next = 8;
                    break;
                  }

                  return _context.abrupt('return', new _Promise(function (resolve) {
                    resolve({});
                  }));

                case 8:
                  return _context.abrupt('return', fetch(pathPrefix + '/session', {
                    credentials: 'same-origin'
                  }).then(function (response) {
                    if (response.ok) {
                      return response;
                    } else {
                      return _Promise.reject(Error('HTTP error when trying to get session'));
                    }
                  }).then(function (response) {
                    return response.json();
                  }).then(function (data) {
                    // Update session with session info
                    session = data;

                    // Set a value we will use to check this client should silently
                    // revalidate, using the value for revalidateAge returned by the server.
                    session.expires = Date.now() + session.revalidateAge;

                    // Save changes to session
                    _this._saveLocalStore('session', session);

                    return session;
                  }).catch(function () {
                    return Error('Unable to get session');
                  }));

                case 9:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function init() {
          return _ref.apply(this, arguments);
        }

        return init;
      }()

      /**
       * A simple static method to get the CSRF Token is provided for convenience
       **/

    }, {
      key: 'csrfToken',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
          var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref4$pathPrefix = _ref4.pathPrefix,
              pathPrefix = _ref4$pathPrefix === undefined ? '/auth' : _ref4$pathPrefix;

          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', fetch(pathPrefix + '/csrf', {
                    credentials: 'same-origin'
                  }).then(function (response) {
                    if (response.ok) {
                      return response;
                    } else {
                      return _Promise.reject(Error('Unexpected response when trying to get CSRF token'));
                    }
                  }).then(function (response) {
                    return response.json();
                  }).then(function (data) {
                    return data.csrfToken;
                  }).catch(function () {
                    return Error('Unable to get CSRF token');
                  }));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function csrfToken() {
          return _ref3.apply(this, arguments);
        }

        return csrfToken;
      }()

      /**
       * A static method to get list of currently linked oAuth accounts
       **/

    }, {
      key: 'linked',
      value: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
          var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref6$req = _ref6.req,
              req = _ref6$req === undefined ? null : _ref6$req,
              _ref6$pathPrefix = _ref6.pathPrefix,
              pathPrefix = _ref6$pathPrefix === undefined ? '/auth' : _ref6$pathPrefix;

          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!req) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt('return', req.linked());

                case 2:
                  return _context3.abrupt('return', fetch(pathPrefix + '/linked', {
                    credentials: 'same-origin'
                  }).then(function (response) {
                    if (response.ok) {
                      return response;
                    } else {
                      return _Promise.reject(Error('Unexpected response when trying to get linked accounts'));
                    }
                  }).then(function (response) {
                    return response.json();
                  }).then(function (data) {
                    return data;
                  }).catch(function () {
                    return Error('Unable to get linked accounts');
                  }));

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function linked() {
          return _ref5.apply(this, arguments);
        }

        return linked;
      }()

      /**
       * A static method to get list of currently configured oAuth providers
       **/

    }, {
      key: 'providers',
      value: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
          var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref8$req = _ref8.req,
              req = _ref8$req === undefined ? null : _ref8$req,
              _ref8$pathPrefix = _ref8.pathPrefix,
              pathPrefix = _ref8$pathPrefix === undefined ? '/auth' : _ref8$pathPrefix;

          return _regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!req) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt('return', req.providers());

                case 2:
                  return _context4.abrupt('return', fetch(pathPrefix + '/providers', {
                    credentials: 'same-origin'
                  }).then(function (response) {
                    if (response.ok) {
                      return response;
                    } else {
                      console.log("NextAuth Error Fetching Providers");
                      return null;
                    }
                  }).then(function (response) {
                    return response.json();
                  }).then(function (data) {
                    return data;
                  }).catch(function (e) {
                    console.log("NextAuth Error Loading Providers");
                    console.log(e);
                    return null;
                  }));

                case 3:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function providers() {
          return _ref7.apply(this, arguments);
        }

        return providers;
      }()

      /*
       * Sign in
       *
       * Will post a form to /auth/signin auth route if an object is passed.
       * If the details are valid a session will be created and you should redirect
       * to your callback page so the session is loaded in the client.
       *
       * If just a string containing an email address is specififed will generate a
       * a one-time use sign in link and send it via email; you should redirect to a
       * page telling the user to check their inbox for an email with the link.
       */

    }, {
      key: 'signin',
      value: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(params) {
          var _this2 = this;

          var formData, pathPrefix, route, encodedForm;
          return _regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  // Params can be just string (an email address) or an object (form fields)
                  formData = {};
                  pathPrefix = '/auth';


                  if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                    formData = _Object$assign({}, params);
                    if (params.pathPrefix) {
                      pathPrefix = params.pathPrefix;
                      delete formData.pathPrefix;
                    }
                  } else {
                    formData.email = params;
                  }

                  // Use either the email token generation route or the custom form auth route
                  route = typeof params === 'string' ? pathPrefix + '/email/signin' : pathPrefix + '/signin';

                  // Add latest CSRF Token to request

                  _context6.next = 6;
                  return this.csrfToken({ pathPrefix: pathPrefix });

                case 6:
                  formData._csrf = _context6.sent;


                  // Encoded form parser for sending data in the body
                  encodedForm = _Object$keys(formData).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
                  }).join('&');
                  return _context6.abrupt('return', fetch(route, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'X-Requested-With': 'XMLHttpRequest' // So Express can detect AJAX post
                    },
                    body: encodedForm,
                    credentials: 'same-origin'
                  }).then(function () {
                    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(response) {
                      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!response.ok) {
                                _context5.next = 6;
                                break;
                              }

                              _context5.next = 3;
                              return response.json();

                            case 3:
                              return _context5.abrupt('return', _context5.sent);

                            case 6:
                              throw new Error('HTTP error while attempting to sign in');

                            case 7:
                            case 'end':
                              return _context5.stop();
                          }
                        }
                      }, _callee5, _this2);
                    }));

                    return function (_x6) {
                      return _ref10.apply(this, arguments);
                    };
                  }()).then(function (data) {
                    if (data.success && data.success === true) {
                      return _Promise.resolve(true);
                    } else {
                      return _Promise.resolve(false);
                    }
                  }));

                case 9:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function signin(_x5) {
          return _ref9.apply(this, arguments);
        }

        return signin;
      }()
    }, {
      key: 'signout',
      value: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
          var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref12$pathPrefix = _ref12.pathPrefix,
              pathPrefix = _ref12$pathPrefix === undefined ? '/auth' : _ref12$pathPrefix;

          var csrfToken, formData, encodedForm;
          return _regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.csrfToken({ pathPrefix: pathPrefix });

                case 2:
                  csrfToken = _context7.sent;
                  formData = { _csrf: csrfToken

                    // Encoded form parser for sending data in the body
                  };
                  encodedForm = _Object$keys(formData).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
                  }).join('&');

                  // Remove cached session data

                  this._removeLocalStore('session');

                  return _context7.abrupt('return', fetch(pathPrefix + '/signout', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: encodedForm,
                    credentials: 'same-origin',
                    mode: 'no-cors' // Needed for openid request to prevent cors on redirect response
                  }).then(function () {
                    return true;
                  }).catch(function () {
                    return Error('Unable to sign out');
                  }));

                case 7:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function signout() {
          return _ref11.apply(this, arguments);
        }

        return signout;
      }()

      // The Web Storage API is widely supported, but not always available (e.g.
      // it can be restricted in private browsing mode, triggering an exception).
      // We handle that silently by just returning null here.

    }, {
      key: '_getLocalStore',
      value: function _getLocalStore(name) {
        try {
          return JSON.parse(localStorage.getItem(name));
        } catch (err) {
          return null;
        }
      }
    }, {
      key: '_saveLocalStore',
      value: function _saveLocalStore(name, data) {
        try {
          localStorage.setItem(name, _JSON$stringify(data));
          return true;
        } catch (err) {
          return false;
        }
      }
    }, {
      key: '_removeLocalStore',
      value: function _removeLocalStore(name) {
        try {
          localStorage.removeItem(name);
          return true;
        } catch (err) {
          return false;
        }
      }
    }]);

    return _class;
  }();

  if (!global._babelPolyfill) {
    require("babel-polyfill");
  }

  exports.NextAuth = _class;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
