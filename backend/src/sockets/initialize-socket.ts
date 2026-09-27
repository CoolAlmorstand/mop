


import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';

export function initializeSocket(httpServer: HttpServer): Server {
	return new Server(httpServer);
}
