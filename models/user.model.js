"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(user) {
        this.id = user.id;
        this.mail = user.mail;
        this.login = user.login;
        this.password = user.password;
        this.updateAt = user.updateAt;
        this.createdAt = user.createdAt;
    }
    return User;
}());
exports.User = User;
