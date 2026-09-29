import type { IGameTickData } from "@mop/simulation-engine"

export type IGameSocketData = {
  userId: string;
}

export interface IGameSocketClientToServer {
  "playerMove": (data: {x: number, y: number}) => void;
  "playerJoin": (ack: (playrId: string) => void) => void;
}


export interface IGameSocketServerToClient {
  "gameTick": (data: IGameTickData) => void;
}
