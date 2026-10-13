
import type { IMovementInput } from "@mop/simulation-core"



export interface IGameSocket {
  joinGame(gameId: string): Promise<{playerId: string, username: string}>
  movePlayer(movementInput: IMovementInput ): Promise<void>;
}
