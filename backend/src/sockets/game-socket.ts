

import type { Namespace, Server } from "socket.io"
import type { IGameSocketClientToServer, IGameSocketServerToClient, IGameSocketData } from "@mop/shared-types"
import type { IGameTickData } from "@mop/simulation-engine"

import type { EventEmitter } from "eventemitter3"

//temporary


interface IGame {
  event: EventEmitter;
}

interface IAuth {

}


export class GameSocket {

  private io: Namespace<IGameSocketClientToServer, IGameSocketServerToClient, {}, IGameSocketData>;

  private game: IGame;
  private auth: IAuth;

  constructor(mainSocket: Server, game: IGame, auth: IAuth ) {
    this.game = game
    this.io = mainSocket.of("/game")
    this.auth = auth

    this.setupIoListeners()
    this.setupGameListeners()
  }


  private setupGameListeners() {

    this.game.event.on("gameTick", (gameTickData: IGameTickData) => {
      this.io.emit("gameTick", gameTickData)
    })
  }

  private setupIoListeners() {
    this.io.on("connection", (socket) => {
      console.log(`${socket.id} connected`)
      //use auth later to get userId
      socket.data.userId = "1"

      socket.on("playerMove", (data) => {
        console.log("playerMove", data.x, data.y)
      })
    })
  }
}
