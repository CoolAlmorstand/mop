import { createServer } from 'node:http';
import { initializeSocket } from './sockets/initialize-socket.js';
import { EventEmitter } from 'eventemitter3';
import { GameSocket } from './sockets/game-socket.js';


const httpServer = createServer();

const mainSocket = initializeSocket(httpServer);

const game = { event: new EventEmitter()}
const auth = {}

const gameSocket = new GameSocket(mainSocket, game, auth)


httpServer.listen(3000, () => {
	console.log('Server listening on port 3000');
});
