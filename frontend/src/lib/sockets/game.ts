import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"

import type { IGameSocket } from "$lib/interfaces/game-socket";
import type { ISimulationEngine } from "@mop/simulation-engine";
import type { IGameSocketClientToServer, IGameSocketServerToClient } from "@mop/shared-types"
import EventEmitter from "eventemitter3";


const serverUrl = import.meta.env.VITE_SERVER_URL


export class GameSocket implements IGameSocket {

  private simulation: ISimulationEngine;
  private io: Socket<IGameSocketServerToClient, IGameSocketClientToServer>;

  constructor(simulation: ISimulationEngine) {
    this.simulation = simulation
    this.io = io(`${serverUrl}/game`)

    this.io.on("gameTick", (gameTickData) => {
      this.simulation. 
    })
  }

  async joinGame(gameId: string): Promise<{ playerId: string; username: string; }> {
    const { playerId, username } = await this.io.emitWithAck("joinGame", {gameId}) 
    return { playerId, username }
  }
}
