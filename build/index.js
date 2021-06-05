"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = require("path");
var method_override_1 = __importDefault(require("method-override"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var database_1 = __importDefault(require("./config/database"));
var router_1 = __importDefault(require("./router"));
var env_1 = require("./env");
var ROOT_DIR = process.cwd();
var PUBLIC_PATH = path_1.join(ROOT_DIR, 'public');
var VIEW_PATH = path_1.join(ROOT_DIR, 'views');
var app = express_1.default();
database_1.default();
app.set('view engine', 'pug');
app.set('views', VIEW_PATH);
app.use(cookie_parser_1.default(env_1.envConfig.get('COOKIE_SECRET')));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(method_override_1.default(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(express_1.default.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000
}));
app.use('/', router_1.default);
app.listen(env_1.envConfig.get('PORT'), function () {
    console.log("Server is listening on " + env_1.envConfig.get('PORT'));
});
