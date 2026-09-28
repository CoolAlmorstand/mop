

import type { EventEmitter } from "eventemitter3"
import type { IGameEvents } from "@mop/shared-types";

export interface IGame {
  event: EventEmitter<IGameEvents>;
  id: string;

  spawnNewPlayer(userId: string, username: string): void;
}




