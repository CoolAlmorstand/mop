import 'dotenv/config';
import { createServer } from 'node:http';
import cors from 'cors';
import express from 'express';
import { initializeSocket } from './sockets/initialize-socket.js';
import { EventEmitter } from 'eventemitter3';
import { GameSocket } from './sockets/game-socket.js';

const clientUrl = process.env.CLIENT_URL;

if (!clientUrl) {
	throw new Error('CLIENT_URL must be set.');
}

const app = express();
app.use(cors({ origin: clientUrl }));

const httpServer = createServer(app);

const mainSocket = initializeSocket(httpServer, clientUrl);

const game = { event: new EventEmitter()}
const auth = {}

const gameSocket = new GameSocket(mainSocket, game, auth)


httpServer.listen(3000, () => {
	console.log('Server listening on port 3000');
});
