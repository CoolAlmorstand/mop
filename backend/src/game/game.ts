


import { EventEmitter } from "eventemitter3";
import type { IGame } from "../interfaces/game.js";
import type { IEntity, IGameEvents, IPlayerEntity } from "@mop/shared-types";


export class Game implements IGame {
  id: string;
  event: EventEmitter<IGameEvents>;

  private entities: IEntity[] = []

  //Id, entity
  private players: Record<string, IPlayerEntity> = {};
  constructor(id: string) {

    this.id = id
    this.event = new EventEmitter() 
  }


  spawnNewPlayer(userId: string, username: string): void {
   
  }
}
