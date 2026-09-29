
import type { IMovementInput } from "@mop/simulation-engine"
import type { EventEmitter } from "eventemitter3"


export interface IGameClient {
  movePlayer(input: IMovementInput): void;
}
