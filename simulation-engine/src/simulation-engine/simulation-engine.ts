

import EventEmitter from "eventemitter3"
import type { ISimulationEngine } from "../interfaces"
import type { IEntity, IGameEvents, IMovementInput, IPlayerEntity } from "../types"


export class SimulationEngine implements ISimulationEngine {
  event: EventEmitter<IGameEvents> = new EventEmitter()

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
  }

  start(): void {
      
  }

  stop(): void {
      
  }

  movePlayer(input: IMovementInput, playerId: string): void {
    
  }
}
