
import type { IGameTickData, IMovementInput } from "@mop/simulation-core"
import type { EventEmitter } from "eventemitter3"

export type GameClientEvents = {
  gameTick: (data: IGameTickData) => void;
  playerMove: (input: IMovementInput) => void;
  joinGame: (
    gameId: string,
    resolve: (player: { playerId: string; username: string }) => void,
    reject: (error: unknown) => void
  ) => void;
}

export interface IGameClient {
  event: EventEmitter<GameClientEvents>;
  movePlayer(input: IMovementInput): void;
  updateGameStateFromTick(gameTickData: IGameTickData): void;
  initializeGame(): Promise<void>;
}
