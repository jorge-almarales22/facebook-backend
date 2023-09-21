import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { authRouter } from '../routes/auth-routes.js';
import { createServer } from 'node:http';
import { Server as ServerIO } from 'socket.io';
import { socketController } from '../sockets/controller.socket.js';
export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.paths = {
            auth: '/api/auth',
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