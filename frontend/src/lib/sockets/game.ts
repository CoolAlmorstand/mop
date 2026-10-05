import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"

import type { IGameSocket } from "$lib/interfaces/game-socket";
import type { IMovementInput, ISimulationEngine } from "@mop/simulation-engine";
import type { IGameSocketClientToServer, IGameSocketServerToClient } from "@mop/shared-types"


const serverUrl = import.meta.env.VITE_SERVER_URL


export class GameSocket implements IGameSocket {

  private simulation: ISimulationEngine;
  private io: Socket<IGameSocketServerToClient, IGameSocketClientToServer>;

  constructor(simulation: ISimulationEngine) {
    this.simulation = simulation
    this.io = io(`${serverUrl}/game`)

    this.io.on("gameTick", (gameTickData) => {
      console.log("game has ticked")
      this.simulation.updateGameStateFromTick(gameTickData) 
    })
  }

  async movePlayer(movementInput: IMovementInput): Promise<void> {
    this.io.emit("playerMove", movementInput) 
  }

  async joinGame(gameId: string): Promise<{ playerId: string; username: string; }> {
    const { playerId, username } = await this.io.emitWithAck("joinGame", {gameId}) 
    return { playerId, username }
  }
}
