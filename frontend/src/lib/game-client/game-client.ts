import type { IGameClient } from "$lib/interfaces/game-client";
import type { GameClientEvents } from "$lib/interfaces/game-client";
import type { IGameTickData, IMovementInput } from "@mop/simulation-core"
import { SimulationCore } from "@mop/simulation-core/src/index.ts"
import { EventEmitter } from "eventemitter3"

export class GameClient implements IGameClient {

  event = new EventEmitter<GameClientEvents>()
  private simulation: SimulationCore;
  private playerId!: string;
  private tickSpeed = 20;
  private tickInterval?: ReturnType<typeof setInterval>;

  constructor(simulation: SimulationCore) {
    this.simulation = simulation
  }

  movePlayer(input: IMovementInput): void {

    if( ( input.x == 0 && input.y == 0) || input.scale == 0 ) {
      this.simulation.updateEntityCurrentAction(this.playerId, "player", "idle") 
      return
    }

    this.simulation.updateEntityCurrentAction(this.playerId, "player", "running") 

    const movementResult = this.simulation.tryMovePlayer(this.playerId, input) 

    this.simulation.moveEntity(this.playerId, movementResult.targetX, movementResult.targetY)
  }

  start(): void {
    if (this.tickInterval) return

    this.tickInterval = setInterval(() => {
      this.event.emit("gameTick", {
        entities: this.simulation.entities,
        entitiesArray: this.simulation.entitiesArray,
        gameTickEvents: []
      })
    }, 1000 / this.tickSpeed)
  }

  updateGameStateFromTick(gameTickData: IGameTickData): void {
    this.simulation.entities = gameTickData.entities
    this.simulation.entitiesArray = gameTickData.entitiesArray
  }

  stop(): void {
    if (!this.tickInterval) return

    clearInterval(this.tickInterval)
    this.tickInterval = undefined
  }

  setTickSpeed(tickSpeed: number): void {
    if (tickSpeed <= 0) {
      throw new Error("Tick speed must be greater than 0")
    }

    const wasRunning = this.tickInterval !== undefined
    this.stop()
    this.tickSpeed = tickSpeed

    if (wasRunning) {
      this.start()
    }
  }

  async initializeGame(): Promise<void> {
    
    const playerId = "1"
    const username = "timothy"
    
    this.playerId = playerId
    this.simulation.spawnPlayer(username, playerId, 20, 20)
    this.start()
  }
}


