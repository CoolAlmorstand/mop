

import type { IGame } from "$lib/interfaces/game";
import type { IEntity, IEntityType } from "@mop/shared-types"
import type { IGameEvents } from "@mop/shared-types";

import EventEmmitter from "eventemitter3"

import { ENTITIES_BASE_STATS } from "@mop/shared-types"

export class MopGame implements IGame {
  event: EventEmmitter<IGameEvents> = new EventEmmitter()

  //id, entity
  private entities: Record<string, IEntity> = {};

  constructor() {

  }

  movePlayer(x: number, y: number, id: string) {
    this.entities[id].x = x
    this.entities[id].y = y
  }

  spawnEntity(type: IEntityType, x: number, y: number): string {
     
    const id = crypto.randomUUID()
    const baseStats = ENTITIES_BASE_STATS[type]

    this.entities[id] = {
      speed: baseStats.speed,
      health: baseStats.health,
      x,
      y,
      hitboxtSize: {width: baseStats.hitboxWidth, height: baseStats.hitboxHeight},
      attack: baseStats.attack,
      id,
    }
    return id
  }

  initGame(): void{
    const playerEntityId = this.spawnEntity("player", 20, 20) 

    this.event.emit("createPlayer", playerEntityId)
  }

  startGame(): void {
  }
}






