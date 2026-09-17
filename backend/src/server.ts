import { createServer } from 'node:http';
import { Server } from 'socket.io';

const httpServer = createServer();
new Server(httpServer);

httpServer.listen(3000, () => {
	console.log('Server listening on port 3000');
});
