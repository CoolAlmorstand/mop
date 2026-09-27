import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"

import type { IGame } from "$lib/interfaces/game";
import type { IGameSocket } from "$lib/interfaces/game-socket";

const serverUrl = import.meta.env.VITE_SERVER_URL


export class GameSocket implements IGameSocket {

  private game: IGame;
  private io: Socket;

  constructor(game: IGame) {
    this.game = game
    this.io = io(`${serverUrl}/game`)
  }
}
