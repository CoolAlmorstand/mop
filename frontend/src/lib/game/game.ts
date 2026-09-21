

import type { IGame } from "$lib/interfaces/game";
import type { IEntity } from "@mop/shared-types"
import type { IGameEvents } from "@mop/shared-types";
import EventEmmitter from "eventemitter3"


export class IMopGame implements IGame {
  event: EventEmmitter<IGameEvents> = new EventEmmitter()

  //id, entity
  private entities: Record<string, IEntity> = {};
  
  constructor() {

  }

  movePlayer(x: number, y: number, id: string) {
    this.entities[id].x = x
    this.entities[id].y = y
  }
}
