'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reducer = exports.authorizedFn = exports.saga = exports.refreshTokens = exports.setTokens = exports.logout = exports.stopLogin = exports.login = exports.configure = exports.isLoggingIn = exports.loginErrors = exports.isLoggedIn = exports.authUser = exports.SET_AUTH_TOKENS = exports.AUTH_LOGOUT = exports.AUTH_LOGIN_FAILURE = exports.AUTH_LOGIN_SUCCESS = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = console;

var AUTH_LOGIN = 'AUTH_LOGIN';
var AUTH_LOGIN_SUCCESS = exports.AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
var AUTH_LOGIN_FAILURE = exports.AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';

var AUTH_LOGOUT = exports.AUTH_LOGOUT = 'AUTH_LOGOUT';

var SET_AUTH_TOKENS = exports.SET_AUTH_TOKENS = 'SET_AUTH_TOKENS';

var AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN';
var AUTH_REFRESH_TOKEN_SUCCESS = 'AUTH_REFRESH_TOKEN_SUCCESS';
var AUTH_REFRESH_TOKEN_FAILURE = 'AUTH_REFRESH_TOKEN_FAILURE';
var PROCESS_TOKEN_REFRESH = 'PROCESS_TOKEN_REFRESH';

var reducerName = 'auth';

var authTokens = function authTokens(state) {
    return state[reducerName].tokens;
};
var isRefreshing = function isRefreshing(state) {
    return state[reducerName].isRefreshing;
};
var authUser = exports.authUser = function authUser(state) {
    return state[reducerName].user;
};
var isLoggedIn = exports.isLoggedIn = function isLoggedIn(state) {
    return state[reducerName].isLoggedIn;
};
var loginErrors = exports.loginErrors = function loginErrors(state) {
    return state[reducerName].loginError;
};
var isLoggingIn = exports.isLoggingIn = function isLoggingIn(state) {
    return state[reducerName].isLoggingIn;
};

var remoteLogin = null;
var remoteRefreshTokens = null;
var detectShouldRefresh = null;

var configure = exports.configure = function configure(config) {
    var authenticate = config.authenticate,
        refreshTokens = config.refreshTokens,
        shouldRefresh = config.shouldRefresh;


    if (typeof authenticate !== 'function') {
        remoteLogin = function remoteLogin(credentials) {
            logger.error('Cannot authenticate use with ' + credentials + ': Supply authenticate function first.');
            return {
                user: null,
                tokens: {}
            };
        };
    } else {
        remoteLogin = authenticate;
    }

    if (typeof refreshTokens !== 'function') {
        remoteRefreshTokens = function remoteRefreshTokens(tokens) {
            logger.error('Cannot refresh tokens. No refresh tokens fn supplied.');
            return tokens;
        };
    } else {
        remoteRefreshTokens = refreshTokens;
    }

    if (typeof shouldRefresh !== 'function') {
        detectShouldRefresh = function detectShouldRefresh(error, response) {
            return !!error;
        };
    } else {
        remoteRefreshTokens = refreshTokens;
    }
};

// -----------------------------------------------------------------------------

var login = exports.login = function login(credentials) {
    return {
        type: AUTH_LOGIN,
        credentials: credentials
    };
};

var stopLogin = exports.stopLogin = function stopLogin(error, user) {
    if (error) {
        return {
            type: AUTH_LOGIN_FAILURE,
            error: error
        };
    }
    return {
        type: AUTH_LOGIN_SUCCESS,
        user: user
    };
};

var logout = exports.logout = function logout() {
    return {
        type: AUTH_LOGOUT
    };
};

var setTokens = exports.setTokens = function setTokens(tokens) {
    return {
        type: SET_AUTH_TOKENS,
        tokens: tokens
    };
};

var refreshTokens = exports.refreshTokens = function refreshTokens() {
    return {
        type: PROCESS_TOKEN_REFRESH
    };
};

var startTokenRefresh = function startTokenRefresh(refreshToken) {
    return {
        type: AUTH_REFRESH_TOKEN,
        refreshToken: refreshToken
    };
};

var stopTokenRefresh = function stopTokenRefresh(error) {
    var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (error) {
        return {
            type: AUTH_REFRESH_TOKEN_FAILURE,
            error: error
        };
    }
    return {
        type: AUTH_REFRESH_TOKEN_SUCCESS,
        tokens: tokens
    };
};

var processTokenRefresh = /*#__PURE__*/_regenerator2.default.mark(function processTokenRefresh() {
    var tokens, refreshedTokens;
    return _regenerator2.default.wrap(function processTokenRefresh$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _effects.select)(authTokens);

                case 2:
                    tokens = _context.sent;
                    _context.next = 5;
                    return (0, _effects.put)(startTokenRefresh(tokens));

                case 5:
                    _context.prev = 5;
                    _context.next = 8;
                    return remoteRefreshTokens(tokens);

                case 8:
                    refreshedTokens = _context.sent;
                    _context.next = 11;
                    return (0, _effects.put)(stopTokenRefresh(null, refreshedTokens));

                case 11:
                    _context.next = 13;
                    return (0, _effects.put)(setTokens(refreshedTokens));

                case 13:
                    _context.next = 21;
                    break;

                case 15:
                    _context.prev = 15;
                    _context.t0 = _context['catch'](5);
                    _context.next = 19;
                    return (0, _effects.put)(stopTokenRefresh(_context.t0));

                case 19:
                    _context.next = 21;
                    return (0, _effects.put)(logout());

                case 21:
                case 'end':
                    return _context.stop();
            }
        }
    }, processTokenRefresh, this, [[5, 15]]);
});

var saga = /*#__PURE__*/exports.saga = _regenerator2.default.mark(function saga() {
    var handleLogin;
    return _regenerator2.default.wrap(function saga$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    handleLogin = /*#__PURE__*/_regenerator2.default.mark(function handleLogin(action) {
                        var _ref, user, tokens;

                        return _regenerator2.default.wrap(function handleLogin$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        _context2.prev = 0;
                                        _context2.next = 3;
                                        return (0, _effects.call)(function () {
                                            return remoteLogin(action.credentials);
                                        });

                                    case 3:
                                        _ref = _context2.sent;
                                        user = _ref.user;
                                        tokens = _ref.tokens;
                                        _context2.next = 8;
                                        return (0, _effects.put)(stopLogin(null, user));

                                    case 8:
                                        _context2.next = 10;
                                        return (0, _effects.put)(setTokens(tokens));

                                    case 10:
                                        _context2.next = 17;
                                        break;

                                    case 12:
                                        _context2.prev = 12;
                                        _context2.t0 = _context2['catch'](0);
                                        _context2.next = 16;
                                        return (0, _effects.put)(stopLogin(_context2.t0));

                                    case 16:
                                        logger.error('Failed to login user: ' + _context2.t0.message);

                                    case 17:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, handleLogin, this, [[0, 12]]);
                    });
                    _context3.t0 = _effects.all;
                    _context3.next = 4;
                    return (0, _effects.takeEvery)(AUTH_LOGIN, handleLogin);

                case 4:
                    _context3.t1 = _context3.sent;
                    _context3.next = 7;
                    return (0, _effects.takeEvery)(PROCESS_TOKEN_REFRESH, processTokenRefresh);

                case 7:
                    _context3.t2 = _context3.sent;
                    _context3.t3 = [_context3.t1, _context3.t2];
                    _context3.next = 11;
                    return (0, _context3.t0)(_context3.t3);

                case 11:
                case 'end':
                    return _context3.stop();
            }
        }
    }, saga, this);
});

var authorizedFn = /*#__PURE__*/exports.authorizedFn = _regenerator2.default.mark(function authorizedFn(fn) {
    var processFn, result;
    return _regenerator2.default.wrap(function authorizedFn$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    processFn = /*#__PURE__*/_regenerator2.default.mark(function processFn() {
                        var tokens, user;
                        return _regenerator2.default.wrap(function processFn$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        _context4.next = 2;
                                        return (0, _effects.select)(authTokens);

                                    case 2:
                                        tokens = _context4.sent;
                                        _context4.next = 5;
                                        return (0, _effects.select)(authUser);

                                    case 5:
                                        user = _context4.sent;
                                        _context4.next = 8;
                                        return (0, _effects.call)(function () {
                                            return fn((0, _extends3.default)({}, tokens, {
                                                user: user
                                            }));
                                        });

                                    case 8:
                                        return _context4.abrupt('return', _context4.sent);

                                    case 9:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, processFn, this);
                    });

                    // If token refreshing is being processed, wait for it to finish

                    _context5.next = 3;
                    return (0, _effects.select)(isRefreshing);

                case 3:
                    if (!_context5.sent) {
                        _context5.next = 6;
                        break;
                    }

                    _context5.next = 6;
                    return (0, _effects.take)([AUTH_REFRESH_TOKEN_FAILURE, AUTH_REFRESH_TOKEN_SUCCESS]);

                case 6:
                    _context5.prev = 6;
                    _context5.next = 9;
                    return processFn();

                case 9:
                    result = _context5.sent;

                    if (!detectShouldRefresh(null, result)) {
                        _context5.next = 19;
                        break;
                    }

                    _context5.next = 13;
                    return processTokenRefresh();

                case 13:
                    _context5.next = 15;
                    return (0, _effects.select)(isLoggedIn);

                case 15:
                    if (!_context5.sent) {
                        _context5.next = 19;
                        break;
                    }

                    _context5.next = 18;
                    return processFn();

                case 18:
                    return _context5.abrupt('return', _context5.sent);

                case 19:
                    return _context5.abrupt('return', result);

                case 22:
                    _context5.prev = 22;
                    _context5.t0 = _context5['catch'](6);

                    if (!detectShouldRefresh(_context5.t0, null)) {
                        _context5.next = 33;
                        break;
                    }

                    _context5.next = 27;
                    return processTokenRefresh();

                case 27:
                    _context5.next = 29;
                    return (0, _effects.select)(isLoggedIn);

                case 29:
                    if (!_context5.sent) {
                        _context5.next = 33;
                        break;
                    }

                    _context5.next = 32;
                    return processFn();

                case 32:
                    return _context5.abrupt('return', _context5.sent);

                case 33:
                    throw _context5.t0;

                case 34:
                case 'end':
                    return _context5.stop();
            }
        }
    }, authorizedFn, this, [[6, 22]]);
});

var initialState = {
    user: null,
    isLoggedIn: false,
    isLoggingIn: false,
    loginError: null,
    tokens: {},
    isRefreshing: false
};

var reducer = exports.reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case AUTH_LOGIN:
            return (0, _extends3.default)({}, state, {
                isLoggedIn: false,
                isLoggingIn: true,
                loginError: null
            });
        case AUTH_LOGIN_SUCCESS:
            return (0, _extends3.default)({}, state, {
                isLoggedIn: true,
                isLoggingIn: false,
                user: action.user,
                loginError: null
            });
        case AUTH_LOGIN_FAILURE:
            return (0, _extends3.default)({}, state, {
                isLoggedIn: false,
                isLoggingIn: false,
                user: null,
                loginError: action.error
            });
        case SET_AUTH_TOKENS:
            return (0, _extends3.default)({}, state, {
                tokens: (0, _extends3.default)({}, state.tokens, action.tokens)
            });
        case AUTH_LOGOUT:
            return (0, _extends3.default)({}, state, {
                isLoggedIn: false,
                user: null,
                tokens: {}
            });
        case AUTH_REFRESH_TOKEN:
            {
                return (0, _extends3.default)({}, state, {
                    isRefreshing: true
                });
            }
        case AUTH_REFRESH_TOKEN_SUCCESS:
            {
                return (0, _extends3.default)({}, state, {
                    isRefreshing: false,
                    tokens: (0, _extends3.default)({}, state.tokens, action.tokens)
                });
            }
        case AUTH_REFRESH_TOKEN_FAILURE:
            {
                return (0, _extends3.default)({}, state, {
                    isRefreshing: false
                });
            }
        default:
            return state;
    }
};