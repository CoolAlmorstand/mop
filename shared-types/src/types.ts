

export type ITilesId = "grass" | "sand"
export type IEntityType = "player" | "sheep"
export type IEntityDirection = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"
export type IEntityAction = "running" | "idle"


export type IEntity = {
  x: number;
  y: number;
  hitboxtSize: {width: number, height: number};
  health: number;
  speed: number;
  attack: number;
  id: string;
  direction: IEntityDirection;
  currentAction: IEntityAction;
}

export type IDirectionVector = {
  x: number;
  y: number;
}



export interface IGameEvents {
  entitiesMove: (entities: IEntity[]) => void;

  //returns entityId player entity
  createPlayer: (entityId: string) => void;
  gameTick: () => void;

}

