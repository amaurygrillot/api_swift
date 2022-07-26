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
exports.UserRepository = void 0;
var database_1 = require("../config/database");
var user_model_1 = require("../models/user.model");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        this.table = "user";
    }
    UserRepository.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (UserRepository._instance === undefined) {
                    UserRepository._instance = new UserRepository();
                }
                return [2 /*return*/, UserRepository._instance];
            });
        });
    };
    UserRepository.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res, data, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = UserRepository;
                        return [4 /*yield*/, database_1.DatabaseUtils.getConnection()];
                    case 1:
                        _a._connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        if (!UserRepository._connection) return [3 /*break*/, 4];
                        return [4 /*yield*/, UserRepository._connection.query("SELECT * FROM ".concat(this.table))];
                    case 3:
                        res = _b.sent();
                        if (res[0] === undefined || res[0] === []) {
                            return [2 /*return*/, null];
                        }
                        data = res[0];
                        if (Array.isArray(data)) {
                            return [2 /*return*/, data.map(function (row) {
                                    return new user_model_1.User({
                                        id: "" + row["id"],
                                        mail: row["mail"],
                                        login: row["login"],
                                        password: row["password"],
                                        updateAt: row["updateAt"],
                                        createdAt: row["createdAt"]
                                    });
                                })];
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    UserRepository.prototype.getOne = function (login, mail, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res, data, rows, row, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = UserRepository;
                        return [4 /*yield*/, database_1.DatabaseUtils.getConnection()];
                    case 1:
                        _a._connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        if (!UserRepository._connection) return [3 /*break*/, 4];
                        return [4 /*yield*/, UserRepository._connection.query("SELECT * FROM ".concat(this.table, "\n                WHERE login = \"").concat(login, "\" OR mail = \"").concat(mail, "\" OR id = \"").concat(id, "\""))];
                    case 3:
                        res = _b.sent();
                        data = res[0];
                        if (Array.isArray(data)) {
                            rows = data;
                            if (rows.length > 0) {
                                row = rows[0];
                                if (row === undefined) {
                                    return [2 /*return*/, null];
                                }
                                return [2 /*return*/, new user_model_1.User({
                                        id: "" + row["id"],
                                        mail: row["mail"],
                                        login: row["login"],
                                        password: row["password"],
                                        updateAt: row["updateAt"],
                                        createdAt: row["createdAt"]
                                    })];
                            }
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        console.error(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    UserRepository.prototype.insert = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = UserRepository;
                        return [4 /*yield*/, database_1.DatabaseUtils.getConnection()];
                    case 1:
                        _a._connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        if (!UserRepository._connection) return [3 /*break*/, 4];
                        return [4 /*yield*/, UserRepository._connection.execute("INSERT INTO ".concat(this.table, " \n                    (id, mail, login, password, updateAt, createdAt) \n                    VALUES (?, ?, ?, ?, ?, ?)"), [
                                user.id,
                                user.mail,
                                user.login,
                                user.password,
                                user.updateAt,
                                user.createdAt
                            ])];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, user];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _b.sent();
                        console.error(err_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    UserRepository.prototype.update = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = UserRepository;
                        return [4 /*yield*/, database_1.DatabaseUtils.getConnection()];
                    case 1:
                        _a._connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        if (!UserRepository._connection) return [3 /*break*/, 4];
                        user.updateAt = new Date();
                        return [4 /*yield*/, UserRepository._connection.execute("UPDATE ".concat(this.table, " \n                SET mail=?, login=?, password=?, updateAt=?   \n                WHERE id = \"").concat(id, "\""), [
                                user.mail,
                                user.login,
                                user.password,
                                user.updateAt
                            ])];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, new user_model_1.User(user)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_4 = _b.sent();
                        console.error(err_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    UserRepository.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = UserRepository;
                        return [4 /*yield*/, database_1.DatabaseUtils.getConnection()];
                    case 1:
                        _a._connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        if (!UserRepository._connection) return [3 /*break*/, 4];
                        return [4 /*yield*/, UserRepository._connection.query("DELETE FROM ".concat(this.table, " WHERE id = \"").concat(id, "\""))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, id];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_5 = _b.sent();
                        console.error(err_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
