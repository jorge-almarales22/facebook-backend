import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { authRouter } from '../routes/auth-routes.js';
import { createServer } from 'node:http';
import { Server as ServerIO } from 'socket.io';
import { socketController } from '../sockets/controller.socket.js';
import { postsRouter } from '../routes/posts-routes.js';
export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.paths = {
            auth: '/api/auth',
            posts: '/api/posts'
        }
        this.routes();
        this.server = createServer(this.app);
        this.io =  new ServerIO(this.server, {
            cors: {
                origin: "*", // Permite todos los orígenes
                methods: ["GET", "POST"] // Métodos permitidos
            }
        });
    }

    socket() {
        this.io.on('connection', socketController)
    }

    routes() {
        this.app.use(this.paths.auth, authRouter)
        this.app.use(this.paths.posts, postsRouter)
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(cors());
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}