


import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';

export function initializeSocket(httpServer: HttpServer, clientUrl: string): Server {
	return new Server(httpServer, {
		cors: {
			origin: clientUrl,
		},
	});
}
