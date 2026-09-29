
import type { EventEmitter } from "eventemitter3"
import type { IGameEvents } from "./types"



export interface ISimulationEngine {
  event: EventEmitter<IGameEvents>;

  start(): void;
  stop(): void;

  spawnNewPlayer(playerId: string, username: string): void;
}
