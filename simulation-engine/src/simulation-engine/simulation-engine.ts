

import { EventEmitter } from "eventemitter3"
import type { ISimulationEngine } from "../interfaces.ts"
import type { IEntity, IGameEvents, IMovementInput, IPlayerEntity, IEntityType, IGameTickData } from "../types.ts"
import { getEntityDirectionFromMovementInput } from "./utils.ts"

type entityStats = {
  speed: number,
  health: number,
  attack: number,
  hitboxWidth:number,
  hitboxHeight: number
}

export const ENTITIES_BASE_STATS: Record<IEntityType, entityStats> = {
  player: {
    speed: 5,
    health: 20,
    attack: 5,
    hitboxWidth:32,
    hitboxHeight: 48
  },
  sheep: {
    speed: 2,
    health: 20,
    attack: 5,
    hitboxWidth:32,
    hitboxHeight: 48
  },
  cat: {
    speed: 2,
    health: 20,
    attack: 5,
    hitboxWidth:32,
    hitboxHeight: 48
  }
}


export class SimulationEngine implements ISimulationEngine {
  event: EventEmitter<IGameEvents> = new EventEmitter()
  private ticksPerSecond = 20
  private tickInterval?: ReturnType<typeof setInterval>

  // playerId, playerEntity
  private players: Record<string, IPlayerEntity> = {};
  private entitiesArray: IEntity[] = []
  //                      entity id
  private entities: Record<string, IEntity> = {}

  constructor() {

  }

  spawnNewPlayer(playerId: string, username: string): void {
    const playerEntity: IPlayerEntity = {
      x: 20,
      y: 20,
      type: "player",
      name: username,
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
    this.entitiesArray.push(playerEntity)
    this.entities[playerId] = playerEntity 
    this.event.emit("createPlayer", playerId)
  }

  updateEntity(entityId: string, entityState: Partial<IEntity>): void {
    const entity = this.entities[entityId]

    if(!entity) {
      throw new Error(`failed to update entity: ${entityId} entity does not exist`)
    }

    //todo later
    //update entity
  }

  updateGameStateFromTick(gameTickData: IGameTickData): void {
    this.entities = gameTickData.entities
    this.entitiesArray = Object.values(gameTickData.entities)
  }

  getEntity(entityId: string): IEntity | undefined {
    return this.entities[entityId]
  }

  start(): void {
    if (this.tickInterval) return

    this.tickInterval = setInterval(() => {
      this.event.emit("gameTick", {entities: this.entities })
      this.event.emit("entitiesMove", this.entitiesArray)
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

    if(input.x != 0 || input.y != 0 ) {
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
