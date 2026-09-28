import type { IEntity, IGameTickData } from "@mop/game-engine"

export interface IGameEvents {
  entitiesMove: (entities: IEntity[]) => void;

  //returns entityId player entity
  createPlayer: (entityId: string) => void;
  gameTick: () => void;

}

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
