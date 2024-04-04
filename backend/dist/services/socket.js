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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const ioredis_1 = __importDefault(require("ioredis"));
const pub = new ioredis_1.default({
    host: 'redis-35d7addb-binitlenka-9e1b.a.aivencloud.com',
    port: 23380,
    password: 'AVNS_Xt3UPlwC2u3o12L-1E0',
    username: 'default'
});
const sub = new ioredis_1.default({
    host: 'redis-35d7addb-binitlenka-9e1b.a.aivencloud.com',
    port: 23380,
    password: 'AVNS_Xt3UPlwC2u3o12L-1E0',
    username: 'default'
});
class SocketService {
    constructor() {
        console.log("Init SocketService");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        });
        sub.subscribe('MESSAGES');
    }
    initListener() {
        const io = this._io;
        console.log("Init Socket Listener");
        io.on("connect", (socket) => {
            console.log("New Socket connected", socket.id);
            socket.on('event:message', (_a) => __awaiter(this, [_a], void 0, function* ({ message }) {
                console.log("Received message", message);
                yield pub.publish('MESSAGES', JSON.stringify({ message }));
            }));
        });
        sub.on('message', (channel, message) => {
            if (channel === 'MESSAGES') {
                io.emit('message', message);
            }
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
