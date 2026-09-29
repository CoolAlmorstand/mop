

import type { EventEmitter } from "eventemitter3"
import type { IDirectionVector, IGameEvents } from "@mop/simulation-engine";

export interface IGame {
  event: EventEmitter<IGameEvents>;
  id: string;

  spawnNewPlayer(userId: string, username: string): void;
  start(): void;
  pause(): void;
  playerMove(entityId: string, direction: IDirectionVector): void;
}



