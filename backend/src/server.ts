import { createServer } from 'node:http';
import { initializeSocket } from './sockets/initialize-socket.js';

const httpServer = createServer();
initializeSocket(httpServer);

httpServer.listen(3000, () => {
	console.log('Server listening on port 3000');
});
