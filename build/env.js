"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
require("dotenv/config");
var EnvConfig = /** @class */ (function () {
    function EnvConfig() {
        this.config = {};
    }
    EnvConfig.prototype.set = function (key, value, defaultVal) {
        if (defaultVal) {
            this.config[key] = value || defaultVal;
        }
        else {
            this.config[key] = value;
        }
    };
    EnvConfig.prototype.get = function (key) {
        if (!this.config[key]) {
            throw new Error("Can not get key " + key + " from environment");
        }
        return this.config[key];
    };
    return EnvConfig;
}());
var envConfig = new EnvConfig();
exports.envConfig = envConfig;
envConfig.set('PORT', process.env.PORT, 3000);
envConfig.set('DB_CONNECTION', process.env.DB_CONNECTION);
envConfig.set('COOKIE_SECRET', process.env.COOKIE_SECRET);
