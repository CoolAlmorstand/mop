
import type { IEntityType, IGameEvents } from "@mop/shared-types"
import type EventEmmitter from "eventemitter3"


export interface IGame {
  event: EventEmmitter<IGameEvents>;

  movePlayer(x: number, y: number, id: string): void;

  //spawn an entity and returns the id
  spawnEntity(type: IEntityType, x: number, y: number): string;
  initGame(): void;
  startGame(): void
}












