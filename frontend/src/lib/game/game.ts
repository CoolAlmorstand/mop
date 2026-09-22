

import type { IGame } from "$lib/interfaces/game";
import type { IDirectionVector, IEntity, IEntityType } from "@mop/shared-types"
import type { IGameEvents } from "@mop/shared-types";

import EventEmmitter from "eventemitter3"

import { ENTITIES_BASE_STATS } from "@mop/shared-types"
import { randomString } from "$lib/utils/random-string";

export class MopGame implements IGame {
  event: EventEmmitter<IGameEvents> = new EventEmmitter()

  //id, entity
  private entities: Record<string, IEntity> = {};
  private playerEntityId: string | null = null;
  private gameLoop: ReturnType<typeof setInterval> | null = null;

  constructor() {

  }

  movePlayer(direction: IDirectionVector): void {
    if (!this.playerEntityId) {
      return
    }

    const player = this.entities[this.playerEntityId]
    if (!player) {
      return
    }

    player.x += direction.x * player.speed
    player.y += direction.y * player.speed
    this.event.emit("entitiesMove", [player])
  }

  spawnEntity(type: IEntityType, x: number, y: number): string {
    const id = randomString(8)

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
    this.playerEntityId = playerEntityId

    this.event.emit("createPlayer", playerEntityId)
  }

  startGame(): void {
    if (this.gameLoop) {
      return
    }

    this.gameLoop = setInterval(() => {
      this.event.emit("gameTick")
    }, 1000 / 60)
  }
}




