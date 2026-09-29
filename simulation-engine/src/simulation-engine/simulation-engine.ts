

import EventEmitter from "eventemitter3"
import type { ISimulationEngine } from "../interfaces"
import type { IEntity, IGameEvents, IMovementInput, IPlayerEntity } from "../types"


export class SimulationEngine implements ISimulationEngine {
  event: EventEmitter<IGameEvents> = new EventEmitter()
  private ticksPerSecond = 20
  private tickInterval?: ReturnType<typeof setInterval>

  // playerId, playerEntity
  private players: Record<string, IPlayerEntity> = {};
  private entities: IEntity[] = []

  constructor() {

  }

  spawnNewPlayer(playerId: string, username: string): void {
    const playerEntity: IPlayerEntity = {
      x: 20,
      y: 20,
      type: "player",
      username,
      inventory: [],
      health: 20, 
      speed: 20,
      id: playerId,
      attack: 20,
      direction: "s",
      hitboxtSize: {width: 32, height: 48},
      currentAction: "idle"
    }

    this.players[playerId] = playerEntity
    this.entities.push(playerEntity)
    this.event.emit("createPlayer", playerId)
  }

  start(): void {
    if (this.tickInterval) return

    this.tickInterval = setInterval(() => {
      this.event.emit("gameTick")
      this.event.emit("entitiesMove", this.entities)
    }, 1000 / this.ticksPerSecond)
  }

  stop(): void {
    if (!this.tickInterval) return

    clearInterval(this.tickInterval)
    this.tickInterval = undefined
  }

  movePlayer(input: IMovementInput, playerId: string): void {
    if(!this.players[playerId]) {
      return
    }

    this.players[playerId].x += input.x * this.players[playerId].speed * 0.1
    this.players[playerId].y += input.y * this.players[playerId].speed * 0.1


    if(input.x != 0 && input.y != 0 ) {
      this.players[playerId].currentAction = "running"
    } else {
      this.players[playerId].currentAction = "idle"
    }
  }
}
