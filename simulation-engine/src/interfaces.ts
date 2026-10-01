
import type { EventEmitter } from "eventemitter3"
import type { IEntity, IGameEvents, IMovementInput } from "./types.js"



export interface ISimulationEngine {
  event: EventEmitter<IGameEvents>;

  start(): void;
  stop(): void;

  spawnNewPlayer(playerId: string, username: string): void;
  movePlayer(input: IMovementInput, playerId: string ): void;
  getEntity(entityId: string): IEntity | undefined;
}
