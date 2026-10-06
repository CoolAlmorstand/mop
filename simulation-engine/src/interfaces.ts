
import type { EventEmitter } from "eventemitter3"
import type { IEntity, IGameEvents, IGameTickData, IMovementInput } from "./types.js"



export interface ISimulationEngine {
  event: EventEmitter<IGameEvents>;

  start(): void;
  stop(): void;

  spawnNewPlayer(playerId: string, username: string): void;
  updateEntity(entityId: string, entityState: Partial<IEntity>): void;
  updateGameStateFromTick(gameTickData: IGameTickData): void;
  movePlayer(input: IMovementInput, playerId: string ): void;
  getEntity(entityId: string): IEntity | undefined;
}
