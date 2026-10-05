
import type { IMovementInput } from "@mop/simulation-engine"



export interface IGameSocket {
  joinGame(gameId: string): Promise<{playerId: string, username: string}>
  movePlayer(movementInput: IMovementInput ): Promise<void>;
}
