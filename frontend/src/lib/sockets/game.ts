import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"

import type { IGameSocketClientToServer, IGameSocketServerToClient } from "@mop/shared-types"
import type { IGameClient } from "$lib/interfaces/game-client";


const serverUrl = import.meta.env.VITE_SERVER_URL


export class GameSocket {

  private gameClient: IGameClient;
  private io: Socket<IGameSocketServerToClient, IGameSocketClientToServer>;

  constructor(gameClient: IGameClient) {
    this.gameClient = gameClient
    this.io = io(`${serverUrl}/game`)

    this.io.on("gameTick", (gameTickData) => {
      this.gameClient.updateGameStateFromTick({
        ...gameTickData,
        gameTickEvents: []
      })
    })

    this.gameClient.event.on("playerMove", (movementInput) => {
      this.io.emit("playerMove", movementInput)
    })

    this.gameClient.event.on("joinGame", (gameId, resolve, reject) => {
      this.io.emitWithAck("joinGame", { gameId }).then(resolve, reject)
    })
  }
}
