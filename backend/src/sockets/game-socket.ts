

import type { Namespace, Server, Socket } from "socket.io"
import type { IGameSocketClientToServer, IGameSocketServerToClient, IGameSocketData } from "@mop/shared-types"
import type { IGameTickData } from "@mop/simulation-engine"

import type { EventEmitter } from "eventemitter3"
import type { IGamesManager } from "../interfaces/games-manager.js"

//temporary

type IAuth = {}

type IGameSocket = Socket<IGameSocketClientToServer, IGameSocketServerToClient> 

export class GameSocket {

  private io: Namespace<IGameSocketClientToServer, IGameSocketServerToClient, {}, IGameSocketData>;

  private gameManager: IGamesManager;
  private connectedPlayersCount: number = 0;
  private auth: IAuth;

  constructor(mainIoServer: Server, gameManager: IGamesManager, auth: IAuth ) {
    this.gameManager = gameManager
    this.io = mainIoServer.of("/game")
    this.auth = auth

    this.setupIoListeners()
  }


  private setupGameListeners(socket: IGameSocket) {
    if(!socket.data.currentGame) {
      throw new Error("socket does not have a current game its connected to")
    }

    const game = this.gameManager.games[socket.data.currentGame]

    if(!game) {
      throw new Error(`cannot attacht event listeneres to non existent game: ${socket.data.currentGame} `)
    }

    game.event.on("gameTick", (gameTickData) => {
      socket.emit("gameTick", gameTickData)
    })
  }

  private setupIoListeners() {
    this.io.on("connection", (socket) => {
      console.log(`${socket.id} connected`)

      //use auth later to get userId
      //userId is used as the playerId

      this.connectedPlayersCount += 1

      if(this.connectedPlayersCount == 1) {
        socket.data.userId = "1"
        socket.data.username = "timothy_dexter"
      } else {
        socket.data.userId = "2"
        socket.data.username = "napoleon"
      }
      

      socket.on("joinGame", (data, ack) => {
        try {
          this.gameManager.joinGame(socket.data.userId, socket.data.username, data.gameId)
          socket.data.currentGame = data.gameId

          this.setupGameListeners(socket)
          console.log(socket.data)
          ack({ playerId: socket.data.userId, username: socket.data.username})
        } catch (error) {
          console.error(error)
        }
      })


      socket.on("playerMove", (data) => {
        console.log("playerMove", data.x, data.y)
      })
    })
  }
}
