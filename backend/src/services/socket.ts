import { Server } from "socket.io";
import Redis from "ioredis"

const pub = new Redis({
    host: 'redis-35d7addb-binitlenka-9e1b.a.aivencloud.com',
    port: 23380,
    password: 'AVNS_Xt3UPlwC2u3o12L-1E0',
    username: 'default'
});

const sub = new Redis({
    host: 'redis-35d7addb-binitlenka-9e1b.a.aivencloud.com',
    port: 23380,
    password: 'AVNS_Xt3UPlwC2u3o12L-1E0',
    username: 'default'
})

class SocketService {
    private _io : Server;
    constructor() {
        console.log("Init SocketService");
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        });
        sub.subscribe('MESSAGES')
    }

    public initListener() {
        const io = this._io;
        console.log("Init Socket Listener");
        io.on("connect", (socket) => {
            console.log("New Socket connected", socket.id);

            socket.on('event:message', async ({message}: {message: string}) => {
                console.log("Received message", message);
                await pub.publish('MESSAGES', JSON.stringify({message}));
            })
        })

        sub.on('message', (channel, message) => {
            if(channel === 'MESSAGES') {
                io.emit('message', message)
            }
        })
    }

    get io() {
        return this._io;
    }
}

export default SocketService;