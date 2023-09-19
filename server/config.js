import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { authRouter } from '../routes/auth-routes.js';
export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.paths = {
            auth: '/api/auth',
        }
        this.routes();
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
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}