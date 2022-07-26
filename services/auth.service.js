"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var user_repository_1 = require("../repositories/user.repository");
var session_repository_1 = require("../repositories/session.repository");
var bcrypt = require("bcrypt");
var crypto = require("crypto");
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.saltRounds = 15;
        this.userRepository = new user_repository_1.UserRepository();
        this.sessionRepository = new session_repository_1.SessionRepository();
    }
    AuthService.prototype.getAllInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, user_repository_1.UserRepository.getInstance()];
                    case 1:
                        _a.userRepository = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getUser = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isSamePassword, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.getAllInstance();
                        return [4 /*yield*/, this.userRepository.getOne(login)];
                    case 1:
                        user = _a.sent();
                        if (user === null) {
                            try {
                                throw new Error('Utilisateur non trouvé.');
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                        if (user != undefined) {
                            isSamePassword = bcrypt.compare(bcrypt.hashSync(password, this.saltRounds), user.password);
                            if (!isSamePassword) {
                                try {
                                    throw new Error('Mot de passe incorrect.');
                                }
                                catch (e) {
                                    return [2 /*return*/, null];
                                }
                            }
                        }
                        token = crypto.randomBytes(20).toString('hex');
                        if (user != undefined) {
                            return [2 /*return*/, this.sessionRepository.insert({ token: token, userId: user.id })];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AuthService.prototype.deleteSession = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, session;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, session_repository_1.SessionRepository.getInstance()];
                    case 1:
                        _a.sessionRepository = _b.sent();
                        return [4 /*yield*/, this.sessionRepository.getOne(token)];
                    case 2:
                        session = _b.sent();
                        if (session === null) {
                            try {
                                throw new Error('Vous n\'êtes pas connecté.');
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                        return [2 /*return*/, this.sessionRepository["delete"](token)];
                }
            });
        });
    };
    AuthService.prototype.getSessionByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionRepository.getOne(token)];
                    case 1:
                        session = _a.sent();
                        return [2 /*return*/, session];
                }
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
