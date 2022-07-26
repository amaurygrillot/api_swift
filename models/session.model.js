"use strict";
exports.__esModule = true;
exports.Session = void 0;
var Session = /** @class */ (function () {
    function Session(session) {
        this.id = session.id;
        this.token = session.token;
        this.createdAt = new Date();
        this.updateAt = session.updateAt;
        this.userId = session.userId;
    }
    return Session;
}());
exports.Session = Session;
