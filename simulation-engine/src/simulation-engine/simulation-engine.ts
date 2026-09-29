

import EventEmitter from "eventemitter3"
import type { ISimulationEngine } from "../interfaces"
import type { IEntity, IGameEvents, IMovementInput, IPlayerEntity } from "../types"
import { ENTITIES_BASE_STATS } from "../index"
import { getEntityDirectionFromMovementInput } from "./utils"


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
      health: ENTITIES_BASE_STATS.player.health, 
      speed: ENTITIES_BASE_STATS.player.speed,
      id: playerId,
      attack: ENTITIES_BASE_STATS.player.attack,
      direction: "s",
      hitboxtSize: {
        width: ENTITIES_BASE_STATS.player.hitboxWidth,
        height: ENTITIES_BASE_STATS.player.hitboxHeight
      }, 
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

    const player = this.players[playerId]

    if(!player) {
      return
    }

    if(input.x != 0 && input.y != 0 ) {
      this.players[playerId].currentAction = "running"
    } else {
      this.players[playerId].currentAction = "idle"
      return
    }

    //validate movement
    const totalMovement = Math.hypot(input.x, input.y) * input.scale * player.speed

    if( totalMovement > player.speed ) {
      //todo later
    }

    player.direction = getEntityDirectionFromMovementInput(input)

    player.x += input.x * player.speed * input.scale
    player.y += input.y * player.speed * input.scale


  }
}
