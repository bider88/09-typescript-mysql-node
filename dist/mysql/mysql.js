"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.connected = false;
        console.log('Clase inicializada');
        this.connection = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.connectDB();
    }
    Object.defineProperty(MySQL, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    MySQL.execQuery = function (query, callback) {
        this.instance.connection.query(query, function (err, results, fields) {
            if (err) {
                console.log('Error ', err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('Zero result');
            }
            else {
                callback(null, results);
            }
        });
    };
    MySQL.prototype.connectDB = function () {
        this.connection.connect(function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
        });
        this.connected = true;
        console.log('BD online');
    };
    return MySQL;
}());
exports.default = MySQL;
