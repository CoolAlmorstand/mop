import { createServer } from 'node:http';
import { initializeSocket } from './sockets/initialize-socket.js';
import { GameSocket } from './sockets/game-socket.js';

const httpServer = createServer();

const mainSocket = initializeSocket(httpServer);
const gameSocket = new GameSocket(mainSocket)


httpServer.listen(3000, () => {
	console.log('Server listening on port 3000');
});
