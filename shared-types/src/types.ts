import type { IGameTickData } from "@mop/simulation-engine"

export type IGameSocketData = {
  userId: string;
  username: string;
  currentGame: string;
}

export interface IGameSocketClientToServer {
  "playerMove": (data: {x: number, y: number}) => void;
  "joinGame": (data: {gameId: string }, ack: (data: { playerId: string, username: string}) => void) => void;
}


export interface IGameSocketServerToClient {
  "gameTick": (data: IGameTickData) => void;
}
